[**gene-tooltips**](README.md)

***

## Functions

### fetchMyGeneBatch()

> **fetchMyGeneBatch**(`geneSymbols`, `species`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>\>

Defined in: [api.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/api.ts#L9)

Fetches data for multiple genes in a single batch request from mygene.info.

#### Parameters

##### geneSymbols

`string`[]

An array of gene symbols.

##### species

`string`

The species for all genes in this batch.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>\>

A Map of gene symbols to data.
