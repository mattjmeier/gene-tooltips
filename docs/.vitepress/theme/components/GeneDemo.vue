<template>
  <div class="gene-demo-container">
    <p style="font-size: 1.2em; line-height: 1.8;">
      The protein encoded by <span class="gene-tooltip" data-species="human">TP53</span> is a tumor suppressor.
      In mice, the ortholog is <span class="gene-tooltip" data-species="mouse">Trp53</span>.
      This is a well-known gene from the fruit fly: <span class="gene-tooltip" data-species="7227">dib</span>.
      Here is one from yeast: <span class="gene-tooltip" data-species="559292">RAD51</span>.
    </p>
  </div>
</template>

<script setup>
// Use Vue's onMounted lifecycle hook. This is the correct way to
// run code after the component has been added to the page,
// similar to 'DOMContentLoaded'.
import { onMounted } from 'vue';

// We can import the JS and CSS directly!
// Vite will handle bundling them correctly.
// Make sure the paths are correct relative to this .vue file.
// Let's assume your '.vitepress' directory is at the root of your docs.
import GeneTooltip from '../../../../dist/gene-tooltips.esm.js';
import '../../../../dist/gene-tooltips.css';
onMounted(() => {
  // Now, use the imported module directly instead of the window object.
  if (GeneTooltip) {
    GeneTooltip.init({
      truncateSummary: 3,
      display: {
          ideogram: true
      },
      ideogram: {
          enabled: true,
          height: 100
      }
    });
  }
});

</script>