$(document).ready(function(){
    // -------------------- Меню - начало --------------------
    $('ul > li ul')
        .click(function(event) {
            event.stopPropagation();
        })
        .filter(':not(:first)')
        .hide();

    $('.services_main_part>li').click(function() {
        $('.services_main_part>li').removeClass('arr active');
        var selfClick = $(this).find('ul:first').is(':visible');
        if (!selfClick) {
            $(this)
                .toggleClass('arr active')
                .parent()
                .find('> li ul:visible')
                .toggle();
        }
        $(this)
            .find('ul:first')
            .stop(true, true)
            .slideToggle();
    });
    // -------------------- Меню - конец ---------------------

    // --------------------Popup блоки - начало --------------------
    $('[href=#map]').magnificPopup({
        type: 'iframe',
        items: {
            src:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.873245478523!2d37.436135315749006!3d55.708575002869935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54e869d8adbb1%3A0x29df9175d4b289b5!2z0YPQuy4g0JLQtdGA0LXQudGB0LrQsNGPLCAyOdGBMzUsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMjEzNTc!5e0!3m2!1sru!2sua!4v1456251385438'
        }
    });
    $('[href=#callback]').magnificPopup({
        type: 'inline',
        midClick: true,
        closeBtnInside: true
    })
    $('[href=#remont]').magnificPopup({
        type: 'inline',
        midClick: true,
        closeBtnInside: true
    })
    $('[href=#request]').magnificPopup({
        type: 'inline',
        midClick: true,
        closeBtnInside: true
    })
    // --------------------Popup блоки - конец --------------------
})