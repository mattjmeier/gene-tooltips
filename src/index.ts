import tippy, { type Instance } from 'tippy.js';
import type { Props } from 'tippy.js'
import { defaultConfig, type GeneTooltipConfig, MyGeneInfoResult } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';
import { renderIdeogram } from './ideogram.js';
import { renderGeneTrack } from './gene-track.js';
import { formatPathways, formatDomains, formatTranscripts, formatStructures, formatGeneRIFs } from './formatters.js';
import { getD3 } from './gene-track.js';
import { getIdeogram } from './ideogram.js';
import { generateUniqueTooltipId, createNestedContent } from './utils.js';

// --- Map to track in-flight requests ---
const inFlightRequests = new Map<string, Promise<Map<string, MyGeneInfoResult>>>();
let isSummaryHandlerEnabled = false;

interface TippyInstanceWithCustoms extends Instance {
  _nestedTippys?: Instance[];
  _geneData?: MyGeneInfoResult | null;
  _isFetching?: boolean;
  _uniqueId?: string;
  _themeIntent?: 'auto' | string; // Track the user's intended theme
}

function init(userConfig: Partial<GeneTooltipConfig> = {}): () => void {
  // --- LOCAL STATE ---
  let themeObserver: MutationObserver | null = null;
  let instances: TippyInstanceWithCustoms[] = []; 

  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    display: {
      ...defaultConfig.display,
      ...userConfig.display,
      links: { ...defaultConfig.display.links, ...userConfig.display?.links },
    },
    ideogram: { ...defaultConfig.ideogram, ...userConfig.ideogram },
    tippyOptions: { ...defaultConfig.tippyOptions, ...userConfig.tippyOptions },
  };

  // Local theme setter
  const setTippyTheme = (theme: string): void => {
    instances.forEach(instance => {
      if (instance._themeIntent === 'auto' && instance.props.theme !== theme) {
        instance.setProps({ theme });
      }
    });
  };

  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) {
    return () => {};
  }
  
  // We determine the theme *before* initializing Tippy.
  let effectiveTheme: string;
  const isAutoTheme = config.theme === 'auto' || typeof config.theme === 'undefined';

  if (isAutoTheme) {
    const isDark = document.documentElement.classList.contains('dark');
    effectiveTheme = isDark ? 'dark' : 'light';
  } else {
    effectiveTheme = config.theme;
  }

  // Create tippy instances with the correct theme
  instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: effectiveTheme,
    maxWidth: config.tooltipWidth ?? config.tippyOptions.maxWidth,
    onShow(instance: TippyInstanceWithCustoms) {
      if (config.constrainToViewport) {
        // Find the content wrapper inside the tooltip
        const content = instance.popper.querySelector('.tippy-content');
        if (content) {
          // Get padding from the preventOverflow modifier, default to 8
          const padding = config.tippyOptions?.popperOptions?.modifiers?.find(
            m => m.name === 'preventOverflow'
          )?.options?.padding ?? 8;
          
          // Set max-height based on viewport height minus padding on both top and bottom
          (content as HTMLElement).style.maxHeight = `${window.innerHeight - (padding * 2)}px`;
        }
      }
      (async () => {
        if (!instance._uniqueId) {
          instance._uniqueId = generateUniqueTooltipId();
        }

        if (instance._geneData !== undefined) {
          return;
        }

        const info = getGeneInfoFromElement(instance.reference as HTMLElement);
        if (!info) {
          instance.setContent('Invalid gene element');
          return;
        }

        const { symbol, taxid } = info;
        const cacheKey = cache.getCacheKey(symbol, taxid);

        const renderOptions = {
          truncate: config.truncateSummary,
          display: config.display,
          pathwaySource: config.pathwaySource,
          pathwayCount: config.pathwayCount,
          domainCount: config.domainCount,
          transcriptCount: config.transcriptCount,
          structureCount: config.structureCount,
          generifCount: config.generifCount,
          tooltipHeight: config.tooltipHeight,
          uniqueId: instance._uniqueId,
        };

        const renderContent = (data: MyGeneInfoResult | null) => {
          instance._geneData = data;
          instance.setContent(renderTooltipHTML(data, renderOptions));
        };

        const cachedData = cache.get(symbol, taxid);
        if (typeof cachedData !== 'undefined') {
          renderContent(cachedData);
          return;
        }

        instance.setContent('Loading...');

        let fetchPromise = inFlightRequests.get(cacheKey);

        if (!fetchPromise) {
          fetchPromise = fetchMyGeneBatch([symbol], String(taxid));
          inFlightRequests.set(cacheKey, fetchPromise);
        }

        try {
          const resultsMap = await fetchPromise;
          const data = resultsMap.get(symbol) || null;
          cache.set(symbol, taxid, data);
          renderContent(data);
        } catch (error) {
          console.error(`Failed to fetch data for ${symbol}`, error);
          instance.setContent('Error loading data.');
        } finally {
          inFlightRequests.delete(cacheKey);
        }
      })();
    },
    onMount(instance: TippyInstanceWithCustoms) {
      const data = instance._geneData;
      if (!data || !instance._uniqueId) return;

      if (config.display.geneTrack && data.exons) {
        renderGeneTrack(instance, data, instance._uniqueId, config.tooltipWidth); 
      }
      
      if (config.ideogram?.enabled && data.genomic_pos) {
        renderIdeogram(instance, data, config.ideogram, instance._uniqueId);
      }

      instance._nestedTippys = [];

      // 1. Define the shared options for all nested tooltips.
      // Grab the popperOptions directly from the master config.
      const nestedTippyOptions: Partial<Props> = {
        allowHTML: true,
        interactive: true,
        trigger: 'mouseenter focus',
        placement: 'right', // This is now correctly checked against the 'Placement' type
        popperOptions: config.tippyOptions.popperOptions,
        onShow(childInstance: Instance) {
          const currentParentTheme = instance.props.theme || 'auto';
          childInstance.setProps({ theme: currentParentTheme });

          if (config.constrainToViewport) {
            const content = childInstance.popper.querySelector('.tippy-content');
            if (content) {
              const padding = config.tippyOptions?.popperOptions?.modifiers?.find(
                m => m.name === 'preventOverflow'
              )?.options?.padding ?? 8;
              (content as HTMLElement).style.maxHeight = `${window.innerHeight - (padding * 2)}px`;
            }
          }
        }
      };

      const createNestedTippy = (selector: string, items: { name: string; url: string }[]) => {
        const button = instance.popper.querySelector<HTMLElement>(selector);
        if (button && items.length > 0) {
          // This call is now type-safe and will not error
          const nestedInstance = tippy(button, {
            ...nestedTippyOptions,
            content: createNestedContent(items),
          });
          instance._nestedTippys?.push(nestedInstance as Instance);
        }
      };

      const pathwayItems = formatPathways(data.pathway?.[config.pathwaySource], config.pathwaySource);
      createNestedTippy(`#pathways-more-${instance._uniqueId}`, pathwayItems);
      const domainItems = formatDomains(data.interpro);
      createNestedTippy(`#domains-more-${instance._uniqueId}`, domainItems);
      const transcriptItems = formatTranscripts(data.ensembl?.transcript);
      createNestedTippy(`#transcripts-more-${instance._uniqueId}`, transcriptItems);
      const structureItems = formatStructures(data.pdb);
      createNestedTippy(`#structures-more-${instance._uniqueId}`, structureItems);
      const generifItems = formatGeneRIFs(data.generif);
      createNestedTippy(`#generifs-more-${instance._uniqueId}`, generifItems);
    },
    onHidden(instance: TippyInstanceWithCustoms) {
      if (instance._nestedTippys) {
        instance._nestedTippys.forEach(nested => nested.destroy());
        instance._nestedTippys = [];
      }
    }
  }) as TippyInstanceWithCustoms[];

  instances.forEach(instance => {
    instance._themeIntent = isAutoTheme ? 'auto' : config.theme;
  });

  // Set up theme observer
  if (isAutoTheme) {
    themeObserver = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains('dark');
      const newTheme = isNowDark ? 'dark' : 'light';
      setTippyTheme(newTheme);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold, inFlightRequests);
  
  if (!isSummaryHandlerEnabled) {
    enableSummaryExpand();
    isSummaryHandlerEnabled = true;
  }

  return () => {
    instances.forEach(instance => {
      if (instance && instance.destroy) {
        instance.destroy();
      }
    });
    if (themeObserver) {
      themeObserver.disconnect();
    }
    instances = [];
  };
}

