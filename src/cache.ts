import type { MyGeneInfoResult } from './config';

const cache = new Map<string, MyGeneInfoResult | null>();

export const getCacheKey = (symbol: string, taxid: number): string => `${symbol}_${taxid}`;

export const has = (symbol: string, taxid: number): boolean => cache.has(getCacheKey(symbol, taxid));

export const get = (symbol: string, taxid: number): MyGeneInfoResult | null | undefined => cache.get(getCacheKey(symbol, taxid));

export const set = (symbol: string, taxid: number, data: MyGeneInfoResult | null): void => {
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
