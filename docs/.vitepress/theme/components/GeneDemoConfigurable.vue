<template>
  <div class="gene-demo-container">
    <p>
      Hover over the gene to see the configured tooltip: 
      <span :class="`gene-tooltip ${uniqueClass}`" data-species="human">TP53</span>.
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import GeneTooltip from 'gene-tooltips';
import 'gene-tooltips/style.css';

// Accept props to pass in the config and a unique class
const props = defineProps({
  config: Object,
  uniqueClass: {
    type: String,
    default: 'gt-demo'
  }
});

onMounted(() => {
  if (GeneTooltip) {
    // Use a unique selector to isolate this instance
    const selector = `.gene-tooltip.${props.uniqueClass}`;
    GeneTooltip.init({
      selector: selector,
      ...props.config
    });
  }
});
</script>