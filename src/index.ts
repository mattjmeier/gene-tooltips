import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
import 'tippy.js/dist/tippy.css';

import { defaultConfig, type GeneTooltipConfig } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';

// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): void {
  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    // Deep merge the nested objects
    display: { ...defaultConfig.display, ...userConfig.display },
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
          display: config.display
      };

      const cachedData = cache.get(symbol, species);
      if (typeof cachedData !== 'undefined') {
        instance.setContent(renderTooltipHTML(cachedData, renderOptions));
        return;
      }

      fetchMyGeneBatch([symbol], species).then(resultsMap => {
        const data = resultsMap.get(symbol) || null; // Use null if not found
        cache.set(symbol, species, data);
        instance.setContent(renderTooltipHTML(data, renderOptions));
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