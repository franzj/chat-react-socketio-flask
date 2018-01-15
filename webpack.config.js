const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLoadingCss = new ExtractTextPlugin({
  filename: "static/css/main.min.css",
  disable: process.env.NODE_ENV === "development"
});


const config = {
  entry: {
    'js/app.loader': './frontend/static/js/loaders/app.loader.js',
    'js/graphiql.loader': './frontend/static/js/loaders/graphiql.loader.js',
    'js/app': './frontend/static/js/views/app/main.js',
    'js/chat': './frontend/static/js/views/chat/main.js',
    'js/graphiql': './frontend/static/js/views/graphiql/main.js',
  },
  output: {
    path: path.join(__dirname, "backend"),
    filename: "static/[name].bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: extractLoadingCss.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader",
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  target: 'web',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'graphiql': "var GraphiQL"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false, // manualmente problemas con react-router-dom
      chunks: ['js/app.loader'],
      filename: 'templates/index.html',
      template: 'frontend/templates/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['js/graphiql.loader'],
      filename: 'templates/graphiql.html',
      template: 'frontend/templates/graphiql.html'
    }),
    extractLoadingCss,
    new CopyWebpackPlugin([
      {
        from: './node_modules/graphiql/graphiql.min.js',
        to: 'static/js/'
      },
      {
        from: './node_modules/react/dist',
        to: 'static/js/'
      },
      {
        from: './node_modules/react-dom/dist',
        to: 'static/js/'
      },
      {
        from: './node_modules/react-router/umd/react-router.min.js',
        to: 'static/js'
      },
      {
        from: './node_modules/react-router-dom/umd/react-router-dom.min.js',
        to: 'static/js'
      },
    ],{
      ignore: [
        '*.txt',
        '*.css',
        '*.json',
        '*.ts'
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/graphiql/graphiql.css',
        to: 'static/css/'
      },
      {
        from: './node_modules/font-awesome/fonts',
        to: 'static/fonts'
      },
      {
        from: './node_modules/font-awesome/css',
        to: 'static/css'
      },
      {
        from: './frontend/static/img',
        to: 'static/img'
      }
    ],{
      ignore: [
        '*.txt',
        '*.js',
        '*.map'
      ]
    })
  ],
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".scss",
      ".css"
    ],
    modules: [
      path.resolve(__dirname, "frontend"),
      path.resolve(__dirname, "frontend/static/js"),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "frontend"),
    compress: true,
    open: true,
    stats: "errors-only",
    index: 'templates/index.html',
    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\//, to: 'templates/index.html' },
      ]
    },
    proxy: [{
      context: ["/auth", "/graphql", "/register", "/chat"],
      target: "http://localhost:5000",
    }]
  },
};

module.exports = config;
