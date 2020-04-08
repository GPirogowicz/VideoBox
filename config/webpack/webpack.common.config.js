const webpack = require('webpack');
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env.local'),
});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');
const isEnvProduction =
    JSON.stringify(process.env.NODE_ENV) === JSON.stringify('production');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    entry: path.join(__dirname, '../../src', 'index.js'),
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: isEnvProduction
            ? 'js/[name].[contenthash].js'
            : 'js/[name].js',
        chunkFilename: isEnvProduction
            ? 'js/[name].[contenthash].js'
            : 'js/[name].chunk.js',
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        }),
        new DotenvPlugin({
            path: path.resolve(__dirname, '../../.env.local'),
            safe: true,
            systemvars: true,
            silent: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../../public', 'index.html'),
            chunks: ['react', 'main', 'app'],
            chunksSortMode: 'manual',
        })
    ],
    resolve: {
        extensions: [
            '*',
            '.web.mjs',
            '.mjs',
            '.web.js',
            '.js',
            '.web.ts',
            '.ts',
            '.d.ts',
            '.web.tsx',
            '.tsx',
            '.json',
            '.web.jsx',
            '.jsx',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: isEnvProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'config/postcss',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader'
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: 'media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]_[hash:4].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = commonConfig;
