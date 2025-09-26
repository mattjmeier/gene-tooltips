# Live Demo

Hover over the gene names below to see the library in action. This isn't a screenshot—it's the actual library running on this page.

## Example Genes

<p style="font-size: 1.2em; line-height: 1.8;">
  The protein encoded by <span class="gene-tooltip" data-species="human">TP53</span> is a tumor suppressor.
  In mice, the ortholog is <span class="gene-tooltip" data-species="mouse">Trp53</span>.
  This is a well-known gene from the fruit fly: <span class="gene-tooltip" data-species="7227">Dop2</span>.
  Here is one from yeast: <span class="gene-tooltip" data-species="559292">STE2</span>.
</p>

<script src="../dist/gene-tooltip.umd.js"></script>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            GeneTooltip.init();
        });
</script>