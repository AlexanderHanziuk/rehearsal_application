const { resolve } = require('node:path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => {
	const isProd = argv.mode === 'production';

return {
	entry: {
		main: resolve(__dirname, './src/index'),
	},
	output: {
		path: resolve(__dirname, './dist'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
			{
				test: /\.s?css$/,
				use: [
					isProd ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.(woff2?)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext]',
				},
			},
			{
				test: /\.(png|jpg|svg|webp|gif)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/others/[hash][ext]',
				},
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: resolve(__dirname, './src/index.html'),
			inject: 'head',
			scriptLoading: 'defer',
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		}),
		new FaviconsWebpackPlugin({
			logo: './src/images/favicon.png',
			mode: 'webapp',
			devMode: 'webapp',
			prefix: './images/favicons/',
			cache: true,
			favicons: {
				background: '#ffffff',
				theme_color: '#333333'
			},
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: resolve(__dirname, './src/images'),
					to: resolve(__dirname, './dist/images'),
				},
			],
		}),
	],
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		}
	};
};