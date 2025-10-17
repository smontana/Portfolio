module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Only apply in production
      if (env === 'production') {
        // Find HtmlWebpackPlugin instance and configure script loading
        const htmlWebpackPluginInstance = webpackConfig.plugins.find(
          plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
        );

        if (htmlWebpackPluginInstance && htmlWebpackPluginInstance.userOptions) {
          // Ensure scripts are deferred for better performance
          htmlWebpackPluginInstance.userOptions.scriptLoading = 'defer';
        }

        // Configure optimization splitChunks for better caching
        // OPTIMIZED: Fewer initial chunks for better PageSpeed score
        // Framer Motion removed - using pure CSS animations instead
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            // Combine React, ReactDOM, and React Router into single vendor bundle
            // This reduces HTTP requests while still enabling long-term caching
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/,
              name: 'vendor-react',
              priority: 40,
              reuseExistingChunk: true,
            },
            // React Icons vendor bundle (still used for skill icons)
            iconsVendor: {
              test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
              name: 'vendor-icons',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Other node_modules go into a common vendor chunk
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 20,
              reuseExistingChunk: true,
            },
          },
          // Limit async requests for lazy-loaded routes
          maxAsyncRequests: 6,
          // CRITICAL: Limit initial requests for better initial load performance
          // 4 chunks on initial load: runtime + vendor-react + vendor-icons + main
          maxInitialRequests: 4,
          // Minimum size for a chunk to be generated (30kb for fewer small chunks)
          minSize: 30000,
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
