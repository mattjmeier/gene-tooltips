/**
 * Defines the structure for gene information extracted from an element.
 */
export interface GeneInfo {
    symbol: string;
    taxid: number;
}
/**
 * Finds all elements matching the selector and expands gene lists.
 * @param selector - The CSS selector for gene elements.
 * @returns An array of elements to attach tooltips to.
 */
export declare function findGeneElements(selector: string): HTMLElement[];
/**
 * Extracts gene information from a DOM element.
 * @param el - The DOM element.
 * @returns An object with symbol and taxid, or null.
 */
export declare function getGeneInfoFromElement(el: HTMLElement): GeneInfo | null;
//# sourceMappingURL=parser.d.ts.map