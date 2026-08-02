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

/* --------------------------------------------------------------------------
   Contact form — Netlify Forms

   The markup is authored statically in index.html, never generated here:
   Netlify detects forms by parsing the built HTML at deploy time, so anything
   JavaScript creates is invisible to it.
   -------------------------------------------------------------------------- */

(function contactForm() {
  const form = document.querySelector('[data-contact-form]');
  const sent = document.querySelector('[data-contact-sent]');
  if (!form || !sent) return;

  const submit = form.querySelector('[data-submit]');
  const alertBox = form.querySelector('[data-form-alert]');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    name: v => (v.trim() ? '' : 'Tell me who you are.'),
    email: v => {
      if (!v.trim()) return 'I need an address to reply to.';
      return EMAIL.test(v.trim()) ? '' : "That address doesn't look right.";
    },
    message: v => (v.trim() ? '' : 'Even one line helps.'),
  };

  const fields = Object.keys(rules)
    .map(name => ({
      name,
      input: form.elements[name],
      error: form.querySelector(`#err-${name}`),
    }))
    .filter(f => f.input && f.error);

  const paint = (f, msg) => {
    f.error.textContent = msg;
    f.error.hidden = !msg;
    f.input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  const validate = f => {
    const msg = rules[f.name](f.input.value);
    paint(f, msg);
    return !msg;
  };

  fields.forEach(f => {
    f.input.addEventListener('blur', () => validate(f));
    // Typing may clear an error but must never create one — validating on
    // keystroke shouts at someone halfway through typing their address.
    f.input.addEventListener('input', () => {
      if (f.input.getAttribute('aria-invalid') === 'true') {
        if (!rules[f.name](f.input.value)) paint(f, '');
      }
    });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    // aria-disabled, not disabled: a disabled button drops keyboard focus to
    // <body> and strands whoever just pressed Enter on it.
    if (submit.getAttribute('aria-disabled') === 'true') return;

    alertBox.hidden = true;
    const invalid = fields.filter(f => !validate(f));
    if (invalid.length) {
      invalid[0].input.focus();
      return;
    }

    submit.setAttribute('aria-disabled', 'true');
    submit.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';

    try {
      const res = await fetch(location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    } catch (e) {
      submit.setAttribute('aria-disabled', 'false');
      submit.setAttribute('aria-busy', 'false');
      submit.textContent = 'Send';
      alertBox.textContent =
        'Something went wrong sending that. Try again in a moment.';
      alertBox.hidden = false;
    }
  });
})();
