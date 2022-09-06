/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeMetadata = webpackMerge.strategy({
	plugins: 'replace'
});
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
// const ngcWebpack = require('ngc-webpack');


/*
 * Environment Constants
 */
const ENV_CONSTANTS = {
	ENV: process.env.NODE_ENV,
	IS_DEBUG: process.env.IS_DEBUG,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	API_HOST: process.env.API_HOST,
	API_PORT: process.env.API_PORT,
	BASE_HREF: process.env.BASE_HREF,
	SOCKET_HOST: process.env.SOCKET_HOST,
	SOCKET_PORT: process.env.SOCKET_PORT,
	API_PREFIX: process.env.API_PREFIX,
	HMR: helpers.hasProcessFlag('hot'),
	AOT: helpers.hasNpmFlag('aot'),
};

const METADATA = Object.assign({
	title: 'SmartEducation',
}, ENV_CONSTANTS);


const defaultMetadata = {
	ENV: 'development',
	IS_DEBUG: false,
	HOST: 'localhost',
	PORT: 3000,
	API_HOST: {from: 'HOST'},
	API_PORT: {from: 'PORT'},
	API_PREFIX: 'api',
	SOCKET_HOST: {from: 'API_HOST'},
	SOCKET_PORT: {from: 'API_PORT'},
	HMR: false,
	AOT: false,
	BASE_HREF: '/'
};

