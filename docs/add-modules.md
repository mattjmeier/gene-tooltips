## Guide: Adding a New Data Section to the Tooltip

This document outlines the general procedure for adding a new, optional data section to the gene tooltip (e.g., GO Terms, Phenotypes, etc.). The package is designed with an extensible pattern, so adding new sections involves touching four key files in a predictable way.

For this guide, we'll use "GO Terms" as our running example. The mygene.info API provides this data under a `go` field.

The 4-Step Pattern
- Configure: Define the data shape and user-facing options.
- Fetch: Request the new data from the API.
- Render: Create the HTML for the new section.
- Integrate: Wire up the renderer and any interactivity (like "more" buttons).

### Step 1: Configure the New Section (src/config.ts)

This is the source of truth for your data structures and user settings.

#### A. Define the incoming data shape:

If the API returns a complex object, create a new interface for it.

```typescript
// src/config.ts

// ... other interfaces
export interface MyGeneGoTerm {
  id: string;
  term: string;
  category: "CC" | "BP" | "MF";
}
```

#### B. Add the new field to MyGeneInfoResult:

Update the main data interface to include your new field.

```typescript
// src/config.ts

export interface MyGeneInfoResult {
  // ... other fields
  interpro?: MyGeneInterproDomain[] | MyGeneInterproDomain;
  go?: MyGeneGoTerm[] | MyGeneGoTerm; // <--- ADD YOUR NEW FIELD
  // ... other fields
}
```

#### C. Add a display flag to TooltipDisplayConfig:

This gives users a boolean switch to show or hide the section.

```typescript
// src/config.ts

export interface TooltipDisplayConfig {
  // ... other flags
  geneTrack: boolean;
  generifs: boolean;
  goTerms: boolean; // <--- ADD YOUR NEW DISPLAY FLAG
  links: {
    // ...
  };
}
```

#### D. Add configuration options to GeneTooltipConfig and defaultConfig:

Add a `...Count` property to control how many items are shown initially, and set its default value.

```typescript
// src/config.ts

export interface GeneTooltipConfig {
  // ... other counts
  generifCount: number;
  goTermCount: number; // <--- ADD YOUR NEW COUNT
  tooltipWidth?: number;
}

export const defaultConfig: GeneTooltipConfig = {
  // ... other defaults
  display: {
    // ...
    generifs: true,
    goTerms: true, // <--- SET DISPLAY DEFAULT
  },
  // ...
  generifCount: 3,
  goTermCount: 5, // <--- SET COUNT DEFAULT
  // ...
};
```

### Step 2: Fetch the Data (src/api.ts)

This is the simplest step. You just need to tell the mygene.info query to include your new field in its response.

#### A. Add the new field name to the fields array:

```typescript
// src/api.ts

export async function fetchMyGeneBatch(/*...*/) {
  // ...
  const fields = [
    // ... other fields
    'pdb',
    'generif',
    'go' // <--- ADD THE API FIELD NAME HERE
  ].join(',');
  // ...
}
```

### Step 3: Render the HTML (src/renderer.ts)

This is where you transform the raw JSON data into user-friendly HTML.

#### A. Create a new `render...` function for your section:
Follow the pattern of the existing `renderPathways` or `renderDomains` functions. The goal is to convert the raw data into an array of `{ name: string, url: string }` objects that the generic renderParagraphSection helper can use.

```typescript
// src/renderer.ts

// Helper to ensure data is an array
function asArray<T>(data: T | T[] | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

// NEW RENDER FUNCTION
function renderGoTerms(data: MyGeneInfoResult, count: number): string {
  const rawGoTerms = asArray(data.go);
  if (rawGoTerms.length === 0) return '';

  // 1. Map raw data to the { name, url } format
  const goTerms = rawGoTerms.map(go => ({
    name: `${go.term} (${go.category})`, // e.g., "nucleus (CC)"
    url: `https://www.ebi.ac.uk/QuickGO/term/${go.id}`
  })).sort((a, b) => a.name.localeCompare(b.name));

  // 2. Define a unique ID for the "more" button
  const moreButtonId = `goterms-more-${data._id}`;

  // 3. Call the generic helper to create the HTML
  return renderParagraphSection('GO Terms', goTerms, count, moreButtonId);
}
```

#### B. Call your new function from renderTooltipHTML:

Add the function call inside the main template, wrapped in its display flag check.

```typescript
// src/renderer.ts

export function renderTooltipHTML(/*...*/) {
  // ... destructure new count
  const { 
    // ...
    generifCount = 3,
    goTermCount = 5, // <--- GET YOUR NEW COUNT
    // ...
  } = options;

  return `
    <div class="gene-tooltip-content" ...>
      <!-- ... other sections -->
      ${display.generifs !== false ? renderGeneRIFs(data, generifCount) : ''}
      ${display.goTerms !== false ? renderGoTerms(data, goTermCount) : ''} {/* <--- ADD YOUR NEW SECTION */}
      ${renderLinks(data, display)}
    </div>
  `;
}
```

### Step 4: Integrate Interactivity (src/index.ts)

The final step is to wire up the "more" button so it shows a nested tooltip with the full list of items.

#### A. Pass the new count to the renderOptions:

In the onShow hook, make sure the count from the configuration is passed down to the renderer.

```typescript
// src/index.ts

// ...
onShow(instance: Instance) {
  // ...
  const renderOptions = {
    // ...
    generifCount: config.generifCount,
    goTermCount: config.goTermCount, // <--- PASS THE COUNT
    tooltipWidth: config.tooltipWidth,
    // ...
  };
  // ...
}
```

#### B. Add the nested tippy logic in onMount:

In the onMount hook, add logic to find your new "more" button and attach a nested tippy to it. Use the createNestedTippy helper for consistency.

```typescript
// src/index.ts

// ...
onMount(instance: TippyInstanceWithCustoms) {
  // ...
  if (!data) return;

  // ... (existing helper and other sections)

  // NEW: Handle GO Terms
  const goTermItems = asArray(data.go)
    .map(go => ({
      name: `${go.term} (${go.category})`,
      url: `https://www.ebi.ac.uk/QuickGO/term/${go.id}`
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  createNestedTippy(`#goterms-more-${data._id}`, goTermItems);
}
```

By following these four steps, you can cleanly and consistently add new data-driven sections to the tooltip while maintinaing flexible configuration options.