import { generate } from 'critical';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

// Check if running in Vercel/CI environment
const isVercel = process.env.VERCEL === '1' || process.env.CI === 'true';

console.log('🎨 Inlining critical CSS...\n');

// Configure Chromium for serverless or local environment
async function getBrowserConfig() {
  if (isVercel) {
    console.log('📦 Using serverless Chromium for Vercel...');
    return {
      browser: puppeteerCore,
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    };
  } else {
    console.log('💻 Using local Puppeteer...');
    // For local development, use system Chrome/Chromium
    return {
      browser: puppeteerCore,
      executablePath: process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : process.platform === 'linux'
        ? '/usr/bin/chromium-browser'
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    };
  }
}

// Main execution function
(async () => {
  try {
    // Get browser configuration
    const browserConfig = await getBrowserConfig();

    // Generate critical CSS for the main page
    await generate({
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
      // Penthouse options with custom Puppeteer config
      penthouse: {
        ...browserConfig,
        blockJSRequests: false,
        timeout: 30000,
      },
      ignore: {
        rule: [/^\.motion-safe/], // Keep motion-safe classes external
      },
      extract: true, // Extract inlined CSS from external files
      inlineImages: false, // Don't inline images
    });

    console.log('✅ Critical CSS inlined successfully!\n');

    // Read the updated file to show stats
    const html = fs.readFileSync(indexPath, 'utf8');
    const hasInlinedCSS = html.includes('<style');
    const fileSize = (html.length / 1024).toFixed(2);

    console.log(`📊 Stats:`);
    console.log(`   - Environment: ${isVercel ? 'Vercel/CI' : 'Local'}`);
    console.log(`   - Inlined CSS: ${hasInlinedCSS ? 'Yes ✓' : 'No ✗'}`);
    console.log(`   - HTML file size: ${fileSize} KB`);

    if (!hasInlinedCSS) {
      console.warn('\n⚠️  Warning: No inline styles detected. Critical CSS may not have been extracted.');
    }
  } catch (err) {
    console.error('❌ Error inlining critical CSS:', err);
    process.exit(1);
  }
})();
