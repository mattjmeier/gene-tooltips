// ./src/renderer.ts
import type { MyGeneInfoResult } from './config';
import { SOURCES } from './constants';

interface RenderOptions {
  sources?: string[];        // which sources to show
  truncateSummary?: number;  // character limit for summary
  showSpecies?: boolean;     // show species icon or not
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

export function renderTooltipHTML(
  data: MyGeneInfoResult | null | undefined,
  options: RenderOptions = {}
): string {
  if (!data) return '<p>Gene not found.</p>';

  const { sources = ["ncbi"], truncateSummary = 200, showSpecies = true } = options;

  // Species info
  const species = showSpecies && data.taxid
    ? speciesMap[data.taxid] ?? { common: "Unknown", genus: "", icon: "❓" }
    : null;

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

  // Summary truncation
  let summary = data.summary || "No summary available.";
  if (truncateSummary && summary.length > truncateSummary) {
    summary = summary.slice(0, truncateSummary) + "…";
  }

  return `
    <div class="gene-tooltip-content" style="text-align: left; max-width: 300px;">
      <div class="gene-tooltip-header">
        ${
          species
            ? `<span class="gene-tooltip-species">${species.icon}</span>`
            : ""
        }
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
      ${
        species
          ? `<div class="gene-tooltip-species-label">${species.common} <em>${species.genus}</em></div>`
          : ""
      }
      <p class="gene-tooltip-summary">${summary}</p>
      ${links ? `<div class="gene-tooltip-links">${links}</div>` : ""}
    </div>
  `;
}
