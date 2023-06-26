/*---------------------------------
  共通のJS
---------------------------------*/

//ダイアログを閉じる
$('.c-btn__cancel, #dialogOverlay').on('click', function() {
  $('.c-dialog, #dialogOverlay').fadeOut('fast');
});

//トーストを閉じる
$('.c-toast__close').on('click', function(){
  $('.c-toast').hide();
});

//別ウィンドウを開く
function openWindow() {
  window.open("15_movie_popup.html", "win", "width=500, height=400");
}

//画像アップロード
$('#file').change(function (e) {
  //ファイルオブジェクトを取得する
  var file = e.target.files[0];
  var reader = new FileReader();

  //画像でない場合はアラート
  if (file.type.indexOf("image") < 0) {
    alert("画像ファイルを指定してください。");
    return false;
  }

  //アップロードした画像を設定する
  reader.onload = (function (file) {
    return function (e) {
      $("#user_icon").attr("src", e.target.result);
    };
  })(file);
  reader.readAsDataURL(file);
});

$('#deletePhoto').on('click', function () {
  $("#user_icon").attr('src', 'images/icon_default.svg');
  $("#file").val('');
});



