import { describe, it, expect } from 'vitest';
import * as cache from '../src/cache';
import type { MyGeneInfoResult } from '../src/config';

const mockGeneData: MyGeneInfoResult = {
  _id: '7157',
  query: 'TP53',
  symbol: 'TP53',
  name: 'tumor protein p53',
  summary: 'A summary.',
  taxid: 9606
};

describe('cache', () => {
  
  it('should initially not have a key', () => {
    expect(cache.has('MYC', 9606)).toBe(false);
  });

  it('should set and get a value', () => {
    cache.set('TP53', 9606, mockGeneData);
    expect(cache.has('TP53', 9606)).toBe(true);
    const retrieved = cache.get('TP53', 9606);
    expect(retrieved).toEqual(mockGeneData);
  });
  
  it('should be able to cache a "not found" result as null', () => {
    cache.set('NOTAGENE', 9606, null);
    expect(cache.has('NOTAGENE', 9606)).toBe(true);
    const retrieved = cache.get('NOTAGENE', 9606);
    expect(retrieved).toBeNull();
  });

  it('should handle different species for the same gene symbol', () => {
    cache.set('Trp53', 10090, mockGeneData); // mouse version
    expect(cache.has('TP53', 9606)).toBe(true); // From previous test
    expect(cache.has('Trp53', 10090)).toBe(true);
    expect(cache.get('TP53', 9606)).not.toEqual(cache.get('NOTAGENE', 9606));
  });

  it('setBatch should add multiple items to the cache', () => {
    const resultsMap = new Map<string, MyGeneInfoResult>();
    // Make sure test data has the taxid
    resultsMap.set('BRCA1', { ...mockGeneData, symbol: 'BRCA1', taxid: 9606 });
    resultsMap.set('BRCA2', { ...mockGeneData, symbol: 'BRCA2', taxid: 9606 });

    cache.setBatch(resultsMap);

    expect(cache.has('BRCA1', 9606)).toBe(true);
    expect(cache.has('BRCA2', 9606)).toBe(true);
    expect(cache.get('BRCA1', 9606)?.symbol).toBe('BRCA1');
  });
});