$(function() {
  $('.carousel').carousel({
    interval: false
  });

  $(".search").on("click", function(){
    $(".header__bottom .navbar-form").slideToggle();
  });
});

// $(window).load(function(){
//   var carouselCaptionWidth = $("#carousel-sidebar .active img").width();
//   $("#carousel-sidebar img").each(function(){
//     $(this).attr("width", carouselCaptionWidth);
//   });
//   $("#carousel-sidebar img").each(function(){
//     $("#carousel-sidebar .sidebar-carousel-caption").css("max-width", carouselCaptionWidth + "px");
//   });
// });
