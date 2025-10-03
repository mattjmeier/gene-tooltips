# Framework Integration

Gene Tooltip JS is framework-agnostic. Here's how to correctly initialize it in popular frameworks. The key is to call `GeneTooltip.init()` after the component has mounted and the DOM elements are available.

## React

Use the `useEffect` hook to initialize the tooltip when the component mounts.

```jsx
import React, { useEffect } from 'react';
import GeneTooltip from 'gene-tooltip';
import 'gene-tooltip/dist/css/main.css';

function MyComponent() {
  useEffect(() => {
    // Initialize tooltips on elements with the class '.gene'
    const tooltip = GeneTooltip.init({
        selector: '.gene'
    });
    
    // It's good practice to have a cleanup function,
    // though this library doesn't currently provide a destroy method.
    // return () => tooltip.destroy(); 
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <p>
        Here is a human gene: <span className="gene" data-species="human">TP53</span>.
      </p>
      <p>
        And a mouse gene: <span className="gene" data-species="mouse">Trp53</span>.
      </p>
    </div>
  );
}
```

## Vue

Use the onMounted lifecycle hook in the Composition API.

```js-vue
<template>
  <div>
    <p>
      Here is a human gene: <span class="gene" data-species="human">TP53</span>.
    </p>
    <p>
      And a fruitfly gene: <span class="gene" data-species="7227">CycE</span>.
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import GeneTooltip from 'gene-tooltip';
import 'gene-tooltip/dist/css/main.css';

onMounted(() => {
  GeneTooltip.init({
    selector: '.gene'
  });
});
</script>
```