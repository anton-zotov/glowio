const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    mode,
    entry: './src/index.js',
    devtool: prod ? false : 'cheap-module-eval-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // plugins: [
    //     new CleanWebpackPlugin(),
    // ],
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: '[name].css',
    //     }),
    // ],
};
