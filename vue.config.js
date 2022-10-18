module.exports = {
  transpileDependencies: [
    'vuetify',
    'material-design-icons-iconfont'
  ],
  publicPath: './',
  devServer: {
    proxy: {
      '^/api/auth/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/search/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/accept/': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/acceptchk/': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/contractinquiry/': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/modalkensaku/': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/hatchushiji/': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/api/grandit/hatchushiji/': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        logLevel: 'debug',
      }
    }
  }
}
