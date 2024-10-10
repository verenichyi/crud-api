const path = require('node:path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const plugins = NODE_ENV === 'development' ? [ new NodemonPlugin() ] : [];

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
    externals: [ nodeExternals() ],
    plugins
};
