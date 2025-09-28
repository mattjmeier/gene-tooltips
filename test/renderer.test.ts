import { describe, it, expect } from 'vitest';
import { renderTooltipHTML } from '../src/renderer';
import type { MyGeneInfoResult } from '../src/config';

// A complete mock object for thorough testing
const mockGeneData: MyGeneInfoResult = {
  _id: '7157',
  query: 'TP53',
  symbol: 'TP53',
  name: 'tumor protein p53',
  summary: 'This is a summary that is long enough to be truncated by the default settings.',
  taxid: 9606,
  genomic_pos: { chr: '17', start: 7661779, end: 7687538, strand: -1 }
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
    expect(html).toContain('chr17:7,661,779-7,687,538');
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
    // Default truncate is 3 lines
    const html = renderTooltipHTML(mockGeneData);
    expect(html).toContain('class="gene-tooltip-summary"');
    expect(html).toContain('style="--line-clamp: 3;"');
  });
  
  it('should NOT truncate the summary when truncate is set to 0', () => {
    const html = renderTooltipHTML(mockGeneData, { truncate: 0 });
    expect(html).toContain('class="gene-tooltip-summary-full"');
    expect(html).not.toContain('--line-clamp');
  });
  
  it('should render external links based on the sources option', () => {
    const html = renderTooltipHTML(mockGeneData, { sources: ["ncbi", "genecards"] });
    expect(html).toContain('https://www.ncbi.nlm.nih.gov/gene/7157');
    expect(html).toContain('https://www.genecards.org/cgi-bin/carddisp.pl?gene=TP53');
    expect(html).not.toContain('Ensembl');
  });

});