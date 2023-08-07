const path = require('path');
module.exports = {
    entry: {
        dashboard: './src/Pages/Dashboard.ts',
        apiTest: './src/Pages/ApiTest.ts',
        myCoordinates: './src/Pages/MyCoordinates.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist') 
    },
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        }
    },
}