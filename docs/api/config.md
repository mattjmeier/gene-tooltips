[**gene-tooltips**](README.md)

***

## Interfaces

### GeneRIF

Defined in: [config.ts:21](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L21)

#### Properties

##### pubmed

> **pubmed**: `number`

Defined in: [config.ts:22](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L22)

##### text

> **text**: `string`

Defined in: [config.ts:23](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L23)

***

### GeneTooltipConfig

Defined in: [config.ts:77](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L77)

#### Properties

##### api

> **api**: `"mygene"`

Defined in: [config.ts:79](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L79)

##### display

> **display**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`TooltipDisplayConfig`](#tooltipdisplayconfig)\>

Defined in: [config.ts:84](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L84)

##### domainCount

> **domainCount**: `number`

Defined in: [config.ts:89](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L89)

##### generifCount

> **generifCount**: `number`

Defined in: [config.ts:92](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L92)

##### ideogram

> **ideogram**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`IdeogramConfig`](#ideogramconfig)\>

Defined in: [config.ts:85](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L85)

##### pathwayCount

> **pathwayCount**: `number`

Defined in: [config.ts:88](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L88)

##### pathwaySource

> **pathwaySource**: `"reactome"` \| `"kegg"` \| `"wikipathways"`

Defined in: [config.ts:87](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L87)

##### prefetch

> **prefetch**: `"smart"` \| `"all"` \| `"none"`

Defined in: [config.ts:80](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L80)

##### prefetchThreshold

> **prefetchThreshold**: `number`

Defined in: [config.ts:81](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L81)

##### selector

> **selector**: `string`

Defined in: [config.ts:78](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L78)

##### structureCount

> **structureCount**: `number`

Defined in: [config.ts:91](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L91)

##### theme

> **theme**: `string`

Defined in: [config.ts:83](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L83)

##### tippyOptions

> **tippyOptions**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`Props`\>

Defined in: [config.ts:86](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L86)

##### tooltipHeight?

> `optional` **tooltipHeight**: `number`

Defined in: [config.ts:94](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L94)

##### tooltipWidth?

> `optional` **tooltipWidth**: `number`

Defined in: [config.ts:93](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L93)

##### transcriptCount

> **transcriptCount**: `number`

Defined in: [config.ts:90](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L90)

##### truncateSummary

> **truncateSummary**: `number`

Defined in: [config.ts:82](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L82)

***

### GenomicPosition

Defined in: [config.ts:3](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L3)

#### Properties

##### chr

> **chr**: `string`

Defined in: [config.ts:4](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L4)

##### end

> **end**: `number`

Defined in: [config.ts:6](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L6)

##### start

> **start**: `number`

Defined in: [config.ts:5](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L5)

##### strand

> **strand**: `number`

Defined in: [config.ts:7](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L7)

***

### IdeogramConfig

Defined in: [config.ts:69](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L69)

#### Properties

##### enabled

> **enabled**: `boolean`

Defined in: [config.ts:70](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L70)

##### height

> **height**: `number`

Defined in: [config.ts:72](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L72)

##### showLabels

> **showLabels**: `boolean`

Defined in: [config.ts:73](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L73)

##### width

> **width**: `number`

Defined in: [config.ts:71](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L71)

***

### MyGeneExon

Defined in: [config.ts:96](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L96)

#### Properties

##### cdsend

> **cdsend**: `number`

Defined in: [config.ts:97](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L97)

##### cdsstart

> **cdsstart**: `number`

Defined in: [config.ts:98](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L98)

##### chr

> **chr**: `string`

Defined in: [config.ts:99](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L99)

##### end?

> `optional` **end**: `number`

Defined in: [config.ts:105](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L105)

##### position?

> `optional` **position**: \[`number`, `number`\][]

Defined in: [config.ts:103](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L103)

##### start?

> `optional` **start**: `number`

Defined in: [config.ts:104](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L104)

##### strand

> **strand**: `number`

Defined in: [config.ts:100](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L100)

##### txend

> **txend**: `number`

Defined in: [config.ts:101](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L101)

##### txstart

> **txstart**: `number`

Defined in: [config.ts:102](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L102)

***

### MyGeneInfoResult

Defined in: [config.ts:27](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L27)

#### Properties

##### \_id

> **\_id**: `string`

Defined in: [config.ts:28](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L28)

##### ensembl?

> `optional` **ensembl**: `object`

Defined in: [config.ts:42](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L42)

###### gene

> **gene**: `string`

###### protein?

> `optional` **protein**: `string` \| `string`[]

###### transcript?

> `optional` **transcript**: `string` \| `string`[]

##### exons?

> `optional` **exons**: [`MyGeneExon`](#mygeneexon)[]

Defined in: [config.ts:41](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L41)

##### generif?

> `optional` **generif**: [`GeneRIF`](#generif) \| [`GeneRIF`](#generif)[]

Defined in: [config.ts:48](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L48)

##### genomic\_pos?

> `optional` **genomic\_pos**: [`GenomicPosition`](#genomicposition) \| [`GenomicPosition`](#genomicposition)[]

Defined in: [config.ts:34](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L34)

##### interpro?

> `optional` **interpro**: [`MyGeneInterproDomain`](#mygeneinterprodomain) \| [`MyGeneInterproDomain`](#mygeneinterprodomain)[]

Defined in: [config.ts:40](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L40)

##### name

> **name**: `string`

Defined in: [config.ts:31](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L31)

##### pathway?

> `optional` **pathway**: `object`

Defined in: [config.ts:35](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L35)

###### kegg?

> `optional` **kegg**: [`MyGenePathway`](#mygenepathway) \| [`MyGenePathway`](#mygenepathway)[]

###### reactome?

> `optional` **reactome**: [`MyGenePathway`](#mygenepathway) \| [`MyGenePathway`](#mygenepathway)[]

###### wikipathways?

> `optional` **wikipathways**: [`MyGenePathway`](#mygenepathway) \| [`MyGenePathway`](#mygenepathway)[]

##### pdb?

> `optional` **pdb**: `string` \| `string`[]

Defined in: [config.ts:47](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L47)

##### query

> **query**: `string`

Defined in: [config.ts:29](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L29)

##### summary?

> `optional` **summary**: `string`

Defined in: [config.ts:32](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L32)

##### symbol

> **symbol**: `string`

Defined in: [config.ts:30](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L30)

##### taxid

> **taxid**: `number`

Defined in: [config.ts:33](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L33)

***

### MyGeneInterproDomain

Defined in: [config.ts:15](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L15)

#### Properties

##### desc

> **desc**: `string`

Defined in: [config.ts:16](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L16)

##### id

> **id**: `string`

Defined in: [config.ts:17](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L17)

##### short\_desc

> **short\_desc**: `string`

Defined in: [config.ts:18](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L18)

***

### MyGenePathway

Defined in: [config.ts:10](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L10)

#### Properties

##### id

> **id**: `string`

Defined in: [config.ts:12](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L12)

##### name

> **name**: `string`

Defined in: [config.ts:11](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L11)

***

### TooltipDisplayConfig

Defined in: [config.ts:52](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L52)

#### Properties

##### domains

> **domains**: `boolean`

Defined in: [config.ts:57](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L57)

##### generifs

> **generifs**: `boolean`

Defined in: [config.ts:61](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L61)

##### geneTrack

> **geneTrack**: `boolean`

Defined in: [config.ts:58](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L58)

##### ideogram

> **ideogram**: `boolean`

Defined in: [config.ts:55](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L55)

##### links

> **links**: `object`

Defined in: [config.ts:62](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L62)

###### ensembl?

> `optional` **ensembl**: `boolean`

###### ncbi?

> `optional` **ncbi**: `boolean`

##### location

> **location**: `boolean`

Defined in: [config.ts:54](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L54)

##### pathways

> **pathways**: `boolean`

Defined in: [config.ts:56](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L56)

##### species

> **species**: `boolean`

Defined in: [config.ts:53](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L53)

##### structures

> **structures**: `boolean`

Defined in: [config.ts:60](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L60)

##### transcripts

> **transcripts**: `boolean`

Defined in: [config.ts:59](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L59)

## Variables

### defaultConfig

> `const` **defaultConfig**: [`GeneTooltipConfig`](#genetooltipconfig)

Defined in: [config.ts:108](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/config.ts#L108)
