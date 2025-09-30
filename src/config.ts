import type { Props } from 'tippy.js';

// Define the shape of the data we expect from mygene.info
export interface GenomicPosition {
  chr: string;
  start: number;
  end: number;
  strand: number;
}

export interface MyGenePathway {
  name: string;
  id: string;
}

export interface MyGeneInterproDomain {
  desc: string;
  id: string;
  short_desc: string;
}

export interface MyGeneInfoResult {
  _id: string;
  query: string;
  symbol: string;
  name: string;
  summary?: string;
  taxid: number;
  genomic_pos?: GenomicPosition | GenomicPosition[];
  pathway?: {
    reactome?: MyGenePathway[] | MyGenePathway;
    kegg?: MyGenePathway[] | MyGenePathway;
    wikipathways?: MyGenePathway[] | MyGenePathway;
  };
  interpro?: MyGeneInterproDomain[] | MyGeneInterproDomain;
  exons?: MyGeneExon[];
}


// Define the components that can be shown or hidden
export interface TooltipDisplayConfig {
  species: boolean;
  location: boolean;
  ideogram: boolean;
  pathways: boolean;
  domains: boolean;
  geneTrack: boolean;
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
  pathwaySource: 'reactome' | 'kegg' | 'wikipathways';
  pathwayCount: number; // Number of pathways to show before "more"
  domainCount: number; // Number of domains to show before "more"
}

export interface MyGeneExon {
  cdsend: number;
  cdsstart: number;
  chr: string;
  strand: number;
  txend: number;
  txstart: number;
  // Make all possible coordinate formats optional
  position?: [number, number][]; 
  start?: number;                 
  end?: number;                   
}






export const defaultConfig: GeneTooltipConfig = {
  selector: '.gene-tooltip',
  api: 'mygene',
  prefetch: 'smart',
  prefetchThreshold: 15,
  truncateSummary: 4,
  display: {
    species: true,
    location: true,
    ideogram: true,
    pathways: true,
    domains: true,
    geneTrack: true,
  },
  ideogram: {
    enabled: true,
    height: 100,
    showLabels: false,
  },
  pathwaySource: 'reactome',
  pathwayCount: 3,
  domainCount: 3,
  tippyOptions: {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    theme: 'light',
  },
};
