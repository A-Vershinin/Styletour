$(function() {
  $('.carousel').carousel({
    interval: false
  });

  $(".search").on("click", function(){
    $(".header__bottom .navbar-form").slideToggle();
  })
});
