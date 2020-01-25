$(document).ready(function () {

    /* Слайдера для 3-х и более фото в посте */
    if ($("div").is(".post-photo-slider")) {
        $('.post-photo-slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true
        });
    }


    /* События click */
    $("body").on("click", '.main-block-form input[type="text"]', function () {
        $(this).closest(".form-show-hidden").find(".hidden-block-form").css("display","block");
        $(this).closest(".form-show-hidden").addClass("active");
    });

    $("body").on("click", '.btn-comment', function () {
        $(this).closest(".item").find(".create-comment").css("display","block");
        $(this).closest(".list-comments").closest(".item").find(".create-comment").css("display","block");
    });
    $("body").on("click", '.show-all span', function () {
        if($(this).closest(".show-hidden-block").hasClass("active")) {
            $(this).closest(".show-hidden-block").removeClass("active");
            $(this).text($(this).data("show"));
        } else {
            $(this).closest(".show-hidden-block").addClass("active");
            $(this).text($(this).data("hidden"));
        }
    });


    /* Если много текста, выводим блок "Показать еще" */

    function showHiddenContent() {
        /* Текст поста */
        $(".text-hidden").each(function () {
            var height_text = $(this).height();
            var height_title = $(this).parent().find(".title").height();
            var sum = height_text + height_title;
            if(sum > $(this).closest(".show-hidden-block").height()) {
                $(this).closest(".show-hidden-block").find(".show-all").css("display","block");
            } else {
                $(this).closest(".show-hidden-block").find(".show-all").css("display","none");
            }
        });

        /* Чек-лист */
        $(".show-hidden-block .check-list").each(function () {
            var height_text = $(this).height();
            if(height_text > $(this).closest(".show-hidden-block").height()) {
                $(this).closest(".show-hidden-block").find(".show-all").css("display","block");
            } else {
                $(this).closest(".show-hidden-block").find(".show-all").css("display","none");
            }
        });

        /* Комментарии */
        $(".list-comments").each(function () {
            var num_child = $(this).find('> .item').length;
            var max_height = $(this).find('> .item:nth-child(1)').height() + $(this).find('> .item:nth-child(2)').height() + $(this).find(".show-all").height();
            if(num_child > 2) {
                $(this).css("max-height", max_height);
                $(this).closest(".show-hidden-block").find(".show-all").css("display","block");
            } else {
                $(this).closest(".show-hidden-block").find(".show-all").css("display","none");
            }
        });
    }

    showHiddenContent();

    /* Ответ на комментарий */
    $("body").on("click", '.list-comments .btn-comment', function () {
        var author_name = $(this).closest(".item").find(".text-main > .name").text();
        var author_text = $(this).closest(".item").find(".text-main > .text").text();
        var id_comment = $(this).closest(".item").data("comment_id");
        $(this).closest(".list-comments").closest(".item").find(".reply-to-comment .name").text(author_name);
        $(this).closest(".list-comments").closest(".item").find(".reply-to-comment .text").text(author_text);
        $(this).closest(".list-comments").closest(".item").find(".create-comment input[name='UF_PARENT_COMMENT_ID']").val(id_comment);
        $(this).closest(".list-comments").closest(".item").find(".create-comment input[name='UF_PARENT_COMMENT_AUTHOR_NAME']").val(author_name);
        $(this).closest(".list-comments").closest(".item").find(".create-comment input[name='UF_PARENT_COMMENT_AUTHOR_TEXT']").val(author_text);
        $(this).closest(".list-comments").closest(".item").find(".reply-to-comment").css("display","block");
    });
    $("body").on("click", '.reply-to-comment .close', function () {
        $(this).closest(".reply-to-comment").css("display","none");
        $(this).closest("form").find(".main-block-form input[name='author_name']").val("");
        $(this).closest("form").find(".main-block-form input[name='author_text']").val("");

    });


    /* Автовысота у textarea */
    $('textarea').on('input', function() {
        $(this).outerHeight(17).outerHeight(this.scrollHeight);
        var text = $(this).val();
        console.log(text);

        var name = this;

        $(name).focusout(function () {
            text = text.replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, " ");
            console.log(text);
            $(name).val(text);
        })

    });




    /* Лайки */
    $(".post-like").click(function () {
        var num = parseInt($(this).text());
        if(!num) num = 0;

        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            num -= 1;
            if(num <=0) num = '';
            $(this).text(num);
        } else {
            $(this).addClass("active");
            num += 1;
            if(num <=0) num = '';
            $(this).text(num);
        }
    });


    /* Прогрессбар */
    if($("div").is(".filled")){
        $(".filled").each(function () {
            var presently = $(this).find(".presently").text();
            var total = $(this).find(".total").text();
            var filled_bar = presently * 100 / total;
            $(this).css("width", filled_bar + "%");
        })
    }


    /* Скрипт для вывода превью фото после загрузки через input file */
    function handleFileSelectMulti(evt) {
        var files = evt.target.files;
        document.getElementById('outputMulti').innerHTML = "";
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
                            document.getElementById('outputMulti').insertBefore(span, null);
                            $(".hidden-block-form").css("display","block");
                            $(".form-show-hidden").addClass("active");
                            $(".bottom-block-form .btn-green").removeAttr("disabled");
                        }
                    };
                })(f);

                reader.readAsDataURL(f);
            }
        }
        $("#outputMulti").append('<b class="close"></b>')
    }

    document.getElementById('fileMulti').addEventListener('change', handleFileSelectMulti, false);


    /* Удаление файлов, загруженных через input file */
    $("body").on("click", '#outputMulti .close', function () {
        document.getElementById('fileMulti').value = "";
        $("#outputMulti span").remove();
        $("#outputMulti b").remove();
        var name_one = $('.form-show-hidden input').val();
        var name_two = $('.form-show-hidden textarea').val();
        if(name_one === "" || name_two === "") {
            $(".bottom-block-form .btn-green").attr("disabled", "disabled")
        }
        if(name_one !== "" || name_two !== "") {
            $(".bottom-block-form .btn-green").removeAttr("disabled")
        }
    });


    /* Активность кнопки submit в форме отправки поста */
    function checkOnText(name) {
        var val = name.val();
        var name_one = $('.form-show-hidden input').val();
        var name_two = $('.form-show-hidden textarea').val();

        val.length >= 1 ? $(".bottom-block-form .btn-green").removeAttr("disabled") : $(".bottom-block-form .btn-green").attr("disabled", "disabled");
        if(name_one !== "" || name_two !== "") {$(".bottom-block-form .btn-green").removeAttr("disabled")}

    }
    $('.form-show-hidden input').on('keyup',function(){checkOnText($(this))});
    $('.form-show-hidden textarea').on('keyup',function(){checkOnText($(this))});

    /* Фиксация сайдбара */
    if ($(window).width() > 992) {
        $('.sidebar-lane-left, .sidebar-lane-right')
            .theiaStickySidebar({
                additionalMarginTop: 80,
                additionalMarginBottom: 15
            });
    }

    /* Круговая диаграмма */
    var current_achievements  = 15;
    var total_achievements = 100;

    var percent_points_all = current_achievements * 100 / total_achievements;

    if($("div").is("#diagram-achievements")){
        $("#diagram-achievements").circliful({
            animation: 1,
            animationStep: 3,
            multiPercentage: 1,
            percentages: [
                {'percent': percent_points_all, 'color': '#4cb6f0', 'width': '12', 'title': '' }
            ],
            multiPercentageLegend: 1,
            backgroundColor: '#f1eee4'
        });
    }

    $("body").on("mouseenter", '#diagram-achievements circle', function () {
        $("#diagram-achievements span").css("display", "block")
    });
    $("body").on("mouseleave", '#diagram-achievements circle', function () {
        $("#diagram-achievements span").css("display", "none")
    });

    /* Работа чекбоксов в боковом меню */
    $("body").on("click", '.checkbox-block .checkbox', function () {
        if($(this).hasClass("all")) {
            $(this).closest(".item").find("input").prop("checked", false);
            $(this).closest(".item").find(".pressed-checkbox").removeClass("pressed-checkbox");
            $(this).addClass("pressed-checkbox").prop("checked", true);
        } else {
            $(this).closest(".item").find(".all").removeClass("pressed-checkbox").prop("checked", false);
        }

        var getParams = [];
        var getParamsUrl;
        $(".checkbox:checked").each(function (index, value) {
            getParams.push($(value).data('url'));
        });

        if(getParams.length > 1) {
            getParamsUrl = '?' + getParams.join('&');
        } else {
            getParamsUrl = '?' + getParams[0];
        }

        if ($(window).width() > 992) {
            window.location = getParamsUrl;
        } else {
            $("body").on("click", '.sidebar-lane-right .btn-green', function () {
                window.location = getParamsUrl;
            })
        }

    });

    if ($(window).width() < 992) {
        if (window.location.href.indexOf("post_filter") > -1) {
            $(".main-content-lane .item-main").css("display", "none");
            $(".central-lane").css("display", "block");
            $(".fix-panel-mobile div").removeClass("active");
            $("div[data-type='central-lane']").addClass("active");
            showHiddenContent();
        }
    }
    /* Нафигационная панель в мобильной версии */
    var scroll_lenta_global;
    $("div[data-type='sidebar-lane-left']").addClass("active");

    $("body").on("click", '.fix-panel-mobile div', function () {
        var data_name = $(this).data("type");
        $(".main-content-lane .item-main").css("display", "none");
        $("." + data_name).css("display", "block");
        $(".fix-panel-mobile div").removeClass("active");
        $("div[data-type='" + data_name + "']").addClass("active");

        showHiddenContent();
        if(data_name === "central-lane") {
            $(document).scroll(function () {
                var scroll_lenta_local = $(window).scrollTop();
                scroll_lenta_global = scroll_lenta_local;
            });
            $('html, body').animate({ scrollTop: scroll_lenta_global }, 0);
        } else {
            $(document).off().scroll(function () {});
            $('html, body').animate({ scrollTop: 0 }, 0);
        }
    });

});