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
		$( '.party' ).animate({
			opacity: '1'
		}, 500, function() {

	  	});
	}

	function stopParty(){
		$('.party-btn').addClass('not-animated');
		$( '.party' ).animate({
			opacity: '0'
		}, 500, function() {

	  	});
	}
});