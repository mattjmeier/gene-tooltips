# Live demo

Hover over the gene names below to see the library in action.

## Example genes

The protein encoded by <GeneDemo genes="TP53" species="human" /> is a tumor suppressor. In mice, the ortholog is <GeneDemo genes="Trp53" species="mouse" />. This is a well-known gene from the fruit fly: <GeneDemo genes="dib" species="7227" />. Here is one from yeast: <GeneDemo genes="RAD51" species="559292" />.

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

Here are a bunch of human genes, separated by commas: <GeneDemo genes="TP53, GADD45A, BRCA1, BRCA2, RAD51, ATM, XPA, NOTAGENE" species="human" />

## Supported species

The species in [`src/constants.ts`](https://github.com/mattjmeier/gene-tooltips/blob/main/src/constants.ts) are supported. The MyGene.info API supports ~22K species via the taxid, so the data retrieval will work for many species. This is also true for `ideogram.js`. I only built in icons and common names for convenience for popular species, but using the taxid should be an option for most species.

### Human
<GeneDemo genes="TP53, BRCA1, MYC" species="human" />
### Mouse
<GeneDemo genes="Trp53, Mdm2, Gadd45a" species="mouse" />
### Rat
<GeneDemo genes="Tp53, Alb, Il6" species="rat" />
### Fruitfly
<GeneDemo genes="boss, Antp, dib" species="fruitfly" />
### Nematode
<GeneDemo genes="ced-3, ced-9, lin-4" species="Nematode" />
### Zebrafish
<GeneDemo genes="noto, gata1a, sox2" species="zebrafish" />
### Thale cress
<GeneDemo genes="AG, AP1, FLC" species="thale-cress" />
### Frog
<GeneDemo genes="Nodal, Foxd3, Sox2" species="frog" />
### Pig
<GeneDemo genes="CFTR, APOE, GGTA1" species="pig" />
### Yeast
<GeneDemo genes="PHO5, GAL1, CDC28" species="559292" />