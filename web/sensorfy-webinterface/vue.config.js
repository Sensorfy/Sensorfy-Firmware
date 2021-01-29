module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  // Additional plugins
  pluginOptions: {
    // Compress dist files
    compression: {
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },

  // Output to dist/web so the web/ path is included in the ESP filesystem
  outputDir: 'dist/web',

  // Webpack options
  configureWebpack: {
    // Shorter for js files
    output: {
      filename: '[name].[chunkhash:4].js',
      chunkFilename: '[name].[chunkhash:4].js',
    },

    // Shorter chunk names
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors'
          },
          common: {
            name: 'common'
          }
        }
      }
    }
  },

  // Shorter for css files
  css: {
    extract: {
      filename: '[name].[chunkhash:4].css',
      chunkFilename: '[name].[chunkhash:4].css',
    },
  },

  // Shorter names for images/fonts/...
  chainWebpack: config => {
    config.module.rule('images').use('url-loader').tap(options => {
      options.fallback.options.name = '[name].[hash:4].[ext]';
      return options
    });
    config.module.rule('svg').use('file-loader').tap(options => {
      options.name = '[name].[hash:4].[ext]';
      return options
    });
    config.module.rule('media').use('url-loader').tap(options => {
      options.fallback.options.name = '[name].[hash:4].[ext]';
      return options
    });
    config.module.rule('fonts').use('url-loader').tap(options => {
      options.fallback.options.name = '[name].[hash:4].[ext]';
      return options
    });
  },

  // Don't put source maps into the dist folder to save space
  productionSourceMap: false,

  // Allow reaching the dev server using local hostnames
  devServer: {
    disableHostCheck: true
  }
}
