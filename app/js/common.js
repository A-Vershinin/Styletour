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
    //page map
    // pageMap();
    function pageMap() {
      function initialize() {
        var mapOptions = {
          center: {lat: 40.71, lng: -74},
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          disableDefaultUI: false,
          scrollwheel: true,
          zoomControl: true,
          panControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          overviewMapControl: true
        };
        var mapContainer = document.querySelector("#google-map");
        var map = new google.maps.Map(mapContainer, mapOptions);
        var image = new google.maps.MarkerImage('img/icons/icon-map-pin.svg',
         new google.maps.Size(36, 52),
         new google.maps.Point(0, 0)
        );
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng('40.711', '-74.007'),
          map: map,
          title: 'New York',
          icon: image
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);
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
            items: 3,
            nav: false
          },
          768: {
            items: 3
            // nav: true
          },
          992: {
            items: 2
            // nav: true
          },
          1200: {
            items: 4
            // nav: true
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
