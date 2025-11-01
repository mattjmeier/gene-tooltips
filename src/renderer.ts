import type { MyGeneInfoResult, GenomicPosition, TooltipDisplayConfig } from './config';
import { speciesMap } from './constants';
import { formatPathways, formatDomains, formatTranscripts, formatStructures, formatGeneRIFs } from './formatters';
export type FormattedItem = { name: string; url: string };

import NCBILogoText from "./assets/NLM-square-logo.svg";
const NCBILogo = `data:image/svg+xml,${encodeURIComponent(NCBILogoText)}`;
import EnsemblLogo from "./assets/ebang-400dpi.png";
import WikiLogoText from "./assets/Wikipedia-logo.svg";
const WikiLogo = `data:image/svg+xml,${encodeURIComponent(WikiLogoText)}`;

interface RenderOptions {
  truncate?: number;
  display?: Partial<TooltipDisplayConfig>;
  pathwaySource?: 'reactome' | 'kegg' | 'wikipathways';
  pathwayCount?: number;
  domainCount?: number;
  transcriptCount?: number;
  structureCount?: number;
  generifCount?: number;
  tooltipWidth?: number;
  tooltipHeight?: number;
  uniqueId?: string; // Add this parameter
}

const loaderHTML = `<div class="gt-loader-container"><div class="gt-spinner"></div><span>Loading...</span></div>`;

function renderCollapsibleSection(
  title: string,
  innerHTML: string,
  uniqueId: string, // uniqueId is good, but not strictly needed for the content
  collapsible: boolean,
  collapsedByDefault: boolean
): string {
  const isCollapsed = collapsible && collapsedByDefault;
  const arrow = collapsible
    ? `<span class="gt-section-arrow ${isCollapsed ? 'collapsed' : ''}" aria-hidden="true"></span>`
    : '';

  // Add ARIA attributes for accessibility
  const contentId = `gt-content-${uniqueId}-${title.replace(/\s+/g, '-').toLowerCase()}`;
  let headerClasses = 'gene-tooltip-section-header gt-collapsible-header';
  if (collapsible) {
    headerClasses += ' gt-is-collapsible';
  }

  return `
    <div class="gene-tooltip-section-container ${collapsible ? 'gt-collapsible' : ''}" 
         data-collapsed="${isCollapsed ? 'true' : 'false'}"
         data-section="${title.replace(/\s+/g, '-').toLowerCase()}">

      <div class="${headerClasses}" 
           role="${collapsible ? 'button' : 'heading'}"
           tabindex="${collapsible ? '0' : '-1'}"
           aria-expanded="${collapsible ? !isCollapsed : 'true'}"
           aria-controls="${contentId}">
        ${arrow}
        <span class="gt-section-title">${title}</span>
      </div>
      
      <div class="gt-collapsible-content" id="${contentId}">
        ${innerHTML}
      </div>
    </div>
  `;
}


