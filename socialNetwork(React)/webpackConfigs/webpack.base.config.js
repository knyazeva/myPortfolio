const path = require("path");  // для указания корректного пути
const MiniCssExtractPlugin = require("mini-css-extract-plugin");   // отделение css от js при сборке
const HtmlWebpackPlugin = require("html-webpack-plugin");   // нужен для того, что index.html работал внутри src, а не в корне проекта
const CopyWebpackPlugin = require("copy-webpack-plugin");   // нужен для копирования изображений в production
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // удаляет ненужные файлы из предыдущей сборки
const ImageminPlugin = require('imagemin-webpack-plugin').default;   // оптимизация png
const imageminMozjpeg = require('imagemin-mozjpeg');   // оптимизация jpg
require('babel-polyfill');  // для корректной работы async await


const PATHS = {
    src: path.join(__dirname, "../src"),
    public: path.join(__dirname, "../build"),
    assets: "assets",
    publicPath: "/"
};


module.exports = {
    externals: {   // делаем для того, чтобы PATHS была доступна и в других конфигах webpack
        paths: PATHS
    },
    entry: {   // точки входа
        index: ['babel-polyfill', `${PATHS.src}/index.tsx`]
    },
    output: {   // точки выхода
        filename: `${PATHS.assets}/js/[name].[hash].js`,
        path: `${PATHS.public}`,
        publicPath: `${PATHS.publicPath}`
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        //options: {modules: {localIdentName: '[name]_[local]__[hash:base64:5]'}}  // настройка для css module
                    },
                    {
                        loader: "postcss-loader",
                        options: {config: { path: "./postcss.config.js" }}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {config: { path: "./postcss.config.js" }}
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: "[name].[ext]", outputPath: "./assets/img"}
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {name: '[name].[ext]', outputPath: "./assets/fonts"}
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    devServer: {
        historyApiFallback: true,  // для корректной работы route
    },
    plugins: [   // регистрация плагинов
        new MiniCssExtractPlugin({ filename: `${PATHS.assets}/css/[name].[hash].css` }),
        new HtmlWebpackPlugin({ template: `${PATHS.src}/index.html` }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}/img`},
            {from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts`}
        ]),
        new ImageminPlugin({
            test: /\.(png|jpe?g)$/ ,
            pngquant: {quality: '65-100'},
            plugins: [imageminMozjpeg({quality: 65, progressive: true})]
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            assets: path.resolve(__dirname, '../src/assets/')  // для абсолютного обращения к пути Assets
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    }
};