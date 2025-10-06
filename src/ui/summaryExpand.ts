/**
 * Enables click/keyboard expand/collapse on .gene-tooltip-summary elements.
 */
export function enableSummaryExpand(): void {
  document.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("gene-tooltip-summary")) {
      target.classList.toggle("expanded");
    }
  });

    document.addEventListener("keydown", e => {
    const target = e.target as HTMLElement | null;
    if (!target?.classList.contains("gene-tooltip-summary")) return;

    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        target.classList.toggle("expanded");
    }
    });
}
