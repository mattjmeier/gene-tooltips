[**gene-tooltips**](README.md)

***

## Functions

### get()

> **get**(`symbol`, `taxid`): [`MyGeneInfoResult`](config.md#mygeneinforesult) \| `null` \| `undefined`

Defined in: [cache.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/cache.ts#L9)

#### Parameters

##### symbol

`string`

##### taxid

`number`

#### Returns

[`MyGeneInfoResult`](config.md#mygeneinforesult) \| `null` \| `undefined`

***

### getCacheKey()

> **getCacheKey**(`symbol`, `taxid`): `string`

Defined in: [cache.ts:5](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/cache.ts#L5)

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

Defined in: [cache.ts:7](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/cache.ts#L7)

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

Defined in: [cache.ts:13](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/cache.ts#L13)

#### Parameters

##### symbol

`string`

##### taxid

`number`

##### data

[`MyGeneInfoResult`](config.md#mygeneinforesult) | `null`

#### Returns

`void`

***

### setBatch()

> **setBatch**(`resultsMap`): `void`

Defined in: [cache.ts:24](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/cache.ts#L24)

#### Parameters

##### resultsMap

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>

#### Returns

`void`
