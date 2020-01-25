$(document).ready(function () {

    /* Поиск */
    $(".search").click(function () {
        $("body").addClass("panel-search-active");
        $(".panel-search input[type='search']").focus();
    });
    $(".exit").click(function () {
        $("body").removeClass("panel-search-active");
    });

    /* Работа меню (мобильная версия) */
    $(".menu-mobile").click(function () {
        if($("body").hasClass('active-menu')) {
            $("body").removeClass('active-menu');
        } else {
            $("body").addClass("active-menu");
        }
    });

    /* Личный кабинет (мобильная версия) */
    if ($(window).width() < 992) {
        $(".private-office > a").removeAttr("href");
        $(".private-office .img-container").click(function () {
            if($("body").hasClass('active-private')) {
                $(".private-office-list").fadeOut();
                $("body").removeClass('active-private');
            } else {
                $(".private-office-list").fadeIn();
                $("body").addClass("active-private");
            }

        });
    }

    if($("div").is(".block-collage")){
        $(".block-collage .text").each(function () {
            var height_text = $(this).height();
            if(height_text < 260) {
                $(this).closest(".block-collage").find(".left-text").addClass("remove-before");
            }
        });
    }

    /* Ползунок настроек */
    $(".activity-header-set label").click(function () {
        if($(this).hasClass('right')) {$(this).closest(".activity-header-set").addClass('right-set')}
        if($(this).hasClass('left')) {$(this).closest(".activity-header-set").removeClass('right-set')}
    });
    $(".switch label").click(function () {
        $(".switch label").removeClass("active");
        $(this).addClass("active");
        if($(this).hasClass('right')) {$(this).closest(".switch").addClass('right-set')}
        if($(this).hasClass('left')) {$(this).closest(".switch").removeClass('right-set')}
        dataSwitchEach()
    });

    function dataSwitchEach() {
        $("[data-switch]").each(function () {
            $(this).hide();
            var active_block = $(".switch label.active").attr("for");
            $("[data-switch=" + active_block + "]").show();
        })
    }
    dataSwitchEach();


    $(".type-event label").click(function () {
        $(".type-event label").removeClass("active");
        $(this).addClass("active")
    });

    /* Темы */
    $(".topic-list label").click(function () {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass("active")
        }
    });

    /* Выбор города */
    $(".letter li").click(function () {
        $(".letter li").removeClass('active');
        $(this).addClass("active");
        var city_name = $(this).find("label").text();
        $(".choose-city").html(city_name);
        $(".form-choose-city").css("display", "none");
        $(".bg-opacity").hide();
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


    /* Фиксированное меню (Детальная страница мероприятия) */
    function event_navigation() {
        if($("div").is(".event-navigation")){
            var header_height = $(".event-navigation-container").innerHeight();
            var start_scroll = $(".event-navigation").offset().top;
            $(".event-navigation-container").css("height", "auto");

            $(document).scroll(function () {
                if ($(window).width() > 767) {
                    var top = $(window).scrollTop();
                    if(top > start_scroll) {
                        $("body").addClass("fix-menu-event");
                        $(".event-navigation-container").css("height", header_height)
                    } else {
                        $("body").removeClass("fix-menu-event")
                    }
                }
            });
        }
    }

    event_navigation();
    $(window).resize(function() {event_navigation()});

    /* Фиксированная шапка */
    var main_header_height = $("header").outerHeight();

    $(document).scroll(function () {
        var top = $(window).scrollTop();
        if(top > main_header_height) {
            $("body").addClass("fix-header");
        } else {
            $("body").removeClass("fix-header");
        }
    });

    /* Вкладки (мобильная версия) */
    function mobile_tab() {
        if ($(window).width() < 767) {
            function eachTab() {
                $('.tab-mobile .item').each(function(){
                    if($(this).hasClass("active")) {
                        var text_tab = $(this).html();
                        $(this).parent().find(".mobile-block-title").html(text_tab);
                        var type_event = $(this).data("type");
                        $("." + type_event).addClass("active");
                    }
                    $(this).removeAttr("href")
                });
            }
            eachTab();

            $(".mobile-block-title").unbind().click(function () {
                if ($(this).parent().hasClass("open")) {
                    $(this).parent().removeClass("open")
                } else {
                    $(this).parent().addClass("open")
                }
            });
            $(".tab-mobile .item").unbind().click(function () {
                $('.tab-mobile .item').removeClass("active");
                $('.event-detail').removeClass("active");
                $(".tab-mobile").removeClass("open");
                $(this).addClass("active");
                eachTab();
            });
        }
    }
    mobile_tab();
    $(window).resize(function() {mobile_tab()});


    /* Эмулятор селект */
    $(".emulator-select-title").click(function () {
        var parent = $(this).parent();
        parent.hasClass("open") ? parent.removeClass("open") : parent.addClass("open");
    });

    $(".emulator-select-list input:checked").each(function () {
        $(this).closest("label").hide();
        var name_label = $(this).closest("label").text();
        $(this).closest(".emulator-select").find(".emulator-select-title").text(name_label);
    });

    $(".emulator-select-list label").click(function () {
        var name_label = $(this).text();
        $(this).closest(".emulator-select").find(".emulator-select-title").text(name_label);
        $(this).closest(".emulator-select").removeClass("open").find("label").show();
        $(this).hide();
    });


    /* Маска для input полей */
    if ($("input").is(".mask-phone")) {$(".mask-phone").mask("+7 (999) 999-9999")}
    if ($("input").is(".datepicker")) {$(".datepicker").mask("99.99.9999")}
    $(".mask-phone").click(function () {$(this).focus()});


    /* Хлебные крошки */
    $(".breadcrumb li:last-child a").removeAttr("href");


    /*  Активность/неактивность radio и checkbox кнопок  */
    $(".radio:checked").addClass("pressed");
    $(".radio").click(function () {
        var name_radio = $(this).attr("name");
        $(".radio").each(function () {if ($(this).attr("name") === name_radio) {$(this).removeClass('pressed')}});
        $(this).addClass('pressed');
    });

    $(".checkbox:checked").addClass("pressed-checkbox");
    $(".checkbox").click(function () {
        if ($(this).hasClass("pressed-checkbox")) {
            $(this).removeClass('pressed-checkbox');
        } else {
            $(this).addClass('pressed-checkbox');
        }
    });


    /* Календарь */
    if ($("input").is(".datepicker")) {
        $('.datepicker').datepicker({
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель',
                'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            firstDay: 1,
            dateFormat: 'dd.mm.yy'
        });
    }


    /* Круговая диаграмма */
    var all_count = $("#count-points").data("all-count-point");
    var day_count = $("#count-points").data("day-count-point");
    var all_count_max = $("#all-count-points").data("all-count-point");
    var day_count_max = $("#all-count-points").data("day-count-point");

    var percent_points_day = day_count * 100 / day_count_max;
    var percent_points_all = all_count * 100 / all_count_max;

    if($("div").is("#diagram-points")){
        $("#diagram-points").circliful({
            animation: 1,
            animationStep: 3,
            multiPercentage: 1,
            percentages: [
                {'percent': percent_points_all, 'color': '#a0c63d', 'width': '8', 'title': '' },
                {'percent': percent_points_day, 'color': '#4ab7f0', 'width': '4', 'title': '' }
            ],
            multiPercentageLegend: 1,
            backgroundColor: '#f1eee4'
        });
    }
    $(".legend-line div:last-child").text(day_count);
    $(".legend-line div:first-child").text(all_count);


    /* Круговая диаграмма 2 */
    if($("div").is("#diagram-achievements2")){
        var current_achievements  = 15;
        var total_achievements = 100;

        var percent_points_current2 = current_achievements * 100 / total_achievements;
        var percent_points_all2 = current_achievements * 100 / total_achievements;
        $("#diagram-achievements2").circliful({
            animation: 1,
            animationStep: 3,
            multiPercentage: 1,
            percentages: [
                {'percent': 10, 'color': '#a0c63d', 'width': '8', 'title': '' },
                {'percent': percent_points_all2, 'color': '#4cb6f0', 'width': '12', 'title': '' }
            ],
            multiPercentageLegend: 1,
            backgroundColor: '#f1eee4'
        });
    }
    /* Круговая диаграмма 3 */
    if($("div").is(".diagram-achievements")){
        var current_achievements3  = 15;
        var total_achievements3 = 100;

        var percent_points_all3 = current_achievements3 * 100 / total_achievements3;
        $(".diagram-achievements").circliful({
            animation: 1,
            animationStep: 3,
            multiPercentage: 1,
            percentages: [
                {'percent': percent_points_all3, 'color': '#4cb6f0', 'width': '12', 'title': '' }
            ],
            multiPercentageLegend: 1,
            backgroundColor: '#f1eee4'
        });
    }

    /* Автовысота у textarea */
    $('.editable-card .auto-textarea').on('input', function() {
        $(this).outerHeight(25).outerHeight(this.scrollHeight);
    });

    function autoTextarea() {
        $('.editable-card .auto-textarea').each(function () {
            $(this).outerHeight(25).outerHeight(this.scrollHeight);
        });
    }
    autoTextarea();
    $(window).resize(function() {autoTextarea()});


    /* Скрипт для вывода превью фото после загрузки через input file */
    function handleFileSelectMulti(evt) {
        var files = evt.target.files;
        document.getElementById('diagram-photo-preview').innerHTML = "";
        for (var i = 0, f; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
                alert("Можно загружать только изображения!")
            } else {

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {
                        if(theFile.size > 2000000) {
                            alert("Изображения более 2 MБ не разрешены к загрузке")
                        } else {
                            var span = document.createElement('span');
                            span.innerHTML = ['<img class="img-thumbnail" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
                            document.getElementById('diagram-photo-preview').insertBefore(span, null);
                        }
                    };
                })(f);

                reader.readAsDataURL(f);
            }
        }
    }


    /* Разрешение на редактирование блока */
    $("body").on("click", '.editable-card-text .edit-icon', function () {
        $(".editable-card-text textarea").css("pointer-events","auto");
        var input_focus = $(".editable-card-text textarea:first-child");
        input_focus.focus();
        var tmpStr = input_focus.val();
        input_focus.val('');
        input_focus.val(tmpStr);
    });

    $("body").on("click", '.editable-card .show-block', function () {
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".team-list").hide();
        } else {
            $(this).addClass("active");
            $(".team-list").show();
        }
    });


    if ($("a").is(".quest2")) {
        $('.quest2').fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            },
            beforeLoad: function(){
                setTimeout(function(){
                    $("#personal_responsibility_text").scrollTop(0);
                }, 540);

            }
        });
    }


    /* Динамическая высота блоков */
    function dinamic_h(name, number) {
        setTimeout(function(){
            $(name).height($(name).width()*number)
        }, 100);
    }

    dinamic_h(".expert-img.img-container", 1);
    dinamic_h(".row-4 .item .img-container", 1);

    $(window).resize(function(){
        dinamic_h(".expert-img.img-container", 1);
        dinamic_h(".row-4 .item .img-container", 1);
    });

    /* Выравнивание блока "Задания" */
    function heightLabel() {
        if($("div").is(".tasks-list")){
            if ($(window).width() > 600) {
                $(".tasks-list .left").each(function(){
                    var height_label = $(this).height();
                    $(this).closest(".tasks-list .item").height(height_label - 5);
                    $(this).closest(".tasks-list .item").find(".right").css("padding-top", height_label - 40);
                });
            } else {
                $(".tasks-list .item").height("auto");
                $(".tasks-list .item .right").css("padding-top", 0);
            }
        }
    }
    heightLabel();
    $(window).resize(function() {heightLabel()});

    /* Таблица параметров */
    var number_sliders = $(".parameters-slider .item").length - 1;
    if ($(window).width() > 992) {
        if(number_sliders <= 6){
            number_sliders = 0;
        }
    }
    if ($("div").is(".parameters-slider")) {
        $('.parameters-slider').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 7,
            slidesToScroll: 1,
            dots: true,
            initialSlide: number_sliders,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
    $(".parameters-slider .slick-dots li").removeClass("slick-active");
    $(".parameters-slider .slick-dots li:last-child").addClass("slick-active");

    $(".parameters-slider input").each(function (index) {
        if(index === 0) {
            var inputVal = $(this).val();
            $(this).val('').focus().val(inputVal);
        }
    });

    $('body').on('click', '#buy_health', function () {//Вешаем обработчик
        id = $(this).attr('data-product');
        quantity = $(this).attr('data-quantity');
        BX.ajax.post (//Выполняем POST запрос
            '/local/ajax/buy_program.php',
            {ID:id, QUANTITY:quantity},
            function (result) {//Функция при успешном выполнении
                if(result)
                    location.href = '/catalog/health_is_easy/?action=BUY&id='+result;
                else
                    location.href = '/catalog/health_is_easy/';
            });
        return false;
    });
    /* Адаптивная работа слайдера */
    if ($("div").is(".reviews-slider")) {
        $('.reviews-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }
    if ($("div").is(".expert-slider")) {
        $('.expert-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }

});

/* Карта (детальная страница мероприятия) */

if($("div").is("#map")){
    ymaps.ready(init);
    function init () {
        var coordinates = $("#map").data("coorinates").split(',');
        var myMap = new ymaps.Map('map', {
            center: coordinates,
            zoom: 17
        });
        var myPlacemark = new ymaps.Placemark(coordinates);
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom')
    }
}

if($("div").is("#map-contacts")){
    ymaps.ready(init);
    function init () {
        var myMap = new ymaps.Map('map-contacts', {
            center: [55.749511, 37.537083],
            zoom: 16
        });

        var myPlacemark = new ymaps.Placemark([55.749511, 37.537083], {
            hintContent: 'г. Москва, Пресненская наб., дом 12, офис 4402'
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'https://cultureofhealth.ru/local/templates/cultureofhealth/assets/images/marker-map.png',
            iconImageSize: [80, 112],
            iconImageOffset: [-40, -100]
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable('multiTouch');

    }
}



