// src/gene-track.ts

import type { Instance } from 'tippy.js';
import type { MyGeneInfoResult, MyGeneExon } from './config';
import * as d3 from 'd3';

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

  // 1. Group all exon records into transcripts
  const transcripts: { [key: string]: MyGeneExon[] } = {};
  data.exons.forEach(exon => {
    const txid = `${exon.txstart}-${exon.txend}`;
    if (!transcripts[txid]) { transcripts[txid] = []; }
    transcripts[txid].push(exon);
  });

  if (Object.keys(transcripts).length === 0) {
    container.innerHTML = `<small>Exon data could not be processed.</small>`;
    return;
  }
  
  // 2. Find the key for the longest transcript
  const longestTranscriptKey = Object.keys(transcripts).sort((a, b) => transcripts[b].length - transcripts[a].length)[0];
  const transcriptExons = transcripts[longestTranscriptKey];

  // --- DIAGNOSTIC LOG 1: What is in the raw data? ---
  console.log(`[GeneTooltip] DIAGNOSTIC: Found ${transcriptExons.length} raw exon objects for transcript ${longestTranscriptKey}. First object:`, JSON.parse(JSON.stringify(transcriptExons[0])));

  // 3. Normalize the exon data into a consistent [start, end] format
  let normalizedExons: [number, number][] = [];
  const firstExon = transcriptExons[0];

  if (firstExon && firstExon.position) {
      console.log('[GeneTooltip] SUCCESS: Normalizing from "position" property.');
      normalizedExons = transcriptExons.flatMap(exon => exon.position || []);

  } else if (firstExon && typeof firstExon.start === 'number' && typeof firstExon.end === 'number') {
      console.log('[GeneTooltip] SUCCESS: Normalizing from "start"/"end" properties.');
      normalizedExons = transcriptExons.map(exon => [exon.start!, exon.end!]);

  } else if (firstExon && typeof firstExon.cdsstart === 'number' && typeof firstExon.cdsend === 'number') {
      console.log('[GeneTooltip] SUCCESS: Normalizing from fallback "cdsstart"/"cdsend" properties.');
      normalizedExons = transcriptExons.map(exon => [exon.cdsstart, exon.cdsend]);

  } else {
      console.error('[GeneTooltip] FAILURE: Could not find valid exon coordinates in the data. Bailing on gene track render.');
      container.innerHTML = `<small>Exon coordinate format not recognized.</small>`;
      return; // Stop execution if we can't process the data
  }

  // --- DIAGNOSTIC LOG 2: What is the result of normalization? ---
  console.log(`[GeneTooltip] DIAGNOSTIC: Normalization resulted in ${normalizedExons.length} coordinate pairs. First pair:`, normalizedExons[0]);


  // --- D3 Drawing Logic ---
  const margin = { top: 20, right: 10, bottom: 5, left: 10 }; // Increased top margin for the label
  const width = 290 - margin.left - margin.right;
  const height = 20; // The track itself remains this height
  const exonHeight = 10;
  const yCenter = height / 2;
  const exonY = yCenter - (exonHeight / 2);

  container.innerHTML = '';
  const svg = d3.select(container).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom) // Use the total height
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
  const geneStart = transcriptExons[0].txstart;
  const geneEnd = transcriptExons[0].txend;
  const strand = transcriptExons[0].strand;
  const xScale = d3.scaleLinear().domain([geneStart, geneEnd]).range([0, width]);
  
  // --- NEW: Add the title label ---
  const directionArrow = strand === 1 ? '→' : '←';
  svg.append("text")
    .attr("x", 0)
    .attr("y", -5) // Position above the track
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .html(`<tspan font-weight="bold">${data.symbol}</tspan> <tspan>${directionArrow}</tspan>`);

  svg.append("line").attr("x1", xScale(geneStart)).attr("y1", yCenter)
    .attr("x2", xScale(geneEnd)).attr("y2", yCenter)
    .attr("stroke", "#555").attr("stroke-width", 2);

  svg.selectAll(".exon-rect").data(normalizedExons).enter().append("rect")
    .attr("class", "exon-rect")
    .attr("x", d => xScale(d[0])) 
    .attr("y", exonY)
    .attr("width", d => Math.max(1, xScale(d[1]) - xScale(d[0])))
    .attr("height", exonHeight)
    .attr("fill", "#007bff")
    .attr("stroke", "#0056b3");

  // --- chevron drawing logic, didn't like the look of this ---
  /*
  const numChevrons = Math.floor(width / 20);
  const chevronPoints = d3.range(numChevrons).map(i => geneStart + (i + 1) * (geneEnd - geneStart) / (numChevrons + 1));
  const chevronPath = strand === 1 ? "M-2,-4 L2,0 L-2,4" : "M2,-4 L-2,0 L2,4";

  svg.selectAll(".chevron").data(chevronPoints).enter().append("path")
    .attr("class", "chevron").attr("d", chevronPath)
    .attr("transform", d => `translate(${xScale(d)}, ${yCenter})`)
    .attr("fill", "none").attr("stroke", "#555").attr("stroke-width", 1.5);
  */
}