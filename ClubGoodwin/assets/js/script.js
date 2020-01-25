$(function () {
    /* Расписание (построение нужной высоты для всех ячеек под их содержимое) */
    $(".schedule").each(function () {
        var length_tr = $(this).find(".schedule-time tr").length - 1;
        var number_tr = 2;
        var new_height_tr = 0;
        var height_tr = 0;
        for (var item_num = 0; item_num < length_tr; item_num++) {
            $(this).find(".schedule-slider .item").each(function () {
                height_tr = $(this).find("tr:nth-child(" + number_tr + ")").height();
                if (height_tr > new_height_tr) {
                    new_height_tr = height_tr + 1;
                }
            });
            $(this).find(".schedule-slider .item").each(function () {
                $(this).find("tr:nth-child(" + number_tr + ")").height(new_height_tr);
                $(this).closest(".schedule").find(".schedule-time tr:nth-child(" + number_tr + ")").height(new_height_tr);
            });
            number_tr = number_tr + 1;
            new_height_tr = 0;
        }
    });
    $(".schedule").each(function () {
        $(this).attr('data-height', $(this).height());
    });

    /* Перезагрузка страницы при ресайзе, для корректной работы перелиствания экранов */
    $(window).resize(function(){
        if ($(window).width() > 1040) {
            window.setTimeout('location.reload()', 500);
        }
    });

    /* Увеличение картинок */
    $("a.gallery").fancybox();
    
    /* Анимация соцсетей на мобильных */
    $('.social-networks').on("click", function(){
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".circle-mobile").animate({"width" : "0", "height" : "0"}, 500);
            $(".social-networks a:nth-child(1)").animate({"top" : "500px", "left" : "500px"}, 500);
            $(".social-networks a:nth-child(2)").animate({"top" : "500px", "left" : "500px"}, 500);
        } else {
            $(this).addClass("active");
            $(".circle-mobile").animate({"width" : "300px", "height" : "300px"}, 500);
            $(".social-networks a:nth-child(1)").animate({"top" : "-57px", "left" : "-20px"}, 500);
            $(".social-networks a:nth-child(2)").animate({"top" : "-56px", "left" : "-68px"}, 500);
        }
    });

    /* Маска для телефонов */
    if ($("input").is(".phone_mask")) {
        $(".phone_mask").mask("+7 (999) 999-9999");
    }

    /* Анимация */

    $(".svg-good").animate({"left" : "0"}, 500);
    $(".svg-win").animate({"right" : "0"}, 500);
    $(".svg-two-points").animate({"top" : "0"}, 500);
    if ($(window).width() < 700) {
        $(".ball").animate({"left" : "85%", "top" : "35%"}, 500);
    } else {
        $(".ball").animate({"left" : "40%", "top" : "35%"}, 500);
    }

    /* Пролистывание к нужному месту на странице (при клике) */
    var last_page = null;
    $('.button-white').on("click", function(){
        scrollToPage("#" + $(this).data("type"));
        last_page = $(this).closest('.screen').attr('id');
    });

    $('.logo-small').on("click", function(){
        if ($(this).attr('id') != 'application' && last_page) {
            console.log(last_page);
            scrollToPage("#" + last_page);
            last_page = null;
        } else {
            scrollToPage();
        }
    });
    $('.menu a').on("click", function(){
        var top_href = $("#" + $(this).data("type")).offset().top;
        $(window).scrollTop(top_href);
        scrollToPage("#" + $(this).data("type"));
        location.hash = $(this).data('type');
        /*window.history.pushState('', "", $(this).data('type'));
        doHistoryLogic();*/
    });

    $('.menu-internal a').bind("click", function(){
        scrollToElement("#" + $(this).data("type"));
    });


    /* Назначение высоты документа, в зависимости от количества в нем экранов (блоков) */
    var scroll_idle = 0;
    if ($(window).width() >= 1040) {
        scroll_idle = $(window).height();
    }

    var height_html = 0;
    var count_pages = $(".screen").length;
    var prev_scroll = 0;

    $(".screen").each(function (index) {
        var height_block = $(this).height() + scroll_idle;
        height_html = height_html + height_block;
        if (count_pages >= 1) {
            $(this).css("z-index", 99 + count_pages - index);
            $(this).attr("data-page", index + 1);
        }
    });
    height_html -= scroll_idle;
    $("body").css('height', height_html + 'px');

    /* Пролистывание экранов */

    var n_screen = 1;

    function scrollPages(scrollTop) {
        if ($(window).width() < 1040) {
            return false;
        }

        var scroll_delta_full = Math.abs(scrollTop - prev_scroll);
        do {
            var screen = $('.screen[data-page="' + n_screen + '"]');
            var height = screen.height() + scroll_idle;
            var scrolled = Math.min(parseInt(screen.css('top')), 0) * -1;

            var scroll_delta = Math.min(scroll_delta_full, height);

            if (scrollTop > prev_scroll) { // down
                screen.css('top', -( scrolled + scroll_delta ) + 'px');
                scrolled += scroll_delta;
            } else { // up
                screen.css('top', -( scrolled - scroll_delta ) + 'px');
                scrolled -= scroll_delta;
            }

            if (scrolled > height) {
                screen.css('top', -( height ) + 'px');
                n_screen = Math.min(count_pages, n_screen + 1);

                scroll_delta_full += scrolled - height;
            } else if (scrolled < 0 && n_screen > 1) {
                screen.css('top', 0);
                n_screen--;

                scroll_delta_full += scrolled * -1;
            }

            var real_n_screen = n_screen;
            if (scrolled > (height - scroll_idle) / 2) {
                real_n_screen = Math.min(count_pages, n_screen + 1);
            }


            scroll_delta_full -= scroll_delta;
        } while(scroll_delta_full > 0);

        prev_scroll = scrollTop;

        $(".schedule").each(function () {
            var top_block = $(this).offset().top;
            var height = $(this).height();
            var bottom_block = top_block + height;
            var scroll = $(window).scrollTop();
            if(scroll > top_block + 70 && scroll < bottom_block) {
                $(this).addClass("fixed");
                $(this).css('height', $(this).data('height') + 'px');
            } else {
                $(this).removeClass("fixed");
                $(this).css('height', $(this).data('height') + 'px');
            }
        });
    }

    function scrollToPage(selector)
    {
        var height = 0;
        for(var i = $(selector).data('page') - 1; i > 0; i--) {
            height += $('.screen[data-page="' + i + '"]').height() + scroll_idle;
        }

        $(window).scrollTop(height);
    }

    function scrollToElement(selector)
    {
        $(window).scrollTop($(selector).offset().top);
    }

    $(window).scroll(function() {
        scrollPages($(window).scrollTop());
    });


    if (location.hash && $(location.hash).length) {
        scrollToPage(location.hash);
    }

    /* Расписание */

    if ($("div").is(".schedule-slider")) {
        $('.schedule-slider').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 7,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }




    /* Работа слайдера (шапка) */

    if ($("div").is(".js-slider1")) {
        $('.js-slider1').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 10,
            slidesToScroll: 1,
            asNavFor: '.js-slider2',
            dots: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 970,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }
            ]

        });
    }
    if ($("div").is(".js-slider2")) {
        $('.js-slider2').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('.prev'),
            nextArrow: $('.next'),
            asNavFor: '.js-slider1'
        });
    }

    /* Вставк в HTML - текущий номер слайда */
    Current_slide('.js-slider2', '#slider-current1');

    function Current_slide(slider_name, html_write) {
        $(slider_name).on('afterChange', function (event, slick, currentSlide) {
            var slider_current = currentSlide + 1;
            $(html_write).html(slider_current);
        });
    }

    /* Вставк в HTML - общее количество слайдов */
    $(window).ready(function () {Count_slide('.js-slider2 .slick-dots li', '#slider-count1')});
    $(window).resize(function(){Count_slide('.js-slider2 .slick-dots li', '#slider-count1')});

    function Count_slide(all_slides, html_write) {
        var slider_count = $(all_slides).length;
        $(html_write).html(slider_count);
    }

    if ($(window).width() > 700) {
        $('.priorities li').mouseover(function () {
            var name = $(this).data('type');
            $("." + name).addClass("active");
        });
        $('.priorities li').mouseout(function () {
            var name = $(this).data('type');
            $("." + name).removeClass("active");
        });
    }
    if ($(window).width() < 700) {
        $('.priorities li').click(function () {
            var name = $(this).data('type');
            $("." + name).addClass("active");
            $(".hidden-priorities div.cancel").css("display", "block");
            $(".bg_opacity").css("display", "block");
            if ($(window).width() < 970) {
                $("body").addClass("fix");
                $('body').bind('touchmove', function(e){e.preventDefault()})
            }
        });
        $(".hidden-priorities div.cancel").click(function () {
            $(".hidden-priorities div").removeClass("active");
            $(".hidden-priorities div.cancel").css("display", "none");
            $(".bg_opacity").css("display", "none");
            if ($(window).width() < 970) {
                $("body").removeClass("fix");
                $('body').unbind('touchmove')
            }
        });
    }

    $(".trainer .item").click(function () {
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            if ($(window).width() < 970) {
                $("body").removeClass("fix");
                $('body').unbind('touchmove')
            }
        } else {
            $(this).addClass("active");
            if ($(window).width() < 970) {
                $("body").addClass("fix");
                $('body').bind('touchmove', function(e){e.preventDefault()})
            }
        }
    });
    $(".menu_mobile").click(function () {
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".menu").removeClass("active")
        } else {
            $(this).addClass("active");
            $(".menu").addClass("active")
        }
    })
});