/* =================================*/
/* 				Parallax: 		           	*/
/* =================================*/
$(window).on('mousemove', function(e){
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	var w = (window.innerWidth / 2) - mouseX;
	var h = (window.innerHeight / 2) - mouseY;
	
	var layer = $('.parallax').find('.layer');

	layer.map(function(key, value) {
		var widthPosition = w * (key / 100);
		var heightPosition = h * (key / 100);
		$(value).css({
			'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
		})
	})
});


/* =================================*/
/* 			Hamburger menu: 		        */
/* =================================*/

(function () {
  var link = $('.nav_menu');

  link.click(function(event) {
    
    link.toggleClass('clicked');

    if ($(this).hasClass('clicked')) {
      $('.main-menu').css('visibility', 'visible');
      $('html, body').css('overflow', 'hidden');
    } else {
      $('.main-menu').css('visibility', 'hidden');
      $('html, body').css('overflow', 'auto');
    }

  });

})();

/* =================================*/
/* 			        Scroll              */
/* =================================*/

(function () {
	
	$('.icon_arrow').click(function(e) {
		e.preventDefault();
		var hWindow = $(window).height();
		$('html, body').animate({ scrollTop: hWindow}, 800, 'swing');
		return false;

	});	

	$('.up_icon').click(function(e) {
		e.preventDefault();
		$('html, body').stop().animate({scrollTop: 0}, 800, 'swing');

	});

})();

/* =================================*/
/* 				     Flipper:  			      */
/* =================================*/

$(window).load(function () {
    $('.flip-card').addClass('loaded')
});

$(function() {
      $('.authorization').on('click', function(e) {
          $('.flip-card').addClass('flipped');
          $('.authorization').addClass('clicked');
          $('.flip-card').removeClass('loaded')
          e.stopPropagation()
      });
      $('#login_home').on('click', function(e) {
          $('.flip-card').removeClass('flipped');
          $('.authorization').removeClass('clicked');
          $('.flip-card').addClass('loaded')
          e.stopPropagation()
      });
      $(document).on('click', function(e) {
          if ($(e.target).parents(".flip-card").length == 0) {
              $('.flip-card').removeClass('flipped');
              $('.authorization').removeClass('clicked');
              $('.flip-card').addClass('loaded')
          }
      });
  });



/* =================================*/
/*             Slider:              */
/* =================================*/

var Slider = (function() {
  var currentImg = 1;

  function init() {
    _setUpListners();
  }

  function _setUpListners() {
    $('.controls_next').on('click', _nextSlide);
    $('.controls_prev').on('click', _prevSlide);
  }

  function _nextImg() {
    var container = $('.slider_next'),
      items = container.find('.controls_item'),
      activeItem = container.find('.controls_item.active');
    var reqItem = items.eq(currentImg - 2);

    activeItem.animate({
      'bottom': '100%'
    }, 300);

    reqItem.animate({
      'bottom': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('bottom', '-100%');
      $(this).addClass('active');
    });
  }

  function _prevImg() {
    var container = $('.slider_prev'),
      items = container.find('.controls_item'),
      activeItem = container.find('.controls_item.active');
    var reqItem = items.eq(currentImg - 2);

    activeItem.animate({
      'top': '100%'
    }, 300);
    reqItem.animate({
      'top': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('top', '-100%');
      $(this).addClass('active');
    });
  }

  function _nextSlide(e) {
    e.preventDefault();
    var bigSlide = $('.portfolio_slider'),
      img = bigSlide.find('img');
    var container = $('.slider_next');
    var items = container.find('.controls_item'),
      activeItem = container.find('.controls_item.active');

    var slider_info = $('.portfolio_wrapper');
    var slider_info_items = slider_info.find('.project_item');
    var slider_info_active = slider_info.find('.project_item.active');


    currentImg++;
    if (currentImg >= items.length) {
      currentImg = 0;
    }

    var reqItem = items.eq(currentImg),
      reqInfo = slider_info_items.eq(currentImg-1);
    reqImg = items.eq(currentImg - 1).find('img');

    activeItem.animate({
      'bottom': '100%'
    }, 300);

    img.css({ opacity: '0' });

    setTimeout(function() {
      img.attr('src', reqImg.attr('src'));
      img.css({
        opacity: '1',
        transition: 'all .3s'
      });
    }, 300);



    reqItem.animate({
      'bottom': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('bottom', '-100%');
      slider_info_active.removeClass('active');
      reqInfo.addClass('active');
      $(this).addClass('active');
    });
    _prevImg();
  }

  function _prevSlide(e) {
    e.preventDefault();
    var bigSlide = $('.portfolio_slider'),
      img = bigSlide.find('img');
    var container = $('.slider_prev');
    var items = container.find('.controls_item'),
      activeItem = container.find('.controls_item.active');

    var slider_info = $('.portfolio_wrapper');
    var slider_info_items = slider_info.find('.project_item');
    var slider_info_active = slider_info.find('.project_item.active');

    currentImg--;
    var reqItem = items.eq(currentImg),
      reqImg = items.eq(currentImg + 1).find('img');
      reqInfo = slider_info_items.eq(currentImg + 1);
    if (currentImg < 0) {
      currentImg = items.length - 1;
    }

    activeItem.animate({
      'top': '100%'
    }, 300);

    img.css({ opacity: '0' });

    setTimeout(function() {
      img.attr('src', reqImg.attr('src'));
      img.css({
        opacity: '1',
        transition: 'all .3s'
      });
    }, 300);

    reqItem.animate({
      'top': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('top', '-100%');
      slider_info_active.removeClass('active');
      reqInfo.addClass('active');
      $(this).addClass('active');
    });
    _nextImg();
  }

  return {
    init: init
  }
})();

