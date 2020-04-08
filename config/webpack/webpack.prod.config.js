const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
module.exports = merge.smart(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        // drop_console: true,
                    },
                    cache: true,
                    output: {
                        comments: false,
                    },
                },
                parallel: true,
                extractComments: false,
            }),
        ],
        splitChunks: {
            maxInitialRequests: 10,
            cacheGroups: {
                app: {
                    test: /[\\/]src[\\/]/,
                    name: 'app',
                    chunks: 'all',
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ],
});
