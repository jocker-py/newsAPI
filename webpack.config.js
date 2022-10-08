const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // создает HTML-файл на основе шаблона
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // удаляет/очищает директорию сборки проекта

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'), // точка входа
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i, // все файлы css
                use: ['style-loader', 'css-loader'], // лоудеры для css
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'], // расширения 
    },
    output: {
        filename: 'index.js', // результирующий файл js
        path: path.resolve(__dirname, './dist'), // точка выхода
    },
    plugins: [
        new HtmlWebpackPlugin({  
            template: path.resolve(__dirname, './src/index.html'), // шаблон HTML
            filename: 'index.html', // название выходного файла
            favicon: path.resolve('./src/assets/favicon.ico')
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
