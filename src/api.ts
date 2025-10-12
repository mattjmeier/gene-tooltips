import type { MyGeneInfoResult } from './config';

/**
 * Fetches data for multiple genes in a single batch request from mygene.info.
 * @param geneSymbols - An array of gene symbols.
 * @param species - The species for all genes in this batch.
 * @returns A Map of gene symbols to data.
 */
export async function fetchMyGeneBatch(geneSymbols: string[], species: string): Promise<Map<string, MyGeneInfoResult>> {
  if (!geneSymbols || geneSymbols.length === 0) {
    return new Map();
  }

  const url = 'https://mygene.info/v3/query';
  const query = geneSymbols.join(',');
  
  // Explicitly list only the fields used by gene-tooltips.
  const fields = [
    '_id', 
    'query', 
    'symbol', 
    'name', 
    'summary', 
    'taxid', 
    'genomic_pos',
    'pathway',
    'interpro',
    'exons',
    'ensembl.gene',
    'ensembl.protein',
    'ensembl.transcript',
    'pdb',
    'generif',
    'wikipedia.url_stub'
  ].join(',');


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `q=${query}&species=${species}&scopes=symbol&fields=${fields}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results: (MyGeneInfoResult & { notfound?: boolean })[] = await response.json();
    const resultsMap = new Map<string, MyGeneInfoResult>();
    for (const item of results) {
      if (item.notfound) continue;
      resultsMap.set(item.query, item);
    }
    console.log(resultsMap);
    return resultsMap;

  } catch (error) {
    console.error('Batch fetch failed:', error);
    return new Map(); // Return empty map on failure
  }
}