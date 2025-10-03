import type { MyGeneInfoResult, GenomicPosition, TooltipDisplayConfig, MyGenePathway, MyGeneInterproDomain } from './config';
import { speciesMap } from './constants';

import NCBILogoText from "./assets/US-NLM-NCBI-Logo.svg";
const NCBILogo = `data:image/svg+xml,${encodeURIComponent(NCBILogoText)}`;
import EnsemblLogo from "./assets/EnsemblLogo.webp";
console.log('NCBILogo variable contains:', NCBILogo);

interface RenderOptions {
  truncate?: number;
  display?: Partial<TooltipDisplayConfig>; // This now includes the 'links' property
  pathwaySource?: 'reactome' | 'kegg' | 'wikipathways';
  pathwayCount?: number;
  domainCount?: number;
  // NEW: Add new counts to render options
  transcriptCount?: number;
  structureCount?: number;
  generifCount?: number;
  tooltipWidth?: number;
  tooltipHeight?: number;
}

// Helper to get unique items based on a key
function getUniqueItems<T>(items: T[], key: keyof T): T[] {
  // Use a Map to store items by their unique key. The map will automatically
  // handle overwriting duplicates, keeping only the last one it sees.
  return [...new Map(items.map(item => [item[key], item])).values()];
}
// Helper to ensure data is an array
function asArray<T>(data: T | T[] | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}


function renderSpecies(taxid: number): string {
  const species = speciesMap[taxid] ?? { common: "Unknown", genus: "", icon: "❓" };
  return `
    <div class="gene-tooltip-section gene-tooltip-species">
      <span class="gene-tooltip-species-icon">${species.icon}</span>
      <span>${species.common}, <em>${species.genus}</em></span>
    </div>
  `;
}

// Ideogram layout
function renderLocation(genomic_pos: GenomicPosition | GenomicPosition[] | undefined, showIdeogram: boolean = false, geneId: string = ''): string {
    if (!genomic_pos) return '';

    const pos = Array.isArray(genomic_pos) ? genomic_pos[0] : genomic_pos;
    if (!pos) return '';
    
    const start = pos.start.toLocaleString();
    const end = pos.end.toLocaleString();

    return `
      <div class="gene-tooltip-section-container">
        <div class="gene-tooltip-section-header">Location</div>
        <div class="gene-tooltip-location">
            <div class="gene-tooltip-location-coords">
              <span class="gene-tooltip-location-chr">chr${pos.chr}</span>
              <span class="gene-tooltip-location-pos">${start}-${end}</span>
            </div>
            ${showIdeogram ? `<div class="gene-tooltip-ideo" id="gene-tooltip-ideo-${geneId}"></div>` : ""}
        </div>
      </div>
    `;
}



// Modified for Gene Track section layout
function renderGeneTrackContainer(geneId: string): string {
  return `
    <div class="gene-tooltip-section-container">
        <div class="gene-tooltip-section-header">Gene Model</div>
        <div class="gene-tooltip-track" id="gene-tooltip-track-${geneId}"></div>
    </div>
  `;
}

function renderSummary(summaryText: string | undefined, truncate: number): string {
  const summary = summaryText || "No summary available.";
  
  if (!summaryText) {
    return `
      <div class="gene-tooltip-section-container">
        <p class="gene-tooltip-summary-full">${summary}</p>
      </div>
    `;
  }

  const summaryClass = truncate > 0 ? 'gene-tooltip-summary' : 'gene-tooltip-summary-full';
  const tabIndex = truncate > 0 ? 'tabindex="0"' : '';
  const summaryStyle = truncate > 0 ? `style="--line-clamp: ${truncate};"` : '';

  return `
    <div class="gene-tooltip-section-container">
        <div class="gene-tooltip-section-header">Summary</div>
        <p class="${summaryClass}" ${tabIndex} ${summaryStyle}>${summary}</p>
    </div>
  `;
}




