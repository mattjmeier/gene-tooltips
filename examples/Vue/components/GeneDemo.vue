<template>
  <span class="gene-demo-container">
    <span :class="`gene-tooltip`" :data-species="species">
      {{ genes }}
    </span>
  </span>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import 'gene-tooltips/style.css';
import GeneTooltip from 'gene-tooltips';

const props = defineProps({
  genes: { type: String, required: true },
  species: { type: String, default: 'human' },
  config: { type: Object, default: () => ({}) },
});

let cleanupTooltip = null;

onMounted(() => {
  if (GeneTooltip && GeneTooltip.init) {
    const selector = `.gene-tooltip`;
    
    const finalConfig = {
      selector: selector,
      // Default config for the demo
      ideogram: { enabled: true },
      ...props.config // Allow user overrides
    };

    // Initialize and store the cleanup function
    cleanupTooltip = GeneTooltip.init(finalConfig);
  }
});

onUnmounted(() => {
  // Use the cleanup function when the component is removed
  if (cleanupTooltip) {
    cleanupTooltip();
    cleanupTooltip = null; 
  }
});
</script>