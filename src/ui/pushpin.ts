import { TippyInstanceWithCustoms } from '../lifecycle.js';

export function attachPushpin(instance: TippyInstanceWithCustoms) {
  const popper = instance.popper;
  if (!popper || instance._pinButton) return;

  // Ideally attach inside a header area if available
  const header = popper.querySelector('.gene-tooltip-header') || popper.querySelector('.tippy-content');
  if (!header) return;

  const btn = document.createElement('button');
  btn.className = 'gt-pin-button';
  btn.setAttribute('aria-label', 'Pin tooltip');
  btn.innerHTML = `
    <svg class="gt-pin-icon" viewBox="0 0 24 24" width="16" height="16">
      <!-- replace this path with your preferred SVG -->
      <path d="M12 2L10 8H8l2 8h4l2-8h-2zM11 22v-4h2v4h-2z"/>
    </svg>
  `;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePin(instance, btn);
  });

  instance._pinButton = btn;
  header.appendChild(btn);
}

function togglePin(instance: TippyInstanceWithCustoms, btn: HTMLElement) {
  instance._isPinned = !instance._isPinned;

  if (instance._isPinned) {
    // Lock tooltip open
    instance.setProps({
      trigger: 'manual',
      hideOnClick: false,
    //   interactive: true,
    });
    btn.classList.add('gt-pin-active');
    instance.show();
  } else {
    // Restore default behavior
    instance.setProps({
      trigger: 'mouseenter focus',
    //   hideOnClick: true,
    });
    btn.classList.remove('gt-pin-active');
  }
}
