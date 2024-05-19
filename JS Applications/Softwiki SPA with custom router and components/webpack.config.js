const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
        historyApiFallback: true
        // static: path.join(__dirname, 'dist'),
        // compress: true,
        // port: 9000,
        // open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }), new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },
};