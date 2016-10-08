/**
 * @file webpack.config
 * @author Yuan Yanjun
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 配置生成Source Maps，有以下四个选项
    // source-map
    // cheap-module-source-map
    // eval-source-map
    // chearp-module-eval-map
    devtool: 'eval-source-map',

    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js'
    },

    devServer: {
        // 本地服务器所加载的资源文件所在目录
        // contentBase: './public',
        // 设置终端输出为彩色
        colors: true,
        // 不跳转，单页面应用非常有用
        historyApiFallback: true,
        // 源文件改变时，自动刷新页面
        inline: true,
        // 本地服务监听端口
        port: 8081,
        hot: true
    },

    module: {
        // 配置文件的加载器
        loaders: [
            // 文件名通过了正则 /\.json$/ 的测试，就用 json加载器
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
                // 为babel-loader设置额外的配置选项
                // 把babel的配置单独写在.babelrc配置文件里
                // query: {
                //     presets: ['es2015', 'react']
                // }
            },
            {
                test: /\.css$/,
                // 感叹号的作用在于使同一文件能够使用不同类型的loader
                // loader: 'style'
                // loader: 'css-loader'
                // loader: 'style-loader!css-loader?modules!postcss'
                // loader: 'style!css?modules!postcss'
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
        ]
    },

    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new webpack.BannerPlugin('Copyright Flying Unicorns inc. Yuan Yanjun.'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin('style.css')
        new ExtractTextPlugin('[name]-[hash].css')
    ]
};