// Section for rendering external links
function renderLinks(data: MyGeneInfoResult, display: Partial<TooltipDisplayConfig>): string {
    const linksToShow = [];
    
    if (display.links?.ncbi !== false) {
        linksToShow.push(`
          <a href="https://www.ncbi.nlm.nih.gov/gene/${data._id}"
            target="_blank" rel="noopener noreferrer" title="View on NCBI Gene">
            <img src="${NCBILogo}" alt="NCBI Gene link" class="gene-tooltip-link-icon" />
            <span>NCBI</span>
          </a>
        `);
    }

    // Use the correct Ensembl ID
    if (display.links?.ensembl !== false && data.ensembl?.gene) {
      linksToShow.push(`
        <a href="https://www.ensembl.org/id/${data.ensembl.gene}"
          target="_blank" rel="noopener noreferrer" title="View on Ensembl">
          <img src="${EnsemblLogo}" alt="Ensembl link" class="gene-tooltip-link-icon" />
          <span>Ensembl</span>
        </a>
      `);
    }

    if (linksToShow.length === 0) return '';

    return `
        <div class="gene-tooltip-section-container">
            <div class="gene-tooltip-section-header">Links</div>
            <div class="gene-tooltip-links-container">
                ${linksToShow.join('')}
            </div>
        </div>
    `;
}


function renderParagraphSection(
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

  // Create the comma-separated list of links for the paragraph
  const itemLinks = visibleItems
    .map(item => `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>`)
    .join(', ');

  // Create the "more" button if there are hidden items
  const moreButton = hiddenItemCount > 0
    ? `<span id="${moreButtonId}" class="gene-tooltip-more-btn" data-more-count="${hiddenItemCount}">
         ... and ${hiddenItemCount} more
       </span>`
    : '';

  return `
    <div class="gene-tooltip-section-container">
      <div class="gene-tooltip-section-header">${title}</div>
      <p class="gene-tooltip-p-content">
        ${itemLinks}${hiddenItemCount > 0 ? ',' : ''} ${moreButton}
      </p>
    </div>
  `;
}


