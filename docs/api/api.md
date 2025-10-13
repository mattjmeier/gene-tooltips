[**gene-tooltips**](README.md)

***

## Functions

### fetchMyGeneBatch()

> **fetchMyGeneBatch**(`geneSymbols`, `species`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>\>

Defined in: [api.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/api.ts#L9)

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
