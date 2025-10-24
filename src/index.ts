import tippy, { type Instance, Props } from 'tippy.js';
import { defaultConfig, type GeneTooltipConfig, MyGeneInfoResult } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';
import { renderIdeogram, getIdeogram } from './ideogram.js';
import { renderGeneTrack, getD3 } from './gene-track.js';
import { formatPathways, formatDomains, formatTranscripts, formatStructures, formatGeneRIFs } from './formatters.js';
import { generateUniqueTooltipId, createNestedContent } from './utils.js';

// --- Map to track in-flight requests ---
const inFlightRequests = new Map<string, Promise<Map<string, MyGeneInfoResult>>>();
let isSummaryHandlerEnabled = false;

interface TippyInstanceWithCustoms extends Instance {
  _nestedTippys?: Instance[];
  _geneData?: MyGeneInfoResult | null;
  _isFetching?: boolean;
  _uniqueId?: string;
  _themeIntent?: 'auto' | string;
  _isChildTippyVisible?: boolean;
  _isFullyShown?: boolean;
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
    nestedTippyOptions: { ...defaultConfig.nestedTippyOptions, ...userConfig.nestedTippyOptions },
  };

  async function renderVisualsAndNestedTippys(instance: TippyInstanceWithCustoms) {
    try {
      const data = instance._geneData;
      if (!data || !instance._uniqueId) return;

      // Create promises for both rendering tasks
      const renderPromises = [];
      if (config.display.geneTrack && data.exons) {
        renderPromises.push(renderGeneTrack(instance, data, instance._uniqueId, config.tooltipWidth));
      }
      
      if (config.ideogram?.enabled && data.genomic_pos) {
        renderPromises.push(renderIdeogram(instance, data, config.ideogram, instance._uniqueId));
      }

      // Wait for both visualizations to finish rendering or fail
      await Promise.allSettled(renderPromises);

      // If the tooltip was hidden while async tasks were running, abort
      if (!instance.state.isShown) {
        return;
      }

      // --- All the nested tippy logic from your onShown goes here ---
      instance._nestedTippys = [];
      const baseNestedOptions = { ...config.nestedTippyOptions };
      const finalNestedTippyOptions: Partial<Props> = {
        ...baseNestedOptions, // User options are the base
        
        // --- Required/Dynamic Properties (cannot be overridden) ---
        appendTo: instance.popper,
        popperOptions: config.tippyOptions.popperOptions, // Inherit from parent
        zIndex: (config.tippyOptions.zIndex || 9999) + 1,

        // --- Safe Callback Handling ---
        onShow(childInstance: Instance) {
          // Our essential logic:
          instance._isChildTippyVisible = true;
          const currentParentTheme = instance.props.theme || 'auto';
          childInstance.setProps({ theme: currentParentTheme });

          if (config.constrainToViewport) {
            const content = childInstance.popper.querySelector('.tippy-content');
            if (content) {
              const padding = config.tippyOptions?.popperOptions?.modifiers?.find(
                m => m.name === 'preventOverflow'
              )?.options?.padding ?? 8;
              const availableHeight = window.visualViewport?.height || window.innerHeight;
              (content as HTMLElement).style.maxHeight = `${availableHeight - (padding * 2)}px`;
            }
          }
          
          // Now, call the user's custom onShow, if they provided one.
          baseNestedOptions.onShow?.(childInstance);
        },
        onHide(childInstance: Instance) {
          // Our essential logic:
          instance._isChildTippyVisible = false;
          
          // Call the user's custom onHide.
          baseNestedOptions.onHide?.(childInstance);
        }
      };

      // Pass the final, merged options to the function
      const createNestedTippy = (
        currentInstance: TippyInstanceWithCustoms,
        options: Partial<Props>,
        selector: string,
        items: { name: string; url: string }[]
      ) => {
        const button = currentInstance.popper.querySelector<HTMLElement>(selector);
        if (button && items.length > 0) {
          const nestedInstance = tippy(button, {
            ...options, // Use the passed-in options
            content: createNestedContent(items),
          });
          currentInstance._nestedTippys?.push(nestedInstance as Instance);
        }
      };

      
      const uniqueId = instance._uniqueId;
      const pathwayItems = formatPathways(data.pathway?.[config.pathwaySource], config.pathwaySource);
      createNestedTippy(instance, finalNestedTippyOptions, `#pathways-more-${uniqueId}`, pathwayItems);
      
      const domainItems = formatDomains(data.interpro);
      createNestedTippy(instance, finalNestedTippyOptions, `#domains-more-${uniqueId}`, domainItems);
      
      const transcriptItems = formatTranscripts(data.ensembl?.transcript);
      createNestedTippy(instance, finalNestedTippyOptions, `#transcripts-more-${uniqueId}`, transcriptItems);
      
      const structureItems = formatStructures(data.pdb);
      createNestedTippy(instance, finalNestedTippyOptions, `#structures-more-${uniqueId}`, structureItems);
      
      const generifItems = formatGeneRIFs(data.generif);
      createNestedTippy(instance, finalNestedTippyOptions, `#generifs-more-${uniqueId}`, generifItems);

    } catch (error) {
        console.error('[GeneTooltip] A critical error occurred during post-render lifecycle.', error);
        if (instance.state.isShown) {
          instance.setContent('An error occurred rendering this tooltip.');
        }
    }
  }


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
    onHide(instance: TippyInstanceWithCustoms) {
      instance._isFullyShown = false; // Reset the flag on hide
      // If a child tippy is visible, prevent the parent from hiding.
      if (instance._isChildTippyVisible) {
        return false;
      }
      
      if ((instance as any)._visualViewportResizeHandler && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', (instance as any)._visualViewportResizeHandler);
        delete (instance as any)._visualViewportResizeHandler;
      }
      if (instance._nestedTippys) {
        instance._nestedTippys.forEach(nested => nested.destroy());
        instance._nestedTippys = [];
      }
    },
    onShow(instance: TippyInstanceWithCustoms) {
      instance._isFullyShown = false; // Reset the flag on hide
      if (config.constrainToViewport) {
        // Find the content wrapper inside the tooltip
        const content = instance.popper.querySelector('.tippy-content');
        if (content) {
          // Get padding from the preventOverflow modifier, default to 8
          const padding = config.tippyOptions?.popperOptions?.modifiers?.find(
            m => m.name === 'preventOverflow'
          )?.options?.padding ?? 8;
          
          // Set max-height based on viewport height minus padding on both top and bottom
          // Use the Visual Viewport API if available, otherwise fall back to innerHeight.
          const availableHeight = window.visualViewport?.height || window.innerHeight;
          (content as HTMLElement).style.maxHeight = `${availableHeight - (padding * 2)}px`;
        }
      }
      if (config.constrainToViewport && window.visualViewport) {
        const content = instance.popper.querySelector('.tippy-content') as HTMLElement | null;
        if (!content) return;
        
        const padding = config.tippyOptions?.popperOptions?.modifiers?.find(m => m.name === 'preventOverflow')?.options?.padding ?? 8;

        // Define the handler function
        const handleResize = () => {
            content.style.maxHeight = `${window.visualViewport!.height - (padding * 2)}px`;
        };

        // Attach the handler
        window.visualViewport.addEventListener('resize', handleResize);
        
        // Store the handler on the instance so we can remove it later
        (instance as any)._visualViewportResizeHandler = handleResize;
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
          // Use a microtask to ensure the DOM has updated from setContent
          // queueMicrotask(() => {
          if (instance._isFullyShown) {
            renderVisualsAndNestedTippys(instance);
          }
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
    onShown: async (instance: TippyInstanceWithCustoms) => {
      instance._isFullyShown = true;
      if (instance._geneData !== undefined) {
        renderVisualsAndNestedTippys(instance);
      }
    },
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
