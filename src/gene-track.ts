// src/gene-track.ts

import type { Instance } from 'tippy.js';
import type { MyGeneInfoResult, MyGeneExon } from './config';
import * as d3 from 'd3';
import tippy from 'tippy.js';

export function renderGeneTrack(instance: Instance, data: MyGeneInfoResult) {
  const containerSelector = `#gene-tooltip-track-${data._id}`;
  const container = instance.popper.querySelector<HTMLElement>(containerSelector);

  if (!container) {
    console.error(`[GeneTooltip] Gene track container '${containerSelector}' not found.`);
    return;
  }

  if (!data.exons || data.exons.length === 0) {
    container.innerHTML = `<small>Exon data not available.</small>`;
    return;
  }
  
  // === NEW SIMPLIFIED LOGIC ===

  // 1. Find the best transcript data. We'll prioritize the one with the most segments in its 'position' array.
  let bestTranscript: MyGeneExon[] | null = null;
  let maxPositions = 0;

  data.exons.forEach(exon => {
    // A transcript can be represented by a single exon object with many positions,
    // so we treat each exon object as a potential "transcript definition".
    const currentPositions = exon.position?.length || 1; // Fallback to 1 if no position array
    if (currentPositions > maxPositions) {
      maxPositions = currentPositions;
      // In the case of the data you showed, `data.exons` is the transcript.
      bestTranscript = [exon]; 
    }
  });

  // If no 'position' arrays were found, fall back to the longest transcript by object count
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

  const firstExonObj = bestTranscript[0]; // Get a representative exon to check strand
  const strand = firstExonObj.strand;


  // 2. Create a flat array of all coordinate pairs.
    //    We will add the exon number in a second pass.
    const allSegments: { coords: [number, number]; number: number }[] = [];

    bestTranscript.forEach(exonObj => {
        if (exonObj.position) {
            exonObj.position.forEach(pos => {
                allSegments.push({ coords: pos, number: 0 }); // Use 0 as a placeholder
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

    // === NEW LOGIC FOR REVERSIBLE NUMBERING ===
    const totalExons = allSegments.length;
    allSegments.forEach((segment, i) => {
        if (strand === -1) {
            // If on the reverse strand, count down from the total
            segment.number = totalExons - i;
        } else {
            // Otherwise, count up as usual
            segment.number = i + 1;
        }
    });


  // --- D3 Drawing Logic ---
  const margin = { top: 20, right: 10, bottom: 5, left: 10 }; 
  const width = 290 - margin.left - margin.right;
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
    // We already have the 'strand' variable from above
    const xScale = d3.scaleLinear().domain([geneStart, geneEnd]).range([0, width]);
    
    const directionArrow = strand === -1 ? '←' : '→'; // Changed from '1' to handle other cases
  svg.append("text")
    .attr("x", 0)
    .attr("y", -5)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .html(`<tspan font-weight="bold">${data.symbol}</tspan> <tspan>${directionArrow}</tspan>`);

  svg.append("line").attr("x1", xScale(geneStart)).attr("y1", yCenter)
    .attr("x2", xScale(geneEnd)).attr("y2", yCenter)
    .attr("stroke", "#555").attr("stroke-width", 2);

  // Now, we bind the simple `allSegments` array
  svg.selectAll(".exon-rect").data(allSegments).enter().append("rect")
    .attr("class", "exon-rect")
    .attr("x", d => xScale(d.coords[0])) 
    .attr("y", exonY)
    .attr("width", d => Math.max(1, xScale(d.coords[1]) - xScale(d.coords[0])))
    .attr("height", exonHeight)
    .attr("fill", "#007bff")
    .attr("stroke", "#0056b3")
    .each(function(d) {
        const start = d.coords[0].toLocaleString();
        const end = d.coords[1].toLocaleString();
        const exonNumber = d.number; // This now holds the correct forward/reverse number

        tippy(this as Element, {
            content: `<strong>Exon ${exonNumber}:</strong> ${start} - ${end}`,
            placement: 'top',
            allowHTML: true,
            arrow: true,
            animation: 'scale-subtle',
            theme: 'light',
      });
    });
}