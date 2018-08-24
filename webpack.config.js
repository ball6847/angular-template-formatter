const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/cliformat.ts',
  target: 'node',
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'cli.js',
    path: path.resolve(__dirname, 'out')
  }
};
