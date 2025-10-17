#!/usr/bin/env node

/**
 * Generate responsive images in multiple formats (AVIF, WebP) and sizes
 * Run with: node scripts/generate-responsive-images.mjs
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const inputDir = join(publicDir, 'assets', 'images');
const outputDir = join(publicDir, 'assets', 'images', 'responsive');

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Image configurations
const images = [
  {
    name: 'me3d',
    input: join(inputDir, 'me3d.webp'),
    // Natural size is 340x510, generate smaller sizes for mobile
    sizes: [
      { width: 170, suffix: '-sm' },   // 1x small (mobile)
      { width: 340, suffix: '-md' },   // 2x small / 1x medium (tablet)
      { width: 510, suffix: '-lg' },   // 1.5x medium (desktop)
    ],
  },
  {
    name: 'matrix',
    input: join(inputDir, 'matrix.webp'),
    // Natural size is 800x800
    sizes: [
      { width: 400, suffix: '-sm' },   // 1x small (mobile)
      { width: 600, suffix: '-md' },   // 1.5x small / 1x medium
      { width: 800, suffix: '-lg' },   // 2x medium / 1x large
    ],
  },
];

async function generateImage(inputPath, outputPath, width, format, quality) {
  try {
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      [format]({
        quality,
        effort: format === 'avif' ? 6 : undefined, // AVIF compression effort (0-9, higher = smaller file)
      })
      .toFile(outputPath);

    const stats = await sharp(outputPath).metadata();
    console.log(`✓ Generated ${outputPath} (${stats.width}x${stats.height}, ${(stats.size / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`✗ Error generating ${outputPath}:`, error.message);
  }
}

async function processImages() {
  console.log('🖼️  Generating responsive images...\n');

  for (const image of images) {
    console.log(`Processing ${image.name}...`);

    if (!existsSync(image.input)) {
      console.error(`✗ Input file not found: ${image.input}`);
      continue;
    }

    for (const size of image.sizes) {
      const baseName = `${image.name}${size.suffix}`;

      // Generate AVIF (best compression, modern browsers)
      await generateImage(
        image.input,
        join(outputDir, `${baseName}.avif`),
        size.width,
        'avif',
        80  // AVIF quality (80 = high quality, good compression)
      );

      // Generate WebP (fallback for slightly older browsers)
      await generateImage(
        image.input,
        join(outputDir, `${baseName}.webp`),
        size.width,
        'webp',
        85  // WebP quality
      );
    }

    console.log('');
  }

  console.log('✅ All responsive images generated!');
  console.log(`📁 Output directory: ${outputDir}\n`);
}

processImages().catch(console.error);
