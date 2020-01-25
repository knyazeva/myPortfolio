$(document).ready(function () {

    // Слайдерас датами
    if ($("div").is(".js-slider-date")) {
        $('.js-slider-date').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 20,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 17,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 15,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1180,
                    settings: {
                        slidesToShow: 10,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 840,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // Слайдер биография
    if ($("div").is(".js-slider-biography")) {
        $('.js-slider-biography').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.preview-slider'
        });
    }

    if ($("div").is(".preview-slider")) {
        $('.preview-slider').slick({
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.js-slider-biography',
            dots: true,
            focusOnSelect: true
        });
    }

    // Фиксированное меню
    if ($(window).width() > 840) {
        console.log("> 840");
        $(document).scroll(function () {
            var top = $(window).scrollTop();
            if(top > 60) {
                $(".menu").addClass("fix")
            } else {
                $(".menu").removeClass("fix")
            }
        });
    }


    // Меню (мобильная версия)
    $(".menu_mobile").click(function () {
        $("body").removeClass("search_active");
        if ($("body").hasClass("menu_active")) {
            $("body").removeClass("menu_active");
        } else {
            $("body").addClass("menu_active");
        }
    });
    $(".search_mobile").click(function () {
        $("body").removeClass("menu_active");
        if ($("body").hasClass("search_active")) {
            $("body").removeClass("search_active");
        } else {
            $("body").addClass("search_active");
        }
    });

    /* Динамическая высота */
    function dinamic_h(name, number) {$(name).height($(name).width()*number)}

    dinamic_h(".js-slider-biography", 0.71);
    dinamic_h(".people a", 1);

    $(window).resize(function(){
        dinamic_h(".js-slider-biography", 0.71);
        dinamic_h(".people a", 1);
    });

    /* Эффект параллакса*/
    $(window).scroll(function() {
        $('.bg-img img').each(function(){
            var top =  parseInt($(this).data('top')) * 2.5;
            var scrolled = $(window).scrollTop() + top;
            $(this).css('top',(scrolled*0.4)+'px');
        });

    });

});