$(document).ready(function () {

    /* Меню */
    $(".menu a").click(function () {
        var name = $(this).attr("href");
        var target = $("[name=" + name + "]").offset().top - ($("header").height() + 20);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: target}, 800);
        return false;
    });

    /* Счётчик "Старт мероприятия" */
    var countDownDate = new Date("April 26, 2020 14:00:00").getTime();
    setInterval(function () {
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
        $(".day").html(d);
        $(".hour").html(h);
        $(".min").html(m);
        $(".sec").html(s);
    }, 1000);


    // Слайдеры
    if ($("ul").is(".bxslider")) {
        $('.bxslider1').bxSlider({minSlides: 1, maxSlides: 7, slideWidth: 119, moveSlides: 1, controls: true, auto: false, pager: false, pause: 6000});
        $('.bxslider2').bxSlider({maxSlides: 10, minSlides: 1, slideWidth: 85, moveSlides: 1, controls: true, auto: false, pager: false, pause: 6000});
    }


    // Открытие/закрытие меню (мобильная версия)
    $(".menu_mobile").click(function() {
        $("body").hasClass("slide_left") ? $("body").removeClass("slide_left") : $("body").addClass("slide_left");
    });
    $(".menu li").click(function() {$("body").removeClass("slide_left")});


    // Скрытые формы
    $(".registration").click(function () {open_hidden_form(this)});
    $(".pdd").click(function () {open_hidden_form(this)});
    $(".route").click(function () {open_hidden_form2(this)});
    $(".volunteers").click(function () {open_hidden_form(this)});
    $(".contacts").click(function () {open_hidden_form(this)});
    $(".traffic_rules").click(function () {tab_menu(this)});
    $(".mileage").click(function () {tab_menu(this)});
    $(".velo_mileage").click(function () {tab_menu(this)});
    function tab_menu(type) {
        $(".right_menu ul").each(function () {
            $(this).removeClass("active")
        });
        var tab = $(type).data("type");
        $(".tab_" + tab).addClass("active");
    }
    $(".left_menu li").click(function () {
        $(".left_menu li").each(function () {
            $(this).removeClass("active")
        });
        $(this).addClass("active");
        bg_black();
    });
    function bg_black() {
        $(".left_menu li").each(function () {
            if($(this).hasClass("active")){
                if($(this).hasClass("traffic_rules")){
                    $(".left_menu li").each(function () {
                        $(this).css("background", "none");
                    })
                }
                return false;
            } else {
                $(this).css("background", "black");
            }
        });
    }
    bg_black();

    function open_hidden_form2(type_form) {
        var form = $(type_form).data("type");
        $(".form_" + form).css("visibility", "visible");
        $(".bg_opacity").addClass("active");
        if($(window).width() < 960) {
            $("body").addClass("scroll_none");
        }
        $(".exit_icon").click(function () {
            $(".form_" + form).css("visibility", "hidden");
            $(".bg_opacity").removeClass("active");
            if($(window).width() < 960) {
                $("body").removeClass("scroll_none");
            }
        })
    }

    function open_hidden_form(type_form) {
        var form = $(type_form).data("type");
        $(".form_" + form).css("display", "block");
        $(".bg_opacity").addClass("active");
        if($(window).width() < 960) {
            $("body").addClass("scroll_none");
        }
        $(".exit_icon").click(function () {
            $(".form_" + form).css("display", "none");
            $(".bg_opacity").removeClass("active");
            if($(window).width() < 960) {
                $("body").removeClass("scroll_none");
            }
        })
    }
    $(".menu_form > ul > li a").click(function () {
        $(this).parent().parent().find("li").removeClass("active");
        $(this).parent().addClass("active")
    });


    /*  Активность/неактивность кнопок */
    $(".check_blue").click(function () {
        $(this).hasClass("pressed") ? $(this).removeClass('pressed') : $(this).addClass('pressed');
    });

});



/* Карта + её оптимизация */
$(window).load(function() {setTimeout(function(){
    var check_if_load = false;
    var coord_x = $("#map").data("x");
    var coord_y = $("#map").data("y");
    var text_map = $(this).data("text");

    function init () {
        var myMap = new ymaps.Map('map', {
            center: [coord_x, coord_y],
            zoom: 15
        });

        var myPlacemark = new ymaps.Placemark([coord_x, coord_y], {
            hintContent: text_map
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: './assets/images/flag.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-40, -40]
        });

        myMap.geoObjects.add(myPlacemark);
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
