const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//生成css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//js压缩
var HtmlWebpackPlugin = require('html-webpack-plugin');//把压缩打包的css或js文件直接注入到html模版中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清理打包生产的dist目录
module.exports = {
    entry:'./src/index.js',
    module: {
        rules: [            
            {
              test: /\.js$/,
              exclude: /(node_modules)/,// 不包含node_modules文件夹的内容
              use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory:true,//提高编译速度，当有设置时，指定的目录将用来缓存 loader 的执行结果
                    presets: ['@babel/preset-env']
                }
              }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',//转成base64
                        options: {
                          limit: 15000
                        }
                    }
                    // {
                    //   loader: 'image-webpack-loader',
                    //   options: {
                    //     mozjpeg: {
                    //       progressive: true,
                    //       quality: 65
                    //     },
                    //     // optipng.enabled: false will disable optipng
                    //     optipng: {
                    //       enabled: false
                    //     },
                    //     pngquant: {
                    //       quality: '65-90',
                    //       speed: 4
                    //     },
                    //     gifsicle: {
                    //       interlaced: false
                    //     },
                    //     // the webp option will enable WEBP
                    //     webp: {
                    //       quality: 75
                    //     }
                    //   }
                    // }
                 ]

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '测试注入css及js到html',
            filename: 'main.html',
            template:path.resolve(__dirname, 'src/main.html'),
            minify:{
                collapseWhitespace:true,
                removeComments: true,//移除注释
                removeAttributeQuotes:true//移除属性的引号
            }
        }),
        new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']})//每次打包前清理dist目录['dist']
    ]
}