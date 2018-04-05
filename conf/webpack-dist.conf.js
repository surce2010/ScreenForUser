const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const flexibility = require('postcss-flexibility');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loaders: [
          'vue-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: path.join(__dirname, '../', 'src/index.html'),
        options: {
          transformToRequire: {
            img: 'src'
          }
        }
      },
      {
        test: /\.(png|jpg)/,
        loader: 'file-loader',
        options: {
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|mov)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: 'icon/[name].[ext]?[hash]'
        }
      },
      {
        enforce: 'post',
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              'node_modules/breakpoint-sass/stylesheets',
              'node_modules/normalize-scss/sass'
              // 'node_modules/susy/sass'
            ]
          }
        }]
      },
      {
        enforce: 'post',
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [flexibility, autoprefixer({remove: false, browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7']})]
      }
    }),
    new BundleAnalyzerPlugin()
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js',
    publicPath: '/screen_new/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
    alias: {
      '@components': path.join(process.cwd(), conf.paths.src, 'components'),
      '@assets': path.join(process.cwd(), conf.paths.src, 'assets'),
      '@store': path.join(process.cwd(), conf.paths.src, 'store'),
      '@utils': path.join(process.cwd(), conf.paths.src, 'utils'),
      '@containers': path.join(process.cwd(), conf.paths.src, 'containers'),
      'sass': path.join(process.cwd(), conf.paths.src, 'sass')
    }
  },
  entry: {
    app: `./${conf.path.src('index')}`,
    vendor: Object.keys(pkg.dependencies)
  }
};
