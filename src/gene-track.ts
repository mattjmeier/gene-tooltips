import type { Instance } from 'tippy.js';
import type { MyGeneInfoResult, MyGeneExon } from './config';
import tippy from 'tippy.js';
// 1. Import the D3 type definitions
import type * as D3 from 'd3';

let d3ModulePromise: Promise<typeof D3 | null> | null = null;

// 2. Update the function signature to use the imported type
export async function getD3(): Promise<typeof D3 | null> {
    if (d3ModulePromise) {
        return d3ModulePromise;
    }

    // Check for D3 as a global variable first
    if ((window as any).d3) {
        // We cast here to tell TS that the global d3 matches the D3 module type
        d3ModulePromise = Promise.resolve((window as any).d3 as typeof D3);
        return d3ModulePromise;
    }

    // For ESM/CJS builds, use dynamic import
    d3ModulePromise = import('d3')
        .catch(error => {
            const errorMsg = `[GeneTooltip] Failed to load d3.js. 
Please ensure 'd3' is installed (it's a peer dependency) or the script is loaded on the page.`;
            console.error(errorMsg, error);
            return Promise.reject(new Error(errorMsg));
        });

    return d3ModulePromise;
}

export async function renderGeneTrack(
  instance: Instance, 
  data: MyGeneInfoResult, 
  uniqueId: string,
  tooltipWidth?: number
) {

    const container = instance.popper.querySelector<HTMLElement>(`#gene-tooltip-track-${uniqueId}`);
    if (!container) {
        console.error(`[GeneTooltip] Gene track container '#gene-tooltip-track-${uniqueId}' not found.`);
        return;
    }
    // Show loader
    container.innerHTML = `<div class="gt-loader-container"><div class="gt-spinner"></div><span>Loading...</span></div>`;

    // Define the shape of our data object
    type ExonSegment = {
        coords: [number, number];
        number: number;
    };

    try {
        const d3 = await getD3();
        if (!d3) {
          container.innerHTML = `<small>Gene track library (d3) not found.</small>`;
          return;
        }

        if (!data.exons || data.exons.length === 0) {
            container.innerHTML = `<small>Exon data not available.</small>`;
            return;
        }

        // 1. Find the best transcript data
        let bestTranscript: MyGeneExon[] | null = null;
        let maxPositions = 0;

        data.exons.forEach(exon => {
          const currentPositions = exon.position?.length || 1;
          if (currentPositions > maxPositions) {
            maxPositions = currentPositions;
            bestTranscript = [exon]; 
          }
        });

        if (!bestTranscript) {
          const transcripts: { [key: string]: MyGeneExon[] } = {};
          data.exons.forEach(exon => {
              const txid = `${exon.txstart}-${exon.txend}`;
              if (!transcripts[txid]) { transcripts[txid] = []; }
              transcripts[txid].push(exon);
          });
          const longestTranscriptKey = Object.keys(transcripts).sort((a, b) => transcripts[b].length - transcripts[a].length)[0];
          bestTranscript = transcripts[longestTranscriptKey];
        }

        const firstExonObj = bestTranscript[0];
        const strand = firstExonObj.strand;

        // 2. Create a flat array of all coordinate pairs
        const allSegments: { coords: [number, number]; number: number }[] = [];
        bestTranscript.forEach(exonObj => {
            if (exonObj.position) {
                exonObj.position.forEach(pos => {
                    allSegments.push({ coords: pos, number: 0 });
                });
            } else if (exonObj.start && exonObj.end) {
                allSegments.push({ coords: [exonObj.start, exonObj.end], number: 0 });
            } else if (exonObj.cdsstart && exonObj.cdsend) {
                allSegments.push({ coords: [exonObj.cdsstart, exonObj.cdsend], number: 0 });
            }
        });

        if (allSegments.length === 0) {
            container.innerHTML = `<small>Exon coordinate format not recognized.</small>`;
            return;
        }

        const totalExons = allSegments.length;
        allSegments.forEach((segment, i) => {
            segment.number = (strand === -1) ? totalExons - i : i + 1;
        });

        // --- D3 Drawing Logic ---
        // Use the provided tooltipWidth, otherwise fall back to a default.
        // Subtract margins and some padding for a good fit.
        const margin = { top: 20, right: 10, bottom: 5, left: 10 };
        const availableWidth = tooltipWidth ? tooltipWidth - 30 : 290; 
        const width = availableWidth - margin.left - margin.right;
        const height = 20;
        const exonHeight = 10;
        const yCenter = height / 2;
        const exonY = yCenter - (exonHeight / 2);

        container.innerHTML = '';
        const svg = d3.select(container).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const geneStart = firstExonObj.txstart;
        const geneEnd = firstExonObj.txend;
        const xScale = d3.scaleLinear().domain([geneStart, geneEnd]).range([0, width]);
        const directionArrow = strand === -1 ? '←' : '→';

        svg.append("text")
            .attr("x", 0).attr("y", -5)
            .attr("font-family", "sans-serif").attr("font-size", "12px")
            .html(`<tspan font-weight="bold">${data.symbol}</tspan> <tspan>${directionArrow}</tspan>`);

        svg.append("line")
            .attr("x1", xScale(geneStart)).attr("y1", yCenter)
            .attr("x2", xScale(geneEnd)).attr("y2", yCenter)
            .attr("stroke", "#555").attr("stroke-width", 2);
        
        // Provide the Element type and Data type to selectAll
        svg.selectAll<SVGRectElement, ExonSegment>(".exon-rect")
            .data(allSegments)
            .enter().append("rect")
            .attr("class", "exon-rect") // This class is now used for styling
            .attr("x", d => xScale(d.coords[0]))
            .attr("y", exonY)
            .attr("width", d => Math.max(1, xScale(d.coords[1]) - xScale(d.coords[0])))
            .attr("height", exonHeight)
            .each(function(this: SVGRectElement, d) {
                const start = d.coords[0].toLocaleString();
                const end = d.coords[1].toLocaleString();
                const exonNumber = d.number;

                const parentInstance = instance;

                tippy(this, {
                    content: `<strong>Exon ${exonNumber}:</strong> ${start} - ${end}`,
                    placement: 'top',
                    allowHTML: true,
                    arrow: true,
                    animation: 'scale-subtle',
                    onShow(nestedInstance) {
                        const currentParentTheme = (parentInstance.props as any).theme || 'auto';
                        nestedInstance.setProps({ theme: currentParentTheme });
                    }
                });
            });
    } catch (error) {
        console.error(error);
        if (container) {
            container.innerHTML = `<small>Gene track library (d3) not found.</small>`;
        }
    }
}
