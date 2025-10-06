# gene-tooltips

A framework-agnostic JavaScript/TypeScript library for displaying interactive gene information tooltips.

## Features
- Display rich tooltips based on [Tippy.js](https://atomiks.github.io/tippyjs/) for genes in any HTML file
- Framework-agnostic: works with vanilla JS, React, Vue, etc.
- Optional integration with [D3.js](https://d3js.org) and [Ideogram](https://github.com/eweitz/ideogram)

## Installation
```bash
npm install gene-tooltips
```

## Usage

At minimum, you must include the javascript code for this project (either installed via NPM or built locally). For all features, you will also need to include [ideogram.js](https://eweitz.github.io/ideogram/) and the [D3](https://d3js.org/) libraries.

The file `examples/index.html` shows a working example - simply clone this repository, run `npm install` and `npm run build`, then open `index.html` in a browser.

To initialize gene tooltip object, add something like this (with configurable options) to your HTML:

```html
<p>
  Here is a human gene: <span class="gene-tooltip" data-species="human">TP53</span>.
  And here is a mouse gene: <span class="gene-tooltip" data-species="mouse">Trp53</span>.
</p>

<script src="https://unpkg.com/gene-tooltips/dist/gene-tooltips.umd.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        GeneTooltip.init({
            // Your optional configuration here
        });
    });
</script>
```

## Documentation

Full documentation and examples are available in the docs
 folder or at the project site (coming soon).

## Contributing

Issues and pull requests are welcome. Please open a discussion if you’d like to propose a new feature or bug fix.