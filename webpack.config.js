const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    'things-scene-chartjs-ie': ['./src/index.js']
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['./node_modules']
  },
  resolveLoader: {
    modules: ['./node_modules']
  },
  externals: {
    '@hatiolab/things-scene': 'scene'
    // 'chart.js': 'Chart',
    // tinycolor2: 'tinycolor'
    // 'lit-element': 'LitElement'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(lit-))/,
        // exclude: /(node_modules\/[^lit\-])/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['ie 11']
                }
              }
            ]
          ],
          plugins: [
            ['@babel/plugin-proposal-async-generator-functions'],
            ['@babel/plugin-transform-async-to-generator'],
            ['@babel/plugin-transform-runtime']
          ]
        }
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader?limit=25000',
        query: {
          limit: 10000,
          name: '[path][name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(obj|mtl|tga|3ds|max|dae)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [],
  devtool: 'cheap-module-source-map'
}
