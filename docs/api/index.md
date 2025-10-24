[**gene-tooltips**](README.md)

***

## Variables

### default

> **default**: `object`

Defined in: [index.ts:105](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/index.ts#L105)

#### Type Declaration

##### init()

> **init**: (`userConfig`) => () => `void`

###### Parameters

###### userConfig

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`GeneTooltipConfig`](config.md#genetooltipconfig)\> = `{}`

###### Returns

> (): `void`

###### Returns

`void`

##### preload()

> **preload**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\[`PromiseSettledResult`\<`any`\>, `PromiseSettledResult`\<`any`\>\]\>

Preloads the optional heavy dependencies (d3, ideogram) so they
are ready when tooltips are first shown. This is useful to call
once in your application's entry point.

###### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\[`PromiseSettledResult`\<`any`\>, `PromiseSettledResult`\<`any`\>\]\>
