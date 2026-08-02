import { defineConfig } from 'vite';
import { writingPlugin } from './writing.js';

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/yvhr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/josephharveyangeles' },
  { label: 'X', href: 'https://x.com/yev' },
];

/**
 * Fills the placeholders left in the HTML: the contact row, and the footer
 * year. Both are resolved at build time so neither depends on JavaScript
 * running in the browser.
 */
function htmlInjectPlugin(links) {
  const buildYear = String(new Date().getFullYear());
  return {
    name: 'html-inject',
    transformIndexHtml(html) {
      const anchors = links
        .map(({ label, href }) => {
          const isMailto = href.startsWith('mailto:');
          const attrs = isMailto
            ? `href="${href}"`
            : `href="${href}" target="_blank" rel="noreferrer"`;
          return `<a ${attrs}>${label}</a>`;
        })
        .join('\n            ');
      return html
        .replace('<!-- CONTACT_LINKS -->', anchors)
        .replaceAll('<!-- BUILD_YEAR -->', buildYear);
    },
  };
}

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        // The easter egg. Keep this input — /vertex is served from it.
        vertex: 'src/vertex.html',
      },
    },
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  plugins: [htmlInjectPlugin(contactLinks), writingPlugin()],
  server: {
    open: true,
  },
});
