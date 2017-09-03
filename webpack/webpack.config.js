const path = require('path')
const rules = require('./rules')
const plugins = require('./plugins')

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'docs')

module.exports = env => ({
  target: 'web',
  context: path.join(rootDir, 'src'),
  entry: {
    app: './index.tsx',
  },
  output: {
    path: distDir,
    filename: env === 'dev' ? '[name].js' : '[name].[hash].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
    modules: [
      path.resolve(rootDir, 'src'),
      'node_modules',
    ],
    // alias: env === 'dev' ? undefined : {
    //   'react': path.join(rootDir, 'node_modules/react/dist/react.min.js'),
    //   'react-dom': path.join(rootDir, 'node_modules/react-dom/dist/react-dom.min.js'),
    // },
  },
  devtool: env === 'dev' ? 'source-map' : undefined,
  module: {
    rules: rules(env),
  },
  plugins: plugins(env),
  devServer: env !== 'dev' ? undefined : {
    contentBase: distDir,
    // host: process.env.IP,
    port: process.env.PORT,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/404.html',
        },
      ],
    },
  },
})
