const path = require('path');
var webpack = require('webpack');
const env = require('node-env-file');

// ① 環境変数の読み込み
env('../../../reconomie/local.env');

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
  },
  plugins : [
    new webpack.DefinePlugin({
      "USER_POOL_ID": JSON.stringify(process.env.USER_POOL_ID),
      "CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
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