import type { MyGeneInfoResult } from './config';

const cache = new Map<string, MyGeneInfoResult | null>();

export const getCacheKey = (symbol: string, taxid: number): string => `${symbol}_${taxid}`;

export const has = (symbol: string, taxid: number): boolean => cache.has(getCacheKey(symbol, taxid));

export const get = (symbol: string, taxid: number): MyGeneInfoResult | null | undefined => cache.get(getCacheKey(symbol, taxid));

const MAX_CACHE_SIZE = 500;

export const set = (symbol: string, taxid: number, data: MyGeneInfoResult | null): void => {
  if (cache.size >= MAX_CACHE_SIZE) {
    // Evict the oldest entry
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  }
  cache.set(getCacheKey(symbol, taxid), data);
};

export const setBatch = (resultsMap: Map<string, MyGeneInfoResult>): void => {
  resultsMap.forEach((data, symbol) => {
    // The taxid is consistent in all results from a batch call
    if (data.taxid) { 
        set(symbol, data.taxid, data);
    }
  });
};