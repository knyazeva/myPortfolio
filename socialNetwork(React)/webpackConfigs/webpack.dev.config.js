const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        contentBase: baseWebpackConfig.externals.paths.public,
        overlay: {   // вывод ощибок на экран
            warnings: false,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({   // карта для css файлов
            filename: "[file].map"
        }),
    ]
});


module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});