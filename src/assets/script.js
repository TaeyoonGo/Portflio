
$( document ).ready(function() {
  var lnb = $("._header").offset().top;

  $(window).scroll(function() {
    var window = $(this).scrollTop();
    console.log(window);
    if(lnb < window) {
      $("._header").css({"position":"fixed", "background-color":"rgba(37, 37, 37,.8)","border-bottom":"none"});
    } else {
      $("._header").css({"position":"absoulte", "background-color":"transparent","border-bottom":"1px solid #fff"});
    }
  
  })

});



