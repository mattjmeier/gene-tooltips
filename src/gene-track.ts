import type { Instance } from 'tippy.js';
import type { MyGeneInfoResult, MyGeneExon } from './config';
import * as d3 from 'd3'; // We'll need D3's types if installed, or use 'any'

export function renderGeneTrack(instance: Instance, data: MyGeneInfoResult) {
  const containerSelector = `#gene-tooltip-track-${data._id}`;
  const container = instance.popper.querySelector<HTMLElement>(containerSelector);

  if (!container) {
    console.error(`[GeneTooltip] Gene track container '${containerSelector}' not found.`);
    return;
  }

  // MyGene.info can return multiple transcripts' exons. We'll find the longest one.
  const transcripts: { [key: string]: MyGeneExon[] } = {};
  if (!data.exons) {
    container.innerHTML = `<small>Exon data not available.</small>`;
    return;
  }

  data.exons.forEach(exon => {
    const txid = `${exon.txstart}-${exon.txend}`;
    if (!transcripts[txid]) {
      transcripts[txid] = [];
    }
    transcripts[txid].push(exon);
  });

  const longestTranscriptKey = Object.keys(transcripts).sort((a, b) => {
    const aLen = parseInt(a.split('-')[1]) - parseInt(a.split('-')[0]);
    const bLen = parseInt(b.split('-')[1]) - parseInt(b.split('-')[0]);
    return bLen - aLen;
  })[0];

  const exons = transcripts[longestTranscriptKey];
  if (!exons || exons.length === 0) {
    container.innerHTML = `<small>Exon data not available.</small>`;
    return;
  }

  // --- D3 Drawing Logic ---
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 290 - margin.left - margin.right;
  const height = 40 - margin.top - margin.bottom;

  // Clear previous drawing
  container.innerHTML = '';
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const geneStart = exons[0].txstart;
  const geneEnd = exons[0].txend;
  const strand = exons[0].strand;

  const xScale = d3.scaleLinear()
    .domain([geneStart, geneEnd])
    .range([0, width]);

  // Draw the intron line (the full transcript)
  svg.append("line")
    .attr("x1", xScale(geneStart))
    .attr("y1", height / 2)
    .attr("x2", xScale(geneEnd))
    .attr("y2", height / 2)
    .attr("stroke", "#555")
    .attr("stroke-width", 2);

  // Draw the exons
  svg.selectAll("rect")
    .data(exons)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.start))
    .attr("y", 0)
    .attr("width", d => xScale(d.end) - xScale(d.start))
    .attr("height", height)
    .attr("fill", "#007bff")
    .attr("stroke", "#0056b3");

  // Add directionality chevrons on the intron line (optional but nice)
  const numChevrons = Math.floor(width / 20);
  const chevronPoints = d3.range(numChevrons).map(i => geneStart + (i + 1) * (geneEnd - geneStart) / (numChevrons + 1));
  
  const chevronPath = strand === 1 ? "M-2,-4 L2,0 L-2,4" : "M2,-4 L-2,0 L2,4";

  svg.selectAll(".chevron")
    .data(chevronPoints)
    .enter()
    .append("path")
    .attr("class", "chevron")
    .attr("d", chevronPath)
    .attr("transform", d => `translate(${xScale(d)}, ${height / 2})`)
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-width", 1.5);
}