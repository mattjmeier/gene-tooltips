import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
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

// Helper function to create content for the nested tooltip
function createNestedContent(items: { name: string; url: string }[]): string {
  const listItems = items
    .map(item => `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>`)
    .join('');
  return `<ul class="gene-tooltip-nested-list">${listItems}</ul>`;
}

let allTippyInstances: Instance[] = [];
let themeObserver: MutationObserver | null = null;
let isSummaryHandlerEnabled = false;

function setGlobalTippyTheme(theme: string): void {
  allTippyInstances.forEach(instance => {
    if (instance.props.theme !== theme) {
      instance.setProps({ theme });
    }
  });
}

// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): () => void { 
  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    display: {
      ...defaultConfig.display,
      ...userConfig.display,
      links: {
        ...defaultConfig.display.links,
        ...userConfig.display?.links,
      },
    },
    ideogram: { ...defaultConfig.ideogram, ...userConfig.ideogram },
    tippyOptions: { ...defaultConfig.tippyOptions, ...userConfig.tippyOptions },
  };

  let effectiveTheme: string;

  // Handle "auto" theme logic
  if (config.theme === 'auto' || typeof config.theme === 'undefined') {
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
    // Use explicit user theme
    effectiveTheme = config.theme;
  }

  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) {
    // Return a no-op cleanup function if nothing was initialized
    return () => {};
  }

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold);

  interface TippyInstanceWithCustoms extends Instance {
    _nestedTippys?: Instance[];
    _geneData?: MyGeneInfoResult | null;
    _isFetching?: boolean;
  }

  const instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: effectiveTheme, // Use top-level theme
    maxWidth: config.tooltipWidth ?? config.tippyOptions.maxWidth,
    // content: 'Loading...',
    onShow(instance: TippyInstanceWithCustoms) {
      // If we already have data or are fetching, do nothing.
      if (instance._geneData !== undefined || instance._isFetching === true) {
        return;
      }

      instance._isFetching = true;
      instance.setContent('Loading...');

      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) {
        instance.setContent('Invalid gene element');
        instance._isFetching = false; // Reset state
        return;
      }

      const { symbol, taxid } = info;
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
      };
      
      const renderContent = (data: MyGeneInfoResult | null) => {
        instance._geneData = data;
        instance.setContent(renderTooltipHTML(data, renderOptions));
        instance._isFetching = false;
      };

      const cachedData = cache.get(symbol, taxid);
      if (typeof cachedData !== 'undefined') {
        renderContent(cachedData); // Handle cached data
        return;
      }

      fetchMyGeneBatch([symbol], String(taxid)) // Handle fetched data
        .then(resultsMap => {
          const data = resultsMap.get(symbol) || null;
          cache.set(symbol, taxid, data);
          renderContent(data);
        })
        .catch(error => {
            console.error(`Failed to fetch data for ${symbol}`, error);
            instance.setContent('Error loading data.');
        });
    },

    onMount(instance: TippyInstanceWithCustoms) {
      const data = instance._geneData; 
      if (!data) return;

      if (config.display.geneTrack && data.exons) {
        renderGeneTrack(instance, data);
      }
      
      if (config.ideogram?.enabled && data.genomic_pos) {
        // This now runs safely after the main content is final.
        renderIdeogram(instance, data, config.ideogram);
      }
      
      // Your nested tippy logic can remain as is.
      instance._nestedTippys = [];

    // The createNestedTippy helper will also work correctly as it uses 'data'
    const createNestedTippy = (selector: string, items: { name: string; url: string }[]) => {
        const button = instance.popper.querySelector<HTMLElement>(selector);
        if (button && items.length > 0) {
            const parentInstance = instance; // Keep a reference to the parent
            const nestedInstance = tippy(button, {
                content: createNestedContent(items),
                allowHTML: true,
                interactive: true,
                trigger: 'mouseenter focus',
                placement: 'right',
                // Don't set the theme on creation
                onShow(childInstance) {
                    // Set the theme dynamically based on the parent's current theme
                    const currentParentTheme = (parentInstance.props as any).theme || 'auto';
                    childInstance.setProps({ theme: currentParentTheme });
                }
            });
            instance._nestedTippys?.push(nestedInstance);
        }
      };

      const pathwayItems = formatPathways(data.pathway?.[config.pathwaySource], config.pathwaySource);
      createNestedTippy(`#pathways-more-${data._id}`, pathwayItems);

      const domainItems = formatDomains(data.interpro);
      createNestedTippy(`#domains-more-${data._id}`, domainItems);

      const transcriptItems = formatTranscripts(data.ensembl?.transcript);
      createNestedTippy(`#transcripts-more-${data._id}`, transcriptItems);

      const structureItems = formatStructures(data.pdb);
      createNestedTippy(`#structures-more-${data._id}`, structureItems);
      
      const generifItems = formatGeneRIFs(data.generif);
      createNestedTippy(`#generifs-more-${data._id}`, generifItems);

    },
    onHidden(instance: TippyInstanceWithCustoms) {
      if (instance._nestedTippys) {
        instance._nestedTippys.forEach(nested => nested.destroy());
        instance._nestedTippys = [];
      }
    }
  }) as Instance[];
  
  // Add the new instances to the global list
  allTippyInstances.push(...instances);
  
  // Only attach the event listener ONCE for the entire page.
  if (!isSummaryHandlerEnabled) {
    enableSummaryExpand();
    isSummaryHandlerEnabled = true;
  }

  // --- Cleanup function ---
  return () => {
    // 1. Destroy the tippy instances created in *this* call
    instances.forEach(instance => {
      if (instance && instance.destroy) {
        instance.destroy();
      }
    });

    // 2. Remove them from the global array
    allTippyInstances = allTippyInstances.filter(i => !instances.includes(i));
    
    // Optional: If no tooltips are left on the page, disconnect the observer
    if (allTippyInstances.length === 0 && themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
  };
}

export default {
  init,
};

// This is needed for the UMD build's global variable
declare global {
  interface Window {
    GeneTooltip: {
      init: (userConfig?: Partial<GeneTooltipConfig>) => void;
    };
  }
}