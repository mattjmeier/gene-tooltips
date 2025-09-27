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


TODO: add examples for Vue, React, Django, Node.js, RMarkdown, MyST, Jupyter?
Document CSS options