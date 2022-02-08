const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        port: 7729
    },
    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
            title: 'webpack5.0 + vue3.0'
        }),
        new VueLoaderPlugin()
    ]
}