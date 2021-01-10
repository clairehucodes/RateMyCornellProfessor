const path = require('path');

module.exports = {
    //context: __dirname,
    devtool: 'eval-source-map',
    entry: {
        bundle: ['./src/content.ts'],
        background: ['./src/background.ts']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        //publicPath: '/public/'
    },
    module: {
        rules: [
            {
                //test: /\.ts$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'ts-loader'
                }
                //include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions:['.ts', '.js']
    }
}

