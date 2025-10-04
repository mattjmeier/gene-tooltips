import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { getGeneInfoFromElement } from './parser.js';

function groupGenesByTaxid(elements: HTMLElement[]): Map<number, Set<string>> {
    const genesByTaxid = new Map<number, Set<string>>();
    elements.forEach(el => {
        const info = getGeneInfoFromElement(el);
        // <-- FIX: Use info.taxid for cache check
        if (!info || cache.has(info.symbol, info.taxid)) return;

        // <-- FIX: Use info.taxid for map keys
        if (!genesByTaxid.has(info.taxid)) {
            genesByTaxid.set(info.taxid, new Set());
        }
        genesByTaxid.get(info.taxid)!.add(info.symbol);
    });
    return genesByTaxid;
}

async function fetchAndCache(genesByTaxid: Map<number, Set<string>>): Promise<void> {
    // <-- FIX: Iterate over [taxid, geneSet]
    const fetchPromises = Array.from(genesByTaxid.entries()).map(([taxid, geneSet]) => {
        // <-- FIX: Pass taxid as a string to the API
        return fetchMyGeneBatch(Array.from(geneSet), String(taxid))
            // <-- FIX: cache.setBatch now takes only one argument
            .then(resultsMap => cache.setBatch(resultsMap));
    });
    await Promise.all(fetchPromises);
}

function prefetchAll(elements: HTMLElement[]): void {
    // <-- FIX: Call the renamed function
    const genesByTaxid = groupGenesByTaxid(elements);
    fetchAndCache(genesByTaxid);
}

function prefetchSmart(elements: HTMLElement[]): void {
    const fetchQueue = new Set<Element>();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const processQueue = () => {
        if (fetchQueue.size === 0) return;
        // <-- FIX: Call the renamed function
        const genesByTaxid = groupGenesByTaxid(Array.from(fetchQueue) as HTMLElement[]);
        fetchAndCache(genesByTaxid);
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
}