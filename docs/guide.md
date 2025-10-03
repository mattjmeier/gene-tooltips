# Getting Started

This guide will walk you through installing and configuring Gene Tooltip JS.

## Installation

You can install the package via npm:

```bash
npm install gene-tooltip
```

Or include it directly in your HTML from a CDN like unpkg:

```html
<script src="https://unpkg.com/gene-tooltip/dist/gene-tooltip.umd.js"></script>
```

# Basic Usage

Once the script is loaded, you can initialize it. Add the class `gene-tooltip` and a `data-species` attribute to any `<span>` element.

```html
<p>
  Here is a human gene: <span class="gene-tooltip" data-species="human">TP53</span>.
  And here is a mouse gene: <span class="gene-tooltip" data-species="mouse">Trp53</span>.
</p>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        GeneTooltip.init({
            // Your optional configuration here
        });
    });
</script>
```

## Configuration

You can customize the tooltip by passing a configuration object to `GeneTooltip.init()`. Here are some common examples.

### Changing Displayed Sections

Hide the ideogram and protein domains sections.

```javascript
GeneTooltip.init({
    display: {
        ideogram: false,
        domains: false
    }
});
```

### Changing Pathway Source

Show pathways from KEGG instead of the default Reactome.

```javascript
GeneTooltip.init({
    pathwaySource: 'kegg'
});
```

*Note: The gene must have KEGG pathway data available at mygene.info for this to display.*

### Adjusting Tooltip Size and Truncation

Create a wider tooltip and show more of the summary initially.

```javascript
GeneTooltip.init({
    tooltipWidth: 400, // in pixels
    truncateSummary: 6 // number of lines
});
```

### Styling

The tooltip is styled with CSS variables that you can easily override. Create your own CSS file and include it after the library's CSS to customize the appearance.

```css
/* my-styles.css */
:root {
  --gt-color-primary: #d946ef; /* Use a different primary color */
  --gt-border-color: #444;   /* Darker borders for a custom theme */
}
```



TODO: add examples for Vue, React, Django, Node.js, RMarkdown, MyST, Jupyter?
Document CSS options