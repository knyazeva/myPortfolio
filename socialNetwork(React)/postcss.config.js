module.exports = {
    plugins: [
        require('autoprefixer'),   // проставление префиксов стилям для старых браузеров
        require('css-mqpacker'),   // сжимает медиа-запросы
        require('cssnano')({   // минифицирует стили
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,  // удаление комментарием в продакшене
                    }
                }
            ]
        })
    ]
};