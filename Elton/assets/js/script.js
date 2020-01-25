$(document).ready(function () {
    /* Слайдер под шапкой */
    if ($("div").is(".slider_header")) {
        $('.slider_header').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    /* Слайдер из 4-х слайдов */
    if ($("div").is(".slide_4")) {
        $('.slide_4').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1180,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    /* Слайдер "История"*/
    if ($("div").is(".slider_history1")) {
        $('.slider_history1').slick({
            prevArrow: $('#slider-prev1'),
            nextArrow: $('#slider-next1'),
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    if ($("div").is(".slider_history2")) {
        $('.slider_history2').slick({
            prevArrow: $('#slider-prev2'),
            nextArrow: $('#slider-next2'),
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }





    /* Таймер */
    var countDownDate = new Date("May 26, 2020 14:00:00").getTime();
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
         $(".day").html(d);
         $(".hour").html(h);
         $(".min").html(m);
         $(".sec").html(s);
     }, 1000);

    // Видео (fancybox)
    $(".various").fancybox({
        'transitionIn': 'none',
        'transitionOut': 'none'
    });
    $(".popupbox-video").fancybox({
        type: 'iframe',
        allowfullscreen: 'true'
    });

    // Фото (fancybox)
    $(".photo_gallery a").fancybox();


    // Меню (мобильная версия)
    $(".menu_mobile").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("body").removeClass("menu_active");
        } else {
            $(this).addClass("active");
            $("body").addClass("menu_active");
        }
    });

    // Скрытые формы
    $(".write_us").click(function () {open_hidden_form(this)});

    function open_hidden_form(type_form) {
        var form = $(type_form).data("type");
        $("#form_" + form).css("display", "block");
        $(".bg_opacity").addClass("active");
        $(".exit").click(function () {
            $("#form_" + form).css("display", "none");
            $(".bg_opacity").removeClass("active");
        })
    }

    /* Всплывающее подменю в шапке */
    $(".menu li").on("mouseover", function () {
        $(this).find(".submenu").addClass("active");
    });
    $(".menu li").on("mouseout", function () {
        $(this).find(".submenu").removeClass("active");
    });

});

function initMap() {
    map_div = document.getElementById('map');
    if (!!map_div) {
        var map = new google.maps.Map(map_div, {
            zoom: 10,
            center: {lat: 49.218497619150654, lng: 46.58629880869148},
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false
        });


        var image = {
            url: '/local/templates/.default/assets/images/flag.png',
            size: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(40, 40)
        };


        var markers = [];
        if (typeof(distancePoints) == 'object') {
            jQuery(distancePoints).each(function(index, el) {
                markers.push( new google.maps.Marker({
                    position: {lat: Number(el.lat), lng: Number(el.lng)},
                    map: map,
                    // icon: image,
                    // zIndex: 2,
                    title: el.name
                }));
            });
        }

        var redCoordinates = [
        ];
        jQuery(distanceLine).each(function(index, el){
            redCoordinates.push({lat: Number(el.lat), lng: Number(el.lng)});
        });
        console.log(redCoordinates);
        var red = new google.maps.Polyline({
            path: redCoordinates,
            geodesic: true,
            strokeColor: '#ed1c24',
            strokeOpacity: 0.7,
            strokeWeight: 5
        });

        red.setMap(map);
    }
}

