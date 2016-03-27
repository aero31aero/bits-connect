(function(window, $){
	$(function(){
		var $pane = $('<div id="scrollbar"></div>'),
			$handle = $('<div/>'),
			$track = $('<div/>'),
			d=$('body').height(),
			timer1=null;
			$track.addClass('ui-scrollTrack').appendTo($pane);
			$handle.addClass('ui-scrollHandle').appendTo($pane).draggable(
			{
				axis:'y',
				containment:('.ui-scrollPane'),
				start: function(){
					$(window).off('scroll');
				},
				drag: function(){
					y=(($('.ui-scrollHandle').position().top)/w)*d;
					$(window).scrollTop(y);
				},
				stop: function(){$(window).on('scroll');
				}
			});
		$pane.addClass('ui-scrollPane').appendTo('body');
		var w=$('.ui-scrollPane').height(),
			s=(w*w)/d;
		$('.ui-scrollHandle').css('height',s);
			$(window).resize(function(){
				w=$('.ui-scrollPane').height(),
				d=$('body').height(),
				s=(w*w)/d;
				$('.ui-scrollHandle').css('height',s);
			});
			$(document).on('scroll',function(){
				$('.ui-scrollHandle').css('top',(($(window).scrollTop())/d)*w);
				$('.ui-scrollPane').css('opacity',1);
			});
			var timer = null;
			$(document).on('scroll', function() {
    			if(timer !== null) {
        			clearTimeout(timer);        
    			}
    		timer = setTimeout(function() {
          		$('.ui-scrollPane').css('opacity',0);
    		}, 500);
			});
			$('.ui-scrollPane').mouseover(function(){
    			$('.ui-scrollHandle').addClass('active');
    		});
    		$('.ui-scrollPane').mouseout(function(){
    			$('.ui-scrollHandle').removeClass('active');
    		});
	});
})(window, jQuery);
