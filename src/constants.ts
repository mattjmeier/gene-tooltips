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


