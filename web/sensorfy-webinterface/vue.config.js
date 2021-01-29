module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    compression: {
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  }
}
