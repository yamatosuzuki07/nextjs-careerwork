/*---------------------------------
  アイデンティティ
---------------------------------*/
//取り組んだことを追加
$('.p-identity__careerChart_addWorkBtn').on('click', function() {
  var item_num = $(this).siblings().children().length + 1;
  $(this).siblings().append('<div class="p-identity__careerChart__input__works__item"><input type="text" class="c-textBox p-identity__careerChart__input__month" placeholder="2017年4月"><input type="text" class="c-textBox p-identity__careerChart__input__score" placeholder="50">点<input type="text" class="c-textBox p-identity__careerChart__input__work" placeholder="例：新人研修"><button class="c-iconBtn p-identity__careerChart__deleteWorkItem"><img src="images/icon_trash.svg" alt=""></button></div>');
  if (item_num === 3) {
    $(this).addClass('c-textBtn__disabled').attr('disabled', true);
  }
});

// 削除
$('body').on('click', '.p-identity__careerChart__deleteWorkItem', function () {
var item_num = $(this).parent().siblings().length;
var addBtn = $(this).parents('.p-identity__careerChart__input__worksGroup').next()
console.log(item_num);
$(this).parent().remove();
if (item_num <= 2) {
  addBtn.removeClass('c-textBtn__disabled').attr('disabled', false);
}
});

//ライフチャート
const canvas = document.getElementById('canvas');
const chartCtx = canvas.getContext('2d');

chartCtx.font = "20px sans-serif";
chartCtx.fillStyle  = '#3C3C3C';
chartCtx.fillText('入社', 30, 40);
chartCtx.fillText('新入社員研修', 80, 76);
chartCtx.fillText('ミス連発', 170, 370);
chartCtx.fillText('OJTリーダー', 320, 190);
chartCtx.fillText('目標連続達成', 430, 120);
chartCtx.fillText('チームリーダー', 580, 70);
chartCtx.fillText('家族入院', 900, 370);
chartCtx.fillText('部署異動', 960, 290);
chartCtx.fillText('家族退院', 1000, 250);
chartCtx.fillText('昇進の打診', 1080, 130);
chartCtx.fillText('主任に昇進', 1110, 70);
chartCtx.fillText('部下異動', 1240, 160);
chartCtx.fillText('新規事業PRJ開始', 1500, 40);

chartCtx.beginPath();
chartCtx.moveTo(20, 40);
chartCtx.lineTo(60, 70);
chartCtx.lineWidth = 4;
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(60, 70);
chartCtx.lineTo(150, 360);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(150, 360);
chartCtx.lineTo(300, 180);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(300, 180);
chartCtx.lineTo(420, 100);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(420, 100);
chartCtx.lineTo(560, 60);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(560, 60);
chartCtx.lineTo(880, 360);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(880, 360);
chartCtx.lineTo(940, 280);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(940, 280);
chartCtx.lineTo(980, 240);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(980, 240);
chartCtx.lineTo(1060, 120);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(1060, 120);
chartCtx.lineTo(1100, 80);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(1100, 80);
chartCtx.lineTo(1280, 120);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.moveTo(1280, 120);
chartCtx.lineTo(1660, 60);
chartCtx.strokeStyle = '#D10B26';
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  20,
  40,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  60,
  70,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  150,
  360,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  300,
  180,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  420,
  100,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  560,
  60,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  880,
  360,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 1;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  940,
  280,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  980,
  240,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  1060,
  120,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  1100,
  80,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  1280,
  120,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();

chartCtx.beginPath();
chartCtx.arc(
  1660,
  60,
  8,
  0,
  2 * Math.PI,
);
chartCtx.fillStyle = "#D10B26";
chartCtx.fill();
chartCtx.strokeStyle = "White";
chartCtx.lineWidth = 4;
chartCtx.stroke();