<template>
  <span class="gene-demo-container">
    <!-- Bind the ID directly. It will be null on the server and generated on the client -->
    <span :id="uniqueId" class="gene-tooltip" :data-species="species">
      {{ genes }}
    </span>
  </span>
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, ref } from 'vue';
import 'gene-tooltips/style.css';
import GeneTooltip from 'gene-tooltips';

// Use the global window object for a truly shared counter on the client.
// This is safe because `window` only exists in the browser.
if (typeof window !== 'undefined' && typeof window.__GENE_TOOLTIP_ID_COUNTER__ === 'undefined') {
  window.__GENE_TOOLTIP_ID_COUNTER__ = 0;
}

const props = defineProps({
  genes: { type: String, required: true },
  species: { type: String, default: 'human' },
  config: { type: Object, default: () => ({}) },
});

// Initialize uniqueId as null. It will have no ID during server render.
const uniqueId = ref(null);
let cleanupTooltip = null;

// This hook ONLY runs on the client.
onBeforeMount(() => {
  // Generate the unique ID just before mounting.
  uniqueId.value = `gene-tooltip-demo-${window.__GENE_TOOLTIP_ID_COUNTER__++}`;
});

onMounted(() => {
  // The element now has its unique ID in the DOM.
  if (GeneTooltip && GeneTooltip.init && uniqueId.value) {
    const selector = `#${uniqueId.value}`;
    
    const finalConfig = {
      selector: selector,
      ideogram: { enabled: true },
      ...props.config
    };

    cleanupTooltip = GeneTooltip.init(finalConfig);
  }
});

onUnmounted(() => {
  if (cleanupTooltip) {
    cleanupTooltip();
    cleanupTooltip = null; 
  }
});
</script>