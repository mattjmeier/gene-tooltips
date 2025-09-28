import type { Props } from 'tippy.js';
export interface GenomicPosition {
    chr: string;
    start: number;
    end: number;
    strand: number;
}
export interface MyGeneInfoResult {
    _id: string;
    query: string;
    symbol: string;
    name: string;
    summary?: string;
    taxid: number;
    genomic_pos?: GenomicPosition | GenomicPosition[];
}
export interface TooltipDisplayConfig {
    species: boolean;
    location: boolean;
    ideogram: boolean;
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
}
export declare const defaultConfig: GeneTooltipConfig;
//# sourceMappingURL=config.d.ts.map