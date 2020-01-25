$(document).ready(function () {

    /* Слайдер (по 3 слайда) */
    if ($("div").is(".slider-3")) {
        $('.slider-3').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    }

    /* Слайдер (по 1 слайду) с автопрокруткой */
    if ($("div").is(".slider-1-auto")) {
        $('.slider-1-auto').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 600,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    for(var clone_a = 0; clone_a < 3; clone_a++) {
        $(".ticker-line a").each(function () {
            $(this).clone().appendTo(".ticker-line");
        });
    }


    /* Бегущая строка с текстом */
    if ($("div").is(".ticker-line")) {
        $('.ticker-line').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 13000,
            autoplay: true,
            autoplaySpeed: 0,
            pauseOnHover: false,
            cssEase: 'linear',
            variableWidth: true
        });
    }

    /* Временная шкала */
    $('.slider-1-auto').on('afterChange', function(){
        $(".slider-1-auto li").removeClass("active");
        $(".slider-1-auto li.slick-active").addClass("active")
    });

    /* После полной загрузки страницы: */
    $(window).load(function() {
        $(".slider").css("opacity","1");
        $(".slider-1-auto li.slick-active").addClass("active");
        $(".transition-1s").css("transition", "all 1s ease-in-out")
    });

    /* Выводим стрелки слайдера по бокам от Заголовка */
    function positionArrowSlider() {
        $(".arrow-near-title").each(function () {
            var left_title = $(this).find("h2").offset().left;
            var right_title = $(this).find("h2").offset().left + $(this).find("h2").outerWidth();
            var left_slider = $(this).offset().left;
            $(this).find(".slick-prev").css("left", left_title - left_slider - 21);
            $(this).find(".slick-next").css("left", right_title - left_slider)
        });
    }

    $(window).load(function() {positionArrowSlider()});
    $(window).resize(function(){positionArrowSlider()});

    /* Активация анимации при прокрутке страницы */

    $(".animation-list").each(function () {
        var delay_transition = 0;
        $(this).find(".animate-delay").each(function () {$(this).css("transition-delay", delay_transition + "ms"); delay_transition += 500});
    });
    $(".animation-list-300").each(function () {
        var delay_transition = 0;
        $(this).find(".animate-delay").each(function () {$(this).css("transition-delay", delay_transition + "ms"); delay_transition += 300});
    });

    var height_window = $(window).innerHeight();
    $(".animate-block").each(function () {
        var top_block = $(this).offset().top;
        var _this = $(this);
        if(height_window > top_block) {$(this).addClass("animate-active")}

        $(document).scroll(function () {
            var bottom_window = $(window).scrollTop() + height_window - 150;
            if(bottom_window > top_block){_this.addClass("animate-active")}
        });
    });


    /* Меню */
    $("body").on("click", '.btn-menu', function () {$("body").addClass("active-menu")});
    $("body").on("click", '.menu .close', function () {$("body").removeClass("active-menu")});


    /* Показ скрытого содержимого №1 */
    $(".show-hidden-content .hidden").hide();
    $(document).on('click', '.show-hidden-content .show', function () {
        if($(this).closest(".show-hidden-content").hasClass("active")) {
            $(this).closest(".show-hidden-content").removeClass("active");
            $(this).closest(".show-hidden-content").find(".hidden").slideUp();
        } else {
            $(".show-hidden-content").removeClass("active");
            $(".show-hidden-content .hidden").slideUp();
            $(this).closest(".show-hidden-content").addClass("active");
            $(this).closest(".show-hidden-content").find(".hidden").slideDown();
        }
    });

    /* Показ скрытого содержимого №2 */
    var old_max_height = 0;

    $(document).on('click', '.show-more .show', function () {

        var max_height = parseInt($(this).closest(".show-more").find(".hidden-container").css("max-height"));
        var real_height = $(this).closest(".show-more").find(".hidden").height();

        if($(this).closest(".show-more").hasClass("active")) {
            $(this).text("Показать полностью");
            $(this).closest(".show-more").find(".hidden-container").css("max-height", old_max_height);
            $(this).closest(".show-more").removeClass("active");
        } else {
            $(this).text("Скрыть");
            old_max_height = max_height;
            $(this).closest(".show-more").find(".hidden-container").css("max-height", real_height);
            $(this).closest(".show-more").addClass("active");
        }
    });

    $(".show-more .hidden-container").each(function () {
        var max_height = parseInt($(this).css("max-height"));
        var real_height = $(this).find(".hidden").height();
        if(real_height > max_height) {
            $(this).closest(".show-more").find(".show").css("display", "block");
        }
    });


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


    /* Выбор форм */
    function activeForm() {
        $(".form-selection form").slideUp();
        var name_form = $(".tab-selection .item.active").data("type");
        $(".form-" + name_form).slideDown();
    }
    activeForm();

    $(document).on('click', '.tab-selection .item', function () {
        $(".tab-selection .item").removeClass("active");
        $(this).addClass("active");
        activeForm();
    });


    /* Обводка при наведении */
    $(document).on('mouseenter', '.list-with-stroke a', function () {
        var top = $(this).offset().top;
        var left = $(this).offset().left;
        var height = $(this).outerHeight();
        var width = $(this).outerWidth();
        if(height > 62) {
            left -= 10;
            top -= 4;
        }
        $(".stroke-svg-block").addClass("active").css("top", top).css("left", left);
        $(".stroke-svg-block .stroke-svg").css("width", width).css("height", height)
    });

    $(document).on('mouseleave', '.list-with-stroke a', function () {
        $(".stroke-svg-block").removeClass("active");
    });


});

