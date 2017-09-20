const path = require('path')
const { uniqueId } = require('lodash')

const {
  DefinePlugin,
  optimize: {
    CommonsChunkPlugin,
    OccurrenceOrderPlugin,
  },
	NamedChunksPlugin,
	NamedModulesPlugin,
	HashedModuleIdsPlugin,
} = require('webpack')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const SEP_RE = new RegExp(`\\${path.sep}`, 'g')
const IS_REACT = /node_modules.+?(react|styled)/
const PAGES_RE = /pages[\/\\](.+?)(index)?\.[jt]sx?/

const moduleToFileNames = (module) => {
  if (!module.request || !module.optional) {
    return null
  }
  const relativePath = path.relative(module.context, module.request)
  const tokens = relativePath.match(PAGES_RE)
  return tokens && tokens[1].replace(SEP_RE, '.').slice(0, -1)
}

module.exports = env => [
  // new TsConfigPathsPlugin({
  //   baseUrl: require('path').resolve(process.cwd(), ''),
  // }),
  // new CheckerPlugin(),

  // new OccurrenceOrderPlugin(),

  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env === 'dev' ? 'development' : 'production'),
    },
  }),

	new NamedChunksPlugin((chunk) => {
		if (chunk.name) {
			return chunk.name
    }
		const nameWithPage = chunk.modules
			.map(moduleToFileNames)
			.find((name) => name)
		return nameWithPage
			? nameWithPage
			: uniqueId('chunk-')
	}),

	new (env === 'dev' ? NamedModulesPlugin : HashedModuleIdsPlugin)(),

	env !== 'dev' && new CommonsChunkPlugin({
		name: 'app',
		children: true,
		minChunks: 2,
		async: 'commons',
	}),

	env !== 'dev' && new CommonsChunkPlugin({
		name: 'vendor',
		// names: 'vendor',
		// chunks: 'app',
		minChunks: ({ context }) => context && context.includes('node_modules'),
	}),

	env !== 'dev' && new CommonsChunkPlugin({
		name: 'runtime',
		minChunks: Infinity,
	}),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/template.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  new CopyWebpackPlugin([
    // {
    //   from: 'src/data',
    //   to: 'data',
    // },
    // {
    //   from: 'src/404.html',
    // }
  ]),

  env !== 'dev' && new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        dead_code: true,
        properties: true,
        unused: true,
        join_vars: true,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
      },
    },
    // sourceMap: true, // retains sourcemaps for typescript
  }),

  env === 'analyze' && new BundleAnalyzerPlugin(),
].filter(item => item)
