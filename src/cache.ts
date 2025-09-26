import type { MyGeneInfoResult } from './config';

const cache = new Map<string, MyGeneInfoResult | null>();

export const getCacheKey = (symbol: string, species: string): string => `${symbol}_${species}`;

export const has = (symbol: string, species: string): boolean => cache.has(getCacheKey(symbol, species));

export const get = (symbol: string, species: string): MyGeneInfoResult | null | undefined => cache.get(getCacheKey(symbol, species));

export const set = (symbol: string, species: string, data: MyGeneInfoResult | null): void => {
  cache.set(getCacheKey(symbol, species), data);
};

export const setBatch = (resultsMap: Map<string, MyGeneInfoResult>, species: string): void => {
  resultsMap.forEach((data, symbol) => {
    set(symbol, species, data);
  });
};