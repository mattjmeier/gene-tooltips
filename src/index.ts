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
  // FIX #2: Change 'const' to 'let' so we can clear it in the cleanup.
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

  // The local theme setter now needs to be defined *after* `instances` is declared.
  // It's a subtle but important detail for how closures work.
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

  // Now, we create the instances with the correctly determined theme.
  instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: effectiveTheme, // `effectiveTheme` is now guaranteed to be assigned.
    maxWidth: config.tooltipWidth ?? config.tippyOptions.maxWidth,
    onShow(instance: TippyInstanceWithCustoms) {
      // ... your onShow logic (unchanged)
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
      // ... your onHidden logic (unchanged)
      if (instance._nestedTippys) {
        instance._nestedTippys.forEach(nested => nested.destroy());
        instance._nestedTippys = [];
      }
    }
  }) as TippyInstanceWithCustoms[];

  instances.forEach(instance => {
    instance._themeIntent = isAutoTheme ? 'auto' : config.theme;
  });

  // Now that instances are created, we can set up the observer if needed.
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
  // The 'else' block for setting theme on non-auto instances is no longer needed
  // because we already passed the correct `effectiveTheme` to tippy() directly.

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
