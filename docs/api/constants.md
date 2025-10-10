[**gene-tooltips**](README.md)

***

## Variables

### speciesMap

> `const` **speciesMap**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`number`, `SpeciesInfo`\>

Defined in: [constants.ts:9](https://github.com/mattjmeier/gene-tooltips/blob/7d15e7541844d8a92c64035715067ebe47aab9e4/src/constants.ts#L9)

## Functions

### findSpecies()

> **findSpecies**(`identifier`): `null` \| \{ `info`: `SpeciesInfo`; `taxid`: `number`; \}

Defined in: [constants.ts:27](https://github.com/mattjmeier/gene-tooltips/blob/7d15e7541844d8a92c64035715067ebe47aab9e4/src/constants.ts#L27)

Finds species data by either taxid or common name (case-insensitive).

#### Parameters

##### identifier

The taxid (number) or common name (string).

`undefined` | `string` | `number`

#### Returns

`null` \| \{ `info`: `SpeciesInfo`; `taxid`: `number`; \}

An object with the taxid and the SpeciesInfo, or null if not found.
