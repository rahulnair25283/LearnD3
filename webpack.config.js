/**
 * Created by rahul on 1/12/2016.
 */
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    debug: true,
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?compact=true'] },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}