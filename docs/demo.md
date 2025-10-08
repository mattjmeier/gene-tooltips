# Live demo

Hover over the gene names below to see the library in action.

## Example genes

<GeneDemo />

## Lists of genes

You can also use delimiters (space, comma, semicolon) to separate lists of genes and use only one class tag for all of them:

```html
<p style="font-size: 1.2em; line-height: 1.8;">
    Here are a bunch of human genes, separated by commas:
    <div class="gene-tooltip" data-species="human">
        TP53, GADD45A, BRCA1, BRCA2, RAD51, ATM, XPA, NOTAGENE
    </div>
</p>
```

<GeneDemoCommaDelimited />

## Supported species

The species in [`src/constants.ts`](https://github.com/mattjmeier/gene-tooltips/blob/main/src/constants.ts) are supported. The MyGene.info API supports ~22K species via the taxid, so the data retrieval will work for many species. This is also true for `ideogram.js`. I only built in icons and common names for convenience for popular species, but using the taxid should be an option for most species.