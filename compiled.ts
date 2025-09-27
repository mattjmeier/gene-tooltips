]633;E;for i in $(ls ./src/*.ts)\x3b do echo $i\x3b cat $i\x3b done > compiled.ts;4fc3ae08-fc06-4e8a-b0a4-b34ac9a82a48]633;C./src/api.ts
import type { MyGeneInfoResult } from './config';

/**
 * Fetches data for multiple genes in a single batch request from mygene.info.
 * @param geneSymbols - An array of gene symbols.
 * @param species - The species for all genes in this batch.
 * @returns A Map of gene symbols to data.
 */
export async function fetchMyGeneBatch(geneSymbols: string[], species: string): Promise<Map<string, MyGeneInfoResult>> {
  if (!geneSymbols || geneSymbols.length === 0) {
    return new Map();
  }

  console.log(`Making BATCH request for ${geneSymbols.length} genes in species: ${species}`);

  const url = 'https://mygene.info/v3/query';
  const query = geneSymbols.join(',');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `q=${query}&species=${species}&scopes=symbol&fields=all`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results: (MyGeneInfoResult & { notfound?: boolean })[] = await response.json();
    const resultsMap = new Map<string, MyGeneInfoResult>();
    for (const item of results) {
      if (item.notfound) continue;
      resultsMap.set(item.query, item);
    }
    return resultsMap;

  } catch (error) {
    console.error('Batch fetch failed:', error);
    return new Map(); // Return empty map on failure
  }
}./src/cache.ts
import type { MyGeneInfoResult } from './config';

const cache = new Map<string, MyGeneInfoResult | null>();

export const getCacheKey = (symbol: string, species: string): string => `${symbol}_${species}`;

export const has = (symbol: string, species: string): boolean => cache.has(getCacheKey(symbol, species));

export const get = (symbol: string, species: string): MyGeneInfoResult | null | undefined => cache.get(getCacheKey(symbol, species));

export const set = (symbol: string, species: string, data: MyGeneInfoResult | null): void => {
  cache.set(getCacheKey(symbol, species), data);
};

export const setBatch = (resultsMap: Map<string, MyGeneInfoResult>, species: string): void => {
  resultsMap.forEach((data, symbol) => {
    set(symbol, species, data);
  });
};./src/config.ts
import type { Props } from 'tippy.js';

// Define the shape of the data we expect from mygene.info
export interface MyGeneInfoResult {
  _id: string;
  query: string;
  symbol: string;
  name: string;
  summary?: string;
  // Add other fields you might use from the API
}

// Define the shape of our library's configuration object
export interface GeneTooltipConfig {
  selector: string;
  api: 'mygene';
  prefetch: 'smart' | 'all' | 'none';
  prefetchThreshold: number;
  tippyOptions: Partial<Props>;
}

export const defaultConfig: GeneTooltipConfig = {
  selector: '.gene-tooltip',
  api: 'mygene',
  prefetch: 'smart',
  prefetchThreshold: 15,
  tippyOptions: {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    theme: 'light',
  },
};./src/index.ts
import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
import 'tippy.js/dist/tippy.css';

import { defaultConfig, type GeneTooltipConfig } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';

// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): void {
  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    tippyOptions: { ...defaultConfig.tippyOptions, ...userConfig.tippyOptions },
  };

  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) return;

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold);

  tippy(geneElements, {
    ...config.tippyOptions,
    content: 'Loading...',
    onShow(instance: Instance) { // <-- Use the Instance type
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) {
        instance.setContent('Invalid gene element');
        return;
      }

      const { symbol, species } = info;

      const cachedData = cache.get(symbol, species);
      if (typeof cachedData !== 'undefined') { // Check if it's in the cache (even if null)
        instance.setContent(renderTooltipHTML(cachedData));
        return;
      }

      fetchMyGeneBatch([symbol], species).then(resultsMap => {
        const data = resultsMap.get(symbol) || null; // Use null if not found
        cache.set(symbol, species, data);
        instance.setContent(renderTooltipHTML(data));
      }).catch(error => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        instance.setContent('Error loading data.');
      });
    }
  });
}

