[**gene-tooltips**](README.md)

***

## Functions

### getD3()

> **getD3**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`__module` \| `null`\>

Defined in: [gene-track.ts:10](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/gene-track.ts#L10)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`__module` \| `null`\>

***

### renderGeneTrack()

> **renderGeneTrack**(`instance`, `data`, `uniqueId`, `tooltipWidth?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [gene-track.ts:103](https://github.com/mattjmeier/gene-tooltips/blob/02903aa6fd000f5a8bab700871e228a8f0234aea/src/gene-track.ts#L103)

Main rendering function, rewritten to correctly interpret the data structure.

#### Parameters

##### instance

`Instance`

##### data

[`MyGeneInfoResult`](config.md#mygeneinforesult)

##### uniqueId

`string`

##### tooltipWidth?

`number`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>
