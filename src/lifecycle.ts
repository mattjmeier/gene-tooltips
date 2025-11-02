import { type Instance, Props } from 'tippy.js';
import { type GeneTooltipConfig, MyGeneInfoResult } from './config.js';
import TomSelect from 'tom-select'; 
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { getGeneInfoFromElement } from './parser.js';
import { generateUniqueTooltipId, createNestedContent } from './utils.js';
import { renderIdeogram } from './ideogram.js';
import { renderGeneTrack } from './gene-track.js';
import { formatPathways, formatDomains, formatTranscripts, formatStructures, formatGeneRIFs } from './formatters.js';
import tippy from 'tippy.js';

export interface TippyInstanceWithCustoms extends Instance {
  _nestedTippys?: Instance[];
  _geneData?: MyGeneInfoResult | null;
  _isFetching?: boolean;
  _uniqueId?: string;
  _themeIntent?: 'auto' | string;
  _isChildTippyVisible?: boolean;
  _isFullyShown?: boolean;
  _tomselect?: TomSelect | null;
  _sectionToggleHandler?: (event: Event) => void;
  _sectionKeydownHandler?: (event: KeyboardEvent) => void;
  _visualsRendered?: boolean;
}

/**
 * Handles rendering visualizations (Ideogram, Gene Track) and initializing
 * all nested tooltips after the main tooltip is shown and has data.
 */
