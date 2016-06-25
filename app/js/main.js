$(window).resize(function(){

	var
		imgWidth = $('.blur').width(),
		blur = $('.blur_wrapper'),
		blurSection = $('.talks'),
		posTop = blurSection.on.offset().top - blur.offset().top,
		posLeft = blurSection.on.offset().left - blur.offset().left;

	blur.css({
		'background-size' : imgWidth + 'px' + ' ' + 'auto'
		'background-position' : posLeft + 'px' + ' ' + posTop + 'px'
	});


});