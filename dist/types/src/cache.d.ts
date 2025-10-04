import type { MyGeneInfoResult } from './config';
export declare const getCacheKey: (symbol: string, taxid: number) => string;
export declare const has: (symbol: string, taxid: number) => boolean;
export declare const get: (symbol: string, taxid: number) => MyGeneInfoResult | null | undefined;
export declare const set: (symbol: string, taxid: number, data: MyGeneInfoResult | null) => void;
export declare const setBatch: (resultsMap: Map<string, MyGeneInfoResult>) => void;
//# sourceMappingURL=cache.d.ts.map