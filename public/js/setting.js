/*---------------------------------
  設定画面
---------------------------------*/
//設定画面タブ切り替え
const tabs = $('.p-setting__tab li');
$('.p-setting__tab li').click(function () {
  $('.active').removeClass('active');
  $(this).addClass('active');
  const index = tabs.index(this);
  $('.p-setting__tab__contents').removeClass('show').eq(index).addClass('show');
})

//設定画面トーストを表示
$('.p-setting__save').on('click', function() {
  $('.c-toast').css('display', 'flex');
  setTimeout(function () {
    $('.c-toast').fadeOut();
  }, 10000);
});

//パスワード変更ボタン押下後のトースト
$('#save_password').on('click', function(){
  $('.c-toast p').text('パスワードを変更しました。');
});


