$(document).ready(function () {

    $(window).on('load', function () {
        function lazyNew() {
            $("img.lazy").each(function () {

                var bottom_screen = $(window).scrollTop() + $(window).height();
                var top_img = $(this).offset().top;

                if(top_img < bottom_screen && !$(this).hasClass("load-ok")) {
                    var src_desktop = $(this).data("desktop");
                    var src_mobile = $(this).data("mobile");

                    if ($(window).width() > 1012) {
                        $(this).attr("src",src_desktop);
                    } else {
                        src_mobile === undefined ? $(this).attr("src",src_desktop) : $(this).attr("src",src_mobile);
                    }

                    $(this).addClass("load-ok");
                }
            });
            $('.slider-variable-width').slick('setPosition');
        }

        lazyNew();
        $(document).scroll(function () {lazyNew()});
        $(window).resize(function () {lazyNew()});
    });

    /* Слайдер (по 1 слайду) */
    if ($("div").is(".slider-1")) {
        $('.slider-1').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 970,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        centerMode: true,
                        fade: false
                    }
                }
            ]
        });
    }

    /* Слайдер (по 4 слайда) */
    if ($("div").is(".slider-4")) {
        $('.slider-4').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        centerMode: true,
                        infinite: true
                    }
                }
            ]
        });
    }

    /* Слайдер (по 6 слайдов) */
    if ($("div").is(".slider-6")) {
        $('.slider-6').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,
                        arrows: false,
                        centerMode: true,
                        infinite: true
                    }
                }
            ]
        });
    }

    /* Слайдера с разной шириной картинок */
    if ($("div").is(".slider-variable-width")) {
        $('.slider-variable-width').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            centerMode: true,
            variableWidth: true
        });
    }


    /* Слайдер только для экранов менее 960px */
    function sliderOnlyMobile() {
        if ($("div").is(".js-slider1-mobile")) {
            if ($(window).width() < 1012) {
                $('.js-slider1-mobile').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    speed: 500,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    centerMode: true,
                    responsive: [
                        {
                            breakpoint: 890,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            } else {
                if($('.js-slider1-mobile').hasClass("slick-initialized")) {
                    $('.js-slider1-mobile').slick("unslick");
                }
            }
        }
    }
    sliderOnlyMobile();
    $(window).resize(function(){sliderOnlyMobile()});

    /* Слайдер только для экранов менее 960px */
    function sliderOnlyMobile2() {
        if ($("div").is(".js-slider1-mobile2")) {
            if ($(window).width() < 997) {
                $('.js-slider1-mobile2').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    speed: 500,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                });
                $('.js-slider1-mobile2').slick('slickGoTo', 1);
            } else {
                if($('.js-slider1-mobile2').hasClass("slick-initialized")) {
                    $('.js-slider1-mobile2').slick("unslick");
                }
            }
        }
    }
    sliderOnlyMobile2();
    $(window).resize(function(){sliderOnlyMobile2()});

    /* Слайдер только для экранов менее 960px */
    function sliderOnlyMobile3() {
        if ($("div").is(".js-slider1-mobile3")) {
            if ($(window).width() < 1012) {
                $('.js-slider1-mobile3').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    speed: 500,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    responsive: [
                        {
                            breakpoint: 700,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            } else {
                if($('.js-slider1-mobile3').hasClass("slick-initialized")) {
                    $('.js-slider1-mobile3').slick("unslick");
                }
            }
        }
    }
    sliderOnlyMobile3();
    $(window).resize(function(){sliderOnlyMobile3()});


    $(window).load(function() {$(".slider").css("opacity","1")});

    $(".slider .slick-dots").each(function () {
        var top_arrows = parseInt($(this).closest(".slider").find(".slick-arrow").css("margin-top"));
        var new_top_arrow = top_arrows - 30;
        $(this).closest(".slider").find(".slick-arrow").css("margin-top", new_top_arrow);
    });


    /* Показ скрытого содержимого №1 */
    $(document).on('click', '.js-show-hidden .show', function () {
        $(this).closest(".js-show-hidden").hasClass("active") ? $(this).closest(".js-show-hidden").removeClass("active") : $(this).closest(".js-show-hidden").addClass("active");
    });


    /* Показ скрытого содержимого №2 */
    $(window).load(function() {
        $(document).on('click', '.show-more .show', function () {
            var text_show = $(this).data("text-show");
            var text_hidden = $(this).data("text-hidden");

            if($(this).closest(".show-more").hasClass("active")) {
                $(this).closest(".show-more").removeClass("active");
                $(this).text(text_show);
            } else {
                $(this).closest(".show-more").addClass("active");
                $(this).text(text_hidden);
            }
        });

        function showMore() {
            $(".show-more .hidden-container").each(function () {
                var max_height = parseInt($(this).css("max-height"));
                var real_height = $(this).find(".hidden").height();
                var show_block = $(this).closest(".show-more").find(".show");
                if(max_height > 5) {
                    real_height > max_height ? show_block.css("display", "inline-block") : show_block.css("display", "none");
                }
            });

            $(".show-more[data-visual-blocks]").each(function () {
                var num_visual = $(this).data("visual-blocks");
                $(this).find(".item").hide();
                for(var i = 1; i <= num_visual; i++) {
                    $(this).find(".item:nth-child(" + i + ")").show()
                }
                if($(this).find(".item").length > num_visual) {
                    $(this).find(".btn-with-bg").show();
                    $(this).find(".show").css("display", "inline-block");
                }
            });
        }

        setTimeout(function(){showMore()}, 1000);
        $(window).resize(function(){showMore()});
    });


    /* Показ скрытого содержимого №3 */
    $(document).on('click', '.js-show-hidden2 .show', function () {
        if($(this).closest(".js-show-hidden2").hasClass("active")) {
            $(this).closest(".js-show-hidden2").removeClass("active");
            $(this).closest(".js-show-hidden2").find(".hidden").slideUp();
            if($(this).data("show")){$(this).text($(this).data("show"))}
        } else {
            $(this).closest(".js-show-hidden2").addClass("active");
            $(this).closest(".js-show-hidden2").find(".hidden").slideDown();
            if($(this).data("hidden")){$(this).text($(this).data("hidden"))}
        }
    });


    /* Заказать звонок в шапке */
    $(document).on('click', '.order-call', function () {$(".hidden-order-call").slideDown()});
    $(document).on('click', '.hidden-order-call .close', function () {$(".hidden-order-call").slideUp()});


    /* Поиск в шапке */
    $(document).on('click', '.btn-search', function () {
        $("body").removeClass("menu-active");
        if($(window).width() < 1012) {$(".header-search form").css("transition", "right .5s linear")}
        $("body").hasClass("search-active") ? $("body").removeClass("search-active") : $("body").addClass("search-active");
        if($(window).width() < 1012){setTimeout(function(){$(".header-search form").css("transition", "none")}, 1000)}
    });

    $(document).on('click', '.search-active .main-content', function () {
        if($(window).width() < 1012) {$(".header-search form").css("transition", "right .5s linear")}
        $("body").removeClass("search-active");
        if($(window).width() < 1012){setTimeout(function(){$(".header-search form").css("transition", "none")}, 1000)}
    });


    /* Мобильное меню */
    $(document).on('click', '.burger', function () {
        $("body").removeClass("search-active");
        $("body").hasClass("menu-active") ? $("body").removeClass("menu-active") : $("body").addClass("menu-active");
    });


    /* Выбор города через popup */
    $(window).load(function() {

        if(getCookie('city-name') !== undefined) {
            $(".choose-city .city").removeClass("active");
            $("a[data-city=" + getCookie('city-name') + "]").addClass("active")
        }

        $(".choose-city .title").text($(".choose-city .city.active").text());

        $(document).on('click', '.choose-city .city', function () {
            setCookie("city-name", $(this).data("city"));
        });

        /* Получить Cookie */
        function getCookie(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        /* Задать Cookie */
        function setCookie(name, value) {
            var tomorrow = new Date();
            tomorrow.setDate(new Date().getDate()+28);
            document.cookie = "" + name + "=" + value + "; path=/; expires=" + tomorrow.toUTCString();
        }
    });


    /* Клонирование нужных блоков со всего сайта в мобильное меню */
    $(window).load(function() {
        if ($("div").is(".choose-city")) {$(".choose-city").clone().appendTo(".menu-mobile")}
        if ($("a").is(".btn-constructor")) {$(".btn-constructor").clone().appendTo(".menu-mobile")}
        if ($("div").is(".menu-faculties")) {$(".menu-faculties").clone().appendTo(".menu-mobile")}
        $(".menu-mobile").append('<div class="menu-gray"></div>');
        if ($("div").is(".header-top .menu")) {$(".header-top .menu").clone().appendTo(".menu-mobile .menu-gray")}
        if ($("div").is(".footer-menu")) {
            $(".footer-menu a").each(function () {
                $(this).clone().appendTo(".menu-mobile .menu-gray")
            });
        }
    });


    /* Маска для телефонов */
    if ($("input").is(".mask-phone")) {$(".mask-phone").mask("+7 (999) 999-9999")}
    $(".mask-phone").click(function () {$(this).focus()});


    /* Подстановка цвета бордеров в меню */
    $(".menu-faculties .item[data-color]").each(function () {
        var item_color = $(this).data("color");
        $(this).css("border-color", item_color);
        $(this).append("<div class='border-top'></div>");
        $(this).find(".border-top").css("background", item_color);

    });


    /* Меню с факультетами */
    if($(".menu-faculties .item[data-color]")) {
        var item_color_first = $(".menu-faculties .item[data-color]:first-child").data("color");
        var item_color_last = $(".menu-faculties .item[data-color]:last-child").data("color");
        $(".menu-faculties").closest(".menu-faculties-parent").prepend("<div class='border-left' style='background: " + item_color_first + "'></div>");
        $(".menu-faculties").closest(".menu-faculties-parent").append("<div class='border-right' style='background: " + item_color_last + "'></div>")
    }


    /* Скрыть карту при клике (для мобильных) */
    $(document).on('click', '.close-map', function () {
        if($(this).closest(".block-map").hasClass("active")) {
            $(this).closest(".block-map").find("#map").slideDown();
            $(this).text("Свернуть карту");
            $(this).closest(".block-map").removeClass("active")
        } else {
            $(this).closest(".block-map").find("#map").slideUp();
            $(this).text("Развернуть карту");
            $(this).closest(".block-map").addClass("active")
        }
    });


    /* Переносим хлебные крошки в первый блок */
    if ($("div").is(".breadcrumb")) {$(".breadcrumb").clone().prependTo($(".breadcrumb").next())}


    /*  Активность/неактивность radio и checkbox кнопок  */
    $(".radio:checked").addClass("pressed");
    $(".radio").click(function () {
        var name_radio = $(this).attr("name");
        $(".radio").each(function () {if ($(this).attr("name") === name_radio) {$(this).removeClass('pressed')}});
        $(this).addClass('pressed');
    });

    $(".checkbox:checked").addClass("pressed-checkbox");
    $(".checkbox").click(function () {
        $(this).hasClass("pressed-checkbox") ? $(this).removeClass('pressed-checkbox') : $(this).addClass('pressed-checkbox');
        var parent = $(this).closest(".js-pricing");
        totalPrice(parent);
    });


    /* Прогресс-бар */
    $(".progress-bar .num").each(function () {
        var num = parseFloat($(this).text());
        var num_max = parseFloat($(this).closest(".item").find(".to").text());
        var percent = num * 100 / num_max;
        var num_width = $(this).width();
        var from_width = $(this).closest(".item").find(".to").width();
        $(this).closest(".item").find(".line span").css("width", percent + "%");
        $(this).closest(".item").find(".num").css("left", percent + "%");
        $(this).closest(".item").find(".num").css("margin-left", -(num_width/2 + from_width) + "px")
    });


    /* Просцет цены по выбранным опциям */
    function totalPrice(_this) {
        var start_price = parseFloat($(_this).find(".new-price").data("price"));
        $(_this).find(".total-price span").text(start_price + " руб");

        $(_this).find(".checkbox.pressed-checkbox").each(function () {
            start_price = start_price + parseFloat($(this).closest(".list-checkbox").find(".item-price b").data("price"));
            $(_this).find(".total-price span").text(start_price + " руб")
        })
    }

    if ($("form").is(".js-pricing")){
        $(".js-pricing").each(function () {
            var price_current = $(this).find(".new-price").data("price");
            if($(this).find(".checkbox.pressed-checkbox").length > 0) {
                totalPrice(this)
            } else {
                $(this).find(".total-price span").text(price_current + " руб")
            }
        });
    }


    /* Вкладки */
    function activeTabs() {
        var tab_name = $(".tabs-block .item.active").data("type");
        $(".item-tab").hide();
        $(".item-tab[data-type='" + tab_name + "']").show();
    }

    activeTabs();
    $(document).on('click', '.tabs-block .item', function () {
        $('.tabs-block .item').removeClass("active");
        $(this).addClass("active");
        activeTabs();
    });

    /* Уроки (мобильная версия) */
    $(document).on('click', '.card-version-8 .num', function () {
        if($(this).closest(".item").hasClass("active")) {
            $(this).closest(".item").removeClass("active")
        } else {
            $(this).closest(".item").addClass("active");

        }
    });


    /* Вызов блока с подтверждением действия */
    $(document).on('click', '.remove', function () {$(this).closest(".item").addClass("active-conf")});
    $(document).on('click', '.confirmation-remove .btn-conf', function () {$(this).closest(".item").removeClass("active-conf")});


    /* Скрываем содержимое блока и выводим вместо него кнопку "показать" (только для мобильных) */
    $(document).on('click', '.btn-mobile', function () {
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            var text_show = $(this).data("show");
            $(this).text(text_show);
            $(this).closest(".mobile-btn-show").find(".hidden-mobile").slideUp();
            if($(window).width() < 900) {$(this).closest(".teacher-block").find(".img-teacher").slideDown().css("display", "inline-block");}

        } else {
            $(this).addClass("active");
            var text_hidden = $(this).data("hidden");
            $(this).text(text_hidden);
            $(this).closest(".mobile-btn-show").find(".hidden-mobile").slideDown();
            if($(window).width() < 900) {$(this).closest(".teacher-block").find(".img-teacher").slideUp();}
        }
    });

    /* Таймер */
    $(".timer").each(function () {
        var time = $(this).data("time");
        var name = $(this);
        var countDownDate = new Date(time).getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var d = Math.floor(distance / (1000 * 60 * 60 * 24));
            var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var s = Math.floor((distance % (1000 * 60)) / 1000);
            if(d < 10) {d = "0"+d;}
            if(h < 10) {h = "0"+h;}
            if(m < 10) {m = "0"+m;}
            if(s < 10) {s = "0"+s;}
            name.find(".day").html(d);
            name.find(".hour").html(h);
            name.find(".min").html(m);
            name.find(".sec").html(s);
        }, 1000);
    });


    /* Конструктор (мобильная версия) */
    if($(".btn-constructor").hasClass("active")) {
        var num_product = $(".btn-constructor").find(".num-product").text();
        $(".mobile-constructor .num").text(num_product);
        $(".btn-constructor.active").clone().appendTo(".mobile-constructor .hidden-content");
    }

    function mobileConstructor() {
        if($(".btn-constructor").hasClass("active")) {
            $(window).width() < 1012 ? $(".mobile-constructor").show().addClass("active") : $(".mobile-constructor").hide().removeClass("active");
        }
    }
    mobileConstructor();
    $(window).resize(function(){mobileConstructor()});

    /* Фиксация конструктора */
    if ($("div").is(".mobile-constructor.active")) {
        var constructor_top = $(".mobile-constructor").offset().top;
        $(document).scroll(function () {
            var top = $(window).scrollTop();
            if(top > constructor_top) {
                $("body").addClass("fix-constructor");
            } else {
                $("body").removeClass("fix-constructor");
            }
        });
    }

    /* Фиксация купона */
    if ($("div").is(".fix-discount")) {
        $(document).scroll(function () {
            var top = $(window).scrollTop();
            top > 0 ? $("body").addClass("body-fix-discount") : $("body").removeClass("body-fix-discount");
        });
    }

    /* Подставляем заголовки в ячейки таблиц */
    $('table td').each(function () {
        var text = $(this).data("text");
        $(this).find("b").text(text)
    });

    /* Подставнока подсказок в поля формы */


    $(window).load(function() {
        $(".prompt-input > *").each(function () {
            var prompt_text = $(this).attr("placeholder");
            if($(this).val().length) {$(this).parent().addClass("filed")}
            if($(this).attr("data-prompt")) {
                $(this).parent().addClass("filed");
                prompt_text = $(this).data("prompt");
            }
            if(prompt_text !== undefined) {$(this).parent().append("<span>" + prompt_text + "</span>")}
        });

        $('.prompt-input > *').focus(function(){
            $(this).parent().addClass("filed");
            if($(this).attr("data-prompt")) {
                return false
            } else {
                $(this).attr("placeholder", "")
            }
        });

        $('.prompt-input > *').focusout(function(){
            $('.prompt-input > input').each(function () {
                var val = $(this).val();
                if(val.length === 0) {$(this).parent().removeClass("filed")}
            });
            $(".prompt-input span").each(function () {
                var text_prompt = $(this).text();
                if($(this).parent().find("input").attr("data-prompt")) {
                    $(this).parent().addClass("filed");
                } else {
                    $(this).parent().find(" > *").attr("placeholder", text_prompt)
                }
            });
        });

    });

    /* Селект только для мобильных */
    if ($("div").is(".mobile-select")) {
        $(".mobile-select").each(function () {
            var title = $(this).find(".mobile-select-list .active b").text();
            var num = $(this).find(".mobile-select-list .active span").text();
            $(this).find(".mobile-select-title .title").text(title);
            $(this).find(".mobile-select-title span").text(num);
        });

        $(document).on('click', '.mobile-select-title', function () {
            var parent = $(this).closest(".mobile-select");
            parent.hasClass("active") ? parent.removeClass("active") : parent.addClass("active");
        });
    }

    /* Коллаж из фото */
    if ($("div").is(".collage-photo")) {
        $(".collage-photo").each(function () {
            var num = $(this).find(".item-photo").length;
            if (num > 3) {
                $(this).addClass("collage-" + 3);
                $(this).find(".item-photo:nth-child(3) a").append("<div class='more-photo'>еще " + (num - 3) + " фото</div>")
            } else {
                $(this).addClass("collage-" + num);
            }
        });
    }



    /* Карта + её оптимизация */

    $(window).load(function() {setTimeout(function(){
        var check_if_load = false;

        function init () {
            var center_map_x = 0;
            var center_map_y = 0;
            if($(window).width() > 900 && $("div").is(".info-on-map")) {
                center_map_x = $(".contact-map-common").data("x");
                center_map_y = $(".contact-map-common").data("y") - 0.006000;
            } else {
                center_map_x = $(".contact-map-common").data("x");
                center_map_y = $(".contact-map-common").data("y");
            }
            var scale_map = $(".contact-map-common").data("scale");
            var marker_img = $(".img-for-marker").data("src");
            var myMap = new ymaps.Map('map', {
                center: [center_map_x,center_map_y],
                zoom: scale_map
            });
            $(".contact-coords").each(function () {
                var coord_x = $(this).data("x");
                var coord_y = $(this).data("y");
                var text_map = $(this).data("text");

                var myPlacemark = new ymaps.Placemark([coord_x,coord_y], {
                    hintContent: text_map,
                    iconContent: '<img src="' + marker_img + '" class="marker-img">'
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [33, 51],
                    iconImageOffset: [-20, -35]
                });
                myMap.geoObjects.add(myPlacemark);
            });
            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('rulerControl');
            myMap.behaviors.disable('scrollZoom');
            if ($(window).width() < 690) {myMap.behaviors.disable('drag')}
        }

        /*Функция загрузки API Яндекс при попадании в поле зрения*/
        function loadScript(url, callback){
            var script = document.createElement("script");
            script.src = url;
            script.onload = function(){callback()};
            document.getElementsByTagName("head")[0].appendChild(script);
        }

        /* Проверяем, находится ли карта в поле зрения */
        if ($("div").is("#map")) {
            function loadMap() {
                if (!check_if_load) {
                    check_if_load = true;
                    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){ymaps.load(init)});
                }
            }

            var bottom_window = $(window).scrollTop() + $(window).height();

            if($("#map").offset().top < bottom_window) {loadMap()}
            $(document).scroll(function () {
                bottom_window = $(window).scrollTop() + $(window).height();
                if(bottom_window > $("#map").offset().top) {loadMap()}
            });
        }
    }, 1000)});

    $(document).on('click', '#map', function () {
        $(this).addClass("active")
    });

    /* Отложенная подгрузка виджетов */
    $(window).load(function() {
        setTimeout(function(){
            var widget = $('<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.3"></script>');
            $('body').append(widget);

        }, 3000);
    });

});
