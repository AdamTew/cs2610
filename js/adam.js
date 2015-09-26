$( document ).ready(function() {
	    // your code here

	$('.party-btn').click(function(){
		if($(this).hasClass('not-animated')){
			startParty();
		} else {
			stopParty();
		}
	});

	function startParty(){
		$('.party-btn').removeClass('not-animated');
		$('.party-btn').addClass('animated');
		$( '.party' ).animate({
			opacity: '1'
		}, 500, function() {
	  		// $('body').css('background-color', 'pink');
	  	});
	}

	function stopParty(){
		$('.party-btn').removeClass('animated');
		$('.party-btn').addClass('not-animated');
		$( '.party' ).animate({
	  	// visibility: 'visible'
			opacity: '0'
	  	// top: '+= 10'
		}, 500, function() {
	  		// $('body').css('background-color', 'pink');
	  	});
	}
});