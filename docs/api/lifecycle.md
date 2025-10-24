[**gene-tooltips**](README.md)

***

## Interfaces

### TippyInstanceWithCustoms

Defined in: [lifecycle.ts:13](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L13)

#### Extends

- `Instance`

#### Properties

##### \_geneData?

> `optional` **\_geneData**: [`MyGeneInfoResult`](config.md#mygeneinforesult) \| `null`

Defined in: [lifecycle.ts:15](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L15)

##### \_isChildTippyVisible?

> `optional` **\_isChildTippyVisible**: `boolean`

Defined in: [lifecycle.ts:19](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L19)

##### \_isFetching?

> `optional` **\_isFetching**: `boolean`

Defined in: [lifecycle.ts:16](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L16)

##### \_isFullyShown?

> `optional` **\_isFullyShown**: `boolean`

Defined in: [lifecycle.ts:20](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L20)

##### \_nestedTippys?

> `optional` **\_nestedTippys**: `Instance`\<`Props`\>[]

Defined in: [lifecycle.ts:14](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L14)

##### \_themeIntent?

> `optional` **\_themeIntent**: `string`

Defined in: [lifecycle.ts:18](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L18)

##### \_uniqueId?

> `optional` **\_uniqueId**: `string`

Defined in: [lifecycle.ts:17](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L17)

## Functions

### createOnHideHandler()

> **createOnHideHandler**(): (`instance`) => `false` \| `undefined`

Defined in: [lifecycle.ts:241](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L241)

Creates the onHide callback.

#### Returns

> (`instance`): `false` \| `undefined`

##### Parameters

###### instance

[`TippyInstanceWithCustoms`](#tippyinstancewithcustoms)

##### Returns

`false` \| `undefined`

***

### createOnShowHandler()

> **createOnShowHandler**(`config`, `inFlightRequests`): (`instance`) => `void`

Defined in: [lifecycle.ts:138](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L138)

Creates the onShow callback for the main tippy instance.
This handles data fetching, caching, and initial content rendering.

#### Parameters

##### config

[`GeneTooltipConfig`](config.md#genetooltipconfig)

##### inFlightRequests

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`MyGeneInfoResult`](config.md#mygeneinforesult)\>\>\>

#### Returns

> (`instance`): `void`

##### Parameters

###### instance

[`TippyInstanceWithCustoms`](#tippyinstancewithcustoms)

##### Returns

`void`

***

### createOnShownHandler()

> **createOnShownHandler**(`config`): (`instance`) => `void`

Defined in: [lifecycle.ts:227](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/lifecycle.ts#L227)

Creates the onShown callback. This is triggered after the tooltip is fully visible.

#### Parameters

##### config

[`GeneTooltipConfig`](config.md#genetooltipconfig)

#### Returns

> (`instance`): `void`

##### Parameters

###### instance

[`TippyInstanceWithCustoms`](#tippyinstancewithcustoms)

##### Returns

`void`
