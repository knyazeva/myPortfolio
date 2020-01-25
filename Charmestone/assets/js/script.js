$(document).ready(function () {

    /* Анимация при загрузке сайта */
    setTimeout(function(){
        $("*").css("transition"," all 1.5s ease-in-out");
        $("*").css("-webkit-transition"," all 1.5s ease-in-out");
        $(".loading").css("opacity", "0")
    }, 700);
    setTimeout(function(){$(".main-content").css("opacity", "1"); $("body").css("overflow-y", "visible")}, 2000);
    setTimeout(function(){getCookie('stock_city')==1 ? $(".popup.stock").fadeOut() : $(".popup.stock").fadeIn()}, 2000);
    setTimeout(function(){getCookie('city')=='msk' ? $("#msk").addClass("active") : $("#spb").addClass("active")}, 2000);
    setTimeout(function(){$(".slider-gallery-text").css("opacity","1")}, 3000);
    setTimeout(function(){$(".arrow-number").css("opacity","1")}, 2500);

    if ($("img").is(".lazy")) {
        $("img.lazy").lazyload({
            effect : "fadeIn"
        });
    }

    /* Работа переключателя */
    if ($("div").is(".switch")) {
        $(".switch").click(function () {
            $(".img-no-backlight").css("transition","all 1.5s ease-in-out");
            $(".img-backlight").css("transition","all 1.5s ease-in-out");
            var name_switch1 = $(this).find(".name-switch").data("type");
            var name_switch2 = $(this).find(".name-switch").data("type2");
            if($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).find(".name-switch").html(name_switch2);
                $(".showroom-img").removeClass("backlight");
            } else {
                $(this).addClass("active");
                $(this).find(".name-switch").html(name_switch1);
                $(".showroom-img").addClass("backlight");
            }
            $(".showroom-img").addClass("remove_prev");
            setTimeout(function(){$(".showroom-img").removeClass("remove_prev")}, 500);
            DeleteStone();
        });
    }

    /* Переключение главного изображения в зависимости от выбранного камня и выбранной комнаты (Шоурум - Детальная) */
    if($("div").is(".showroom-stone")){
        var href_active = "";
        var href_active2 = "";

        /* Выбор камня */
        $(".showroom-stone .item").click(function () {
            $(".showroom-stone .item").removeClass("active");
            $(this).addClass("active");
            showroomImg();
            DeleteStone();
        });

        /* Выбор комнаты */
        $(".showroom-detail .menu a").click(function () {
            if($(this).hasClass("back")) {return}
            $(".showroom-detail .menu a").removeClass("active");
            $(this).addClass("active");
            href_active = $(this).attr("href");
            href_active2 = href_active.slice(1);
            window.location.hash = href_active2;
            window.scrollTo(0,0);
            var name_tab = $(this).html();
            $(".main-title h1").html(name_tab);
            showroomImg();
            DeleteStone();
        });

        /* Подгрузка нужной информации для выбранной комнаты (при загрузке страницы) */
        var hash_showroom = window.location.hash;
        $(".menu a").each(function () {
            $(this).attr("href");
            if($(this).attr("href") === hash_showroom) {
                $(".menu a").removeClass("active");
                $(this).addClass("active");
                var name_tab = $(this).html();
                $(".main-title h1").html(name_tab);
                DeleteStone();
                showroomImg()
            }
        });
        function showroomImg() {
            var hash_showroom = window.location.hash;
            $(".showroom-stone .item").each(function () {
                if($(this).hasClass("active")) {
                    var hash = hash_showroom.slice(1);
                    var nobacklight = $(this).data("nobacklight-" + hash);
                    var prev_nobacklight = $(".img-no-backlight").attr("src");
                    var backlight = $(this).data("backlight-" + hash);
                    var prev_backlight = $(".img-backlight").attr("src");

                    $(".showroom-img").addClass("change");

                    $(".img-no-backlight").attr("src", nobacklight);
                    $(".img-prev-no-backlight").attr("src", prev_nobacklight);
                    $(".img-backlight").attr("src", backlight);
                    $(".img-prev-backlight").attr("src", prev_backlight);

                    if (nobacklight === undefined) {$(".img-no-backlight").attr("src", "http://charmestone.logicasoft.pro/wp-content/themes/charmestone/assets/images/black.jpg")}
                    if (backlight === undefined && $(".switch").hasClass("active")) {$(".img-backlight").attr("src", "http://charmestone.logicasoft.pro/wp-content/themes/charmestone/assets/images/black.jpg")}

                    setTimeout(function(){$(".showroom-img").removeClass("change")}, 100);
                }
            });
        }
        showroomImg();

        function DeleteStone() {
            var hash_showroom = window.location.hash;
            $(".showroom-stone .item").each(function () {
                $(this).show();
                $(".showroom-img img").fadeIn();
                $(".showroom-img span").remove();
                $(".switch").removeClass("disable");
                var data_item = $(this).data("nobacklight-" + hash_showroom.slice(1));
                var data_item2 = $(this).data("backlight-" + hash_showroom.slice(1));
                if($(this).hasClass("active")) {
                    if(data_item2 === undefined) {
                        $(".switch").addClass("disable");
                    }
                    if($(".switch").hasClass("active")) {
                        if(data_item2 === undefined) {
                            $(".showroom-img img").hide();
                            $(".showroom-img span").remove();
                            $(".showroom-img").append("<span>Изображение комнаты без подсветки, в выбранном Вами варианте камня, отсутствует</span>");
                            $(".switch").removeClass("disable");
                        }

                    }
                    if (data_item === undefined) {
                        $(".showroom-img img").hide();
                        $(".showroom-img span").remove();
                        $(".showroom-img").append("<span>Изображение комнаты, в выбранном Вами варианте камня, отсутствует</span>");
                        $(".switch").addClass("disable");

                    }
                    if(hash_showroom === "") {
                        var h = "";
                        $(".menu a").each(function () {
                            if($(this).hasClass("active")) {
                                h = $(this).attr("href");
                            }
                        });
                        $(".showroom-stone .item").each(function () {
                            if($(this).hasClass("active")) {
                                var data_4 = $(this).data("nobacklight-" + h.slice(1));
                                var data_5 = $(this).data("backlight-" + h.slice(1));
                                $(".showroom-img img").fadeIn();
                                $(".showroom-img span").remove();
                                $(".img-no-backlight").attr("src", data_4);
                                $(".img-backlight").attr("src", data_5);
                                if(data_5 === undefined) {return false} else {$(".switch").removeClass("disable")}
                            }
                        })
                    }
                    return false;
                }
            });
        }
        DeleteStone();


        /* Вычисляем ширину блока с камнями, для того, чтобы установить горизнтальную прокрутку */
        function scrollWidth() {
            if ($(window).width() < 1024) {
                var width_scroll = 0;
                $(".showroom-stone .collection-list .item").each(function () {
                    var width_item = $(this).width();
                    width_scroll = width_scroll + width_item;
                });
                var width_parent = $(".showroom-stone").width();
                if(width_parent > width_scroll) {
                    $(".showroom-stone .collection-list").width("100%");
                } else {
                    $(".showroom-stone .collection-list").width(width_scroll/2);
                }
            }
        }
        scrollWidth();
        $(window).resize(function(){scrollWidth()});
    }

    /* Вкладки на странице "Карточка продукта" */
    if ($("div").is(".tab-product")) {
        $(".menu a").click(function () {
            $(".menu a").removeClass("active");
            $(this).addClass("active");
            var href_name = $(this).attr("href").slice(1);
            window.location.hash = href_name;
            window.scrollTo(0,0);
            $(".tab-product").removeClass("active");
            $('#' + href_name).addClass("active");
            if(href_name === "photo-gallery") {
                $(".navigation-block").css("background", "rgba(0,0,0,0.7)")
            } else {
                $(".navigation-block").css("background", "none")
            }
        });

        var hash = window.location.hash;
        var hash2 = hash.slice(1);
        $(".tab-product").removeClass("active");
        $(hash).addClass("active");
        $(".menu a").each(function () {
            var href_name = $(this).attr("href").slice(1);
            var href_name2 = $(this).attr("href").slice(1);
            if($(this).hasClass("back")) {return}
            if(hash2 === "") {
                if($(this).hasClass("active")) {
                    $('#' + href_name).addClass("active");
                }
            }
            if(hash2 === href_name) {
                $(".menu a").removeClass("active");
                $(this).addClass("active");
                $(href_name2).addClass("active");
                $(".navigation-block").css("background", "none")
            }
            if(hash2 === "photo-gallery") {
                $(".navigation-block").css("background", "rgba(0,0,0,0.7)")
            }
        });
    }

    /* Сортировка на странице "Коллекция" */
    $(".type-stone").click(function () {
        $(".type-stone").removeClass("active");
        $(this).addClass("active");
        var type_stone = $(this).data("type");
        $(".collection-list a").css("transition","none");
        $(".collection-list a").removeClass("active");
        setTimeout(function(){
            $(".collection-list a").css("transition","all 1.5s ease-in-out");
            $("." + type_stone).addClass("active");
        }, 100);
        window.location.hash = type_stone;

        if ($("img").is(".lazy")) {
            $("img.lazy").lazyload({effect : "fadeIn"});
        }

    });
    $(".type-stone").each(function () {
        var hash_color = window.location.hash;
        var hash_color_slice = hash_color.slice(1);
        if (hash_color_slice === "") {
            if($(this).hasClass("active")) {
                var type_stone = $(this).data("type");
                $("." + type_stone).addClass("active");
            }
        } else {
            var type_stone_color = $(this).data("type");
            $(this).removeClass("active");
            if(hash_color_slice === type_stone_color) {
                $(this).addClass("active");
                $("." + type_stone_color).addClass("active");
                return false;
            }
        }

    });

    /* Высота блоков на странице "Карточка продукта" */
    function height_product() {
        if ($("div").is(".product-info")) {
            $(".product-info").each(function () {
                var height_product = $(this).height();
                $(this).find(".container-text").height(height_product - 100);
            });
        }
    }
    height_product();
    $(window).resize(function(){ height_product()});

    /* Высота 100% экрана для мобильных без прокрутки */
    function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))}
    function fix100vh() {
        var winHeight = $(window).height();
        if ( is_mobile() ) {
            $('.left-menu').css('height', winHeight);
        }
    }
    fix100vh();

    /* Маска для телефонов */
    if ($("input").is(".mask-phone")) {
        $(".mask-phone").mask("+7 (999) 999-9999");
    }
    $(".mask-phone").click(function () {$(this).focus()});

    /*  Активность/неактивность checkbox кнопок  */
    $(".checkbox:checked").addClass("pressed-checkbox");
    $(".checkbox").click(function () {
        if ($(this).hasClass("pressed-checkbox")) {
            $(this).removeClass('pressed-checkbox');
        } else {
            $(this).addClass('pressed-checkbox');
        }
    });

    /* Работа меню */
    if (!$("div").is(".menu")) {
        $(".setting-mobile").hide();
    }
    $(".burger").click(function () {$("body").hasClass("active-menu") ? $("body").removeClass("active-menu") : $("body").addClass("active-menu")});
    $(".setting-mobile").click(function () {$("body").hasClass("setting-active") ? $("body").removeClass("setting-active") : $("body").addClass("setting-active")});
    $(".mobile-settings").click(function () {$("body").hasClass("setting-active") ? $("body").removeClass("setting-active") : $("body").addClass("setting-active")});
    if ($("div").is(".navigation-block")) {
        $(".setting-mobile").hide();
        if (window.location.href.indexOf("okameneloe-derevo") > -1) {$(".mobile-settings").addClass("light-btn")}
        if (window.location.href.indexOf("obsidian") > -1) {$(".mobile-settings").addClass("light-btn")}

    }
    function clickSetting() {
        if ($(window).width() < 770) {
            $(".menu label").click(function () {
                $("body").removeClass("setting-active")
            });
            $(".menu a").click(function () {
                $("body").removeClass("setting-active")
            });
            $(".menu span").click(function () {
                $("body").removeClass("setting-active")
            })
        }
    }
    clickSetting();
    $(window).resize(function(){clickSetting()});

    $(".left-menu .left-submenu").each(function () {
        $(this).closest(".item").append("<span></span>");
    });
    $(".left-menu-list .item").click(function () {
        $(".left-menu-list").removeClass("active");
        if($(this).closest(".item").hasClass("active")) {
            $(this).closest(".item").removeClass("active");
            $(this).closest(".item").find(".left-submenu").stop().slideUp(1000);
            setTimeout(function(){$(".city-stock").show()}, 700);
        } else {
            $(".left-menu-list").addClass("active");
            $(this).closest(".item").addClass("active");
            $(this).closest(".item").find(".left-submenu").stop().slideDown(1000);
            $(".city-stock").hide();
        }
    });

    /* Фиксированная шапка */
    $(document).scroll(function () {
        var top = $(window).scrollTop();
        if(top > 0) {
            $("body").addClass("fix-header");
        } else {
            $("body").removeClass("fix-header");
        }
    });

    /* Галерея fancybox */
    $(".gallery").fancybox({
        afterShow: function(){
            $(".fancybox-outer").css("transition","none");
            $(".fancybox-outer").css("opacity", "0");
            setTimeout(function(){
                $(".fancybox-outer").css("transition","all 1s ease-in-out");
                $(".fancybox-outer").css("opacity","1")
            }, 50);
        }
    });


    /* Cookie (Выбор города) */
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    $(".stock a").click(function() {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);  // cookie на 1 день
        document.cookie = "stock_city=1; path=/; expires=" + tomorrow.toUTCString();
        var type_city = $(this).data("type");
        if(type_city === "msk") {
            document.cookie = "city=msk; path=/; expires=" + tomorrow.toUTCString();
        }
        if(type_city === "spb") {
            document.cookie = "city=spb; path=/; expires=" + tomorrow.toUTCString();
        }
        $('.popup.stock').fadeOut();
    });
    $(".city-stock a").click(function() {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);  // cookie на 1 день
        var type_city = $(this).data("type");
        if(type_city === "msk") {
            document.cookie = "city=msk; path=/; expires=" + tomorrow.toUTCString();
        }
        if(type_city === "spb") {
            document.cookie = "city=spb; path=/; expires=" + tomorrow.toUTCString();
        }
    });

    /* Динамическая высота блоков */
    function dinamic_h(name, number) {setTimeout(function(){$(name).height($(name).width()*number)}, 100)}

    dinamic_h(".news .news-img", 0.6);

    $(window).resize(function(){
        setTimeout(function(){
            dinamic_h(".news .news-img", 0.6);
        }, 1000)
    });


    /* Слайдер с количеством слайдов */
    if ($("div").is(".js-slider2")) {
        $('.js-slider2').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 2000,
            fade: true,
            pauseOnHover: false,
            //autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('.prev'),
            nextArrow: $('.next')
        });
    }

    /* Вставк в HTML - текущий номер слайда */
    Current_slide('.js-slider2', '#slider-current1');
    function Current_slide(slider_name, html_write) {
        $(slider_name).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var slider_current = nextSlide + 1;
            $(html_write).html(slider_current);
        });
    }

    /* Вставк в HTML - общее количество слайдов */
    $(window).ready(function () {Count_slide('.js-slider2 .slick-dots li', '#slider-count1')});
    $(window).resize(function(){Count_slide('.js-slider2 .slick-dots li', '#slider-count1')});
    function Count_slide(all_slides, html_write) {
        var slider_count = $(all_slides).length;
        if (slider_count === 0) {
            $(html_write).html(1);
        } else {
            $(html_write).html(slider_count);
        }

    }

    /* Карта */

    if($("div").is("#map-contacts")){
        var stock_coords_x = $("#map-contacts").data("lat");
        var stock_coords_y = $("#map-contacts").data("lng");
        ymaps.ready(init);
        function init () {
            var myMap = new ymaps.Map('map-contacts', {
                center: [stock_coords_x,stock_coords_y],
                zoom: 16
            });

            var myPlacemark = new ymaps.Placemark([stock_coords_x,stock_coords_y], {
                hintContent: 'Московская область, гор. округ Красногорск д.Бузланово, автодорога «Балтия», строение 1'
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: './assets/images/marker-map.png',
                iconImageSize: [44, 59],
                iconImageOffset: [-23, -45]
            });
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('multiTouch');

        }
    }

});


