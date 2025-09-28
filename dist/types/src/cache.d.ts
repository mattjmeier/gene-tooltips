import type { MyGeneInfoResult } from './config';
export declare const getCacheKey: (symbol: string, species: string) => string;
export declare const has: (symbol: string, species: string) => boolean;
export declare const get: (symbol: string, species: string) => MyGeneInfoResult | null | undefined;
export declare const set: (symbol: string, species: string, data: MyGeneInfoResult | null) => void;
export declare const setBatch: (resultsMap: Map<string, MyGeneInfoResult>, species: string) => void;
//# sourceMappingURL=cache.d.ts.map