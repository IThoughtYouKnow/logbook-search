const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        filename: 'bundle.js',
        clean: true,
        publicPath: '/'
    },
    devtool: 'eval-cheap-source-map',
    devServer: {
        static: './dist',
        liveReload: true,
        hot: true
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Hooks: path.resolve(__dirname, 'src/hooks')
        }
    },
    module: {
        rules: [{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                {test: /\.(sa|c|sc)ss$$/, use: [miniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: "[name]__[local]--[hash:base64:5]"
                        }
                    }
                }, "sass-loader"]}]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html'
        }),
        new miniCssExtractPlugin()
    ]
}