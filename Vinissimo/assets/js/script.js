$(document).ready(function () {

    /* Слайдер (по 1 слайду) */
    if ($("div").is(".header-slider")) {
        $('.header-slider').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    } else {
        $("header").addClass("header-without-slider");
    }

    if ($("div").is(".slider-1")) {
        $('.slider-1').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    /* Слайдер (по 4 слайда) */
    if ($("div").is(".slider-4")) {
        $('.slider-4').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1160,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 998,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    }

    /* Слайдер (по 3 слайда) */
    if ($("div").is(".slider-3")) {
        $('.slider-3').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 651,
                    settings: {
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true
                    }
                }
            ]
        });
    }

    /* Слайдер только для мобильного (по 1 слайду - центрирование) */
    function sliderOnlyMobile() {
        if ($("div").is(".js-slider1-mobile")) {
            if ($(window).width() < 634) {
                $('.js-slider1-mobile').not('.slick-initialized').slick({
                    dots: false,
                    arrows: true,
                    speed: 500,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
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

    /* Слайдер с миниатюрами */
    if ($("div").is(".js-slider-main")) {
        $('.js-slider-main').slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 300,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.js-slider-preview',
            responsive: [
                {
                    breakpoint: 650,
                    settings: {
                        dots: false,
                        arrows: true,
                        fade: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true
                    }
                }
            ]
        });
    }

    if ($("div").is(".js-slider-preview")) {
        $('.js-slider-preview').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.js-slider-main',
            dots: true,
            focusOnSelect: true
        });
    }

    /* Показ скрытого содержимого №1 */
    $(document).on('click', '.show-hidden-content .show', function () {
        if($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
        } else {
            $(this).parent().addClass("active");
        }
    });

    /* Показ скрытого содержимого №2 */
    $(document).on('click', '.show-more', function () {
        if($(this).parent().hasClass("show-hidden")) {
            $(this).parent().removeClass("show-hidden");
        } else {
            $(this).parent().addClass("show-hidden");
        }
    });

    /* Подстановка выбранного label в title */
    $(document).on('click', '.select-emulator label', function () {
        var name_label = $(this).text();
        $(this).closest(".select-emulator").find(".show").text(name_label);
        $(this).closest(".select-emulator").removeClass("active");
    });


    /* +/- в корзину */
    $(document).on('click', '.plus-minus span', function () {
        var input_name = $(this).closest(".plus-minus").find("input");
        var old_val = parseInt(input_name.val());
        if($(this).hasClass("plus")) {
            input_name.val(old_val + 1)
        } else {
            if(old_val <= 1) {
                return false
            } else {
                input_name.val(old_val - 1)
            }
        }
    });

    $(window).load(function() {
        $(".slider").css("opacity","1");
        $(".menu .hidden").each(function () {$(this).closest(".item").addClass("hidden-yes")});
        $(".animation-05").css("transition", "all 0.5s ease-in-out");
        $(".item-card .img-container img").css("transition", "all 0.5s ease-in-out");
    });

    /* Дорисовываем края у скрытых блоков меню */
    $(window).load(function() {
        function sideHiddenMenu() {
            var width_hidden = $("header .central-content").outerWidth();
            var left_shift = ($(window).width() - width_hidden) / 2;
            $(".menu .hidden").css('left', -left_shift).css("width", $(window).width());
            $(".burger-menu .hidden").css('left', -left_shift).css("width", $(window).width())
        }
        sideHiddenMenu();
        $(window).resize(function(){sideHiddenMenu()});
    });


    /* Динамическая высота блоков */
    $(window).load(function() {
        function dinamic_h(name, number) {$(name).height($(name).width()*number)}

        $(".card-version-1 .img-container").each(function () {dinamic_h($(this), 0.55)});
        dinamic_h(".card-version-2 .img-container", 0.74);
        dinamic_h(".card-version-2 .text-card", 0.27);
        dinamic_h(".guarantees-page .item", 0.28);

        $(window).resize(function(){
            $(".card-version-1 .img-container").each(function () {dinamic_h($(this), 0.55)});
            dinamic_h(".card-version-2 .img-container", 0.74);
            dinamic_h(".card-version-2 .text-card", 0.27);
            dinamic_h(".guarantees-page .item", 0.28);
        });
    });

    /* Отложенная подгрузка виджетов */
    $(window).load(function() {
        setTimeout(function(){
            var facebook = $('<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FVinissimoShop&tabs=timeline&width=280&height=227&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" data-adapt-container-width="true" width="280" height="227" style="border:none;overflow:hidden" allow="encrypted-media"></iframe>');
            $('.social-widget .facebook').append(facebook);

            var instagram = $('<iframe src="https://auen.ru/instablock.php?u=vinissimo&count=12&w=56&fw=280&fh=227&il=0&tb=Instagram:&cb=0&st=1&tl=Посмотреть&cl=1" style="width:280px;height:227px;border:solid 1px #ccc; overflow: hidden"></iframe>');
            $('.social-widget .instagram').append(instagram);

            var vk = $('<iframe src="http://vk.com/widget_community.php?gid=38957480&width=280&height=227" width="280" height="227" scrolling="no" frameborder="0"></iframe>');
            $('.social-widget .vk').append(vk);
        }, 1500);
    });

    /* Выбор города через popup */
    $(window).load(function() {
        if(getCookie('first-choose-city') === undefined) {
            $(".city-selection").addClass("active")
        }

        if(getCookie('city-name') !== undefined) {
            $("#popup-city-selection-list a").removeClass("active");
            var name_cookie = getCookie('city-name');
            $("a[data-cookie=" + name_cookie + "]").addClass("active")
        }

        var active_city = $("#popup-city-selection-list a.active").text();
        $(".title.city-selection-list").text(active_city);
        $(".location-ask b span").text(active_city + " ?");

        $(document).on('click', '.city-selection-list', function () {
            $("#popup-city-selection-list").addClass("active");
            $(".city-selection").removeClass("active");
        });
        $(document).on('click', '.city-yes', function () {
            $(".city-selection").removeClass("active");
            var cookie_name = $("#popup-city-selection-list a.active").data("cookie");
            setCookie("first-choose-city", "yes");
            setCookie("city-name", cookie_name);
        });
        $(document).on('click', '#popup-city-selection-list a', function () {
            var cookie_name = $(this).data("cookie");
            setCookie("first-choose-city", "yes");
            setCookie("city-name", cookie_name);
        });
        $(document).on('click', '#popup-city-selection-list .exit', function () {
            $("#popup-city-selection-list").removeClass("active");
            var cookie_name = $("#popup-city-selection-list a.active").data("cookie");
            setCookie("first-choose-city", "yes");
            setCookie("city-name", cookie_name);
        });


        /* 18+ popup */
        if(getCookie('18-yes') === undefined) {$("#popup-18").addClass("active")}
        $(document).on('click', '#popup-18 .exit', function () {$("#popup-18").removeClass("active")});
        $(document).on('click', '#popup-18 .btn', function () {$("#popup-18").removeClass("active"); setCookie("18-yes", "yes")});


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


    /* Удаляем слово 'Цена' в мобильной версии и делаем первую букву заглавной (карточка товара) */
    if ($(window).width() < 650) {
        $(".price > span").each(function () {
            var str_price = $(this).html();
            var ret = str_price.replace('Цена','');
            var s = ret.charAt(1).toUpperCase() + ret.substr(2);
            $(this).html(s);
        });
    }

    /* Работа мобильного каталога */
    $(document).on('click', '.catalog-mobile', function () {
        $("body").hasClass("catalog-active") ? $("body").removeClass("catalog-active") : $("body").addClass("catalog-active");
    });

    /* Работа мобильного бургера */
    $(document).on('click', '.burger', function () {
        if ($(window).width() <= 1100) {
            if($("body").hasClass("burger-active")) {
                $("body").removeClass("burger-active");
            } else {
                $("body").addClass("burger-active");
            }
        }
    });
    $(document).on('click', '.close', function () {$("body").removeClass("burger-active")});

    /* Фиксация шапки */
    if ($("div").is(".container-for-fix-header")) {
        var header_bottom = $("header").offset().top + $("header").outerHeight() + 100;
        $(document).scroll(function () {
            var top = $(window).scrollTop();
            if(top > header_bottom) {
                $("body").addClass("fix-header");
            } else {
                $("body").removeClass("fix-header");
            }
        });
    }


    /* Удаление href у последней хлебной крошки */
    $(".breadcrumb li:last-child a").removeAttr("href");

    /* Смена вида отображения товаров */
    $(document).on('click', '.btn-view span', function () {
        var type_view = $(this).data("type");
        $(".card-product-list").removeClass("view-list view-grid").addClass(type_view);
        $(".btn-view span").removeClass("active");
        $(this).addClass("active");
    });
    var type_view = $(".btn-view span.active").data("type");
    $(".card-product-list").addClass(type_view);

    /* Фильтр (мобильная версия) */
    $(document).on('click', '.filter-mobile', function () {$("body").addClass("filter-active")});
    $(document).on('click', '.filter .exit', function () {$("body").removeClass("filter-active")});

    /* Выставление цены в зависимоти от винтажа и объема*/
    $(".volume-list .item").removeClass("active");
    $(".volume-list .item:first-child").addClass("active");
    availabilityYear();
    activeYear();

    function activeYear() {
        /* Ставим активность на первый доступный винтаж */
        var year_active = false;
        $(".year-list .item").each(function () {
            $(this).removeClass("active");
            if(year_active === false) {
                if(!$(this).hasClass("absent")) {
                    $(this).addClass("active");
                    year_active = true;
                }
            }
        });
    }

    function availabilityYear() {
        /* Убираем активность у тех винтажей, которых нет */
        $(".year-list .item").removeClass("absent");
        $(".year-list b").each(function () {
            var year_current = $(this).text();
            var availability = $(".volume-list .active span").data(year_current);
            if(availability === undefined) {
                $(this).closest(".item").addClass("absent");
                if($(this).closest(".item").hasClass("active")){
                    activeYear();
                }
            }
        });
    }

    function definePrice() {
        var volume_active = $(".year-list .active b").text();
        $(".volume-list span").each(function () {
            $(this).text($(this).data(volume_active));
        })
    }
    definePrice();

    function activeIdProduct() {
        /* Передаю id активной бутылки */
        var year_active = $(".year-list .active b").text();
        var id_active = $(".volume-list .active span").data("id-" + year_active);
        $(".price_year_volume").attr("data-id", id_active);
        $(window).trigger( "onChangeOfferSuccess", [ id_active ]);
    }
    activeIdProduct();

    function totalPrice() {
        availabilityYear();
        activeIdProduct();

        var price_active = $(".volume-list .active span").text();
        var year_active = $(".year-list .active b").text();
        var price_shelf_active = $(".volume-list .active span").data("shelf-" + year_active);
        $(".total-price span").text("");
        $(".volume-list span").each(function () {
            $(this).text($(this).data("price"))
        });
        if ($(".volume-list .active span").data('price')) {
            var data_price = $(".volume-list .active span").data("price");
            var data_price_shelf = $(".volume-list .active span").data("shelf-price");
            $(".shelf-price .right span").text(data_price_shelf);
            $(".online-price .right span").text(data_price);
        } else {
            $(".shelf-price .right span").text(price_shelf_active);
            $(".online-price .right span").text(price_active);
        }

    }
    totalPrice();

    $(document).on('click', '.year-list .item', function () {
        $(".year-list .item").removeClass("active");
        $(this).addClass("active");
        definePrice();
        totalPrice();
    });

    $(document).on('click', '.volume-list .item', function () {
        $(".volume-list .item").removeClass("active");
        $(this).addClass("active");
        totalPrice();
        activeYear();
        definePrice();
        totalPrice();
    });


    /* Карта + её оптимизация */
    var check_if_load = false;

    function init () {
        var scale_map = $(".contact-map-common").data("scale");
        var center_map_x = $(".contact-map-common").data("x");
        var center_map_y = $(".contact-map-common").data("y");
        var myMap = new ymaps.Map('map', {
            center: [center_map_x,center_map_y],
            zoom: scale_map
        });
        $(".contact-coords").each(function () {
            var coord_x = $(this).data("x");
            var coord_y = $(this).data("y");
            var text_map = $(this).data("text");
            var remainder_map = "";
            if ($("div").is(".map-remainder")) {
                remainder_map = $(this).data("remainder");
            }

            var myPlacemark = new ymaps.Placemark([coord_x,coord_y], {
                hintContent: text_map,
                iconContent: '<div class="remainder">' + remainder_map + '</div>'
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'http://cx29037.tmweb.ru/vinissimo/assets/images/marker.png',
                iconImageSize: [21, 26],
                iconImageOffset: [-20, -35]
            });
            myMap.geoObjects.add(myPlacemark);
        });
        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('rulerControl');
        myMap.behaviors.disable('scrollZoom');
        if ($(window).width() < 680) {myMap.behaviors.disable('drag')}

        function centerMapMobile() {
            if($("div[data-mobile-x]").length) {
                if ($(window).width() <= 1024) {
                    var center_map_mobile_x = $(".contact-map-common").data("mobile-x");
                    var center_map_mobile_y = $(".contact-map-common").data("mobile-y");
                    myMap.setCenter([center_map_mobile_x, center_map_mobile_y]);
                } else {
                    var center_map_x = $(".contact-map-common").data("x");
                    var center_map_y = $(".contact-map-common").data("y");
                    myMap.setCenter([center_map_x, center_map_y]);
                }
            }
        }
        centerMapMobile();
        $(window).resize(function () {centerMapMobile()});

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
        var top_coord_map = $("#map").offset().top;
        var bottom_window = $(window).scrollTop() + $(window).height();

        $(window).load(function() {setTimeout(function(){if(top_coord_map < bottom_window) {loadMap()}}, 1000)});
        $(document).scroll(function () {
            bottom_window = $(window).scrollTop() + $(window).height();
            if(bottom_window > top_coord_map) {loadMap()}
        });
    }

    /* Сортировка */
    $(document).on('click', '.sort-block .btn', function () {
        $(".sort-block .btn").removeClass("active");
        $(this).addClass("active");
        if($(this).hasClass("arrow-icon")) {
            $(this).hasClass("down") ? $(this).removeClass("down").addClass("up") : $(this).removeClass("up").addClass("down");
        }
        return false;
    });

    /* Смена действия "наведение" и действие "клик" (для устройств) */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $("body").addClass("is-device");
    }

    /* Маска для телефонов */
    if ($("input").is(".mask-phone")) {$(".mask-phone").mask("+7 (999) 999-9999")}
    $(".mask-phone").click(function () {$(this).focus()});

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
    });


    /* Скрытые формы */
    var is_safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    function open_hidden_form(form_src) {
        var current_top_window = $(window).scrollTop();
        var form = $(form_src).data("src");
        $(".popup-form iframe").attr("src", form);
        $('.popup-form iframe').height(0);
        $("body").addClass("fix");
        if (is_safari) {$("body").addClass("fix-ios")}

        $('.popup-form iframe').on('load', function(){
            $('.popup-form iframe').height(0);
            $(".popup-form").addClass("active");
            $(this).height($(this).contents().height());
        });

        $(".popup-form .exit").click(function () {
            $(".popup-form").removeClass("active");
            $("body").removeClass("fix");
            $("body").removeClass("fix-ios");
            $('html, body').stop().animate({ scrollTop: current_top_window}, 0);
        });
        return false;
    }

    $("body").on("click",".popup-iframe", function () { return open_hidden_form(this)});


    /* Фиксация сайдбара */
    if ($(window).width() > 998) {
        if ($("div").is(".sidebar-lane-left")) {
            $('.sidebar-lane-left')
                .theiaStickySidebar({
                    additionalMarginTop: 117,
                    additionalMarginBottom: 0
                });
        }
    }


});
