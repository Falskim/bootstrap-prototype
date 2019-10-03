$('.hal-scroll').on('click', function(e){

	var elemenTujuan = $($(this).attr('href'));

	$('html, body').animate({
		scrollTop: elemenTujuan.offset().top -70
	}, 1000, 'easeInOutExpo');

	e.preventDefault();

});