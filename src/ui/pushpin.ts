import { TippyInstanceWithCustoms } from '../lifecycle.js';

export function attachPushpin(instance: TippyInstanceWithCustoms) {
  const popper = instance.popper;
  if (!popper || instance._pinButton) return;

  // Attach to the header, fallback to the main content area
  const header = popper.querySelector('.gene-tooltip-header') || popper.querySelector('.tippy-content');
  if (!header) return;

  const btn = document.createElement('button');
  btn.className = 'gt-pin-button';
  btn.setAttribute('aria-label', 'Pin tooltip');
  // Using a more standard pushpin icon SVG
  btn.innerHTML = `
    <svg class="gt-pin-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5V10H4a.5.5 0 0 1 0-1h1.5V5.274a3.5 3.5 0 0 1-.354-.298C4.842 4.674 4.5 4.18 4.5 3.5a.5.5 0 0 1 .5-.5h2V.5a.5.5 0 0 1-.5-.5z"/>
    </svg>
  `;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePin(instance, btn);
  });

  instance._pinButton = btn;
  // Use prepend to put it before the title, often looks better
  header.prepend(btn);
}

function togglePin(instance: TippyInstanceWithCustoms, btn: HTMLElement) {
  instance._isPinned = !instance._isPinned;

  if (instance._isPinned) {
    // --- PINNING LOGIC ---
    // Store the original trigger so we can restore it later
    instance._originalTrigger = instance.props.trigger;

    // Set to manual mode
    instance.setProps({
      trigger: 'manual',
      hideOnClick: false, // Ensure clicking outside doesn't hide it
    });

    btn.classList.add('gt-pin-active');
    btn.setAttribute('aria-label', 'Unpin tooltip');
    
    // Ensure it's visible. This is safe to call even if it's already shown.
    instance.show();

  } else {
    // --- UNPINNING LOGIC ---
    // Restore the original trigger
    instance.setProps({
      trigger: instance._originalTrigger || 'mouseenter focus',
    });

    btn.classList.remove('gt-pin-active');
    btn.setAttribute('aria-label', 'Pin tooltip');

    // Explicitly hide the tooltip to reset its state.
    // The user will need to mouseenter again to show it.
    instance.hide();
  }
}