module.exports = (metadataBase) => {
	// TODO refactor it
	const metadata = Object.keys(defaultMetadata).reduce((memo, key) => {
		if (METADATA[key]) {
			memo[key] = METADATA[key];
			return memo;
		}
		if (metadataBase[key] !== undefined) {
			memo[key] = metadataBase[key];
			return memo;
		}

		const defaultValue = defaultMetadata[key];
		if (typeof defaultValue === 'object') {
			const fromKey = defaultValue.from;
			if (METADATA[fromKey]) {
				memo[key] = METADATA[fromKey];
				return memo;
			}
			if (metadataBase[fromKey] !== undefined) {
				memo[key] = metadataBase[fromKey];
				return memo;
			}
			const defaultFrom = defaultMetadata[fromKey];
			if (typeof defaultFrom === 'object') {
				memo[key] = defaultMetadata[defaultFrom.from];
				return memo;
			}
			memo[key] = defaultMetadata[defaultFrom];
			return memo;
		}
		memo[key] = defaultMetadata[key];
		return memo;
	}, {});

	metadata.isProd = metadata.ENV === 'production';

	const definePluginConfig = Object.keys(metadata).reduce((memo, key) => {
		memo[key] = JSON.stringify(metadata[key]);
		return memo;
	}, {
		'process.env': {
			'ENV': JSON.stringify(metadata.ENV),
			'NODE_ENV': JSON.stringify(metadata.ENV),
			'HMR': metadata.HMR,
		}
	});
	console.log(metadata);
	const config = {

		/*
		 * Cache generated modules and chunks to improve performance for multiple incremental builds.
		 * This is enabled by default in watch mode.
		 * You can pass false to disable it.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#cache
		 */
		//cache: false,

		/*
		 * The entry point for the bundle
		 * Our Angular.js app
		 *
		 * See: http://webpack.github.io/docs/configuration.html#entry
		 */
		entry: {
			'polyfills': helpers.sourceRoot('polyfills.ts'),
			'app': helpers.sourceRoot(metadata.AOT ? 'index.aot.ts' : 'index.ts'),
		},

		/*
		 * Options affecting the resolving of modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve
		 */
		resolve: {

			/*
			 * An array of extensions that should be used to resolve modules.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
			 */
			extensions: ['.ts', '.js', '.json'],

			// An array of directory names to be resolved to the current directory
			modules: [helpers.sourceRoot(), helpers.root('node_modules')],

		},

		/*
		 * Options affecting the normal modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module
		 */
		module: {

			rules: [

				/*
				 * Typescript loader support for .ts
				 *
				 * Component Template/Style integration using `angular2-template-loader`
				 * Angular 2 lazy loading (async routes) via `ng-router-loader`
				 *
				 * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
				 * order of the loader matter.
				 *
				 * See: https://github.com/s-panferov/awesome-typescript-loader
				 * See: https://github.com/TheLarkInn/angular2-template-loader
				 * See: https://github.com/shlomiassaf/ng-router-loader
				 */

				/*
				 * for snapsvg.io easy import
				 * https://github.com/adobe-webplatform/Snap.svg/issues/483
				 */
				{
					test: require.resolve('snapsvg'),
					use: 'imports-loader?this=>window,fix=>module.exports=0',
				},

				/*
				 * Json loader support for *.json files.
				 *
				 * See: https://github.com/webpack/json-loader
				 */
				{
					test: /\.json$/,
					use: 'json-loader'
				},

				/*
				 * to string and css loader support for *.css files (from Angular components)
				 * Returns file content as string
				 *
				 */
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					exclude: [helpers.sourceRoot('styles')]
				},

				/*
				 * to string and sass loader support for *.scss files (from Angular components)
				 * Returns compiled css content as string
				 *
				 */
				{
					test: /\.scss$/,
					use: [
						'to-string-loader',
						'css-loader',
						'postcss-loader',
						'sass-loader',
						{
							loader: 'sass-resources-loader',
							options: {
								resources: [
									helpers.sourceRoot('styles', 'variables.scss'),
									helpers.sourceRoot('styles', 'mixins.scss'),
								]
							},
						}
					],
					exclude: [helpers.sourceRoot('styles')]
				},


				/* Raw loader support for *.html
				 * Returns file content as string
				 *
				 * See: https://github.com/webpack/raw-loader
				 */
				{
					test: /\.html$/,
					use: 'raw-loader',
					exclude: [helpers.sourceRoot('index.html')]
				},

				/*
				 * File loader for supporting images, for example, in CSS files.
				 */
				{
					test: /\.(jpg|png|gif)$/,
					use: 'file-loader'
				},

				/* File loader for supporting fonts, for example, in CSS files.
				 */
				{
					test: /\.(eot|woff2?|svg|ttf)$/,
					use: 'file-loader'
				}

			],

		},

		/*
		 * Add additional plugins to the compiler.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#plugins
		 */
		plugins: [
			/**
			 * Plugin: DefinePlugin
			 * Description: Define free variables.
			 * Useful for having development builds with debug logging or adding global constants.
			 *
			 * Environment helpers
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 */
			// NOTE: when adding more properties make sure you include them in custom-typings.d.ts
			new DefinePlugin(definePluginConfig),
			new AssetsPlugin({
				path: helpers.root('dist'),
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/*
			 * Plugin: ForkCheckerPlugin
			 * Description: Do type checking in a separate process, so webpack don't need to wait.
			 *
			 * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
			 */
			new CheckerPlugin(),
			/*
			 * Plugin: CommonsChunkPlugin
			 * Description: Shares common code between the pages.
			 * It identifies common modules and put them into a commons chunk.
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
			 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
			 */
			new CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
			}),
			// This enables tree shaking of the vendor modules
			new CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['app'],
				minChunks: module => /node_modules/.test(module.resource)
			}),
			// Specify the correct order the scripts will be injected in
			new CommonsChunkPlugin({
				name: ['polyfills', 'vendor'].reverse()
			}),

			/**
			 * Plugin: ContextReplacementPlugin
			 * Description: Provides context to Angular's use of System.import
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
			 * See: https://github.com/angular/angular/issues/11580
			 */
			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)@angular/,
				helpers.sourceRoot(), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),

			/*
			 * Plugin: CopyWebpackPlugin
			 * Description: Copy files and directories in webpack.
			 *
			 * Copies project static assets.
			 *
			 * See: https://www.npmjs.com/package/copy-webpack-plugin
			 */
			// new CopyWebpackPlugin([{
			//         from: helpers.sourceRoot('assets'),
			//         to: 'assets'
			//     },
			//     {
			//         from: helpers.sourceRoot('meta')
			//     }
			// ]),


			/*
			 * Plugin: HtmlWebpackPlugin
			 * Description: Simplifies creation of HTML files to serve your webpack bundles.
			 * This is especially useful for webpack bundles that include a hash in the filename
			 * which changes every compilation.
			 *
			 * See: https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				template: helpers.sourceRoot('index.html'),
				title: metadata.title,
				chunksSortMode: 'dependency',
				metadata: metadata,
				inject: 'body'
			}),

			/*
			 * Plugin: ScriptExtHtmlWebpackPlugin
			 * Description: Enhances html-webpack-plugin functionality
			 * with different deployment options for your scripts including:
			 *
			 * See: https://github.com/numical/script-ext-html-webpack-plugin
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			}),

			/*
			 * Plugin: HtmlElementsPlugin
			 * Description: Generate html tags based on javascript maps.
			 *
			 * If a publicPath is set in the webpack output configuration, it will be automatically added to
			 * href attributes, you can disable that by adding a "=href": false property.
			 * You can also enable it to other attribute by settings "=attName": true.
			 *
			 * The configuration supplied is map between a location (key) and an element definition object (value)
			 * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
			 *
			 * Example:
			 *  Adding this plugin configuration
			 *  new HtmlElementsPlugin({
			 *    headTags: { ... }
			 *  })
			 *
			 *  Means we can use it in the template like this:
			 *  <%= webpackConfig.htmlElements.headTags %>
			 *
			 * Dependencies: HtmlWebpackPlugin
			 */
			new HtmlElementsPlugin({
				headTags: require('./head-config.common')
			}),

			/**
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({
				options: {
					context: helpers.root('.'),
				}
			}),

			new ExtractTextPlugin('vendor.css'),

			// new ngcWebpack.NgcWebpackPlugin({
			//     disabled: !AOT,
			//     tsConfig: helpers.root('tsconfig.webpack.json'),
			//     resourceOverride: helpers.root('config/resource-override.js')
			// })

		],

		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		},
	};

	return {config, metadata};
}
