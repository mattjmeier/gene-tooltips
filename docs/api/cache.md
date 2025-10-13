[**gene-tooltips**](README.md)

***

## Functions

### get()

> **get**(`symbol`, `taxid`): `undefined` \| `null` \| [`MyGeneInfoResult`](config.md#mygeneinforesult)

Defined in: [cache.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/cache.ts#L9)

#### Parameters

##### symbol

`string`

##### taxid

`number`

#### Returns

`undefined` \| `null` \| [`MyGeneInfoResult`](config.md#mygeneinforesult)

***

### getCacheKey()

> **getCacheKey**(`symbol`, `taxid`): `string`

Defined in: [cache.ts:5](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/cache.ts#L5)

#### Parameters

##### symbol

`string`

##### taxid

`number`

#### Returns

`string`

***

### has()

> **has**(`symbol`, `taxid`): `boolean`

Defined in: [cache.ts:7](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/cache.ts#L7)

#### Parameters

##### symbol

`string`

##### taxid

`number`

#### Returns

`boolean`

***

### set()

> **set**(`symbol`, `taxid`, `data`): `void`

Defined in: [cache.ts:13](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/cache.ts#L13)

#### Parameters

##### symbol

`string`

##### taxid

`number`

##### data

`null` | [`MyGeneInfoResult`](config.md#mygeneinforesult)

#### Returns

`void`

***

### setBatch()

> **setBatch**(`resultsMap`): `void`

Defined in: [cache.ts:24](https://github.com/mattjmeier/gene-tooltips/blob/4f54137499aa7b703b4b8e3178c63f142ff8a2c3/src/cache.ts#L24)

#### Parameters

##### resultsMap

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>

#### Returns

`void`
