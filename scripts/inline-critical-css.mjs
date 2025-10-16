import { generate } from 'critical';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

console.log('🎨 Inlining critical CSS...\n');

// Generate critical CSS for the main page
generate({
  inline: true,
  base: buildDir,
  src: 'index.html',
  target: {
    html: 'index.html',
  },
  width: 375,  // Mobile viewport width
  height: 812, // Mobile viewport height (iPhone X)
  dimensions: [
    {
      width: 375,
      height: 812, // Mobile
    },
    {
      width: 768,
      height: 1024, // Tablet
    },
    {
      width: 1280,
      height: 1024, // Desktop
    }
  ],
  // Penthouse options
  penthouse: {
    blockJSRequests: false,
    timeout: 30000,
  },
  ignore: {
    atrule: ['@font-face'], // Don't inline font-face (already preloaded)
    rule: [/^\.motion-safe/], // Keep motion-safe classes external
  },
  extract: true, // Extract inlined CSS from external files
  inlineImages: false, // Don't inline images
})
.then(() => {
  console.log('✅ Critical CSS inlined successfully!\n');

  // Read the updated file to show stats
  const html = fs.readFileSync(indexPath, 'utf8');
  const hasInlinedCSS = html.includes('<style');
  const fileSize = (html.length / 1024).toFixed(2);

  console.log(`📊 Stats:`);
  console.log(`   - Inlined CSS: ${hasInlinedCSS ? 'Yes ✓' : 'No ✗'}`);
  console.log(`   - HTML file size: ${fileSize} KB`);

  if (!hasInlinedCSS) {
    console.warn('\n⚠️  Warning: No inline styles detected. Critical CSS may not have been extracted.');
  }
})
.catch((err) => {
  console.error('❌ Error inlining critical CSS:', err);
  process.exit(1);
});