/**
 * Preloads the optional heavy dependencies (d3, ideogram) so they
 * are ready when tooltips are first shown. This is useful to call
 * once in your application's entry point.
 */
function preload(): Promise<[PromiseSettledResult<any>, PromiseSettledResult<any>]> {
  console.log('[GeneTooltip] Preloading optional dependencies...');
  return Promise.allSettled([
    getD3(),
    getIdeogram()
  ]);
}

function filterNestedList(query: string, listId: string): void {
  const list = document.getElementById(listId);
  if (!list) return;

  const items = list.getElementsByTagName('li');
  const normalizedQuery = query.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.textContent || '';
    if (text.toLowerCase().includes(normalizedQuery)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
}

// Attach it to the window object so the inline oninput handler can find it.
// We do this inside an if-check to avoid errors in non-browser environments (like testing).
if (typeof window !== 'undefined') {
  if (!(window as any).GeneTooltip) {
    (window as any).GeneTooltip = {};
  }
  (window as any).GeneTooltip.filterNestedList = filterNestedList;
}

export default {
  init,
  preload,
};

declare global {
  interface Window {
    GeneTooltip: {
      init: (userConfig?: Partial<GeneTooltipConfig>) => void;
      preload: () => Promise<[PromiseSettledResult<any>, PromiseSettledResult<any>]>;
      filterNestedList: (query: string, listId: string) => void;
    };
  }
}
