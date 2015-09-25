$('.party-btn').click(function(){
	// $('.party').toggle();
  $( '.party' ).animate({
  	// visibility: 'visible'
  	opacity: '1'
  	// top: '+= 10'
  }, 500, function() {
  	$('body').css('background-color', 'pink');
  });
})