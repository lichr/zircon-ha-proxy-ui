const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

// export configuration
module.exports = {
  mode: 'development',
  // the entry point of your application, like main function in some languages
  // path.resolve makes sure we have an absolute path
  entry: path.resolve(__dirname, 'src/index.tsx'),
  // where to put the build output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].js'
  },
  // rule to process different types of source code files
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              projectReferences: true
            }
          }
        ],
        exclude: /node_modules/
      }    
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts'],
    modules: ['node_modules'],
    fallback: { crypto: false }
  },

  // copy these static resource files to output folder
  plugins: [
    new CopyWebPackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'static') }
      ]
    })
  ]
};