export default {
  init,
};

// This is needed for the UMD build's global variable
declare global {
  interface Window {
    GeneTooltip: {
      init: (userConfig?: Partial<GeneTooltipConfig>) => void;
    };
  }
}./src/parser.ts
/**
 * Defines the structure for gene information extracted from an element.
 */
export interface GeneInfo {
  symbol: string;
  species: string;
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
 * @returns An object with symbol and species, or null.
 */
export function getGeneInfoFromElement(el: HTMLElement): GeneInfo | null {
    const symbol = el.textContent?.trim();
    const species = el.dataset.species;
    if (!symbol || !species) {
        return null;
    }
    return { symbol, species };
}./src/prefetch.ts
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { getGeneInfoFromElement } from './parser.js';

function groupGenesBySpecies(elements: HTMLElement[]): Map<string, Set<string>> {
    const genesBySpecies = new Map<string, Set<string>>();
    elements.forEach(el => {
        const info = getGeneInfoFromElement(el);
        if (!info || cache.has(info.symbol, info.species)) return;

        if (!genesBySpecies.has(info.species)) {
            genesBySpecies.set(info.species, new Set());
        }
        genesBySpecies.get(info.species)!.add(info.symbol);
    });
    return genesBySpecies;
}

async function fetchAndCache(genesBySpecies: Map<string, Set<string>>): Promise<void> {
    const fetchPromises = Array.from(genesBySpecies.entries()).map(([species, geneSet]) => {
        return fetchMyGeneBatch(Array.from(geneSet), species)
            .then(resultsMap => cache.setBatch(resultsMap, species));
    });
    await Promise.all(fetchPromises);
}

function prefetchAll(elements: HTMLElement[]): void {
    const genesBySpecies = groupGenesBySpecies(elements);
    fetchAndCache(genesBySpecies);
}

function prefetchSmart(elements: HTMLElement[]): void {
    const fetchQueue = new Set<Element>();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const processQueue = () => {
        if (fetchQueue.size === 0) return;
        const genesBySpecies = groupGenesBySpecies(Array.from(fetchQueue) as HTMLElement[]);
        fetchAndCache(genesBySpecies);
        fetchQueue.clear();
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchQueue.add(entry.target);
                obs.unobserve(entry.target);
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(processQueue, 200);
            }
        });
    }, { rootMargin: "200px" });

    elements.forEach(el => observer.observe(el));
}

export function runPrefetch(strategy: 'smart' | 'all' | 'none', elements: HTMLElement[], threshold: number): void {
    const geneCount = elements.length;
    const shouldPrefetchAll = strategy === 'all' || (strategy === 'smart' && geneCount <= threshold);

    if (shouldPrefetchAll) {
        console.log(`Prefetching all ${geneCount} genes.`);
        prefetchAll(elements);
    } else if (strategy === 'smart' && geneCount > threshold) {
        console.log("Using 'smart' prefetch strategy with IntersectionObserver.");
        prefetchSmart(elements);
    }
}./src/renderer.ts
import type { MyGeneInfoResult } from './config';

export function renderTooltipHTML(data: MyGeneInfoResult | null | undefined): string {
  if (!data) return '<p>Gene not found.</p>';

  // Build the link if the entrezgene ID exists
  const ncbiLink = data._id 
    ? `<a href="https://www.ncbi.nlm.nih.gov/gene/${data._id}" target="_blank" rel="noopener noreferrer">View on NCBI</a>`
    : '';

  return `
    <div class="gene-tooltip-content" style="text-align: left;">
        <div class="gene-tooltip-header">
            <strong>
              <a href="https://www.ncbi.nlm.nih.gov/gene/${data._id}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="gene-tooltip-link">
                ${data.symbol}
              </a>
            </strong>
            <span class="gene-tooltip-name">(${data.name})</span>
        </div>
        <p class="gene-tooltip-summary">${data.summary || 'No summary available.'}</p>
    </div>
  `;
}