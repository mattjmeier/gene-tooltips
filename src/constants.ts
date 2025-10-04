/**
 * External gene reference sources.
 * Each source can build its URL from an ID or symbol.
 */
export const SOURCES = [
  {
    key: "ncbi",
    name: "NCBI",
    url: (id: string) => `https://www.ncbi.nlm.nih.gov/gene/${id}`,
    requires: "id" as const,
  },
  {
    key: "ensembl",
    name: "Ensembl",
    url: (id: string) => `https://www.ensembl.org/id/${id}`,
    requires: "id" as const,
  },
  {
    key: "genecards",
    name: "GeneCards",
    url: (symbol: string) =>
      `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${symbol}`,
    requires: "symbol" as const,
  },
];

// species lookup table
interface SpeciesInfo {
  common: string;
  genus: string;
  icon: string;
  ideogramName?: string;
}

export const speciesMap: Record<number, SpeciesInfo> = {
  9606: { common: "Human", genus: "Homo sapiens", icon: "🧑", ideogramName: "human" },
  10090: { common: "Mouse", genus: "Mus musculus", icon: "🐭", ideogramName: "mouse" },
  10116: { common: "Rat", genus: "Rattus norvegicus", icon: "🐀" },
  7227: { common: "Fruitfly", genus: "Drosophila melanogaster", icon: "🪰" },
  6239: { common: "Nematode", genus: "Caenorhabditis elegans", icon: "🪱" },
  7955: { common: "Zebrafish", genus: "Danio rerio", icon: "🐟", ideogramName: "zebrafish" },
  3702: { common: "Thale-cress", genus: "Arabidopsis thaliana", icon: "🌱" },
  8364: { common: "Frog", genus: "Xenopus tropicalis", icon: "🐸" },
  9823: { common: "Pig", genus: "Sus scrofa", icon: "🐖" },
  4932: { common: "Yeast", genus: "Saccharomyces cerevisiae", icon: "🧫" },
};

/**
 * Finds species data by either taxid or common name (case-insensitive).
 * @param identifier - The taxid (number) or common name (string).
 * @returns An object with the taxid and the SpeciesInfo, or null if not found.
 */
export function findSpecies(identifier: string | number | undefined): { taxid: number; info: SpeciesInfo } | null {
  if (identifier === undefined || identifier === null) return null;

  const identifierStr = String(identifier).toLowerCase();
  
  // First, try to match by taxid if it's a number
  if (typeof identifier === 'number' && speciesMap[identifier]) {
    return { taxid: identifier, info: speciesMap[identifier] };
  }

  // Otherwise, search by common name or taxid string
  for (const taxidStr in speciesMap) {
    const taxid = parseInt(taxidStr, 10);
    const info = speciesMap[taxid];
    
    // Check taxid string match OR common name match
    if (identifierStr === taxidStr || identifierStr === info.common.toLowerCase()) {
      return { taxid, info };
    }
  }

  return null;
}