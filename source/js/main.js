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
})


/* =================================*/
/* 			Hamburger menu: 		        */
/* =================================*/

var link = $('.nav_menu')

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
      reqInfo = slider_info_items.eq(currentImg);
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
      }, 1000);

    }

  });

});

/*========================*/
/*        Skills          */
/*========================*/

$(document).scroll(function () {
  var aboutOffsetTop = $('.about_me').offset().top;
  if($(document).scrollTop() >= aboutOffsetTop){
    $('.sector').css({
      "transition": "all 3s",
      "stroke-dashoffset": "200"
  });
  }
});

/*========================*/
/*        login form      */
/*========================*/
