/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({
	plugins: 'replace'
});
const generateConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;

const ENV = 'development';
const IS_DEBUG = true;
const HOST = 'localhost';
const PORT = '3000';
const API_PORT = '9001';

const devConfig = generateConfig({
	ENV: ENV,
	IS_DEBUG: IS_DEBUG,
	HOST: HOST,
	PORT: PORT,
	API_PORT: API_PORT,
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = () => {
	return webpackMerge(devConfig.config, {

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
			filename: '[name].bundle.js',

			/**
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
			 */
			sourceMapFilename: '[file].map',

			/** The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
			 */
			chunkFilename: '[id].chunk.js',

			library: 'ac_[name]',
			libraryTarget: 'var',
		},

		module: {
			rules: [
				// {
				//     test: /\.ts$/,
				//     use: [
				//         {
				//             loader: 'tslint-loader',
				//             options: {
				//                 configFile: 'tslint.json'
				//             }
				//         }
				//     ],
				//     exclude: [/\.(spec|e2e)\.ts$/]
				// },

				/*
				 * css loader support for *.css files (styles directory only)
				 * Loads external css styles into the DOM, supports HMR
				 *
				 */
				{
					test: /\.ts$/,
					use: [{
						loader: '@angularclass/hmr-loader',
						options: {
							pretty: !devConfig.metadata.IS_DEBUG,
							prod: devConfig.metadata.isProd
						}
					},
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
						},
						{
							loader: 'angular2-template-loader'
						}
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
					include: [helpers.sourceRoot('styles')]
				},

				/*
				 * sass loader support for *.scss files (styles directory only)
				 * Loads external sass styles into the DOM, supports HMR
				 *
				 */
				{
					test: /\.scss$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
					include: [helpers.sourceRoot('styles')]
				},

			]

		},
		plugins: [
			new DllBundlesPlugin({
				bundles: {
					polyfills: [
						'reflect-metadata',
						{
							name: 'zone.js',
							path: 'zone.js/dist/zone.js'
						},
						{
							name: 'zone.js',
							path: 'zone.js/dist/long-stack-trace-zone.js'
						},
					],
					vendor: [
						'@angular/platform-browser',
						'@angular/platform-browser-dynamic',
						'@angular/core',
						'@angular/common',
						'@angular/forms',
						'@angular/http',
						'@angular/router',
						'@angularclass/hmr',
						'rxjs',
						'ngx-modialog',
						{
							name: 'ngx-modialog/plugins/bootstrap',
							path: 'ngx-modialog/plugins/bootstrap/bundle/ngx-modialog-bootstrap.js'
						},
						'@ngrx/store',
						'@ngrx/router-store',
						'@ngrx/store-devtools',
						'@ngrx/effects',
						'angular2-ladda',
						'ngx-mask',
						'socket.io',
						'css-loader',
					]
				},
				dllDir: helpers.root('dll'),
				webpackConfig: webpackMergeDll(devConfig.config, {
					devtool: 'cheap-module-source-map',
					plugins: []
				})
			}),

			/**
			 * Plugin: AddAssetHtmlPlugin
			 * Description: Adds the given JS or CSS file to the files
			 * Webpack knows about, and put it into the list of assets
			 * html-webpack-plugin injects into the generated html.
			 *
			 * See: https://github.com/SimenB/add-asset-html-webpack-plugin
			 */
			new AddAssetHtmlPlugin([{
				filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`)
			},
				{
					filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`)
				}
			]),

			/**
			 * Plugin: NamedModulesPlugin (experimental)
			 * Description: Uses file names as module name.
			 *
			 * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
			 */
			// new NamedModulesPlugin(),

			/**
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({
				debug: IS_DEBUG,
				options: {
					context: helpers.root('.'),
				},
			}),
		],

		/**
		 * Webpack Development Server configuration
		 * Description: The webpack-dev-server is a little node.js Express server.
		 * The server emits information about the compilation state to the client,
		 * which reacts to those events.
		 *
		 * See: https://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			host: devConfig.metadata.HOST,
			port: devConfig.metadata.PORT,
			historyApiFallback: true,
			noInfo: true,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			contentBase: helpers.sourceRoot(),
		},

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
		}

	});
}
