import type { MyGeneInfoResult, GenomicPosition, TooltipDisplayConfig, MyGenePathway, MyGeneInterproDomain } from './config';
import { SOURCES } from './constants';

interface RenderOptions {
  sources?: string[];
  truncate?: number;
  display?: Partial<TooltipDisplayConfig>;
  pathwaySource?: 'reactome' | 'kegg' | 'wikipathways';
  pathwayCount?: number;
  domainCount?: number;
}

// species lookup table
interface SpeciesInfo {
  common: string;
  genus: string;
  icon: string;
}

const speciesMap: Record<number, SpeciesInfo> = {
  9606: { common: "Human", genus: "Homo sapiens", icon: "🧑" },
  10090: { common: "Mouse", genus: "Mus musculus", icon: "🐭" },
  10116: { common: "Rat", genus: "Rattus norvegicus", icon: "🐀" },
  7227: { common: "Fruitfly", genus: "Drosophila melanogaster", icon: "🪰" },
  6239: { common: "Nematode", genus: "Caenorhabditis elegans", icon: "🪱" },
  7955: { common: "Zebrafish", genus: "Danio rerio", icon: "🐟" },
  3702: { common: "Thale-cress", genus: "Arabidopsis thaliana", icon: "🌱" },
  8364: { common: "Frog", genus: "Xenopus tropicalis", icon: "🐸" },
  9823: { common: "Pig", genus: "Sus scrofa", icon: "🐖" },
};

function renderSpecies(taxid: number): string {
  const species = speciesMap[taxid] ?? { common: "Unknown", genus: "", icon: "❓" };
  return `
    <div class="gene-tooltip-section gene-tooltip-species">
      <span class="gene-tooltip-species-icon">${species.icon}</span>
      <span>${species.common}, <em>${species.genus}</em></span>
    </div>
  `;
}

function renderLocation(genomic_pos: GenomicPosition | GenomicPosition[] | undefined, showIdeogram: boolean = false, geneId: string = ''): string {
    if (!genomic_pos) return '';

    const pos = Array.isArray(genomic_pos) ? genomic_pos[0] : genomic_pos;
    if (!pos) return '';
    
    const start = pos.start.toLocaleString();
    const end = pos.end.toLocaleString();

    return `
      <div class="gene-tooltip-section gene-tooltip-location">
        <div>
          <span class="gene-tooltip-location-label">Location:</span>
          <span>chr${pos.chr}:${start}-${end}</span>
        </div>
        ${showIdeogram ? `<div class="gene-tooltip-ideo" id="gene-tooltip-ideo-${geneId}"></div>` : ""}
      </div>
    `;
}

function renderGeneTrackContainer(geneId: string): string {
  return `<div class="gene-tooltip-track" id="gene-tooltip-track-${geneId}"></div>`;
}


// A generic function to render a list section (for Pathways or Domains)
function renderListSection(
  title: string,
  items: { name: string; url: string }[],
  initialCount: number,
  moreButtonId: string
): string {
  if (!items || items.length === 0) {
    return '';
  }

  const visibleItems = items.slice(0, initialCount);
  const hiddenItemCount = items.length - initialCount;

  // Create the list of visible items
  const listItems = visibleItems
    .map(item => `
      <li>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>
      </li>
    `)
    .join('');

  // Create the "more" button if there are hidden items
  const moreButton = hiddenItemCount > 0
    ? `<span id="${moreButtonId}" class="gene-tooltip-more-btn" data-more-count="${hiddenItemCount}">
         ... and ${hiddenItemCount} more
       </span>`
    : '';

  // Store the full list as a data attribute on the "more" button for the nested tippy
  if (hiddenItemCount > 0) {
    // We need to find the button later and add the data. We'll do this in the main `init`.
    // For now, we'll just render the button.
  }

  return `
    <div class="gene-tooltip-section gene-tooltip-list-section">
      <div class="gene-tooltip-list-header">${title}</div>
      <ul>${listItems}</ul>
      ${moreButton}
    </div>
  `;
}

