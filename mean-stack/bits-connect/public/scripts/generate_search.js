$('document').ready(function(){
		$('#toggleSearch').click(function(){
			$(this).addClass('field');
			$(this).removeClass('icon');
			$(this).find('input').focus();
		});
		$('#toggleSearch input').blur(function(){
			$('#toggleSearch').removeClass('field');
			$('#toggleSearch').addClass('icon');
		});
	});