/**
 * External gene reference sources.
 * Each source can build its URL from an ID or symbol.
 */
export declare const SOURCES: ({
    key: string;
    name: string;
    url: (id: string) => string;
    requires: "id";
} | {
    key: string;
    name: string;
    url: (symbol: string) => string;
    requires: "symbol";
})[];
interface SpeciesInfo {
    common: string;
    genus: string;
    icon: string;
}
export declare const speciesMap: Record<number, SpeciesInfo>;
export {};
//# sourceMappingURL=constants.d.ts.map