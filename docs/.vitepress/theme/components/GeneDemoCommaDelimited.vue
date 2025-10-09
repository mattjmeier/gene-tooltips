<template>
  <div class="gene-demo-container">
    <p style="font-size: 1.2em; line-height: 1.8;">
      Here are a bunch of human genes, separated by commas:
      <span class="gene-tooltip" data-species="human">
        TP53, GADD45A, BRCA1, BRCA2, RAD51, ATM, XPA, NOTAGENE
      </span>
    </p>
  </div>
</template>

<script setup>
// Use Vue's onMounted lifecycle hook. This is the correct way to
// run code after the component has been added to the page,
// similar to 'DOMContentLoaded'.
import { onMounted } from 'vue';

// We can import the JS and CSS from the installed package
import GeneTooltip from 'gene-tooltips';
import 'gene-tooltips/style.css';

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