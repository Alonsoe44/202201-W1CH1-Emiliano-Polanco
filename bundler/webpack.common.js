const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = {
    entry: path.resolve(__dirname, "../src/script.js"),
    output: {
        filename: 'bundle.[contenthash].js',
        clean: true
    },

    module: {

        rules:[
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },

            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/source'
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),

    new CopyPlugin({
        patterns:[
            {
                from: "static",
                noErrorOnMissing: true
            }
        ]
    }) 
    ]
    


}