const path = require('path');
var webpack = require('webpack');
const env = require('node-env-file');

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    fallback: { 
      "process": false 
    }
  },
  plugins : [
    new webpack.DefinePlugin({
    })
  ],
  target: ["web", "es5"],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    port: 3000,
    open: true
  }
};