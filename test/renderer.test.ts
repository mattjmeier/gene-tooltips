import { describe, it, expect, vi } from 'vitest';
import { renderTooltipHTML } from '../src/renderer';
import type { MyGeneInfoResult } from '../src/config';

// Mock the asset imports at the top of the file
vi.mock('../src/assets/NLM-square-logo.svg', () => ({
  default: 'mock-ncbi-logo-svg-content',
}));
vi.mock('../src/assets/ebang-400dpi.png', () => ({
  default: 'mock-ensembl-logo.png', // This will be used directly as the src
}));

// A complete mock object for thorough testing
const mockGeneData: MyGeneInfoResult = {
  _id: '7157',
  query: 'TP53',
  symbol: 'TP53',
  name: 'tumor protein p53',
  summary: 'This is a summary that is long enough to be truncated by the default settings.',
  taxid: 9606,
  genomic_pos: { chr: '17', start: 7661779, end: 7687538, strand: -1 },
  ensembl: { gene: 'ENSG00000141510' } // Add ensembl ID for link testing
};


describe('renderTooltipHTML', () => {
  it('should return "not found" message for null or undefined data', () => {
    expect(renderTooltipHTML(null)).toContain('Gene not found.');
    expect(renderTooltipHTML(undefined)).toContain('Gene not found.');
  });

  it('should render a full gene data object correctly', () => {
    const html = renderTooltipHTML(mockGeneData);
    expect(html).toContain('<strong>TP53</strong>');
    expect(html).toContain('(tumor protein p53)');
    expect(html).toContain('This is a summary');
  });

  it('should handle a missing summary gracefully', () => {
    const { summary, ...geneWithoutSummary } = mockGeneData;
    const html = renderTooltipHTML(geneWithoutSummary as MyGeneInfoResult);
    expect(html).toContain('No summary available.');
  });
  
  it('should render species information when enabled', () => {
    const html = renderTooltipHTML(mockGeneData, { display: { species: true } });
    expect(html).toContain('gene-tooltip-species');
    expect(html).toContain('🧑'); // Human icon
    expect(html).toContain('Human, <em>Homo sapiens</em>');
  });

  it('should NOT render species information when disabled', () => {
    const html = renderTooltipHTML(mockGeneData, { display: { species: false } });
    expect(html).not.toContain('gene-tooltip-species');
  });
  
  it('should render location information when enabled', () => {
    const html = renderTooltipHTML(mockGeneData, { display: { location: true } });
    expect(html).toContain('gene-tooltip-location');
    expect(html).toContain('<span class="gene-tooltip-location-chr">chr17</span>');
    expect(html).toContain('<span class="gene-tooltip-location-pos">7,661,779-7,687,538</span>');
  });
  
  it('should NOT render location information when disabled', () => {
    const html = renderTooltipHTML(mockGeneData, { display: { location: false } });
    expect(html).not.toContain('gene-tooltip-location');
  });
  
  it('should include the ideogram container when ideogram is enabled', () => {
    const html = renderTooltipHTML(mockGeneData, { display: { location: true, ideogram: true } });
    expect(html).toContain('gene-tooltip-ideo');
    expect(html).toContain('id="gene-tooltip-ideo-7157"');
  });
  
  it('should truncate the summary by default and add the correct class and style', () => {
    const html = renderTooltipHTML(mockGeneData);
    expect(html).toContain('class="gene-tooltip-summary"');
    expect(html).toContain('style="--line-clamp: 4;"');
  });
  
  it('should NOT truncate the summary when truncate is set to 0', () => {
    const html = renderTooltipHTML(mockGeneData, { truncate: 0 });
    expect(html).toContain('class="gene-tooltip-summary-full"');
    expect(html).not.toContain('--line-clamp');
  });
  
  it('should truncate the summary with a custom value', () => {
    // The default in config is 4, so let's check the test's assumption of 3.
    const html = renderTooltipHTML(mockGeneData, { truncate: 3 });
    expect(html).toContain('class="gene-tooltip-summary"');
    expect(html).toContain('style="--line-clamp: 3;"');
  });
  
  it('should render external links by default and hide them based on display options', () => {
    // Default: both should be visible
    let html = renderTooltipHTML(mockGeneData);
    expect(html).toContain('href="https://www.ncbi.nlm.nih.gov/gene/7157"');
    expect(html).toContain('src="data:image/svg+xml,mock-ncbi-logo-svg-content"');
    expect(html).toContain('href="https://www.ensembl.org/id/ENSG00000141510"');
    expect(html).toContain('src="mock-ensembl-logo.png"');

    // Disable NCBI
    html = renderTooltipHTML(mockGeneData, { display: { links: { ncbi: false } } });
    expect(html).not.toContain('href="https://www.ncbi.nlm.nih.gov/gene/7157"');
    expect(html).toContain('href="https://www.ensembl.org/id/ENSG00000141510"');

    // Disable Ensembl
    html = renderTooltipHTML(mockGeneData, { display: { links: { ensembl: false } } });
    expect(html).toContain('href="https://www.ncbi.nlm.nih.gov/gene/7157"');
    expect(html).not.toContain('href="https://www.ensembl.org/id/ENSG00000141510"');
    
    // Disable both
    html = renderTooltipHTML(mockGeneData, { display: { links: { ncbi: false, ensembl: false } } });
    expect(html).not.toContain('gene-tooltip-links-container');
  });
})