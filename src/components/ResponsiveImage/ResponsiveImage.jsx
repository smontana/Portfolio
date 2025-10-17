/**
 * ResponsiveImage Component
 *
 * Provides optimal image loading with:
 * - Modern format support (AVIF with WebP fallback)
 * - Responsive images via srcset
 * - Lazy loading for below-the-fold images
 * - Fetch priority control for LCP images
 */

export function ResponsiveImage({
  baseName,
  alt,
  sizes = '100vw',
  width,
  height,
  className = '',
  fetchpriority,
  loading = 'lazy',
  ...props
}) {
  const basePath = '/assets/images/responsive';

  return (
    <picture>
      {/* AVIF format (best compression, modern browsers) */}
      <source
        type="image/avif"
        srcSet={`
          ${basePath}/${baseName}-sm.avif 170w,
          ${basePath}/${baseName}-md.avif 340w,
          ${basePath}/${baseName}-lg.avif 510w
        `}
        sizes={sizes}
      />

      {/* WebP format (fallback for older modern browsers) */}
      <source
        type="image/webp"
        srcSet={`
          ${basePath}/${baseName}-sm.webp 170w,
          ${basePath}/${baseName}-md.webp 340w,
          ${basePath}/${baseName}-lg.webp 510w
        `}
        sizes={sizes}
      />

      {/* Fallback img element (older browsers) */}
      <img
        src={`${basePath}/${baseName}-md.webp`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        {...props}
      />
    </picture>
  );
}

/**
 * MatrixImage Component
 *
 * Specialized component for square matrix image (800x800)
 */
export function MatrixImage({
  baseName = 'matrix',
  alt,
  sizes = '100vw',
  width,
  height,
  className = '',
  fetchpriority,
  loading = 'lazy',
  ...props
}) {
  const basePath = '/assets/images/responsive';

  return (
    <picture>
      {/* AVIF format */}
      <source
        type="image/avif"
        srcSet={`
          ${basePath}/${baseName}-sm.avif 400w,
          ${basePath}/${baseName}-md.avif 600w,
          ${basePath}/${baseName}-lg.avif 800w
        `}
        sizes={sizes}
      />

      {/* WebP format */}
      <source
        type="image/webp"
        srcSet={`
          ${basePath}/${baseName}-sm.webp 400w,
          ${basePath}/${baseName}-md.webp 600w,
          ${basePath}/${baseName}-lg.webp 800w
        `}
        sizes={sizes}
      />

      {/* Fallback img */}
      <img
        src={`${basePath}/${baseName}-md.webp`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        {...props}
      />
    </picture>
  );
}
