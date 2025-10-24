import tippy from 'tippy.js';
import { type GeneTooltipConfig, mergeConfig, MyGeneInfoResult } from './config.js';
import { findGeneElements } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';
import { getIdeogram } from './ideogram.js';
import { getD3 } from './gene-track.js';
import { getEffectiveTheme, initializeThemeObserver } from './ui/theme.js';
import { 
  createOnShowHandler, 
  createOnShownHandler, 
  createOnHideHandler, 
  TippyInstanceWithCustoms 
} from './lifecycle.js';

// --- Map to track in-flight requests ---
const inFlightRequests = new Map<string, Promise<Map<string, MyGeneInfoResult>>>();
let isSummaryHandlerEnabled = false;

function init(userConfig: Partial<GeneTooltipConfig> = {}): () => void {
  const config = mergeConfig(userConfig);
  let instances: TippyInstanceWithCustoms[] = [];
  
  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) {
    return () => {}; // No elements found, return no-op cleanup
  }

  const effectiveTheme = getEffectiveTheme(config.theme);
  const isAutoTheme = config.theme === 'auto' || typeof config.theme === 'undefined';

  instances = tippy(geneElements, {
    ...config.tippyOptions,
    theme: effectiveTheme,
    maxWidth: config.tooltipWidth ?? config.tippyOptions.maxWidth,
    onShow: createOnShowHandler(config, inFlightRequests),
    onShown: createOnShownHandler(config),
    onHide: createOnHideHandler(),
  }) as TippyInstanceWithCustoms[];

  instances.forEach(instance => {
    instance._themeIntent = isAutoTheme ? 'auto' : config.theme;
  });

  const disconnectThemeObserver = initializeThemeObserver(instances, isAutoTheme);

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold, inFlightRequests);
  
  if (!isSummaryHandlerEnabled) {
    enableSummaryExpand();
    isSummaryHandlerEnabled = true;
  }

  // Return the master cleanup function
  return () => {
    instances.forEach(instance => {
      if (instance && instance.destroy) {
        instance.destroy();
      }
    });
    disconnectThemeObserver();
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
