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

function renderLocation(genomic_pos: GenomicPosition | GenomicPosition[] | undefined, showIdeogram: boolean = false, geneId: string = ''): string {
    if (!genomic_pos) return '';

    const pos = Array.isArray(genomic_pos) ? genomic_pos[0] : genomic_pos;
    if (!pos) return '';
    
    const start = pos.start.toLocaleString();
    const end = pos.end.toLocaleString();

    return `
      <div class="gene-tooltip-section gene-tooltip-location">
        <div>
          <div class="gene-tooltip-location-label">Location</div>
          <span>chr${pos.chr}:${start}-${end}</span>
        </div>
        ${showIdeogram ? `<div class="gene-tooltip-ideo" id="gene-tooltip-ideo-${geneId}"></div>` : ""}
      </div>
    `;
}

function renderGeneTrackContainer(geneId: string): string {
  return `<div class="gene-tooltip-track" id="gene-tooltip-track-${geneId}"></div>`;
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
    <div class="gene-tooltip-section gene-tooltip-p-section">
      <div class="gene-tooltip-p-header">${title}</div>
      <p class="gene-tooltip-p-content">
        ${itemLinks}${hiddenItemCount > 0 ? ',' : ''} ${moreButton}
      </p>
    </div>
  `;
}

// Helper to get unique items based on a key
function getUniqueItems<T>(items: T[], key: keyof T): T[] {
  return [...new Map(items.map(item => [item[key], item])).values()];
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

export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const { 
    truncate = 4, 
    display = {}, // This will contain the display config from init
    pathwaySource = 'reactome',
    pathwayCount = 3,
    domainCount = 3
  } = options;

  // External links
  let headerLinks = '';
  const linksToShow = [];
  // Check the config to see if we should show the NCBI link
  if (display.links?.ncbi !== false) {
      linksToShow.push(`
        <a href="https://www.ncbi.nlm.nih.gov/gene/${data._id}"
          target="_blank" rel="noopener noreferrer" title="View on NCBI Gene">
          <img src="${NCBILogo}" alt="NCBI Gene link" class="gene-tooltip-link-icon" />
        </a>
      `);
  }

  // Check the config to see if we should show the Ensembl link
  if (display.links?.ensembl !== false) {
    linksToShow.push(`
      <a href="https://www.ensembl.org/id/${data._id}"
        target="_blank" rel="noopener noreferrer" title="View on Ensembl">
        <img src="${EnsemblLogo}" alt="Ensembl link" class="gene-tooltip-link-icon" />
      </a>
    `);
  }

  if (linksToShow.length > 0) {
    headerLinks = `
      <span class="gene-tooltip-header-links">
        ${linksToShow.join('')}
      </span>
    `;
  }

  const summary = data.summary || "No summary available.";
  const summaryClass = truncate && summary.length > 0 ? 'gene-tooltip-summary' : 'gene-tooltip-summary-full';
  const tabIndex = truncate ? 'tabindex="0"' : '';
  const summaryStyle = truncate ? `style="--line-clamp: ${truncate};"` : '';

  return `
    <div class="gene-tooltip-content" style="text-align: left; max-width: 300px;">
      <div class="gene-tooltip-header">
        
        <!-- START: Change is here -->
        <div class="gene-tooltip-title">
          <strong>${data.symbol}</strong>
          <span class="gene-tooltip-name">(${data.name})</span>
        </div>
        <!-- END: Change is here -->

        ${headerLinks}
      </div>

      ${display.species !== false && data.taxid ? renderSpecies(data.taxid) : ''}
      ${display.location !== false ? renderLocation(data.genomic_pos, display.ideogram, data._id) : ''}
      ${display.geneTrack !== false && data.genomic_pos ? renderGeneTrackContainer(data._id) : ''}

      <p class="${summaryClass}" ${tabIndex} ${summaryStyle}>${summary}</p>

      ${display.pathways !== false ? renderPathways(data, pathwaySource, pathwayCount) : ''}
      ${display.domains !== false ? renderDomains(data, domainCount) : ''}
    </div>
  `;
}
