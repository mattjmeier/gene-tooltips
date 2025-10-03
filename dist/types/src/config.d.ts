import type { Props } from 'tippy.js';
export interface GenomicPosition {
    chr: string;
    start: number;
    end: number;
    strand: number;
}
export interface MyGenePathway {
    name: string;
    id: string;
}
export interface MyGeneInterproDomain {
    desc: string;
    id: string;
    short_desc: string;
}
export interface GeneRIF {
    pubmed: number;
    text: string;
}
export interface MyGeneInfoResult {
    _id: string;
    query: string;
    symbol: string;
    name: string;
    summary?: string;
    taxid: number;
    genomic_pos?: GenomicPosition | GenomicPosition[];
    pathway?: {
        reactome?: MyGenePathway[] | MyGenePathway;
        kegg?: MyGenePathway[] | MyGenePathway;
        wikipathways?: MyGenePathway[] | MyGenePathway;
    };
    interpro?: MyGeneInterproDomain[] | MyGeneInterproDomain;
    exons?: MyGeneExon[];
    ensembl?: {
        gene: string;
        protein?: string[] | string;
        transcript?: string[] | string;
    };
    pdb?: string[] | string;
    generif?: GeneRIF[] | GeneRIF;
}
export interface TooltipDisplayConfig {
    species: boolean;
    location: boolean;
    ideogram: boolean;
    pathways: boolean;
    domains: boolean;
    geneTrack: boolean;
    transcripts: boolean;
    structures: boolean;
    generifs: boolean;
    links: {
        ncbi?: boolean;
        ensembl?: boolean;
    };
}
export interface IdeogramConfig {
    enabled: boolean;
    width: number;
    height: number;
    showLabels: boolean;
}
export interface GeneTooltipConfig {
    selector: string;
    api: 'mygene';
    prefetch: 'smart' | 'all' | 'none';
    prefetchThreshold: number;
    truncateSummary: number;
    display: Partial<TooltipDisplayConfig>;
    ideogram: Partial<IdeogramConfig>;
    tippyOptions: Partial<Props>;
    pathwaySource: 'reactome' | 'kegg' | 'wikipathways';
    pathwayCount: number;
    domainCount: number;
    transcriptCount: number;
    structureCount: number;
    generifCount: number;
    tooltipWidth?: number;
    tooltipHeight?: number;
}
export interface MyGeneExon {
    cdsend: number;
    cdsstart: number;
    chr: string;
    strand: number;
    txend: number;
    txstart: number;
    position?: [number, number][];
    start?: number;
    end?: number;
}
export declare const defaultConfig: GeneTooltipConfig;
//# sourceMappingURL=config.d.ts.map