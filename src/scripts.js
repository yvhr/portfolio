// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);
} else if (prefersDark) {
  html.setAttribute('data-theme', 'dark');
  updateIcon('dark');
} else {
  html.setAttribute('data-theme', 'dark');
  updateIcon('dark');
}

function updateIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '[light]' : '[dark]';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

// Set last modified date and current year
document.getElementById('lastModified').textContent = new Date()
  .toISOString()
  .split('T')[0];
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
