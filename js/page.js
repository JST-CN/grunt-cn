$(function(){

	$('#nav').on('click', 'dt', function(){
		$('#nav dd').hide();
		$(this).next('dd').show();
	});

});