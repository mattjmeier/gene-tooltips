[**gene-tooltips**](README.md)

***

## Functions

### get()

> **get**(`symbol`, `taxid`): `undefined` \| `null` \| [`MyGeneInfoResult`](config.md#mygeneinforesult)

Defined in: [cache.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/cache.ts#L9)

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

Defined in: [cache.ts:5](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/cache.ts#L5)

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

Defined in: [cache.ts:7](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/cache.ts#L7)

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

Defined in: [cache.ts:11](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/cache.ts#L11)

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

Defined in: [cache.ts:15](https://github.com/mattjmeier/gene-tooltips/blob/e3bf189367972d2ad5cf7d85627194c1c8b8a570/src/cache.ts#L15)

#### Parameters

##### resultsMap

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>

#### Returns

`void`