// Formats raw pathway data and calls the renderer
function renderPathways(data: MyGeneInfoResult, source: 'reactome' | 'kegg' | 'wikipathways', count: number): string {
    const rawPathways: MyGenePathway | MyGenePathway[] | undefined = data.pathway?.[source];
    if (!rawPathways) return '';
    
    const pathways = (Array.isArray(rawPathways) ? rawPathways : [rawPathways])
      .map(p => {
        let url = '#';
        if (source === 'reactome') url = `https://reactome.org/content/detail/${p.id}`;
        if (source === 'kegg') url = `https://www.genome.jp/dbget-bin/www_bget?path:${p.id}`;
        if (source === 'wikipathways') url = `https://www.wikipathways.org/pathways/${p.id}`;
        return { name: p.name, url };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const moreButtonId = `pathways-more-${data._id}`;

    return renderListSection('Pathways', pathways, count, moreButtonId);
}

// Formats raw domain data and calls the renderer
function renderDomains(data: MyGeneInfoResult, count: number): string {
  // FIX: Explicitly type the raw data to satisfy the compiler and improve clarity.
  const rawDomains: MyGeneInterproDomain | MyGeneInterproDomain[] | undefined = data.interpro;
  if (!rawDomains) return '';

  const domains = (Array.isArray(rawDomains) ? rawDomains : [rawDomains])
    .map(d => ({
      name: d.short_desc,
      url: `https://www.ebi.ac.uk/interpro/entry/InterPro/${d.id}`
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const moreButtonId = `domains-more-${data._id}`;

  return renderListSection('Protein Domains', domains, count, moreButtonId);
}


export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const { 
    sources = ["ncbi"], 
    truncate = 5, 
    display = {},
    pathwaySource = 'reactome',
    pathwayCount = 3,
    domainCount = 3
  } = options;

  // External links
  const links = SOURCES.filter(src => sources.includes(src.key))
    .map(src => {
      if (src.requires === "id" && !data._id) return "";
      if (src.requires === "symbol" && !data.symbol) return "";
      return `<a href="${src.url(data._id || data.symbol)}"
                 target="_blank"
                 rel="noopener noreferrer">
                ${src.name}
              </a>`;
    })
    .filter(Boolean)
    .join(" | ");

  const summary = data.summary || "No summary available.";
  const summaryClass = truncate && summary.length > 0 ? 'gene-tooltip-summary' : 'gene-tooltip-summary-full';
  const tabIndex = truncate ? 'tabindex="0"' : '';
  const summaryStyle = truncate ? `style="--line-clamp: ${truncate};"` : '';

  return `
    <div class="gene-tooltip-content" style="text-align: left; max-width: 300px;">
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

      ${display.species !== false && data.taxid ? renderSpecies(data.taxid) : ''}
      ${display.location !== false ? renderLocation(data.genomic_pos, display.ideogram, data._id) : ''}
      ${display.geneTrack !== false && data.genomic_pos ? renderGeneTrackContainer(data._id) : ''}

      <p class="${summaryClass}" ${tabIndex} ${summaryStyle}>${summary}</p>

      ${display.pathways !== false ? renderPathways(data, pathwaySource, pathwayCount) : ''}
      ${display.domains !== false ? renderDomains(data, domainCount) : ''}
      
      ${links ? `<div class="gene-tooltip-links">${links}</div>` : ""}
    </div>
  `;
}


        
        
// To do:
// - add top pathways (configurable to pick which source? e.g., KEGG as default, but allow reactome, Wikipathways etc.)
// - add mini exon map (using CSS/SVG? Other tools in JS that we can leverage?)
// - top protein domains (expandable to show them?)

// - finally, ideally, we should make each component optional at the user-level
// { common: "Yeast", genus: "Saccharomyces", icon: "🧫"},