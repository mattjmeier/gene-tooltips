import { describe, it, expect } from 'vitest';
import * as cache from '../src/cache';
import type { MyGeneInfoResult } from '../src/config';

const mockGeneData: MyGeneInfoResult = {
  _id: '7157',
  query: 'TP53',
  symbol: 'TP53',
  name: 'tumor protein p53',
  summary: 'A summary.'
};

describe('cache', () => {
  
  // The cache is a module-level variable, so we can't easily reset it.
  // A better design might be a class, but for now, we'll test its stateful nature.
  // Let's create a "clear" function for testing if it becomes necessary.

  it('should initially not have a key', () => {
    expect(cache.has('MYC', 'human')).toBe(false);
  });

  it('should set and get a value', () => {
    cache.set('TP53', 'human', mockGeneData);
    expect(cache.has('TP53', 'human')).toBe(true);
    const retrieved = cache.get('TP53', 'human');
    expect(retrieved).toEqual(mockGeneData);
  });
  
  it('should be able to cache a "not found" result as null', () => {
    cache.set('NOTAGENE', 'human', null);
    expect(cache.has('NOTAGENE', 'human')).toBe(true);
    const retrieved = cache.get('NOTAGENE', 'human');
    expect(retrieved).toBeNull();
  });

  it('should handle different species for the same gene symbol', () => {
    cache.set('Trp53', 'mouse', mockGeneData); // mouse version
    expect(cache.has('TP53', 'human')).toBe(true); // From previous test
    expect(cache.has('Trp53', 'mouse')).toBe(true);
    expect(cache.get('TP53', 'human')).not.toEqual(cache.get('NOTAGENE', 'human'));
  });

  it('setBatch should add multiple items to the cache', () => {
    const resultsMap = new Map<string, MyGeneInfoResult>();
    resultsMap.set('BRCA1', { ...mockGeneData, symbol: 'BRCA1' });
    resultsMap.set('BRCA2', { ...mockGeneData, symbol: 'BRCA2' });

    cache.setBatch(resultsMap, 'human');

    expect(cache.has('BRCA1', 'human')).toBe(true);
    expect(cache.has('BRCA2', 'human')).toBe(true);
    expect(cache.get('BRCA1', 'human')?.symbol).toBe('BRCA1');
  });
});