/**
 * josephharveyangeles.com — v8
 *
 * Two pieces of state and nothing else: the theme, and a Manila clock.
 * The theme is already resolved by the inline script in <head> before first
 * paint; this only wires the toggle and keeps the label in sync.
 *
 * Loaded by both index.html and vertex.html, so every lookup is guarded —
 * a change to one page must not throw on the other.
 */

const root = document.documentElement;

/* -------------------------------------------------------------------------
   Theme
   ------------------------------------------------------------------------- */

const toggle = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');

/** The toggle names the edition you would switch *to*, not the current one. */
function labelFor(theme) {
  return theme === 'dark' ? 'Day edition' : 'Night edition';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (label) label.textContent = labelFor(theme);
  if (toggle) {
    toggle.setAttribute(
      'aria-label',
      `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
    );
  }
}

applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

if (toggle) {
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* Private mode or storage disabled — the toggle still works this session. */
    }
  });
}

/* -------------------------------------------------------------------------
   Clock

   Always Manila, regardless of where the reader is. A half-minute refresh is
   plenty for a display that only shows hours and minutes.
   ------------------------------------------------------------------------- */

const clock = document.getElementById('clock');

if (clock) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Manila',
  });

  const tick = () => {
    clock.textContent = formatter.format(new Date());
  };

  tick();
  setInterval(tick, 30000);
}
