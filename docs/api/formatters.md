[**gene-tooltips**](README.md)

***

## Type Aliases

### FormattedItem

> **FormattedItem** = `object`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L14)

#### Properties

##### name

> **name**: `string`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L14)

##### url

> **url**: `string`

Defined in: [formatters.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L14)

## Functions

### asArray()

> **asArray**\<`T`\>(`data`): `T`[]

Defined in: [formatters.ts:4](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L4)

#### Type Parameters

##### T

`T`

#### Parameters

##### data

`T` | `T`[] | `undefined`

#### Returns

`T`[]

***

### formatDomains()

> **formatDomains**(`domains`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:31](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L31)

#### Parameters

##### domains

[`MyGeneInterproDomain`](config.md#mygeneinterprodomain) | [`MyGeneInterproDomain`](config.md#mygeneinterprodomain)[] | `undefined`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatGeneRIFs()

> **formatGeneRIFs**(`generifs`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:53](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L53)

#### Parameters

##### generifs

[`GeneRIF`](config.md#generif) | [`GeneRIF`](config.md#generif)[] | `undefined`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatPathways()

> **formatPathways**(`pathways`, `source`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:16](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L16)

#### Parameters

##### pathways

[`MyGenePathway`](config.md#mygenepathway) | [`MyGenePathway`](config.md#mygenepathway)[] | `undefined`

##### source

`"reactome"` | `"kegg"` | `"wikipathways"`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatStructures()

> **formatStructures**(`pdbs`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:46](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L46)

#### Parameters

##### pdbs

`string` | `string`[] | `undefined`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### formatTranscripts()

> **formatTranscripts**(`transcripts`): [`FormattedItem`](#formatteditem)[]

Defined in: [formatters.ts:40](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L40)

#### Parameters

##### transcripts

`string` | `string`[] | `undefined`

#### Returns

[`FormattedItem`](#formatteditem)[]

***

### getUniqueItems()

> **getUniqueItems**\<`T`\>(`items`, `key`): `T`[]

Defined in: [formatters.ts:10](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/formatters.ts#L10)

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
