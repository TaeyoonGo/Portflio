"use strict";

// 헤더 스크롤 이벤트
$(document).ready(function () {
  var lnb = $("._header").offset().top;
  $(window).scroll(function () {
    var window = $(this).scrollTop();

    if (lnb < window) {
      $("._header").css({
        "position": "fixed",
        "background-color": "rgba(37, 37, 37,.8)",
        "border-bottom": "none"
      });
    } else {
      $("._header").css({
        "position": "absoulte",
        "background-color": "transparent",
        "border-bottom": "1px solid #fff"
      });
    }
  });
}); // emailjs 실행

$(document).ready(function () {
  emailjs.init("U4dPLe9cyju41MkJl"); //"user_xxxxx"이 부분은 사용자마다 다르니 반드시 emailJS의 installation 화면을 확인

  $('input[name=submit]').click(function () {
    var templateParams = {
      //각 요소는 emailJS에서 설정한 템플릿과 동일한 명으로 작성!
      name: $('input[name=name]').val(),
      phone: $('input[name=phone]').val(),
      email: $('input[name=email]').val(),
      message: $('textarea[name=message]').val()
    };
    emailjs.send('service_69v2pcn', 'template_hp6y3wm', templateParams) //emailjs.send('service ID', 'template ID', 보낼 내용이 담긴 객체)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('안녕하세요 고태윤입니다 :) 연락을 주셔서 감사합니다.');
    }, function (error) {
      console.log('FAILED...', error);
    });
  });
}); // masonry 실행

var grid = document.querySelector('.grid');
var msnry = new Masonry(grid, {
  // options...
  itemSelector: '._grid-item',
  columnWidth: 300
});