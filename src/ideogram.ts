// ./src/ideogram.ts

import type { Instance } from 'tippy.js';
import type { MyGeneInfoResult, IdeogramConfig } from './config';
import { speciesMap } from './constants';
import tippy from 'tippy.js';

let ideogramModulePromise: Promise<any> | null = null;

//  Checking for module or global mode
async function getIdeogram() {
  if (ideogramModulePromise) {
    return ideogramModulePromise;
  }
  
  // Check for Ideogram as a global variable first
  if ((window as any).Ideogram) {
    return Promise.resolve((window as any).Ideogram);
  }
  
  // Use a standard function to check the environment
  const isUMD = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.GeneTooltip !== 'undefined';
  
  // For UMD/IIFE (browser global) builds, we can't rely on import() 
  // because it's configured as 'external'.
  if (isUMD) {
      const errorMsg = `[GeneTooltip] Ideogram global variable not found.
Please ensure the Ideogram script is loaded on the page
before initializing GeneTooltip, or use the ESM/CJS build.`;
      console.error(errorMsg);
      // Rejecting ensures the error handling in renderIdeogram is executed
      return Promise.reject(new Error(errorMsg)); 
  }

  // 1. For ESM/CJS (Modern module) builds, use the dynamic import:
  ideogramModulePromise = import('ideogram')
    .then(module => module.default)
    .catch(error => {
      const errorMsg = `[GeneTooltip] Failed to load Ideogram. 
Please ensure 'ideogram' is installed (it's a peer dependency).`;
      console.error(errorMsg, error);
      return Promise.reject(new Error(errorMsg)); 
    });

  return ideogramModulePromise;
}

// The render function remains mostly the same, but calls the new loader
export async function renderIdeogram(instance: Instance, data: MyGeneInfoResult, ideogramConfig: Partial<IdeogramConfig>) {
  console.log('[GeneTooltip] Starting renderIdeogram for:', data.symbol);

  // The Ideogram container element might not exist if the user has a slow connection 
  // or if the component is being rapidly hidden/shown.
  const ideoDivInPopper = instance.popper.querySelector(`.gene-tooltip-ideo`) as HTMLElement;

  try {
    // 1. Load the Ideogram constructor dynamically
    const Ideogram = await getIdeogram();
    
    if (!Ideogram) {
        if (ideoDivInPopper) ideoDivInPopper.innerHTML = '<small>Ideogram unavailable</small>';
        return;
    }
    const ideogramContainerSelector = `#gene-tooltip-ideo-${data._id}`;
    const ideoDiv = instance.popper.querySelector(ideogramContainerSelector) as HTMLElement;

    if (!ideoDiv) {
      console.error(`[GeneTooltip] CRITICAL: Ideogram container '${ideogramContainerSelector}' not found.`);
      return;
    }

    const genomicPos = Array.isArray(data.genomic_pos) ? data.genomic_pos[0] : data.genomic_pos!;
    if (!genomicPos) {
      ideoDiv.innerHTML = '<small>No genomic position</small>';
      return;
    }
    
    let chromosome = String(genomicPos.chr);
    if (chromosome.toLowerCase().startsWith('chr')) {
      chromosome = chromosome.substring(3);
    }

    const organism = speciesMap[data.taxid]?.ideogramName;
    // If the organism isn't supported by Ideogram, we can't render it.
    if (!organism) {
      ideoDiv.innerHTML = '<small>Ideogram not available for this species.</small>';
      console.warn(`[GeneTooltip] Ideogram not rendered: species with taxid ${data.taxid} is not configured for Ideogram.`);
      return;
    }

    const configForIdeogram = {
      container: ideogramContainerSelector,
      organism,
      chromosome: chromosome,
      chrHeight: ideogramConfig.height ?? 100,
      orientation: 'horizontal',
      showChromosomeLabels: false,
      chrMargin: 1,
      showBandLabels: ideogramConfig.showLabels ?? true,
      annotations: [{
        name: data.symbol,
        chr: chromosome,
        start: genomicPos.start,
        stop: genomicPos.end
      }],
      onWillShowAnnotTooltip: (annot: {
        annots: { chr: any, annot: HTMLElement }[] 
      }) => {
        // Get the actual SVG path element from the annotation object
        const annotEl = annot.annots[0]?.annot;
        
        // Ensure the element exists and doesn't already have a tippy instance
        if (annotEl && !(annotEl as any)._tippy) {
          tippy(annotEl as Element, {
            content: data.symbol,
            placement: 'top',
            // Append the tooltip to the main popper so it's positioned correctly.
            appendTo: instance.popper, 
            // This helps Tippy understand its positioning context
            popperOptions: {
              strategy: 'absolute',
            },
          });
        }
        
        // Return false to prevent Ideogram from creating its own misplaced tooltip.
        return false; 
      },
    };

    new Ideogram(configForIdeogram);
    console.log('[GeneTooltip] Ideogram initialized.');

  } catch (error) {
    console.error('[GeneTooltip] Ideogram failed to render:', error);
    if (ideoDivInPopper) {
      // Show error to the user if the import failed
      ideoDivInPopper.innerHTML = '<small>Ideogram not installed or failed to load.</small>';
    }
  }
}