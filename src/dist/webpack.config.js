var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var isProd = process.env.NODE_ENV === 'production';
var isDev = !isProd;
var fileName = function (exp) { return (isDev ? "[name]." + exp : "[name].[fullhash]." + exp); };
var ENV = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
var isAot = ENV.includes('aot');
var isHmr = ENV === 'hmr';
module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: fileName('js')
    },
    devServer: {
        historyApiFallback: true,
        port: 21576,
        hot: isDev
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@core': path.resolve(__dirname, './src/app/core'),
            src: path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'css-to-string-loader',
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'raw-loader'
            },
        ]
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new CleanWebpackPlugin(),
        new AngularCompilerPlugin({
            tsConfigPath: 'tsconfig.json',
            entryModule: './src/app/app.module#AppModule',
            sourceMap: true
        }),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, path.resolve(__dirname, 'src'), {}),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/manifest.webmanifest'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: 'src/assets',
                    to: 'assets'
                },
            ]
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false
            }
        }),
    ]
};