// Formats raw pathway data and calls the renderer
function renderPathways(data: MyGeneInfoResult, source: 'reactome' | 'kegg' | 'wikipathways', count: number): string {
    const rawPathways: MyGenePathway | MyGenePathway[] | undefined = data.pathway?.[source];
    if (!rawPathways) return '';
    
    // Deduplicate by pathway 'id'
    const uniqueRawPathways = getUniqueItems(Array.isArray(rawPathways) ? rawPathways : [rawPathways], 'id');

    const pathways = uniqueRawPathways
      .map(p => {
        let url = '#';
        if (source === 'reactome') url = `https://reactome.org/content/detail/${p.id}`;
        if (source === 'kegg') url = `https://www.genome.jp/dbget-bin/www_bget?path:${p.id}`;
        if (source === 'wikipathways') url = `https://www.wikipathways.org/pathways/${p.id}`;
        return { name: p.name, url };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const moreButtonId = `pathways-more-${data._id}`;

    return renderParagraphSection('Pathways', pathways, count, moreButtonId);
}

// Formats raw domain data and calls the new renderer
function renderDomains(data: MyGeneInfoResult, count: number): string {
  const rawDomains: MyGeneInterproDomain | MyGeneInterproDomain[] | undefined = data.interpro;
  if (!rawDomains) return '';

  // Deduplicate by domain 'id'
  const uniqueRawDomains = getUniqueItems(Array.isArray(rawDomains) ? rawDomains : [rawDomains], 'id');

  const domains = uniqueRawDomains
    .map(d => ({
      name: d.short_desc,
      url: `https://www.ebi.ac.uk/interpro/entry/InterPro/${d.id}`
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const moreButtonId = `domains-more-${data._id}`;

  return renderParagraphSection('Protein Domains', domains, count, moreButtonId);
}

// NEW: Render functions for new sections

function renderTranscripts(data: MyGeneInfoResult, count: number): string {
  const rawTranscripts = asArray(data.ensembl?.transcript);
  if (rawTranscripts.length === 0) return '';

  const transcripts = rawTranscripts.map(id => ({
    name: id,
    url: `https://www.ensembl.org/id/${id}`
  })).sort((a, b) => a.name.localeCompare(b.name));

  const moreButtonId = `transcripts-more-${data._id}`;
  return renderParagraphSection('Transcripts', transcripts, count, moreButtonId);
}

function renderStructures(data: MyGeneInfoResult, count: number): string {
  const rawStructures = asArray(data.pdb);
  if (rawStructures.length === 0) return '';

  const structures = rawStructures.map(id => ({
    name: id,
    url: `https://www.rcsb.org/structure/${id}`
  })).sort();

  const moreButtonId = `structures-more-${data._id}`;
  return renderParagraphSection('PDB Structures', structures, count, moreButtonId);
}

function renderGeneRIFs(data: MyGeneInfoResult, count: number): string {
  const rawGeneRIFs = asArray(data.generif);
  if (rawGeneRIFs.length === 0) return '';
  
  // Use a simplified render function as GeneRIF text can be long
  const visibleItems = rawGeneRIFs.slice(0, count);
  const hiddenItemCount = rawGeneRIFs.length - count;

  const itemLinks = visibleItems.map(rif => 
    `<li><a href="https://pubmed.ncbi.nlm.nih.gov/${rif.pubmed}" target="_blank" rel="noopener noreferrer">${rif.text}</a></li>`
  ).join('');

  const moreButton = hiddenItemCount > 0
    ? `<span id="generifs-more-${data._id}" class="gene-tooltip-more-btn">
         ... and ${hiddenItemCount} more
       </span>`
    : '';

  return `
    <div class="gene-tooltip-section-container">
      <div class="gene-tooltip-section-header">GeneRIFs</div>
      <ul class="gene-tooltip-list-section">${itemLinks}</ul>
      ${moreButton}
    </div>
  `;
}


export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const { 
    truncate = 4, 
    display = {},
    pathwaySource = 'reactome',
    pathwayCount = 3,
    domainCount = 3,
    // NEW: Destructure new counts
    transcriptCount = 3,
    structureCount = 3,
    generifCount = 3,
    tooltipWidth,
    tooltipHeight 
  } = options;

  const styleParts: string[] = [];
  if (tooltipWidth) styleParts.push(`max-width: ${tooltipWidth}px`);
  if (tooltipHeight) styleParts.push(`max-height: ${tooltipHeight}px`, `overflow-y: auto`);
  const inlineStyle = styleParts.length > 0 ? `style="${styleParts.join('; ')}"` : '';


  return `
    <div class="gene-tooltip-content" ${inlineStyle}>
      <div class="gene-tooltip-header">
        <div class="gene-tooltip-title">
          <strong>${data.symbol}</strong>
          <span class="gene-tooltip-name">(${data.name})</span>
        </div>
      </div>

      ${display.species !== false && data.taxid ? renderSpecies(data.taxid) : ''}
      
      ${renderSummary(data.summary, truncate)}

      ${display.location !== false ? renderLocation(data.genomic_pos, display.ideogram, data._id) : ''}
      ${display.geneTrack !== false && data.exons && data.exons.length > 0 ? renderGeneTrackContainer(data._id) : ''}
      ${display.pathways !== false ? renderPathways(data, pathwaySource, pathwayCount) : ''}
      ${display.domains !== false ? renderDomains(data, domainCount) : ''}
      
      <!-- NEW: Render new sections based on display config -->
      ${display.transcripts !== false ? renderTranscripts(data, transcriptCount) : ''}
      ${display.structures !== false ? renderStructures(data, structureCount) : ''}
      ${display.generifs !== false ? renderGeneRIFs(data, generifCount) : ''}

      ${renderLinks(data, display)}
    </div>
  `;
}