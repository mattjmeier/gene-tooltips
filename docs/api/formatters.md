[**gene-tooltips**](README.md)

***

## Type Aliases

### FormattedItem

> **FormattedItem** = `object`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L14)

#### Properties

##### name

> **name**: `string`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L14)

##### url

> **url**: `string`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L14)

## Functions

### asArray()

> **asArray**\<`T`\>(`data`): `T`[]

Defined in: [formatters.ts:4](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L4)

#### Type Parameters

##### T

`T`

#### Parameters

##### data

`undefined` | `T` | `T`[]

#### Returns

`T`[]

***

### formatDomains()

> **formatDomains**(`domains`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:31](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L31)

#### Parameters

##### domains

`undefined` | [`MyGeneInterproDomain`](config.md#mygeneinterprodomain) | [`MyGeneInterproDomain`](config.md#mygeneinterprodomain)[]

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatGeneRIFs()

> **formatGeneRIFs**(`generifs`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:53](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L53)

#### Parameters

##### generifs

`undefined` | [`GeneRIF`](config.md#generif) | [`GeneRIF`](config.md#generif)[]

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatPathways()

> **formatPathways**(`pathways`, `source`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:16](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L16)

#### Parameters

##### pathways

`undefined` | [`MyGenePathway`](config.md#mygenepathway) | [`MyGenePathway`](config.md#mygenepathway)[]

##### source

`"reactome"` | `"kegg"` | `"wikipathways"`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatStructures()

> **formatStructures**(`pdbs`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:46](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L46)

#### Parameters

##### pdbs

`undefined` | `string` | `string`[]

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatTranscripts()

> **formatTranscripts**(`transcripts`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:40](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L40)

#### Parameters

##### transcripts

`undefined` | `string` | `string`[]

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### getUniqueItems()

> **getUniqueItems**\<`T`\>(`items`, `key`): `T`[]

Defined in: [formatters.ts:10](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/formatters.ts#L10)

#### Type Parameters

##### T

`T`

#### Parameters

##### items

`T`[]

##### key

keyof `T`

#### Returns

`T`[]
