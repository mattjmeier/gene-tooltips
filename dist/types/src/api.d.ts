import type { MyGeneInfoResult } from './config';
/**
 * Fetches data for multiple genes in a single batch request from mygene.info.
 * @param geneSymbols - An array of gene symbols.
 * @param species - The species for all genes in this batch.
 * @returns A Map of gene symbols to data.
 */
export declare function fetchMyGeneBatch(geneSymbols: string[], species: string): Promise<Map<string, MyGeneInfoResult>>;
//# sourceMappingURL=api.d.ts.map