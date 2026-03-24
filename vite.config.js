import { defineConfig } from 'vite';

const contactLinks = [
  { label: 'mail', href: 'mailto:josephharveyangeles@gmail.com' },
  { label: 'github', href: 'https://github.com/yvhr' },
  { label: 'linkedin', href: 'https://linkedin.com/in/josephharveyangeles' },
  { label: 'x', href: 'https://x.com/yev' },
];

function htmlInjectPlugin(links) {
  const buildDate = new Date().toISOString().split('T')[0];
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
        .replace('<!-- BUILD_DATE -->', buildDate);
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
        vertex: 'src/vertex.html',
      },
    },
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  plugins: [htmlInjectPlugin(contactLinks)],
  server: {
    open: true,
  },
});
