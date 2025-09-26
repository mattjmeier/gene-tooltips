import { describe, it, expect } from 'vitest';
import { renderTooltipHTML } from '../src/renderer';
import type { MyGeneInfoResult } from '../src/config';

describe('renderTooltipHTML', () => {
  it('should return "not found" message for null data', () => {
    const html = renderTooltipHTML(null);
    expect(html).toContain('Gene not found.');
  });
  
  it('should return "not found" message for undefined data', () => {
    const html = renderTooltipHTML(undefined);
    expect(html).toContain('Gene not found.');
  });

  it('should render a full gene data object correctly', () => {
    // Using a partial type here because we don't need all fields for the test
    const geneData: Partial<MyGeneInfoResult> = {
      symbol: 'TP53',
      name: 'tumor protein p53',
      summary: 'A critical tumor suppressor gene.',
    };
    const html = renderTooltipHTML(geneData as MyGeneInfoResult);
    expect(html).toContain('<strong>TP53</strong>');
    expect(html).toContain('(tumor protein p53)');
    expect(html).toContain('A critical tumor suppressor gene.');
  });

  it('should handle a missing summary gracefully', () => {
    const geneData: Partial<MyGeneInfoResult> = {
      symbol: 'BRCA1',
      name: 'BRCA1 DNA repair associated',
    };
    const html = renderTooltipHTML(geneData as MyGeneInfoResult);
    expect(html).toContain('<strong>BRCA1</strong>');
    expect(html).toContain('No summary available.');
  });
});