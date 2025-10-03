import tippy, { type Instance } from 'tippy.js'; // Import the 'Instance' type
import 'tippy.js/dist/tippy.css';

import { defaultConfig, type GeneTooltipConfig, type GeneRIF } from './config.js';
import * as cache from './cache.js';
import { fetchMyGeneBatch } from './api.js';
import { renderTooltipHTML } from './renderer.js';
import { findGeneElements, getGeneInfoFromElement } from './parser.js';
import { runPrefetch } from './prefetch.js';
import { enableSummaryExpand } from './ui/summaryExpand.js';
import { renderIdeogram } from './ideogram.js'; 
import { renderGeneTrack } from './gene-track.js';

// Helper function to create content for the nested tooltip
function createNestedContent(items: { name: string; url: string }[]): string {
  const listItems = items
    .map(item => `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>`)
    .join('');
  return `<ul class="gene-tooltip-nested-list">${listItems}</ul>`;
}

// Helper to ensure data is an array
function asArray<T>(data: T | T[] | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function getUniqueItems<T>(items: T[], key: keyof T): T[] {
  return [...new Map(items.map(item => [item[key], item])).values()];
}

// The init function accepts a partial configuration
function init(userConfig: Partial<GeneTooltipConfig> = {}): void {
  const config: GeneTooltipConfig = {
    ...defaultConfig,
    ...userConfig,
    display: {
      ...defaultConfig.display,
      ...userConfig.display,
      links: {
        ...defaultConfig.display.links,
        ...userConfig.display?.links,
      },
    },
    ideogram: { ...defaultConfig.ideogram, ...userConfig.ideogram },
    tippyOptions: { ...defaultConfig.tippyOptions, ...userConfig.tippyOptions },
  };


  const geneElements = findGeneElements(config.selector);
  if (geneElements.length === 0) return;

  runPrefetch(config.prefetch, geneElements, config.prefetchThreshold);

  // Interface to track our custom properties on the tippy instance
  interface TippyInstanceWithCustoms extends Instance {
    _nestedTippys?: Instance[];
  }

  tippy(geneElements, {
    ...config.tippyOptions,
    content: 'Loading...',
    onShow(instance: Instance) {
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) {
        instance.setContent('Invalid gene element');
        return;
      }

      const { symbol, species } = info;
      const renderOptions = {
        truncate: config.truncateSummary,
        display: config.display,
        pathwaySource: config.pathwaySource,
        pathwayCount: config.pathwayCount,
        domainCount: config.domainCount,
        // NEW: Pass new counts to renderer
        transcriptCount: config.transcriptCount,
        structureCount: config.structureCount,
        generifCount: config.generifCount,
        tooltipWidth: config.tooltipWidth,
        tooltipHeight: config.tooltipHeight,
      };


      const cachedData = cache.get(symbol, species);
      if (typeof cachedData !== 'undefined') {
        instance.setContent(renderTooltipHTML(cachedData, renderOptions));
        
        // Also handle ideogram for cached data
        if (config.ideogram?.enabled && cachedData?.genomic_pos) {
          // Use setTimeout to wait for the DOM to update
          setTimeout(() => {
            renderIdeogram(instance, cachedData, config.ideogram);
          }, 0);
        }
        return;
      }

      fetchMyGeneBatch([symbol], species).then(resultsMap => {
        const data = resultsMap.get(symbol) || null;
        cache.set(symbol, species, data);
        instance.setContent(renderTooltipHTML(data, renderOptions));

        // Handle ideogram rendering
        if (config.ideogram?.enabled && data?.genomic_pos) {
          // Use setTimeout to wait for the DOM to update
          setTimeout(() => {
            renderIdeogram(instance, data, config.ideogram);
          }, 0);
        }
      }).catch(error => {
        console.error(`Failed to fetch data for ${symbol}`, error);
        instance.setContent('Error loading data.');
      });
    },
    onMount(instance: TippyInstanceWithCustoms) {
      const info = getGeneInfoFromElement(instance.reference as HTMLElement);
      if (!info) return;

      const data = cache.get(info.symbol, info.species);
      if (!data) return;

      if (config.display.geneTrack && data.exons) {
          renderGeneTrack(instance, data);
      }

      instance._nestedTippys = [];

      // Helper for creating nested tooltips
      const createNestedTippy = (selector: string, items: { name: string; url: string }[]) => {
        const button = instance.popper.querySelector<HTMLElement>(selector);
        if (button && items.length > 0) {
          const nestedInstance = tippy(button, {
            content: createNestedContent(items),
            allowHTML: true,
            interactive: true,
            trigger: 'mouseenter focus',
            placement: 'right',
            theme: 'light',
          });
          instance._nestedTippys?.push(nestedInstance);
        }
      };


      // 1. Handle Pathways
      const pathwaysMoreBtn = instance.popper.querySelector<HTMLElement>(`#pathways-more-${data._id}`);
      if (pathwaysMoreBtn && data.pathway?.[config.pathwaySource]) {
        const rawPathways = data.pathway[config.pathwaySource]!;
        const allPathways = (Array.isArray(rawPathways) ? rawPathways : [rawPathways]);

        // === DEDUPLICATION AND MAPPING HAPPENS HERE ===
        const uniquePathways = getUniqueItems(allPathways, 'id').map(p => {
            let url = '#';
            if (config.pathwaySource === 'reactome') url = `https://reactome.org/content/detail/${p.id}`;
            if (config.pathwaySource === 'kegg') url = `https://www.genome.jp/dbget-bin/www_bget?path:${p.id}`;
            if (config.pathwaySource === 'wikipathways') url = `https://www.wikipathways.org/pathways/${p.id}`;
            return { name: p.name, url };
        }).sort((a, b) => a.name.localeCompare(b.name));
        
        // Now use the clean 'uniquePathways' list for the tooltip
        const nestedInstance = tippy(pathwaysMoreBtn, {
            content: createNestedContent(uniquePathways), // <-- Use the deduplicated list
            allowHTML: true,
            interactive: true,
            trigger: 'mouseenter focus',
            placement: 'right',
            theme: 'light',
        });
        instance._nestedTippys.push(nestedInstance);
      }

      // 2. Handle Domains
      const domainsMoreBtn = instance.popper.querySelector<HTMLElement>(`#domains-more-${data._id}`);
      if (domainsMoreBtn && data.interpro) {
        const rawDomains = data.interpro;
        const allDomains = (Array.isArray(rawDomains) ? rawDomains : [rawDomains]);

        // === DEDUPLICATION AND MAPPING HAPPENS HERE ===
        const uniqueDomains = getUniqueItems(allDomains, 'id').map(d => ({
            name: d.short_desc,
            url: `https://www.ebi.ac.uk/interpro/entry/InterPro/${d.id}`
        })).sort((a, b) => a.name.localeCompare(b.name));

        const nestedInstance = tippy(domainsMoreBtn, {
            content: createNestedContent(uniqueDomains), // <-- Use the deduplicated list
            allowHTML: true,
            interactive: true,
            trigger: 'mouseenter focus',
            placement: 'right',
            theme: 'light',
        });
        instance._nestedTippys.push(nestedInstance);
      }
      
      // NEW: 3. Handle Transcripts
      const transcriptItems = asArray(data.ensembl?.transcript)
        .map(id => ({ name: id, url: `https://www.ensembl.org/id/${id}` }))
        .sort((a, b) => a.name.localeCompare(b.name));
      createNestedTippy(`#transcripts-more-${data._id}`, transcriptItems);

      // NEW: 4. Handle PDB Structures
      const structureItems = asArray(data.pdb)
        .map(id => ({ name: id, url: `https://www.rcsb.org/structure/${id}` }))
        .sort();
      createNestedTippy(`#structures-more-${data._id}`, structureItems);

      // NEW: 5. Handle GeneRIFs
      const generifItems = asArray(data.generif)
        .map((rif: GeneRIF) => ({
          name: rif.text,
          url: `https://pubmed.ncbi.nlm.nih.gov/${rif.pubmed}`
        }));
      createNestedTippy(`#generifs-more-${data._id}`, generifItems);


    },
    // NEW: Clean up nested instances to prevent memory leaks
    onHidden(instance: TippyInstanceWithCustoms) {
      if (instance._nestedTippys) {
        instance._nestedTippys.forEach(nested => nested.destroy());
        instance._nestedTippys = [];
      }
    }
  });
  enableSummaryExpand();
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
}