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
  const isGlobal = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.GeneTooltip !== 'undefined';
  
  // For UMD/IIFE (browser global) builds, we can't rely on import() 
  // because it's configured as 'external'.
  if (isGlobal) {
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
  
  const ideoDivInPopper = instance.popper.querySelector(`.gene-tooltip-ideo`) as HTMLElement;

  try {
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
    if (!organism) {
        ideoDiv.innerHTML = '<small>Ideogram not available for this species.</small>';
        return;
    }

    // Get the theme from the main instance
    const parentInstance = instance;

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
      showAnnotTooltip: false,
      onClickAnnot: function() {},
      onDrawAnnots: function() {
        const containerElement = instance.popper.querySelector(ideogramContainerSelector);

        if (!containerElement) {
            console.error(`[GeneTooltip] CRITICAL: Could not find the ideogram container element ('${ideogramContainerSelector}') after it was drawn.`);
            return;
        }

        const annotElements = containerElement.querySelectorAll('.annot');

        if (annotElements.length === 0) {
            console.warn('[GeneTooltip] Could not find any .annot elements to attach tooltips to.');
            return;
        }

        tippy(annotElements, {
          content: `<b>${data.symbol}</b><br>chr${chromosome}:${genomicPos.start.toLocaleString()}-${genomicPos.end.toLocaleString()}`,
          allowHTML: true,
          placement: 'top',
          appendTo: instance.popper,
          //theme: currentTheme, // Use the same theme as parent
          animation: 'scale-subtle',
          zIndex: 99999,
          onShow(nestedInstance){
            const currentParentTheme = (parentInstance.props as any).theme || 'auto';
            nestedInstance.setProps({ theme: currentParentTheme });
          }
        });
      },
    };

    new Ideogram(configForIdeogram);

  } catch (error) {
    console.error('[GeneTooltip] Ideogram failed to render:', error);
    if (ideoDivInPopper) {
      ideoDivInPopper.innerHTML = '<small>Ideogram not installed or failed to load.</small>';
    }
  }
}