async function renderVisualsAndNestedTippys(instance: TippyInstanceWithCustoms, config: GeneTooltipConfig) {
    try {
        const data = instance._geneData;
        if (!data || !instance._uniqueId) return;

        // Create promises for both rendering tasks
        const renderPromises = [];
        const locationSection = instance.popper.querySelector('[data-section="location"]');
        const isLocationCollapsed = locationSection?.getAttribute('data-collapsed') === 'true';
        
        const geneModelSection = instance.popper.querySelector('[data-section="gene-model"]');
        const isGeneModelCollapsed = geneModelSection?.getAttribute('data-collapsed') === 'true';
        
        if (config.display.geneTrack && data.exons && !isGeneModelCollapsed) {
          renderPromises.push(renderGeneTrack(instance, data, instance._uniqueId));
        }
        
        if (config.ideogram?.enabled && data.genomic_pos && !isLocationCollapsed) {
          renderPromises.push(renderIdeogram(instance, data, config.ideogram, instance._uniqueId));
        }

        await Promise.allSettled(renderPromises);

        if (!instance.state.isShown) {
          return;
        }
        // Mark that we've attempted to render (even if sections were collapsed)
        instance._visualsRendered = true;

        // --- All the nested tippy logic from your onShown goes here ---
        instance._nestedTippys = [];
        const baseNestedOptions = { ...config.nestedTippyOptions };

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const defaultPlacement = isMobile ? 'bottom' : 'right';

        const finalNestedTippyOptions: Partial<Props> = {
          ...baseNestedOptions, // User options are the base
          placement: baseNestedOptions.placement ?? defaultPlacement,

          // --- Required/Dynamic Properties (cannot be overridden) ---
          appendTo: instance.popper,
          popperOptions: config.tippyOptions.popperOptions, // Inherit from parent
          zIndex: (config.tippyOptions.zIndex || 9999) + 1,

          // --- Safe Callback Handling ---
          onShow(childInstance: Instance) {
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


/**
 * Creates the onShow callback for the main tippy instance.
 * This handles data fetching, caching, and initial content rendering.
 */
export function createOnShowHandler(
  config: GeneTooltipConfig, 
  inFlightRequests: Map<string, Promise<Map<string, MyGeneInfoResult>>>
) {
  return function onShow(instance: TippyInstanceWithCustoms) {
    instance._isFullyShown = false; // Reset the flag
    
    // Viewport constraint logic
    constrainTooltipHeight(instance, config);

    // Add a resize listener to handle orientation changes or virtual keyboard
    const resizeHandler = () => constrainTooltipHeight(instance, config);
    (instance as any)._visualViewportResizeHandler = resizeHandler;

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', resizeHandler);
    } else {
      window.addEventListener('resize', resizeHandler); // Fallback for older browsers
    }

    // Async data fetching logic
    (async () => {
        if (!instance._uniqueId) {
          instance._uniqueId = generateUniqueTooltipId();
        }
        if (instance._geneData !== undefined) return;

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
  };
}

/**
 * Creates the onShown callback. This is triggered after the tooltip is fully visible.
 */
export function createOnShownHandler(config: GeneTooltipConfig) {
  return function onShown(instance: TippyInstanceWithCustoms) {
    instance._isFullyShown = true;
    // If data is already present, trigger the async rendering.
    // This handles cases where data was fetched quickly before the animation finished.
    if (instance._geneData !== undefined) {
      renderVisualsAndNestedTippys(instance, config);
    }
    if (config.display.collapsible) {
      const popper = instance.popper; // This is the tooltip element

      // Define one handler for both click and keydown
      instance._sectionToggleHandler = (event: Event) => {
        const target = event.target as HTMLElement;
        const header = target.closest<HTMLElement>(".gt-collapsible-header");
        if (!header) return;

        if (event.type === 'keydown') {
          event.preventDefault();
        }

        const section = header.closest(".gene-tooltip-section-container");
        if (!section) return;

        const isCollapsed = section.getAttribute('data-collapsed') === 'true';
        const newCollapsedState = !isCollapsed;

        section.setAttribute('data-collapsed', String(newCollapsedState));
        header.setAttribute('aria-expanded', String(!newCollapsedState));

        const arrow = header.querySelector('.gt-section-arrow');
        if (arrow) {
          arrow.classList.toggle('collapsed', newCollapsedState);
        }

        // NEW: Trigger visualization rendering when expanding specific sections
        if (!newCollapsedState && instance._geneData) { // Expanding and data is available
          const sectionName = section.getAttribute('data-section');
          
          if (sectionName === 'location' && config.ideogram?.enabled && instance._geneData.genomic_pos) {
            renderIdeogram(instance, instance._geneData, config.ideogram, instance._uniqueId!);
          }
          
          if (sectionName === 'gene-model' && config.display.geneTrack && instance._geneData.exons) {
            renderGeneTrack(instance, instance._geneData, instance._uniqueId!);
          }
        }
      };

      // 2. The keydown wrapper
      instance._sectionKeydownHandler = (e: KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && instance._sectionToggleHandler) {
          // Forward the event to the main handler
          instance._sectionToggleHandler(e);
        }
      };

      // --- Attach the stored handlers ---
      popper.addEventListener('click', instance._sectionToggleHandler);
      popper.addEventListener('keydown', instance._sectionKeydownHandler);
    }
  };
}

/**
 * Creates the onHide callback.
 */
export function createOnHideHandler() {
  return function onHide(instance: TippyInstanceWithCustoms) {
    instance._isFullyShown = false; // Reset flag
    
    // If a child tippy is visible, prevent the parent from hiding.
    if (instance._isChildTippyVisible) {
      return false;
    }

    // maybe we should add considerations in onHide for ideogram and d3 too??
    if (instance._tomselect) {
      instance._tomselect.destroy();
      instance._tomselect = null; 
    }

    if (instance._sectionToggleHandler) {
      instance.popper.removeEventListener('click', instance._sectionToggleHandler);
      instance._sectionToggleHandler = undefined; 
    }
    
    if (instance._sectionKeydownHandler) {
      instance.popper.removeEventListener('keydown', instance._sectionKeydownHandler);
      instance._sectionKeydownHandler = undefined;
    }
    
    // Cleanup viewport resize handler
    const resizeHandler = (instance as any)._visualViewportResizeHandler;
    if (resizeHandler) {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', resizeHandler);
      } else {
        window.removeEventListener('resize', resizeHandler);
      }
      delete (instance as any)._visualViewportResizeHandler;
    }
    
    // Destroy nested tippys
    if (instance._nestedTippys) {
      instance._nestedTippys.forEach(nested => nested.destroy());
      instance._nestedTippys = [];
    }
  };
}

/**
 * Calculates and applies the max-height to a tippy instance's content
 * to ensure it doesn't overflow the visual viewport.
 */
function constrainTooltipHeight(instance: TippyInstanceWithCustoms, config: GeneTooltipConfig) {
  if (!config.constrainToViewport) return;

  const content = instance.popper.querySelector('.tippy-content');
  if (!content) return;

  // Use the padding value from your popperOptions for accurate calculation
  const padding = config.tippyOptions?.popperOptions?.modifiers?.find(
    m => m.name === 'preventOverflow'
  )?.options?.padding ?? 8;

  // visualViewport is more accurate on mobile than window.innerHeight
  const availableHeight = window.visualViewport?.height || window.innerHeight;
  
  (content as HTMLElement).style.maxHeight = `${availableHeight - (padding * 2)}px`;
}