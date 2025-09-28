import type { MyGeneInfoResult, TooltipDisplayConfig } from './config';
interface RenderOptions {
    sources?: string[];
    truncate?: number;
    display?: Partial<TooltipDisplayConfig>;
}
export declare function renderTooltipHTML(data: MyGeneInfoResult | null | undefined, options?: RenderOptions): string;
export {};
//# sourceMappingURL=renderer.d.ts.map