const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//生成css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//js压缩
var HtmlWebpackPlugin = require('html-webpack-plugin');//把压缩打包的css或js文件直接注入到html模版中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清理打包生产的dist目录
const merge = require('webpack-merge')
const common = require('./webpack.common')
let prodConfig = {
    mode:'production',
    output:{
        filename:'main.[hash].js',
        path:path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(sa|c|sc)ss$/,//当引入.css模块时候，用下面的loader处理，由右边向左边处理
                use: [
                    MiniCssExtractPlugin.loader,
                    {   
                        loader:'css-loader',
                        options:{sourceMap:true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          sourceMap:true,
                          plugins: (loader) => [
                            require('autoprefixer')({overrideBrowserslist:['> 0.15% in CN']})
                          ]
                        }
                      },
                    {   
                        loader:'sass-loader',
                        options:{sourceMap:true}
                    },
                
                ]
                //use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name][hash].css',//设置最终输出的文件名
          chunkFilename: '[id][hash].css'
        })
    ],
    optimization:{
        minimizer: [
            new OptimizeCssAssetsPlugin({}),//css压缩
            new UglifyJsPlugin()
            // new UglifyJsPlugin({
            //     cache:true,//js没变化，不再进行压缩
            //     parallel:true,
            //     sourceMap:true
            // })//js压缩

        ]
    }
}

module.exports = merge(common,prodConfig);