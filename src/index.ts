import tippy, { type Instance } from 'tippy.js';
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

// --- Map to track in-flight requests ---
const inFlightRequests = new Map<string, Promise<Map<string, MyGeneInfoResult>>>();

// Generate a unique ID for each tooltip instance
function generateUniqueTooltipId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `tooltip-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function createNestedContent(items: { name: string; url: string }[]): string {
  const listItems = items
    .map(item => `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>`)
    .join('');
  return `<ul class="gene-tooltip-nested-list">${listItems}</ul>`;
}

let allTippyInstances: TippyInstanceWithCustoms[] = [];
let themeObserver: MutationObserver | null = null;
let isSummaryHandlerEnabled = false;

// --- Targeted theme update ---
function setGlobalTippyTheme(theme: string): void {
  allTippyInstances.forEach(instance => {
    // Only update instances that are set to 'auto'
    if (instance._themeIntent === 'auto' && instance.props.theme !== theme) {
      instance.setProps({ theme });
    }
  });
}

interface TippyInstanceWithCustoms extends Instance {
  _nestedTippys?: Instance[];
  _geneData?: MyGeneInfoResult | null;
  _isFetching?: boolean;
  _uniqueId?: string;
  _themeIntent?: 'auto' | string; // Track the user's intended theme
}

function init(userConfig: Partial<GeneTooltipConfig> = {}): () => void {
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

  let effectiveTheme: string;
  const isAutoTheme = config.theme === 'auto' || typeof config.theme === 'undefined';

  if (isAutoTheme) {
    const isDark = document.documentElement.classList.contains('dark');
    effectiveTheme = isDark ? 'dark' : 'light';

    if (!themeObserver) {
      themeObserver = new MutationObserver(() => {
        const isNowDark = document.documentElement.classList.contains('dark');
        const newTheme = isNowDark ? 'dark' : 'light';
        setGlobalTippyTheme(newTheme);
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }
  } else {
    effectiveTheme = config.theme;
  }

  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) {
    return () => {};
  }

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold, inFlightRequests);

  const instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: effectiveTheme,
    maxWidth: config.tooltipWidth ?? config.tippyOptions.maxWidth,
    onShow(instance: TippyInstanceWithCustoms) {
      // We wrap the logic in an async IIFE (Immediately Invoked Function Expression)
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

        // 1. Check cache first
        const cachedData = cache.get(symbol, taxid);
        if (typeof cachedData !== 'undefined') {
          renderContent(cachedData);
          return;
        }

        instance.setContent('Loading...');

        // 2. Check for in-flight requests
        let fetchPromise = inFlightRequests.get(cacheKey);

        // 3. If no in-flight request, create one
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
          // Clean up the in-flight map once done
          inFlightRequests.delete(cacheKey);
        }
      })(); // The IIFE is called immediately here
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
      const createNestedTippy = (selector: string, items: { name: string; url: string }[]) => {
        const button = instance.popper.querySelector<HTMLElement>(selector);
        if (button && items.length > 0) {
          const parentInstance = instance;
          const nestedInstance = tippy(button, {
            content: createNestedContent(items),
            allowHTML: true,
            interactive: true,
            trigger: 'mouseenter focus',
            placement: 'right',
            onShow(childInstance) {
              const currentParentTheme = parentInstance.props.theme || 'auto';
              childInstance.setProps({ theme: currentParentTheme });
            }
          });
          // Type assertion here because tippy's return type for single element is Instance, not Instance[]
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
    instance._themeIntent = isAutoTheme ? 'auto' : config.theme; // Set the theme intent
  });

  allTippyInstances.push(...instances);
  
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

    allTippyInstances = allTippyInstances.filter(i => !instances.includes(i));
    
    // Disconnect observer only if no more 'auto' instances exist
    const hasAutoInstances = allTippyInstances.some(i => i._themeIntent === 'auto');
    if (!hasAutoInstances && themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
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

// Export the new function alongside init
export default {
  init,
  preload,
};

declare global {
  interface Window {
    GeneTooltip: {
      init: (userConfig?: Partial<GeneTooltipConfig>) => void;
      preload: () => Promise<[PromiseSettledResult<any>, PromiseSettledResult<any>]>;
    };
  }
}
