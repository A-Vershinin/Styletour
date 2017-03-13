"use strict"; // ES5

document.addEventListener("DOMContentLoaded", function() {
  (function() { //область видимости

    //js-status
    nojsreplace();
    function nojsreplace() {
      if (document.body.className == "no-js") {
        document.body.classList.remove("no-js");
      }
    }
    //toggle search icon
    toggleSearch();
    function toggleSearch() {
      $(".search").on("click", function() {
        $(".main-navigation .navbar-form").slideToggle();
      });
    }

    //headerCarousel
    headerCarousel();
    function headerCarousel() {
      $('.header__carousel #carousel').carousel({
        interval: true
      });
    }
    //sidebararousel
    sidebararousel();
    function sidebararousel() {
      $('.sidebar #carousel-wid').carousel({
        interval: false
      });
    }

    //brands slider
    brands();
    function brands() {
      var carousel = $('.brands__list').owlCarousel({
        items: 7,
        loop: true,
        margin: 32,
        nav: true,
        navigation: true,
        dots: false,
        autoWidth: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        autoplayTimeout: 2000,
        navSpeed: 1500,
        smartSpeed: 1500,
        navigationText : ["",""],
        navContainerClass: ".brands__arrows",
        responsiveClass: true,
        navText: "",
        responsive:{
          0: {
            items: 3,
            nav: false
          },
          650: {
            items: 4,
            nav: false
          },
          768: {
            items: 5,
            nav: true
          },
          992: {
            items: 6,
            nav: true
          },
          1200: {
            items: 7,
            nav: true
          }
        }
      });
      $('.brands__arrow-prev').click(function(e) {
        e.preventDefault();
        carousel.trigger('prev.owl.carousel');
      });

      $('.brands__arrows-next').click(function(e) {
        e.preventDefault();
        carousel.trigger('next.owl.carousel');
      });
    }

    //sidebar loadImages
    loadImages();
    function loadImages() {
      $(window).resize(function() {
        var carouselImgWidth = $("#carousel-wid .carousel-slide").width();
        $("#carousel-wid img").each(function() {
          $(this).attr("width", carouselImgWidth);
        });
        $("#carousel-wid .carousel-wid-caption").css("max-width", carouselImgWidth + "px");
        $("#carousel-wid .carousel-indicators").css("max-width", carouselImgWidth + "px");
        var bannerImgWidth = $(".sidebar-banner").width();
        $(".sidebar-banner .sidebar-banner__img img").css("width", bannerImgWidth + "px");
        $(".sidebar-banner .sidebar-banner__block").css("max-width", bannerImgWidth + "px");
      });
    };


    console.log("JS active");

  })();
});
