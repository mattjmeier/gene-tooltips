import { findSpecies } from './constants'; 

/**
 * Defines the structure for gene information extracted from an element.
 */
export interface GeneInfo {
  symbol: string;
  taxid: number; // Changed from species: string to taxid: number
}


/**
 * Finds all elements matching the selector and expands gene lists.
 * @param selector - The CSS selector for gene elements.
 * @returns An array of elements to attach tooltips to.
 */
export function findGeneElements(selector: string): HTMLElement[] {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const finalElements: HTMLElement[] = [];
    const listDelimiterRegex = /[,\s;]+/;

    elements.forEach(el => {
        const textContent = el.textContent || '';
        const geneSymbols = textContent.trim().split(listDelimiterRegex).filter(Boolean);

        if (geneSymbols.length > 1) {
            const species = el.dataset.species;
            if (!species) {
                console.warn('Gene list container found without a data-species attribute. Skipping.', el);
                return;
            }

            el.innerHTML = ''; // Clear the original container

            geneSymbols.forEach((symbol, index) => {
                const newSpan = document.createElement('span');
                newSpan.textContent = symbol;
                newSpan.dataset.species = species;

                const className = selector.startsWith('.') ? selector.substring(1) : selector;
                newSpan.classList.add(className);

                el.appendChild(newSpan);
                finalElements.push(newSpan);

                if (index < geneSymbols.length - 1) {
                    el.appendChild(document.createTextNode(', '));
                }
            });
        } else if (geneSymbols.length === 1) {
            el.textContent = geneSymbols[0];
            finalElements.push(el);
        }
    });

    return finalElements;
}

/**
 * Extracts gene information from a DOM element.
 * @param el - The DOM element.
 * @returns An object with symbol and taxid, or null.
 */
export function getGeneInfoFromElement(el: HTMLElement): GeneInfo | null {
    const symbol = el.textContent?.trim();
    const speciesIdentifier = el.dataset.species;

    if (!symbol || !speciesIdentifier) {
        return null;
    }

    const speciesData = findSpecies(speciesIdentifier);
    if (!speciesData) {
        console.warn(`[GeneTooltip] Unknown species identifier: "${speciesIdentifier}"`, el);
        return null;
    }
    
    return { symbol, taxid: speciesData.taxid };
}