Slider.init();

/*========================*/
/*        Preloader       */
/*========================*/
$(document).ready(function(){
  $(function(){  
    var imgs = [];

    $.each($('*'), function(){
      var $this = $(this),
        background = $this.css('background-images'),
        img = $this.is('img');

      if (img) {
        var path = $this.attr('src');

        if (path) {
          imgs.push(path);

        }
      }
    });

    var percents = 1;

    for (var i = 0; i < imgs.length; i++){
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });

      image.load(function() {
        setPersents(imgs.length, percents);
        percents++;
      });

    }

    function setPersents(total, current) {
      var persent = Math.ceil(current / total * 100);

      setTimeout(function() {
        if (persent >=100) {
          $('.preloader').fadeOut('slow');

        }

        $('.loader_percents').text(persent + '%');
      }, 500);

    }

  });

});

/*========================*/
/*        Skills          */
/*========================*/

$(document).scroll(function () {
  if ($(".about_me").length) {
    var aboutOffsetTop = $('.skills').offset().top;
  }
  if($(document).scrollTop() >= aboutOffsetTop){
    $('.sector').css({
      "transition": "all 3s",
      "stroke-dashoffset": "200"
    });
  }
});

/*========================*/
/*        Blog scroll     */
/*========================*/

$(document).scroll(function () {
  if ($(".blog").length){
    var blogOffsetTop = $('.blog_posts').offset().top;
  }
  if($(document).scrollTop() >= blogOffsetTop){
    $('.chapters_list').addClass('fixed');
    $('.chapters_list').removeClass('unfixed');
  }

  if($(document).scrollTop() < blogOffsetTop){
    $('.chapters_list').removeClass('fixed');
    $('.chapters_list').addClass('unfixed');
  }


  $(".blog_article").each(function () {
    if (($(document).scrollTop() - $(this).offset().top) >= 0){
      $(".chapters_item").each(function () {
        $(this).removeClass('chapters_link_active');
      });
      var currentLink = $(".chapters_link[href=\'#" + $(this).attr('id') + "\']");
      currentLink.parent().addClass('chapters_link_active');
    }
  });

});

$(".chapters_link").on("click", function (event) {
  event.preventDefault();
  var id  = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 500);
});

/*==========================*/
/*        Validate Form     */
/*==========================*/

$(document).ready(function() {

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  var validBlock = $('.validation')
    , validContent = validBlock.find('.validation_content')
    , validText = validContent.find('.validation_text')
    , validClose = validContent.find('.validation_close');

  validClose.on("click", function(e) {
    e.preventDefault();
    validBlock.hide();
  });

  (function() {
    var loginForm = $(".login");

    loginForm.submit(function(e) {
      var loginCheck = loginForm.find('.robot_check');
      var loginRadio = loginForm.find('#noRobot');

      if (!loginCheck.prop('checked') || !loginRadio.prop('checked')) {
        e.preventDefault();
        validText.text("Роботам тут не место");
        validBlock.show();
      }
    });
  })();

  (function() {
    var feedback = $('.feedback_form');

    if (feedback.length) {
      feedback.submit(function(e) {
        e.preventDefault();
        var feedbackInput = $(this).find('.feedback_field'),
          feedbackArea = $(this).find('.feedback_textarea');

        var isFill = function(selector) {
          var flag = true;

          selector.each(function() {
            if ($(this).val().length == 0) {
              flag = false;
            }
          });

          return flag;
        };

        if (!isFill(feedbackInput) || !isFill(feedbackArea)) {
          validText.text("Введите все поля формы");
          validBlock.show();
        } else if (!validateEmail(feedbackInput.closest('.feedback_email').val())) {
          validText.text("Не верный Email");
          validBlock.show();
        } else {
          validText.text("Данные отправлены");
      }
      });
    }
  })();
});


/* =================================*/
/*           Blog trigger:          */
/* =================================*/

$(function() {
  $('.blog_trigger').on('click', function() {
      $('.blog_chapters').toggleClass('blog_chapters_hidden')
  });
});