// Generate a unique ID for this tooltip instance
function generateUniqueId(): string {
  // Use crypto.randomUUID() if available (modern browsers), fallback for older browsers
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers or environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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

// Ideogram layout with unique ID
// function renderLocation(genomic_pos: GenomicPosition | GenomicPosition[] | undefined, showIdeogram: boolean = false, uniqueId: string = ''): string {
//     if (!genomic_pos) return '';

//     const pos = Array.isArray(genomic_pos) ? genomic_pos[0] : genomic_pos;
//     if (!pos) return '';
    
//     const start = pos.start.toLocaleString();
//     const end = pos.end.toLocaleString();

//     return `
//       <div class="gene-tooltip-section-container">
//         <div class="gene-tooltip-section-header">Location</div>
//         <div class="gene-tooltip-location">
//             <div class="gene-tooltip-location-coords">
//               <span class="gene-tooltip-location-chr">chr${pos.chr}</span>
//               <span class="gene-tooltip-location-pos">${start}-${end}</span>
//             </div>
//             ${showIdeogram ? `<div class="gene-tooltip-ideo" id="gene-tooltip-ideo-${uniqueId}">${loaderHTML}</div>` : ""}
//         </div>
//       </div>
//     `;
// }

function renderLocation(
  genomic_pos: GenomicPosition | GenomicPosition[] | undefined, 
  showIdeogram: boolean = false, 
  uniqueId: string = ''
): string {
  if (!genomic_pos) return '';

  const pos = Array.isArray(genomic_pos) ? genomic_pos[0] : genomic_pos;
  if (!pos) return '';
  
  const start = pos.start.toLocaleString();
  const end = pos.end.toLocaleString();

  return `
    <div class="gene-tooltip-location">
      <div class="gene-tooltip-location-coords">
        <span class="gene-tooltip-location-chr">chr${pos.chr}</span>
        <span class="gene-tooltip-location-pos">${start}-${end}</span>
      </div>
      ${showIdeogram ? `<div class="gene-tooltip-ideo" id="gene-tooltip-ideo-${uniqueId}">${loaderHTML}</div>` : ""}
    </div>
  `;
}

// Gene Track
function renderGeneTrackContent(uniqueId: string): string {
  return `
    <div class="gene-track-header-controls">
      <select class="gt-transcript-selector form-select-sm" id="transcript-selector-${uniqueId}"></select>
    </div>
    <div class="gene-tooltip-track" id="gene-tooltip-track-${uniqueId}">${loaderHTML}</div>
  `;
}

function renderSummary(summaryText: string | undefined, truncate: number, uniqueId: string): string {
  const summary = summaryText || "No summary available.";
  
  if (!summaryText || truncate <= 0) {
    return `
      <div class="gene-tooltip-section-container">
        <div class="gene-tooltip-section-header">Summary</div>
        <p class="gene-tooltip-summary-full">${summary}</p>
      </div>
    `;
  }

  const summaryClass = 'gene-tooltip-summary';
  const summaryStyle = `style="--line-clamp: ${truncate};"`;
  
  const lessButtonId = `summary-less-${uniqueId}`;
  
  const lessButton = renderCollapseButton(lessButtonId, 'Show less');

  return `
    <div class="gene-tooltip-section-container">
        <div class="gene-tooltip-section-header">Summary</div>
        <p class="${summaryClass}" ${summaryStyle}>${summary}</p>
        ${lessButton}
    </div>
  `;
}

// Rendering external links
function renderLinks(data: MyGeneInfoResult, display: Partial<TooltipDisplayConfig>): string {
    const linksToShow = [];
    
    // Build NCBI links
    if (display.links?.ncbi !== false) {
        linksToShow.push(`
          <a href="https://www.ncbi.nlm.nih.gov/gene/${data._id}"
            target="_blank" rel="noopener noreferrer" title="View on NCBI Gene">
            <span class="gene-tooltip-link-icon-wrapper">
              <img src="${NCBILogo}" alt="NCBI Gene link" class="gene-tooltip-link-icon" />
            </span>
            <span>NCBI</span>
          </a>
        `);
    }

    // Build Ensembl ID links
    if (display.links?.ensembl !== false && data.ensembl?.gene) {
      linksToShow.push(`
        <a href="https://www.ensembl.org/id/${data.ensembl.gene}"
          target="_blank" rel="noopener noreferrer" title="View on Ensembl">
          <span class="gene-tooltip-link-icon-wrapper">
            <img src="${EnsemblLogo}" alt="Ensembl link" class="gene-tooltip-link-icon" />
          </span>
          <span>Ensembl</span>
        </a>
      `);
    }

    // Build Wikipedia links
    if (display.links?.wikipedia !== false && data.wikipedia?.url_stub) {
      const wikiStub = data.wikipedia.url_stub.replace(/\s+/g, '_');
      linksToShow.push(`
        <a href="https://en.wikipedia.org/wiki/${wikiStub}"
          target="_blank" rel="noopener noreferrer" title="View on Wikipedia">
          <span class="gene-tooltip-link-icon-wrapper">
            <img src="${WikiLogo}" alt="Wikipedia link" class="gene-tooltip-link-icon" />
          </span>
          <span>Wikipedia</span>
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

function renderParagraphContent(
  items: { name: string; url: string }[],
  initialCount: number,
  moreButtonId: string
): string {
  if (!items || items.length === 0) {
    return '<p class="gt-no-data">Not available.</p>'; // Provide feedback
  }

  const visibleItems = items.slice(0, initialCount);
  const hiddenItemCount = items.length - initialCount;

  const itemLinks = visibleItems
    .map(item => `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>`)
    .join(', ');

  const moreButton = hiddenItemCount > 0
    ? renderMoreButton(moreButtonId, `... and ${hiddenItemCount} more`)
    : '';

  return `
    <p class="gene-tooltip-p-content">
      ${itemLinks}${hiddenItemCount > 0 ? ',' : ''} ${moreButton}
    </p>
  `;
}


function renderMoreButton(id: string, text: string): string {
  // We can add accessibility attributes here too
  return `
    <span id="${id}" class="gene-tooltip-more-btn" role="button" tabindex="0">
      ${text}
    </span>
  `;
}

function renderCollapseButton(id: string, text: string): string {
  return `
    <span id="${id}" class="gene-tooltip-more-btn" role="button" tabindex="0">
      ${text}
    </span>
  `;
}

function renderListContent(
  items: FormattedItem[],
  initialCount: number,
  moreButtonId: string
): string {
  if (!items || items.length === 0) {
    return '<p class="gt-no-data">Not available.</p>';
  }

  const visibleItems = items.slice(0, initialCount);
  const hiddenItemCount = items.length - initialCount;

  const itemLinks = visibleItems.map(item =>
    `<li>
       <a href="${item.url}" target="_blank" rel="noopener noreferrer" title="${item.name}">
          ${item.name}
       </a>
     </li>`
  ).join('');

  const moreButton = hiddenItemCount > 0
    ? renderMoreButton(moreButtonId, `... and ${hiddenItemCount} more`)
    : '';

  return `
    <div class="gene-tooltip-list-wrapper">
      <ul class="gene-tooltip-list-section">${itemLinks}</ul>
      ${moreButton}
    </div>
  `;
}

function renderPathways(data: MyGeneInfoResult, source: 'reactome' | 'kegg' | 'wikipathways', count: number, uniqueId: string): string {
    const pathways = formatPathways(data.pathway?.[source], source);
    // Use the new content function
    return renderParagraphContent(pathways, count, `pathways-more-${uniqueId}`);
}

function renderDomains(data: MyGeneInfoResult, count: number, uniqueId: string): string {
  const domains = formatDomains(data.interpro);
  return renderParagraphContent(domains, count, `domains-more-${uniqueId}`);
}

function renderTranscripts(data: MyGeneInfoResult, count: number, uniqueId: string): string {
  const transcripts = formatTranscripts(data.ensembl?.transcript);
  return renderParagraphContent(transcripts, count, `transcripts-more-${uniqueId}`);
}

function renderStructures(data: MyGeneInfoResult, count: number, uniqueId: string): string {
  const structures = formatStructures(data.pdb);
  return renderParagraphContent(structures, count, `structures-more-${uniqueId}`);
}

function renderGeneRIFs(data: MyGeneInfoResult, count: number, uniqueId: string): string {
  const generifs = formatGeneRIFs(data.generif);
  const moreButtonId = `generifs-more-${uniqueId}`;
  // Use the new content function
  return renderListContent(generifs, count, moreButtonId);
}

export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const uniqueId = options.uniqueId || generateUniqueId();
  
  const {
    truncate = 4,
    display = {},
    pathwaySource = 'reactome',
    pathwayCount = 3,
    domainCount = 3,
    transcriptCount = 3,
    structureCount = 3,
    generifCount = 3,
    tooltipWidth,
    tooltipHeight
  } = options;

  // These flags will be passed to renderCollapsibleSection
  const collapsible = display.collapsible ?? false;
  const collapsedByDefault = display.collapsedByDefault ?? false;
  
  const styleParts: string[] = [];
  if (tooltipWidth) styleParts.push(`max-width: ${tooltipWidth}px`);
  if (tooltipHeight) styleParts.push(`max-height: ${tooltipHeight}px`, `overflow-y: auto`);
  const inlineStyle = styleParts.length > 0 ? `style="${styleParts.join('; ')}"` : '';
  
  // Helper to decide whether to render a section
  const shouldRender = (key: keyof TooltipDisplayConfig) => display[key] !== false;

  return `
    <div class="gene-tooltip-content" ${inlineStyle} data-tooltip-id="${uniqueId}">
      <div class="gene-tooltip-header">
        <div class="gene-tooltip-title">
          <strong>${data.symbol}</strong>
          <span class="gene-tooltip-name">(${data.name})</span>
        </div>
      </div>

      ${shouldRender('species') && data.taxid ? renderSpecies(data.taxid) : ''}
      
      ${/* Summary is special, it doesn't use the collapsible wrapper */ ''}
      ${renderSummary(data.summary, truncate, uniqueId)}

      ${shouldRender('location') 
        ? renderCollapsibleSection(
            'Location',
            renderLocation(data.genomic_pos, display.ideogram, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          ) 
        : ''}
      
      ${shouldRender('geneTrack') && data.exons && data.exons.length > 0
        ? renderCollapsibleSection(
            'Gene Model',
            renderGeneTrackContent(uniqueId), // Use the new content function
            uniqueId,
            collapsible,
            collapsedByDefault
          )
        : ''}

      ${shouldRender('pathways')
        ? renderCollapsibleSection(
            'Pathways',
            renderPathways(data, pathwaySource, pathwayCount, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          ) 
        : ''}

      ${shouldRender('domains')
        ? renderCollapsibleSection(
            'Protein Domains',
            renderDomains(data, domainCount, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          ) 
        : ''}
        
      ${shouldRender('transcripts')
        ? renderCollapsibleSection(
            'Transcripts',
            renderTranscripts(data, transcriptCount, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          )
        : ''}

      ${shouldRender('structures')
        ? renderCollapsibleSection(
            'PDB Structures',
            renderStructures(data, structureCount, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          )
        : ''}

      ${shouldRender('generifs')
        ? renderCollapsibleSection(
            'GeneRIFs',
            renderGeneRIFs(data, generifCount, uniqueId),
            uniqueId,
            collapsible,
            collapsedByDefault
          )
        : ''}

      ${renderLinks(data, display)}
    </div>
  `;
}