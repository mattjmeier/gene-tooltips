/**
 * Enables click/keyboard expand/collapse for summary sections in Gene Tooltips.
 * It listens for events on the document and targets the specific 'Show more' button.
 */
export function enableSummaryExpand(): void {
  const handleSummaryToggle = (target: HTMLElement) => {
    let summaryP: HTMLElement | null = null;
    let shouldExpand: boolean | null = null;

    // Case 1: Clicked "Show more"
    if (target.matches('[id^="summary-more-"]')) {
      summaryP = target.previousElementSibling as HTMLElement;
      shouldExpand = true;
    }
    // Case 2: Clicked "Show less"
    else if (target.matches('[id^="summary-less-"]')) {
      // Find the paragraph by navigating from the button's container
      summaryP = target.closest('.gene-tooltip-section-container')?.querySelector('.gene-tooltip-summary') as HTMLElement;
      shouldExpand = false;
    }
    // Case 3: Clicked the expanded summary paragraph itself
    else if (target.matches('.gene-tooltip-summary.expanded')) {
      summaryP = target;
      shouldExpand = false;
    }
    
    // If a relevant element was clicked, perform the action
    if (summaryP && shouldExpand !== null) {
      summaryP.classList.toggle('expanded', shouldExpand);
    }
  };

  // --- Click Handler ---
  document.addEventListener("click", e => {
    handleSummaryToggle(e.target as HTMLElement);
  });

  // --- Keyboard Handler ---
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target as HTMLElement;
      // Only act if the focused element is one of the interactive elements
      if (target.matches('[id^="summary-more-"]') || target.matches('[id^="summary-less-"]') || target.matches('.gene-tooltip-summary.expanded')) {
        e.preventDefault();
        handleSummaryToggle(target);
      }
    }
  });
}