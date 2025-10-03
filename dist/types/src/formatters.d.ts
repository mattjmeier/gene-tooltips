import type { MyGenePathway, MyGeneInterproDomain, GeneRIF } from './config';
export declare function asArray<T>(data: T | T[] | undefined): T[];
export declare function getUniqueItems<T>(items: T[], key: keyof T): T[];
export type FormattedItem = {
    name: string;
    url: string;
};
export declare function formatPathways(pathways: MyGenePathway[] | MyGenePathway | undefined, source: 'reactome' | 'kegg' | 'wikipathways'): FormattedItem[];
export declare function formatDomains(domains: MyGeneInterproDomain[] | MyGeneInterproDomain | undefined): FormattedItem[];
export declare function formatTranscripts(transcripts: string[] | string | undefined): FormattedItem[];
export declare function formatStructures(pdbs: string[] | string | undefined): FormattedItem[];
export declare function formatGeneRIFs(generifs: GeneRIF[] | GeneRIF | undefined): FormattedItem[];
//# sourceMappingURL=formatters.d.ts.map