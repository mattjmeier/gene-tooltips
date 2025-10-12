import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { getGeneInfoFromElement } from './parser.js';
import type { MyGeneInfoResult } from './config.js';

// The 'inFlightRequests' map is now a required parameter
function groupGenesByTaxid(
  elements: HTMLElement[],
  inFlightRequests: Map<string, Promise<any>>
): Map<number, Set<string>> {
  const genesByTaxid = new Map<number, Set<string>>();
  elements.forEach(el => {
    const info = getGeneInfoFromElement(el);
    if (!info) return;

    const cacheKey = cache.getCacheKey(info.symbol, info.taxid);
    // Check cache AND in-flight requests before adding to the group
    if (cache.has(info.symbol, info.taxid) || inFlightRequests.has(cacheKey)) {
      return;
    }

    if (!genesByTaxid.has(info.taxid)) {
      genesByTaxid.set(info.taxid, new Set());
    }
    genesByTaxid.get(info.taxid)!.add(info.symbol);
  });
  return genesByTaxid;
}

async function fetchAndCache(
  genesByTaxid: Map<number, Set<string>>,
  inFlightRequests: Map<string, Promise<Map<string, MyGeneInfoResult>>>
): Promise<void> {
  const fetchPromises = Array.from(genesByTaxid.entries()).map(([taxid, geneSet]) => {
    const symbols = Array.from(geneSet);
    const fetchPromise = fetchMyGeneBatch(symbols, String(taxid))
      .then(resultsMap => {
        cache.setBatch(resultsMap);
        return resultsMap;
      })
      .finally(() => {
        // Always clean up the in-flight map for this batch
        symbols.forEach(symbol => inFlightRequests.delete(cache.getCacheKey(symbol, taxid)));
      });

    // Add the single promise to the in-flight map for each gene in the batch
    symbols.forEach(symbol => {
      inFlightRequests.set(cache.getCacheKey(symbol, taxid), fetchPromise);
    });

    return fetchPromise;
  });
  await Promise.allSettled(fetchPromises);
}

function prefetchAll(elements: HTMLElement[], inFlightRequests: Map<string, Promise<any>>): void {
  // Pass the map to groupGenesByTaxid
  const genesByTaxid = groupGenesByTaxid(elements, inFlightRequests);
  if (genesByTaxid.size > 0) {
    fetchAndCache(genesByTaxid, inFlightRequests);
  }
}

function prefetchSmart(elements: HTMLElement[], inFlightRequests: Map<string, Promise<any>>): void {
  const fetchQueue = new Set<Element>();
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const processQueue = () => {
    if (fetchQueue.size === 0) return;
    // Pass the map to groupGenesByTaxid
    const genesByTaxid = groupGenesByTaxid(Array.from(fetchQueue) as HTMLElement[], inFlightRequests);
    if (genesByTaxid.size > 0) {
      fetchAndCache(genesByTaxid, inFlightRequests);
    }
    fetchQueue.clear();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchQueue.add(entry.target);
        obs.unobserve(entry.target);
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(processQueue, 200);
      }
    });
  }, { rootMargin: "200px" });

  elements.forEach(el => observer.observe(el));
}

export function runPrefetch(
  strategy: 'smart' | 'all' | 'none',
  elements: HTMLElement[],
  threshold: number,
  inFlightRequests: Map<string, Promise<any>>
): void {
  const geneCount = elements.length;
  if (strategy === 'none') return;

  const shouldPrefetchAll = strategy === 'all' || (strategy === 'smart' && geneCount <= threshold);

  if (shouldPrefetchAll) {
    prefetchAll(elements, inFlightRequests);
  } else if (strategy === 'smart' && geneCount > threshold) {
    prefetchSmart(elements, inFlightRequests);
  }
}