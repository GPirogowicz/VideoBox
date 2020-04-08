const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const path = require('path');
const useWatchPolling =
    process.env.USE_WATCH_POLLING === 'false' ? false : 1500;
const host = process.env.HOST || 'localhost';

module.exports = merge.smart(common, {
    mode: 'development',
    devtool: 'source-map',
    watchOptions: {
        poll: useWatchPolling,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        overlay: true,
        host,
        hot: true,
        port: 3000,
        disableHostCheck: true,
        historyApiFallback: true,
        stats: 'errors-only',
        contentBase: path.join(__dirname, '../../src'),
    },
});
