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
}