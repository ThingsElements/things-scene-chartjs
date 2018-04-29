const {
  resolve,
  join,
} = require('path');

const NodePackage = require('./package.json');
const webpack = require('webpack');

const module_resolve = require('resolve');

try {
  let path = module_resolve.sync('@hatiolab/things-shell', {
    basedir: process.cwd()
  });
  var thingsShellModulePath = resolve(path, '../..');
  var externModulesPath = resolve(path, '../../../..');

} catch (e) {
  console.log('@hatiolab/things-shell module not found.');
  var thingsShellModulePath = __dirname;
  var externModulesPath = resolve(__dirname, 'node_modules');
}

console.log('ThingsShell Module Path', thingsShellModulePath);
console.log('Extern Module Path', externModulesPath);

module.exports = {
  mode: 'development',
  entry: {
    "things-scene-chartjs": ['./src/index.js']
  },
  output: {
    path: '.',
    filename: '[name].js',
  },
  externals: {
    "@hatiolab/things-scene": "scene"
  },
  resolve: {
    modules: [
      externModulesPath
    ]
  },
  resolveLoader: {
    modules: [
      externModulesPath
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env', {
                targets: {
                  browsers: ['last 2 Chrome versions', 'Safari 10']
                },
                debug: true
              }
            ]
          ],
          plugins: []
        }
      }
    }, {
      test: /\.template$/,
      use: ['text-loader']
    }, {
      test: /\.html$/,
      use: [{
        loader: 'babel-loader'
      },
      {
        loader: 'polymer-webpack-loader'
      }
      ]
    }, {
      test: /\.css$/,
      use: ['text-loader']
    }, {
      test: /\.postcss$/,
      use: ['text-loader', 'postcss-loader']
    }, {
      test: /\.(gif|jpe?g|png)$/,
      loader: 'url-loader?limit=25000',
      query: {
        limit: 10000,
        name: '[path][name].[hash:8].[ext]'
      }
    }, {
      test: /\.(obj|mtl|tga|3ds|max|dae)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }, {
      test: /things-scene-components.import$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'things-scene-webpack-loader',
        options: {
          module_path: externModulesPath
        }
      }]
    }, {
      test: /things-scene-components-with-tools.import$/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'things-scene-config-webpack-loader',
        options: {
          module_path: externModulesPath
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE-ENV': JSON.stringify('development'),
        'APP-VERSION': JSON.stringify(NodePackage.version)
      }
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'cheap-module-source-map'
}
