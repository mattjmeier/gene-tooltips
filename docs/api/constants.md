[**gene-tooltips**](README.md)

***

## Variables

### speciesMap

> `const` **speciesMap**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`number`, `SpeciesInfo`\>

Defined in: [constants.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/constants.ts#L9)

## Functions

### findSpecies()

> **findSpecies**(`identifier`): \{ `info`: `SpeciesInfo`; `taxid`: `number`; \} \| `null`

Defined in: [constants.ts:27](https://github.com/mattjmeier/gene-tooltips/blob/547536637276ecddcde4082e6f81e07f2bdbbbf9/src/constants.ts#L27)

Finds species data by either taxid or common name (case-insensitive).

#### Parameters

##### identifier

The taxid (number) or common name (string).

`string` | `number` | `undefined`

#### Returns

\{ `info`: `SpeciesInfo`; `taxid`: `number`; \} \| `null`

An object with the taxid and the SpeciesInfo, or null if not found.
