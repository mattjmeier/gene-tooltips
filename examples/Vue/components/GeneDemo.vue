<template>
  <span class="gene-demo-container">
    <span :class="`gene-tooltip ${uniqueClass}`" :data-species="species">
      {{ genes }}
    </span>
  </span>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import GeneTooltip from 'gene-tooltips';
import 'gene-tooltips/style.css';

// 1. Define props
const props = defineProps({
  // A string of one or more genes (e.g., "TP53, BRCA1")
  genes: {
    type: String,
    required: true
  },
  // The species for the data-attribute (e.g., "human" or "mouse")
  species: {
    type: String,
    default: 'human'
  },
  // Pass in any custom GeneTooltip config
  config: {
    type: Object,
    default: () => ({})
  },
  // Automatically generate a unique selector class
  uniqueClass: {
    type: String,
    // Generate a random string here. This function runs separately
    // for each instance and does not reference local script variables.
    default: () => `gt-rand-${Math.random().toString(36).substring(2, 9)}` 
  }
});

onMounted(() => {
  if (GeneTooltip) {
    // 2. Construct the unique selector
    const selector = `.gene-tooltip.${props.uniqueClass}`;
    
    // 3. Merge default/base config with the one passed via props
    const finalConfig = {
      selector: selector, // IMPORTANT: Isolate this instance
      truncateSummary: 3,
      display: {
        ideogram: true,
      },
      ideogram: {
        enabled: true,
        height: 100
      },
      ...props.config
    };

    // 4. Initialize the library on the unique element
    GeneTooltip.init(finalConfig);
  }
});

onUnmounted(() => {
  // Placeholder for cleanup
});
</script>