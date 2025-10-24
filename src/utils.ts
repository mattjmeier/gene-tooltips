import type { Instance } from 'tippy.js';

// Generate a unique ID for each tooltip instance
export function generateUniqueTooltipId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `tooltip-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// Helper to create list items with a search box
export function createNestedContent(items: { name: string; url: string }[]): string {
  const listId = `nested-list-${generateUniqueTooltipId()}`;
  
  const listItems = items
    .map(item => `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>`)
    .join('');

  // The 'oninput' handler directly calls our filtering function, passing the input's value and the target list's ID.
  return `
    <div class="gene-tooltip-nested-container">
      <input 
        type="search" 
        class="gene-tooltip-nested-search" 
        placeholder="Filter..." 
        oninput="window.GeneTooltip.filterNestedList(this.value, '${listId}')" 
      />
      <ul id="${listId}" class="gene-tooltip-nested-list">${listItems}</ul>
    </div>
  `;
}

/**
 * Gets the computed background color from a Tippy instance's popper.
 * @param instance The Tippy instance to inspect.
 * @returns The background color string (e.g., 'rgb(255, 255, 255)') or null if not found.
 */
export function getTippyBackgroundColor(instance: Instance): string | null {
  const tippyBox = instance.popper.querySelector<HTMLElement>('.tippy-box');
  if (tippyBox) {
    return window.getComputedStyle(tippyBox).backgroundColor;
  }
  return null;
}

export function syncNestedTooltipTheme(parentInstance: Instance, nestedInstance: Instance): void {
  const parentBgColor = getTippyBackgroundColor(parentInstance);
  const nestedBox = nestedInstance.popper.querySelector<HTMLElement>('.tippy-box');
  
  if (parentBgColor && nestedBox) {
    nestedBox.style.backgroundColor = parentBgColor;
  }
}