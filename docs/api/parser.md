[**gene-tooltips**](README.md)

***

## Interfaces

### GeneInfo

Defined in: [parser.ts:6](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/parser.ts#L6)

Defines the structure for gene information extracted from an element.

#### Properties

##### symbol

> **symbol**: `string`

Defined in: [parser.ts:7](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/parser.ts#L7)

##### taxid

> **taxid**: `number`

Defined in: [parser.ts:8](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/parser.ts#L8)

## Functions

### findGeneElements()

> **findGeneElements**(`selector`): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)[]

Defined in: [parser.ts:16](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/parser.ts#L16)

Finds all elements matching the selector and expands gene lists.

#### Parameters

##### selector

`string`

The CSS selector for gene elements.

#### Returns

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)[]

An array of elements to attach tooltips to.

***

### getGeneInfoFromElement()

> **getGeneInfoFromElement**(`el`): `null` \| [`GeneInfo`](#geneinfo)

Defined in: [parser.ts:63](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/parser.ts#L63)

Extracts gene information from a DOM element.

#### Parameters

##### el

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The DOM element.

#### Returns

`null` \| [`GeneInfo`](#geneinfo)

An object with symbol and taxid, or null.
