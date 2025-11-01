/**
 * Enables expand/collapse behavior for entire gene tooltip sections.
 * Collapsible sections have a header with `.gene-tooltip-section-header`.
 */
export function enableSectionCollapse(collapsedByDefault: boolean): void {
    console.log(collapsedByDefault);
    document.addEventListener("click", e => {
        const target = e.target as HTMLElement;

        // Detect clicks on section headers
        const header = target.closest(".gene-tooltip-section-header");
        if (!header) return;

        const section = header.closest(".gene-tooltip-section-container");
        if (!section) return;

        // Toggle collapsed class
        section.classList.toggle("collapsed");

        // Optionally, manage ARIA state for accessibility
        const isCollapsed = section.classList.contains("collapsed");
        header.setAttribute("aria-expanded", String(!isCollapsed));
    });

    // (Optional) keyboard support
    document.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement;
        const header = target.closest(".gene-tooltip-section-header");
        if (header) {
            e.preventDefault();
            header.click(); // reuse the click handler
        }
        }
    });
}
