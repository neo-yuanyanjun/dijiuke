/**
 * @file webpack config
 * @author Yuan Yanjun
 * @date 2016.10.09
 */

var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, './client'),
    entry: {
        jsx: './index.js',
        html: './index.html',
        vendor: [
            'react',
            'react-dom',
            'react-router'
            // 'react-redux',
            // 'react-router-redux',
            // 'redux'
        ]
    },
    output: {
        path: path.join(__dirname, './static'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.css$/,
            include: /client/,
            loaders: [
                'style-loader',
                'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                // 'css-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.css$/,
            exclude: /client/,
            loader: 'style!css'
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ],
    devServer: {
        contentBase: './client',
        hot: true
    }
};
