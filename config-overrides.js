
module.exports = {
  test: require.resolve('jquery'),
  use: [{
    loader: 'expose-loader',
    options: 'jQuery'
  },{
    loader: 'expose-loader',
    options: '$'
  }],
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    config.module.rules = [
      ...config.module.rules,
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      },
    ]
    return config;
  }
}
