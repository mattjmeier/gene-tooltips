import type { Props } from 'tippy.js';

// Define the shape of the data we expect from mygene.info
export interface GenomicPosition {
  chr: string;
  start: number;
  end: number;
  strand: number;
}

export interface MyGeneInfoResult {
  _id: string;
  query: string;
  symbol: string;
  name:string;
  summary?: string;
  taxid: number;
  genomic_pos?: GenomicPosition | GenomicPosition[];
  // Add other fields you might use from the API
}

// Define the components that can be shown or hidden
export interface TooltipDisplayConfig {
  species: boolean;
  location: boolean;
}

// Define the shape of our library's configuration object
export interface GeneTooltipConfig {
  selector: string;
  api: 'mygene';
  prefetch: 'smart' | 'all' | 'none';
  prefetchThreshold: number;
    /**
   * The maximum number of lines to show for a gene summary before truncating.
   * Set to 0 to disable truncation.
   * @default 3
   */
  truncateSummary: number;
  /**
   * Control which informational components are displayed in the tooltip.
   */
  display: Partial<TooltipDisplayConfig>;
  tippyOptions: Partial<Props>;
}

export const defaultConfig: GeneTooltipConfig = {
  selector: '.gene-tooltip',
  api: 'mygene',
  prefetch: 'smart',
  prefetchThreshold: 15,
  truncateSummary: 3,
  display: {
    species: true,
    location: true,
  },
  tippyOptions: {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    theme: 'light',
  },
};