$('document').ready(function(){
  $('.tile').each(function(){
    $surface=$("<div/>");
 $surface.addClass('surface').appendTo($(this));
  });
  $(".tile>.surface").mousedown(function(e){
  $centerX=$(this).width()/2;
  $centerY=$(this).height()/2;
  $x=e.pageX-$(this).offset().left;
  $y=e.pageY-$(this).offset().top;
  $pivotX=(2*$centerX)-$x;
  $pivotY=(2*$centerY)-$y;
  $degY=(-($centerX-$x)/$centerX)*5;
  $degX=(($centerY-$y)/$centerY)*5;
  $(this).css('transform-origin',$pivotX+'px'+' '+$pivotY+'px');
  $(this).css(
    'transform','rotateX('+$degX+'deg) rotateY('+$degY+'deg)'
  );
});
$('.tile>.surface').mouseup(function(){
  $(this).css({
    'transform-origin':'50% 50%',
    'transform':'rotateX(0deg) rotateY(0deg)'
  });
});
});
$centerX=($pivotX+$x)/2;
$centerY=($pivotY+$y)/2;