import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
import 'tippy.js/dist/tippy.css';

import { defaultConfig, type GeneTooltipConfig } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';
import { renderIdeogram } from './ideogram.js'; 
// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): void {
  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    display: { ...defaultConfig.display, ...userConfig.display },
    ideogram: { ...defaultConfig.ideogram, ...userConfig.ideogram },
    tippyOptions: { ...defaultConfig.tippyOptions, ...userConfig.tippyOptions },
  };


  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) return;

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold);

  tippy(geneElements, {
    ...config.tippyOptions,
    content: 'Loading...',
    onShow(instance: Instance) {
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) {
        instance.setContent('Invalid gene element');
        return;
      }

      const { symbol, species } = info;
      const renderOptions = {
        truncate: config.truncateSummary,
        display: {
          ...config.display,
          ideogram: config.ideogram?.enabled ?? false
        }
      };

      const cachedData = cache.get(symbol, species);
      if (typeof cachedData !== 'undefined') {
        instance.setContent(renderTooltipHTML(cachedData, renderOptions));
        
        // Also handle ideogram for cached data
        if (config.ideogram?.enabled && cachedData?.genomic_pos) {
          // Use setTimeout to wait for the DOM to update
          setTimeout(() => {
            renderIdeogram(instance, cachedData, config.ideogram);
          }, 0);
        }
        return;
      }

      fetchMyGeneBatch([symbol], species).then(resultsMap => {
        const data = resultsMap.get(symbol) || null;
        cache.set(symbol, species, data);
        instance.setContent(renderTooltipHTML(data, renderOptions));

        // Handle ideogram rendering
        if (config.ideogram?.enabled && data?.genomic_pos) {
          // Use setTimeout to wait for the DOM to update
          setTimeout(() => {
            renderIdeogram(instance, data, config.ideogram);
          }, 0);
        }
      }).catch(error => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        instance.setContent('Error loading data.');
      });
    }
  });
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