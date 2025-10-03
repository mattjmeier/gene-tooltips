import type { MyGeneInfoResult, TooltipDisplayConfig } from './config';
interface RenderOptions {
    truncate?: number;
    display?: Partial<TooltipDisplayConfig>;
    pathwaySource?: 'reactome' | 'kegg' | 'wikipathways';
    pathwayCount?: number;
    domainCount?: number;
    transcriptCount?: number;
    structureCount?: number;
    generifCount?: number;
    tooltipWidth?: number;
    tooltipHeight?: number;
}
export declare function renderTooltipHTML(data: MyGeneInfoResult | null | undefined, options?: RenderOptions): string;
export {};
//# sourceMappingURL=renderer.d.ts.map