import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
import { defaultConfig, type GeneTooltipConfig } from './config.js';
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

function setGlobalTippyTheme(theme: string): void {
  allTippyInstances.forEach(instance => {
    if (instance.props.theme !== theme) {
      instance.setProps({ theme });
    }
  });
}

// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): void {
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

  if (config.theme === 'auto' || typeof config.theme === 'undefined') {
    const isDark = document.documentElement.classList.contains('dark');
    // Set the initial theme for Tippy.js
    config.theme = isDark ? 'dark' : 'light'; 

    const observer = new MutationObserver(() => {
        const isNowDark = document.documentElement.classList.contains('dark');
        setGlobalTippyTheme(isNowDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) return;

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold);

  interface TippyInstanceWithCustoms extends Instance {
    _nestedTippys?: Instance[];
  }

  const instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: config.theme, // Use top-level theme
    content: 'Loading...',
    onShow(instance: Instance) {
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) {
        instance.setContent('Invalid gene element');
        return;
      }

      const { symbol, taxid } = info; // <-- Use taxid now

      const renderOptions = {
        truncate: config.truncateSummary,
        display: config.display,
        pathwaySource: config.pathwaySource,
        pathwayCount: config.pathwayCount,
        domainCount: config.domainCount,
        transcriptCount: config.transcriptCount,
        structureCount: config.structureCount,
        generifCount: config.generifCount,
        tooltipWidth: config.tooltipWidth,
        tooltipHeight: config.tooltipHeight,
      };

      const cachedData = cache.get(symbol, taxid); // <-- Use taxid
      if (typeof cachedData !== 'undefined') {

        instance.setContent(renderTooltipHTML(cachedData, renderOptions));
        
        if (config.ideogram?.enabled && cachedData?.genomic_pos) {
          setTimeout(() => {
            renderIdeogram(instance, cachedData, config.ideogram);
          }, 0);
        }
        return;
      }

      fetchMyGeneBatch([symbol], String(taxid)).then(resultsMap => {
        const data = resultsMap.get(symbol) || null;
        cache.set(symbol, taxid, data);
        instance.setContent(renderTooltipHTML(data, renderOptions));

        if (config.ideogram?.enabled && data?.genomic_pos) {
          setTimeout(() => {
            renderIdeogram(instance, data, config.ideogram);
          }, 0);
        }
      }).catch(error => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        instance.setContent('Error loading data.');
      });
    },
    onMount(instance: TippyInstanceWithCustoms) {
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) return;

      const data = cache.get(info.symbol, info.taxid);
      if (!data) return;

      if (config.display.geneTrack && data.exons) {
          renderGeneTrack(instance, data);
      }

      instance._nestedTippys = [];

      // Helper for creating nested tooltips
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
  });
    if (Array.isArray(instances)) {
    allTippyInstances.push(...instances);
  } else if (instances) {
    allTippyInstances.push(instances);
  }
  enableSummaryExpand();
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