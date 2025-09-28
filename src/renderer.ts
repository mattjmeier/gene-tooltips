// ./src/renderer.ts
import type { MyGeneInfoResult, GenomicPosition, TooltipDisplayConfig } from './config';
import { SOURCES } from './constants';

interface RenderOptions {
  sources?: string[];
  truncate?: number;
  display?: Partial<TooltipDisplayConfig>;
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

export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const { sources = ["ncbi"], truncate = 3, display = { species: true, location: true, ideogram: false } } = options;

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

      ${display.species && data.taxid ? renderSpecies(data.taxid) : ''}
      ${display.location ? renderLocation(data.genomic_pos, display.ideogram, data._id) : ''}
      
      <p class="${summaryClass}" ${tabIndex} ${summaryStyle}>${summary}</p>
      
      ${links ? `<div class="gene-tooltip-links">${links}</div>` : ""}
    </div>
  `;
}


        
        
        // To add:
        // - arrange the species info and icon on one line (second line) instead, with the format like "[ICON] Human, <i>Homo sapiens</i>"
// - ideogram showing location (using CSS/SVG?) (this is tricky because the API call doesn't innately have the information about the whole chromosome... where to get that? store a file in constants.ts?)
// - below ideogram, text showing chromosomal location (e.g., chr1:10,000,000-10,010,248)
// - top pathways (configurable to pick which source? e.g., KEGG as default, but allow reactome, Wikipathways etc.)
// - mini exon map (using CSS/SVG? Other tools in JS that we can leverage?)
// - top protein domains (expandable to show them?)

// - finally, ideally, we could make each component optional at the user-level
// { common: "Yeast", genus: "Saccharomyces", icon: "🧫"},