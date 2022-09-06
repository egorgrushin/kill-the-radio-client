/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const generateConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Webpack Constants
 */

const ENV = 'production';
const IS_DEBUG = false;
const API_HOST = 'guidesignerapi20170726072506.azurewebsites.net'; // null means to be relative
const API_PORT = '80';
const SOCKET_PORT = '9000';
const BASE_HREF = '/';
const API_PREFIX = 'api';

const prodConfig = generateConfig({
	ENV: ENV,
	IS_DEBUG: IS_DEBUG,
	API_HOST: API_HOST,
	API_PORT: API_PORT,
	SOCKET_PORT: SOCKET_PORT,
	API_PREFIX: API_PREFIX,
	BASE_HREF: BASE_HREF,
});

module.exports = () => {
	return webpackMerge(prodConfig.config, {

		/**
		 * Developer tool to enhance debugging
		 *
		 * See: http://webpack.github.io/docs/configuration.html#devtool
		 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
		 */
		devtool: 'source-map',

		/**
		 * Options affecting the output of the compilation.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output
		 */
		output: {

			/**
			 * The output directory as absolute path (required).
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-path
			 */
			path: helpers.root('dist'),

			/**
			 * Specifies the name of each output file on disk.
			 * IMPORTANT: You must not specify an absolute path here!
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-filename
			 */
			filename: '[name].[hash].bundle.js',

			/**
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
			 */
			sourceMapFilename: '[name].[hash].bundle.map',

			/**
			 * The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
			 */
			chunkFilename: '[id].[hash].chunk.js',
		},

		module: {

			rules: [

				{
					test: /\.ts$/,
					use: [
						// { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
						//   loader: 'ng-router-loader',
						//   options: {
						//     loader: 'async-import',
						//     genDir: 'compiled',
						//     aot: AOT
						//   }
						// },
						{
							loader: 'awesome-typescript-loader',
							options: {
								configFileName: 'tsconfig.prod.json',
							},
						},
						{
							loader: 'angular2-template-loader',
						},
					],
					exclude: [/\.(spec|e2e)\.ts$/],
				},

				/*
				 * Extract CSS files from .src/styles directory to external CSS file
				 */
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader',
					}),
					include: [helpers.sourceRoot('styles')],
				},

				/*
				 * Extract and compile SCSS files from .src/styles directory to external CSS file
				 */
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader',
					}),
					include: [helpers.sourceRoot('styles')],
				},

			],

		},

		/**
		 * Add additional plugins to the compiler.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#plugins
		 */
		plugins: [

			/**
			 * Webpack plugin to optimize a JavaScript file for faster initial load
			 * by wrapping eagerly-invoked functions.
			 *
			 * See: https://github.com/vigneshshanmugam/optimize-js-plugin
			 */

			new OptimizeJsPlugin({
				sourceMap: false,
			}),

			/**
			 * Plugin: ExtractTextPlugin
			 * Description: Extracts imported CSS files into external stylesheet
			 *
			 * See: https://github.com/webpack/extract-text-webpack-plugin
			 */
			new ExtractTextPlugin('[name].[contenthash].css'),

			/**
			 * Plugin: UglifyJsPlugin
			 * Description: Minimize all JavaScript output of chunks.
			 * Loaders are switched into minimizing mode.
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			 */
			// // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
			new UglifyJsPlugin({
				// beautify: true, //debug
				// mangle: false, //debug
				// dead_code: false, //debug
				// unused: false, //debug
				// deadCode: false, //debug
				// compress: {
				//   screw_ie8: true,
				//   keep_fnames: true,
				//   drop_debugger: false,
				//   dead_code: false,
				//   unused: false
				// }, // debug
				// comments: true, //debug


				beautify: false, //prod
				output: {
					comments: false,
				}, //prod
				mangle: {
					screw_ie8: true,
				}, //prod
				compress: {
					screw_ie8: true,
					warnings: false,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
					negate_iife: false // we need this for lazy v8
				},
			}),

			/**
			 * Plugin: NormalModuleReplacementPlugin
			 * Description: Replace resources that matches resourceRegExp with newResource
			 *
			 * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
			 */

			new NormalModuleReplacementPlugin(
				/angular2-hmr/,
				helpers.root('config/empty.js')
			),

			new NormalModuleReplacementPlugin(
				/zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
				helpers.root('config/empty.js')
			),


			// AoT
			// new NormalModuleReplacementPlugin(
			//   /@angular(\\|\/)upgrade/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /@angular(\\|\/)compiler/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /@angular(\\|\/)platform-browser-dynamic/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /dom(\\|\/)debug(\\|\/)ng_probe/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /dom(\\|\/)debug(\\|\/)by/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /src(\\|\/)debug(\\|\/)debug_node/,
			//   helpers.root('config/empty.js')
			// ),
			// new NormalModuleReplacementPlugin(
			//   /src(\\|\/)debug(\\|\/)debug_renderer/,
			//   helpers.root('config/empty.js')
			// ),

			/**
			 * Plugin: CompressionPlugin
			 * Description: Prepares compressed versions of assets to serve
			 * them with Content-Encoding
			 *
			 * See: https://github.com/webpack/compression-webpack-plugin
			 */
			//  install compression-webpack-plugin
			// new CompressionPlugin({
			//   regExp: /\.css$|\.html$|\.js$|\.map$/,
			//   threshold: 2 * 1024
			// })

			/**
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({
				minimize: true,
				debug: false,
				options: {
					context: helpers.root('.'),
					/**
					 * Html loader advanced options
					 *
					 * See: https://github.com/webpack/html-loader#advanced-options
					 */
					// TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
					htmlLoader: {
						minimize: true,
						removeAttributeQuotes: false,
						caseSensitive: true,
						customAttrSurround: [
							[/#/, /(?:)/],
							[/\*/, /(?:)/],
							[/\[?\(?/, /(?:)/],
						],
						customAttrAssign: [/\)?\]?=/],
					},
				},
			}),
			/*
			 * Insert base href in index.html
			 * Works only with html-webpack-plugin.
			 */
			new BaseHrefWebpackPlugin({baseHref: prodConfig.metadata.BASE_HREF}),

			/*
			 * Plugin: CopyWebpackPlugin
			 * Description: Copy files and directories in webpack.
			 *
			 * Copies project static assets.
			 *
			 * See: https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([
				{
					from: helpers.root('web.config'),
				},
			]),

		],

		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: true,
			process: false,
			crypto: 'empty',
			module: false,
			clearImmediate: false,
			setImmediate: false,
		},
	});
};
