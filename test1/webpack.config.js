
const path= require('path');
const devServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob= require('glob');
const PurifyCSSPlugin= require('purifycss-webpack');
const webpack= require('webpack');
const entry= require('./webpack_config/entry_webpack');
const CopyPlugin=require('copy-webpack-plugin');
module.exports= {
    entry:entry,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'http://localhost:8081/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //use:['style-loader','css-loader']
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{
                            importLoaders:1
                        }
                    },'postcss-loader']
                })
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }

                }]
            },{
                test:/\.html$/i,
                use:['html-withimg-loader']
            },{
                test:/\.scss$/,
                // use:[
                //     {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     },
                //     {
                //         loader:'sass-loader'
                //     }
                // ]
                use:ExtractTextPlugin.extract({
                    use:[
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'sass-loader'
                        }
                    ],
                    fallback:'style-loader'
                })
            },
            {
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['env']
                    }
                }],
                exclude:'/node_modules/'
            }
        
        ]
    },
    plugins:[
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:"./src/index.html",
            chunks:['index']//['jquery','index']
        }),
        new ExtractTextPlugin("css/index.css"),
        new PurifyCSSPlugin(
            {
                paths:glob.sync('./src/index.html')
            }
        ),
        new webpack.BannerPlugin("。。。。"),
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery','vue'],
            filename:'js/[name].js',
            minChunks:2
        }),
        new CopyPlugin([{
            from:'./src/public/',
            to:'./public'
        }])
        // new UglifyJsPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8081'
    }
    // ,
    // watchOptions:{
    //     poll:1000,
    //     aggregeateTimeout:500,
    //     ignored:/node_module/
    // }

}