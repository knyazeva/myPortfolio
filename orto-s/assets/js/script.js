$(document).ready(function () {

    /* Слайдер (по 1 слайду) */
    if ($("div").is(".slider-1")) {
        $('.slider-1').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    /* Подсказки под шапкой */
    $(document).on('mouseenter', '.prompt-text', function () {
        function countPrompt(this_) {
            if($(window).width() > 1024) {
                if($(".line-prompt").hasClass("search-active")) {return false}
                this_.hasClass("bvi-panel-open") ? $(".line-prompt .text").css("font-size", "32px") : $(".line-prompt .text").css("font-size", "16px");

                $(".line-prompt").show();
                $(".line-prompt .text").css("margin-left", 0);
                $(".line-prompt span").css("left", 0);
                var text_prompt = $(".line-prompt .text");
                var central_content = $("header .central-content");

                var text_hover = this_.data("prompt");  // текст подсказки
                text_prompt.text(text_hover);

                var center_hover = this_.offset().left + (this_.outerWidth()/2) - (text_prompt.width()/2);  // центрирование текста под областью наведения

                if(center_hover < central_content.offset().left) {  // условия, если подсказки вылезают за границы центрального контента
                    text_prompt.css("margin-left", central_content.offset().left + parseInt($("header .central-content").css("padding-left")));
                } else if(center_hover + text_prompt.width() > central_content.offset().left + central_content.width()) {
                    text_prompt.css("margin-left", central_content.offset().left + central_content.width() - text_prompt.width() + parseInt($("header .central-content").css("padding-left")));
                } else {
                    text_prompt.css("margin-left", center_hover);
                }

                var center_prompt = this_.offset().left + this_.outerWidth()/2 - ($(".line-prompt span").width()/2);  // центрирование стрелки
                $(".line-prompt span").css("left", center_prompt);

                this_.removeAttr("title");

            } else {
                $(".line-prompt").hide();
            }
        }

        var this_name = $(this);
        countPrompt(this_name);
        $(window).resize(function(){countPrompt(this_name)});

    });

    $(document).on('mouseleave', '.prompt-text', function () {
        if($(".line-prompt").hasClass("search-active")) {
            return false
        } else {
            $(".line-prompt").hide()
        }
    });


    /* Поиск */
    $(document).on('click', '.search', function () {
        $(".line-prompt").hasClass("search-active") ? $(".line-prompt").removeClass("search-active") : $(".line-prompt").addClass("search-active");
        $(".line-prompt").show();

        var arrow_prompt = $(this).offset().left;  // центрирование стрелки
        $(".line-prompt span").css("left", arrow_prompt);
        var width_search = $(window).width()/2 - ($(window).width() - ($(this).offset().left + $(this).width())) + 30; // динамическая ширина
        $(".line-prompt form").css("width", width_search);
        var right_search = $(this).offset().left + $(this).width() - $(".line-prompt form ").width() + 30; // координаты правого угла формы
        $(".line-prompt form").css("margin-left", right_search);
    });

    $(document).mouseup(function(e) {
        if($(".line-prompt").hasClass("search-active")){
            var div = $(".line-prompt.search-active");
            if ($(".ui-icon").is(e.target)) {return false}
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                setTimeout(function(){
                    $(".line-prompt").removeClass("search-active").hide();
                }, 10);
            }
        }
    });


    /* Карта + её оптимизация */
    var check_if_load = false;

    function init () {
        console.log("карта начала подгружаться");
        var scale_map = $(".contact-map-common").data("scale");
        var center_map_x = $(".contact-map-common").data("x");
        var center_map_y = $(".contact-map-common").data("y");
        var myMap = new ymaps.Map('map-main', {
            center: [center_map_x,center_map_y],
            zoom: scale_map
        });
        $(".contact-coords").each(function () {
            var coord_x = $(this).data("x");
            var coord_y = $(this).data("y");
            var text_map = $(this).data("text");
            var myPlacemark = new ymaps.Placemark([coord_x,coord_y], {
                hintContent: text_map,
                balloonContentHeader: ''
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'http://pages.logicasoft.pro/orto/assets/images/favicon.png',
                iconImageSize: [36, 36],
                iconImageOffset: [-18, -18]
            });

            $(".map-prompt").click(function () {
                myMap.geoObjects.add(myPlacemark);
                $("#map-main").addClass("is-focus");
            });

            $(document).mouseup(function(e) {
                if($("#map-main").hasClass("is-focus")) {
                    var map = $("#map-main");
                    if ($(".ui-icon").is(e.target)) {return false}
                    if (!map.is(e.target) && map.has(e.target).length === 0) {
                        setTimeout(function(){
                            myMap.geoObjects.remove(myPlacemark);
                            map.removeClass("is-focus");
                        }, 10);
                    }
                }
            });

        });
        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('rulerControl');
        //myMap.behaviors.disable('scrollZoom');
        if ($(window).width() < 1025) {myMap.behaviors.disable('drag')}
    }

    /*Функция загрузки API Яндекс при попадании в поле зрения*/
    function loadScript(url, callback){
        var script = document.createElement("script");
        script.src = url;
        script.onload = function(){callback()};
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    /* Проверяем, находится ли карта в поле зрения */
    $(window).load(function() {
        if ($("div").is("#map-main")) {
            function loadMap() {
                if (!check_if_load) {
                    check_if_load = true;
                    setTimeout(function(){$("#map-main").addClass('load-map')}, 900);
                    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){ymaps.load(init)});
                }
            }

            var top_coord_map = $("#map-main").offset().top;
            var bottom_window = $(window).scrollTop() + $(window).height();

            setTimeout(function(){if(top_coord_map < bottom_window) {loadMap()}}, 1000);
            $(document).scroll(function () {
                bottom_window = $(window).scrollTop() + $(window).height();
                if(bottom_window > top_coord_map) {loadMap()}
            });
        }
    });



    /* Фиксация шапки */
    var header_height = $("header").outerHeight();
    var main_content_top = $(".main-content").offset().top;
    $(document).scroll(function () {
        var top = $(window).scrollTop();
        if(top > main_content_top) {
            $("header").css("height", header_height);
            $("body").addClass("fix-header");
        } else {
            $("header").css("height", "auto");
            $("body").removeClass("fix-header");
        }
    });


    /* Правильно размещаем иконки относительно текста */
    function topIconText() {
        $(".blue-list2 li > span").each(function () {
            var height_text = $(this).height();
            if(height_text > 20) {
                $(this).parent().find(".img-icon").css("margin-top", 7)
            }
        })
    }
    topIconText();
    $(window).resize(function(){topIconText()});

    /* Размер цифры в зависимости от заголовка */
    $(".numbered-blocks .title span").each(function () {
        var height = $(this).height();
        if(height > 60) {
            $(this).next().addClass("big-size-num")
        }
    });


    /* Плавная прокрутка к верху страницы */
    $(".arrow-up").click(function () {$('html, body').stop().animate({ scrollTop: 0}, 1000)});

    /* Работа мобильного меню (+ костыли для фиксации body на IOS) */
    var top_window_remember = 0;
    $(".burger").click(function () {
        var current_top_window = $(window).scrollTop();
        top_window_remember = current_top_window;
        $("body").addClass("active-menu");
        setTimeout(function(){
            $("body").css("position", "fixed");
            $(".main-content").css("top", -current_top_window);
        }, 1000);
    });
    $(".close-menu").click(function () {
        $("body").removeClass("active-menu").css("position", "relative");
        $(".main-content").css("top", 0);
        $('html, body').stop().animate({ scrollTop: top_window_remember}, 0);
    });


    /* Версия для слабовидящих */
    $(".bvi-panel-open").click(function () {
        $("body").addClass("active-bvi");
    });

    var timerId = setInterval(function() {
        if(getCookie('bvi-panel-play') === undefined) {
            $("body").removeClass("active-bvi");
            clearInterval(timerId);
        } else {
            $("body").addClass("active-bvi");
        }
    }, 1000);


    /* Получить Cookie */
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /* Динамическая высота блоков */
    $(window).load(function() {
        function dinamic_h(name, number) {$(name).height($(name).width()*number)}
        dinamic_h(".banner-for-mobile", 0.5);

        $(window).resize(function(){
            dinamic_h(".banner-for-mobile", 0.5);
        });
    });

    /* Выводим стрелки слайдера по бокам dots */
    function positionArrowSlider() {
        $(".slider").each(function () {
            var left_dots = $(this).find(".slick-dots li:first-child").offset().left;
            var right_dots = $(this).find(".slick-dots li:last-child").offset().left;
            var left_slider = $(this).offset().left;
            $(this).find(".slick-prev").css("left", left_dots - left_slider - 40);
            $(this).find(".slick-next").css("left", right_dots - left_slider + 40)
        });
    }

    $(window).load(function() {positionArrowSlider()});
    $(window).resize(function(){positionArrowSlider()});


});