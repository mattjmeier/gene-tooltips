import type { Props } from 'tippy.js';

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

export interface GeneRIF {
  pubmed: number;
  text: string;
}

// Define the shape of the data we expect from mygene.info
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
  ensembl?: {
    gene: string;
    protein?: string[] | string;
    transcript?: string[] | string;
  };
  pdb?: string[] | string;
  wikipedia?: {
    url_stub?: string;
  };
  generif?: GeneRIF[] | GeneRIF;
}

// Define the components that can be shown or hidden
export interface TooltipDisplayConfig {
  species: boolean;
  location: boolean;
  ideogram: boolean;
  pathways: boolean;
  domains: boolean;
  geneTrack: boolean;
  transcripts: boolean;
  structures: boolean;
  generifs: boolean;
  links: {
    ncbi?: boolean;
    ensembl?: boolean;
    wikipedia?: boolean;
  };
}

// Ideogram configuration
export interface IdeogramConfig {
  enabled: boolean;
  width: number;
  height: number;
  showLabels: boolean;
}

// Define the shape of the library's configuration object
export interface GeneTooltipConfig {
  selector: string;
  api: 'mygene';
  prefetch: 'smart' | 'all' | 'none';
  prefetchThreshold: number;
  truncateSummary: number;
  theme: string;
  display: Partial<TooltipDisplayConfig>;
  ideogram: Partial<IdeogramConfig>;
  tippyOptions: Partial<Props>;
  pathwaySource: 'reactome' | 'kegg' | 'wikipathways';
  pathwayCount: number;
  domainCount: number;
  transcriptCount: number;
  structureCount: number;
  generifCount: number;
  tooltipWidth?: number;
  tooltipHeight?: number; // This is an explicit max-height
  constrainToViewport: boolean;
}

export interface MyGeneExon {
  cdsend: number;
  cdsstart: number;
  chr: string;
  strand: number;
  txend: number;
  txstart: number;
  position?: [number, number][]; // Make all possible coordinate formats optional
  start?: number;                 
  end?: number;                   
}

export const defaultConfig: GeneTooltipConfig = {
  selector: '.gene-tooltip',
  api: 'mygene',
  prefetch: 'smart',
  prefetchThreshold: 15,
  truncateSummary: 4,
  theme: 'auto',
  constrainToViewport: true,
  display: {
    species: true,
    location: true,
    ideogram: true,
    pathways: true,
    domains: true,
    geneTrack: true,
    transcripts: true,
    structures: true,
    generifs: true,
    links: {
      ncbi: true,
      ensembl: true,
      wikipedia: true,
    },
  },
  ideogram: {
    enabled: true,
    height: 100,
    showLabels: false,
  },
  pathwaySource: 'kegg',
  pathwayCount: 3,
  domainCount: 3,
  transcriptCount: 3,
  structureCount: 3,
  generifCount: 3,
  tippyOptions: {
    allowHTML: true,
    interactive: true,
    placement: 'bottom',
    popperOptions: {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'preventOverflow',
          options: { boundary: 'viewport', padding: 8 },
        },
        {
          name: 'flip',
          options: { fallbackPlacements: ['top', 'right', 'left'], boundary: 'viewport', padding: 8 },
        }
      ],
    }
  }
};
