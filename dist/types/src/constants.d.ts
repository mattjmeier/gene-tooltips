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
    ideogramName?: string;
}
export declare const speciesMap: Record<number, SpeciesInfo>;
/**
 * Finds species data by either taxid or common name (case-insensitive).
 * @param identifier - The taxid (number) or common name (string).
 * @returns An object with the taxid and the SpeciesInfo, or null if not found.
 */
export declare function findSpecies(identifier: string | number | undefined): {
    taxid: number;
    info: SpeciesInfo;
} | null;
export {};
//# sourceMappingURL=constants.d.ts.map