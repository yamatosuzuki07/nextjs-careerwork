/*---------------------------------
  トップページ
---------------------------------*/

//振り返りダイアログを表示する
$('#reviewBtn').on('click', function() {
  $('#reviewDialog, #dialogOverlay').fadeIn('fast');
});

//MYパーパス編集ダイアログを表示する
$('#myPurposeEditBtn').on('click', function() {
  $('#myPurposeDialog, #dialogOverlay').fadeIn('fast');
});

//キャリア目標編集ダイアログを表示する
$('#goalEditBtn').on('click', function() {
  $('#goalEditDialog, #dialogOverlay').fadeIn('fast');
});

//保存ボタン押下
$('#saveReviewBtn, #saveMyPurposeBtn, #saveGoalBtn').on('click', function() {
  $('#reviewDialog, #myPurposeDialog, #goalEditDialog, #dialogOverlay').fadeOut('fast');
  setTimeout(function () {
    $('#toast').css('display', 'flex');
  }, 500);
  setTimeout(function () {
    $('#toast').fadeOut('fast');
  }, 5000);
});

//日付選択
$("#deadline").daterangepicker({
  singleDatePicker: true,
  autoApply: true,
  format: "YYYY/MM/DD",
});

//時刻
$('#deadline_time').timepicker({
  'timeFormat': 'H:i',
  'step': 30,
  'scrollDefault': '10:00'
});

//終日
$('#allDay').on('click', function() {
  if ($(this).prop('checked')) {
    $('#deadline_time').hide();
  } else {
    $('#deadline_time').show();
  }
})

//テキストエリア可変
var textareaEls = document.querySelectorAll("textarea");
textareaEls.forEach((textareaEl) => {
  var clientHeight = textareaEl.clientHeight;
  textareaEl.addEventListener("input", function () {
    textareaEl.style.height = clientHeight + 'px';
    let scrollHeight = textareaEl.scrollHeight;
    textareaEl.style.height = (scrollHeight+2) + 'px';
  });
});

//キャリア満足度チャート
var container = $('.p-afterTraining__satisfaction__canvasContainer');
var ctx = $('#chart');

ctx.attr('width', container.width());
ctx.attr('height', container.height());

Chart.defaults.font.size = 8;
Chart.register(ChartDataLabels);
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['2022/7', '2022/8', '2022/9', '2022/10', '2022/11', '2022/12', '2023/1','2023/2','2023/3','2023/4','2023/5','2023/6'],
    datasets: [{
      data: [10, 40, 50, 60, 52, 50, 52, 50, 50, 55, 70, 90],
      borderColor: '#D10B26',
      borderWidth: 2,
      fill: false,
      lineTension: 0,
      pointBorderColor: "#fff",
      pointBackgroundColor: "#D10B26",
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        color: '#fff',
        anchor: 'center',
        align: 'center',
        backgroundColor: '#D10B26',
        borderRadius: 4,
        font: {
            size: 12
        },
        textAlign:'center',
        padding: {
          top: 3,
          bottom: 2,
          left: 6,
          right: 4,
        },
    }
    },
    scales:{
      x: {
        grid:{
          display: false
        }
      },
      y: {
        min: 0,
        max: 100,
        ticks:{
          stepSize:50
        }
      },
    },
    layout: {
        padding: 0
    }
  },
});
