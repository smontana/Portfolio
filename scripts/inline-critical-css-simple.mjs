import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

console.log('🎨 Inlining critical CSS (simple approach)...\n');

// Find the Inter font file in the build
function findFontFile() {
  const mediaDir = path.join(buildDir, 'static', 'media');
  try {
    const files = fs.readdirSync(mediaDir);
    const fontFile = files.find(f => f.startsWith('InterVariable.') && f.endsWith('.woff2'));
    return fontFile ? `/static/media/${fontFile}` : null;
  } catch (err) {
    console.warn('⚠️  Could not find font file, using placeholder');
    return '/static/media/InterVariable.woff2';
  }
}

const fontPath = findFontFile();
console.log(`📦 Font path: ${fontPath}`);

// Critical CSS that we manually define based on what's needed for above-the-fold
const criticalCSS = `
@font-face{font-display:optional;font-family:Inter;font-style:normal;font-weight:100 900;src:url(${fontPath}) format("woff2")}
*,:after,:before{box-sizing:border-box;margin:0;padding:0}
html{-ms-overflow-style:none;height:100%;scrollbar-width:none;width:100%}
html::-webkit-scrollbar{display:none}
body{background-color:#1b1f22;color:#fff;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;min-height:100vh;width:100%}
#root{min-height:100vh;width:100%}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
`.trim();

try {
  // Read the built HTML
  let html = fs.readFileSync(indexPath, 'utf8');

  // Find the main CSS file reference
  const cssLinkMatch = html.match(/<link href="([^"]+\.css)" rel="stylesheet">/);

  if (!cssLinkMatch) {
    console.warn('⚠️  No CSS link found in HTML');
    process.exit(0);
  }

  const cssLink = cssLinkMatch[0];
  const cssHref = cssLinkMatch[1];

  // Create the new structure with inlined critical CSS and async-loaded full CSS
  const inlinedCriticalCSS = `<style>${criticalCSS}</style>`;
  const asyncCSS = `<link href="${cssHref}" rel="stylesheet" media="print" onload="this.media='all'">`;
  const noscriptCSS = `<noscript><link href="${cssHref}" rel="stylesheet"></noscript>`;

  // Replace the CSS link with our optimized version
  html = html.replace(
    cssLink,
    `${inlinedCriticalCSS}${asyncCSS}`
  );

  // Add noscript fallback before </body>
  html = html.replace('</body>', `${noscriptCSS}</body>`);

  // Write the updated HTML
  fs.writeFileSync(indexPath, html, 'utf8');

  console.log('✅ Critical CSS inlined successfully!\n');

  // Show stats
  const fileSize = (html.length / 1024).toFixed(2);
  const criticalCSSSize = (criticalCSS.length / 1024).toFixed(2);

  console.log(`📊 Stats:`);
  console.log(`   - Critical CSS size: ${criticalCSSSize} KB`);
  console.log(`   - HTML file size: ${fileSize} KB`);
  console.log(`   - CSS loading: Async with media swap trick ✓`);

} catch (err) {
  console.error('❌ Error inlining critical CSS:', err.message);
  process.exit(1);
}
