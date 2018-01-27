
const path= require('path');
const devServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports= {
    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js'
        
    },
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
                    use:'css-loader'
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
            chunks:['index']
        }),
        new ExtractTextPlugin("css/index.css"),
        // new UglifyJsPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8081'
    }

}