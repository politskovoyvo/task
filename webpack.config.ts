const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const fileName = (exp) => (isDev ? `[name].${exp}` : `[name].[fullhash].${exp}`);
const ENV = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
const isAot = ENV.includes('aot');
const isHmr = ENV === 'hmr';
module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        app: './src/main.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: fileName('js'),
    },
    devServer: {
        historyApiFallback: true,
        port: 4200,
        hot: isDev,
    },
    resolve: {
    
        extensions: ['.ts', '.js'],

        alias: {
            '@core': path.resolve(__dirname, 'src/app/core'),
            src: path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
                type: 'asset/resource',
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
                ],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'raw-loader',
            },
        ],
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new CleanWebpackPlugin(),
        new AngularCompilerPlugin({
            tsConfigPath: 'tsconfig.json',
            entryModule: 'src/app/app.module#AppModule',
            sourceMap: true,
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'src'),
            {}
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false,
            },
        }),
    ],
};
