module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Only apply in production
      if (env === 'production') {
        // Configure optimization splitChunks for better caching
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            // Separate React and ReactDOM into their own vendor bundle
            // This rarely changes between deployments, enabling long-term caching
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'vendor-react',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Separate React Router into its own chunk
            routerVendor: {
              test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
              name: 'vendor-router',
              priority: 35,
              reuseExistingChunk: true,
            },
            // Separate Framer Motion (large animation library)
            framerVendor: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'vendor-framer',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Separate React Icons (can be large)
            iconsVendor: {
              test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
              name: 'vendor-icons',
              priority: 25,
              reuseExistingChunk: true,
            },
            // Other node_modules go into a common vendor chunk
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Extract common code shared between chunks
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
          // Maximum async requests for on-demand loading
          maxAsyncRequests: 10,
          // Maximum initial requests (parallel downloads on page load)
          maxInitialRequests: 10,
          // Minimum size for a chunk to be generated (20kb)
          minSize: 20000,
        };

        // Configure runtime chunk for better caching
        // This separates webpack runtime code from the main bundle
        webpackConfig.optimization.runtimeChunk = {
          name: 'runtime',
        };

        // Set better module IDs for consistent hashing
        webpackConfig.optimization.moduleIds = 'deterministic';
        webpackConfig.optimization.chunkIds = 'deterministic';
      }

      return webpackConfig;
    },
  },
};
