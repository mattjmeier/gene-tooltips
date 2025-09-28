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
//# sourceMappingURL=constants.d.ts.map