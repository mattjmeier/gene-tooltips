# Detailed Configuration Options

The `GeneTooltip.init()` method accepts a configuration object to customize the tooltip's appearance, behavior, and content. Below are the primary options available, with live examples for each.

No options need to be specified; the library provides sensible defaults.

```javascript
GeneTooltip.init({
    // Your configuration object here
});
```
Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" />

## General Behavior

These options control the core functionality of the tooltip library.

* `selector` (string): The CSS selector for elements that should trigger a tooltip. **Default:** `'.gene-tooltip'`.
* `theme` (string): The visual theme for the tooltip. It supports any built-in [Tippy.js theme](https://atomiks.github.io/tippyjs/v6/themes/) like `light`, `light-border`, `material`, or `translucent`. **Default:** `'light'`.
* `prefetch` ('smart' | 'all' | 'none'): The data prefetching strategy.
    * `'smart'`: Fetches data for tooltips when the user hovers over a parent element.
    * `'all'`: Fetches data for all tooltips on the page as soon as `init()` is called.
    * `'none'`: Fetches data only when the user hovers directly over a gene.
* `tippyOptions` (object): An object of options passed directly to the underlying Tippy.js instance. This allows for advanced customization of animations, placement, delays, and more. See the [Tippy.js documentation](https://atomiks.github.io/tippyjs/v6/all-props/) for all possibilities.

### Example: changing the theme and placement

Here we'll use the `material` theme and change the placement to the `'right'`. You can pass any other Tippy.js options like this, too.

```javascript
GeneTooltip.init({
  theme: 'material',
  tippyOptions: {
    placement: 'right'
  }
});
```

Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" :config="{ theme: 'material', tippyOptions: { placement: 'right' } }" />

## Content and Display

You have fine-grained control over which sections appear in the tooltip.

### Hiding and Showing Sections

The `display` object contains boolean flags to toggle entire sections of the tooltip.

```javascript
// Structure of the 'display' object
display: {
  species: boolean;
  location: boolean;
  ideogram: boolean;
  pathways: boolean;
  domains: boolean;
  geneTrack: boolean;
  transcripts: boolean;
  structures: boolean;
  generifs: boolean;
  links: {
    ncbi?: boolean;
    ensembl?: boolean;
    wikipedia?: boolean;
  };
}
```

### Example: A Minimalist Tooltip

Let's create a very simple tooltip that only shows the summary, location, and NCBI link.

```javascript
GeneTooltip.init({
  display: {
    species: false,
    ideogram: false,
    pathways: false,
    domains: false,
    geneTrack: false,
    transcripts: false,
    structures: false,
    generifs: false,
    links: {
      ensembl: false,
      ncbi: false,
      wikipedia: false
    }
  }
});
```
Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" :config="{ display: { species: false, ideogram: false, pathways: false, domains: false, geneTrack: false, transcripts: false, structures: false, generifs: false, links: { ensembl: false, ncbi: false, wikipedia: false } } }" />

## Sizing and Truncation

These options control the size of the tooltip and how much content is shown initially.

* `tooltipWidth` (number): The width of the tooltip in pixels.
* `truncateSummary` (number): The number of lines to show in the summary before displaying a "more" button.
* `pathwayCount` (number): The number of pathways to show initially.
* `domainCount` (number): The number of protein domains to show initially.
* `transcriptCount` (number): The number of transcripts to show initially.
* `structureCount` (number): The number of PDB structures to show initially.
* `generifCount` (number): The number of GeneRIFs to show initially.

### Example: Wider Tooltip with More Content

Let's make a wider, shorter tooltip and show more pathways and a longer summary from the start.

```javascript
GeneTooltip.init({
  tooltipWidth: 600,
  tooltipHeight: 400,
  truncateSummary: 6,
  pathwayCount: 5,
});
```
Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" :config="{ tooltipWidth: 600, tooltipHeight: 400, truncateSummary: 6}" />

## Section-Specific Configuration

Some sections have their own dedicated configuration objects for more detailed control.

### Pathway Source

* `pathwaySource` ('reactome' | 'kegg' | 'wikipathways'): The database to use for pathway information. **Default:** `'reactome'`. *Note: The gene must have data available from the selected source.*

### Example: Using Wikipathways for Pathways

```javascript
GeneTooltip.init({
  pathwaySource: 'wikipathways'
});
```

Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" :config="{ pathwaySource: 'wikipathways' }" />

### Ideogram Configuration

The `ideogram` object controls the chromosome visualization. In this way, you can pass along any properties to the [`ideogram.js`](https://github.com/eweitz/ideogram/blob/master/api.md) API.

```javascript
// Structure of the 'ideogram' object
ideogram: {
  enabled: boolean;
  width: number;
  height: number;
  showLabels: boolean;
}
```

### Example: A Larger Ideogram with Labels

Let's increase the height of the ideogram and show the chromosome labels.

```javascript
GeneTooltip.init({
  ideogram: {
    height: 150,
    showLabels: true
  }
});
```

Hover over the gene to see the configured tooltip: <GeneDemo genes="TP53" species="human" :config="{ ideogram: { height: 150, showLabels: true } }" />