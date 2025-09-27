import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchMyGeneBatch } from '../src/api';
import type { MyGeneInfoResult } from '../src/config';

type MyGeneNotFoundResult = {
  query: string;
  notfound: true;
};

// This is our "database" of all possible mock results
const allMockResults: (MyGeneInfoResult | MyGeneNotFoundResult)[] = [
  {
    _id: '7157',
    query: 'TP53',
    symbol: 'TP53',
    name: 'tumor protein p53',
    summary: 'This gene encodes a tumor suppressor protein...',
  },
  {
    _id: '1234',
    query: 'BRCA1',
    symbol: 'BRCA1',
    name: 'BRCA1 DNA repair associated',
    summary: 'This gene is implicated in breast cancer...',
  },
  {
    query: 'NOTAGENE',
    notfound: true,
  },
];

describe('fetchMyGeneBatch', () => {
  beforeEach(() => {
    // Silence console logs during tests for cleaner output
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Use mockImplementation to create a DYNAMIC mock
    vi.spyOn(global, 'fetch').mockImplementation(async (_url, options) => {
      // The request body is a string like "q=TP53,BRCA1&species=human..."
      const body = options?.body?.toString() || '';
      // Parse the body to find which genes were requested
      const requestedGenes = new URLSearchParams(body).get('q')?.split(',') || [];

      // Filter our "database" to return only the requested genes
      const filteredResponse = allMockResults.filter(item =>
        requestedGenes.includes(item.query)
      );

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(filteredResponse),
      } as Response);
    });
  });

  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  it('should fetch data for multiple genes and return a Map', async () => {
    const geneSymbols = ['TP53', 'BRCA1', 'NOTAGENE'];
    const species = 'human';
    const results = await fetchMyGeneBatch(geneSymbols, species);

    expect(results.size).toBe(2); // This will now pass correctly
    expect(results.has('TP53')).toBe(true);
    expect(results.get('TP53')?.symbol).toBe('TP53');
  });

  it('should correctly filter out genes that were not found', async () => {
    const geneSymbols = ['TP53', 'NOTAGENE'];
    const species = 'human';
    const results = await fetchMyGeneBatch(geneSymbols, species);

    // The dynamic mock only returns TP53 and NOTAGENE.
    // Your code filters out NOTAGENE, leaving a map of size 1.
    expect(results.size).toBe(1); // This now passes!
    expect(results.has('NOTAGENE')).toBe(false);
    expect(results.has('TP53')).toBe(true);
  });

  it('should return an empty map if the fetch request fails', async () => {
    // This test still works because it overrides the beforeEach mock
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const results = await fetchMyGeneBatch(['TP53'], 'human');
    expect(results.size).toBe(0);
  });

  it('should return an empty map if the fetch promise is rejected', async () => {
    // This test also works because it overrides the mock
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network failure'));

    const results = await fetchMyGeneBatch(['TP53'], 'human');
    expect(results.size).toBe(0);
  });

  it('should return an empty map if given an empty array of genes', async () => {
    const results = await fetchMyGeneBatch([], 'human');
    expect(global.fetch).not.toHaveBeenCalled();
    expect(results.size).toBe(0);
  });
});