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
  name: string;
  summary?: string;
  taxid: number;
  genomic_pos?: GenomicPosition | GenomicPosition[];
}

// Define the components that can be shown or hidden
export interface TooltipDisplayConfig {
  species: boolean;
  location: boolean;
  ideogram: boolean;
}

// Ideogram configuration
export interface IdeogramConfig {
  enabled: boolean;
  width: number;
  height: number;
  showLabels: boolean;
  // assetPath?: string;
}


// Define the shape of our library's configuration object
export interface GeneTooltipConfig {
  selector: string;
  api: 'mygene';
  prefetch: 'smart' | 'all' | 'none';
  prefetchThreshold: number;
  truncateSummary: number;
  display: Partial<TooltipDisplayConfig>;
  ideogram: Partial<IdeogramConfig>;
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
    ideogram: true,
  },
  ideogram: {
    enabled: true,
    height: 100,
    showLabels: false,
    // Default assetPath is the vendor folder.
    // Can also provide a custom local version here instead.
    // Or, you can use a CDN:
    // 'https://unpkg.com/ideogram@1.53.0/dist/js/ideogram.min.js'
    // assetPath: '/dist/vendor/ideogram.min.js', 
  },
  tippyOptions: {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    theme: 'light',
  },
};