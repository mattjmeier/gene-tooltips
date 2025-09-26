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
            <strong>${data.symbol}</strong>
            <span class="gene-tooltip-name">(${data.name})</span>
        </div>
        <p class="gene-tooltip-summary">${data.summary || 'No summary available.'}</p>
        <div class="gene-tooltip-links">
            ${ncbiLink}
        </div>
    </div>
  `;
}