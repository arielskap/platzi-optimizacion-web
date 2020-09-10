const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const shouldAnalyze = process.argv.includes('--analyze')

const plugins = []

if (shouldAnalyze) {
  const { BundleAnalyzerPlugin } = module.require('webpack-bundle-analyzer')
  plugins.push(new BundleAnalyzerPlugin())
}

const config = {
  mode: nodeEnv,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: '.',
  },
  module: {
    rules: [
      {
        test: /\.css$/i, //la significa que no importa si es mayuscula o minuscula
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

module.exports = config
