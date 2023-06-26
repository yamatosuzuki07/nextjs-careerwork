/*---------------------------------
  プロティアンを学ぶ
---------------------------------*/
//スライダー
$('#slider').slick({
  autoplay:true,
  autoplaySpeed:4000,
  dots:true,
  infinite:true,
  arrows:true,
  appendArrows: $('.arrows')
});

var off = $('.slick-dots').offset();
var dotsWidth = $('.slick-dots').width();

$('.slick-prev').css('left', off.left - 340 + 'px');
$('.slick-next').css('left', (off.left + dotsWidth - 315) + 'px');