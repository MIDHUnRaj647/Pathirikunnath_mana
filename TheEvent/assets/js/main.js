/**
 * Template Name: TheEvent - v4.7.0
 * Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Gallery Slider
   */
  new Swiper(".gallery-slider", {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Initiate gallery lightbox
   */
  const galleryLightbox = GLightbox({
    selector: ".gallery-lightbox",
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on("show.bs.modal", "#buy-ticket-modal", function (event) {
    select("#buy-ticket-modal #ticket-type").value =
      event.relatedTarget.getAttribute("data-ticket-type");
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  $(document).ready(function () {
    var itemSelector = ".grid-item";

    var $container = $("#container").isotope({
      itemSelector: itemSelector,
      masonry: {
        columnWidth: itemSelector,
        isFitWidth: true,
      },
    });

    //Ascending order
    var responsiveIsotope = [
      [480, 7],
      [720, 10],
    ];

    var itemsPerPageDefault = 8;
    var itemsPerPage = defineItemsPerPage();
    var currentNumberPages = 1;
    var currentPage = 1;
    var currentFilter = "*";
    var filterAtribute = "data-filter";
    var pageAtribute = "data-page";
    var pagerClass = "isotope-pager";

    function changeFilter(selector) {
      $container.isotope({
        filter: selector,
      });
    }

    function goToPage(n) {
      currentPage = n;

      var selector = itemSelector;
      selector +=
        currentFilter != "*"
          ? "[" + filterAtribute + '="' + currentFilter + '"]'
          : "";
      selector += "[" + pageAtribute + '="' + currentPage + '"]';

      changeFilter(selector);
    }

    function defineItemsPerPage() {
      var pages = itemsPerPageDefault;

      for (var i = 0; i < responsiveIsotope.length; i++) {
        if ($(window).width() <= responsiveIsotope[i][0]) {
          pages = responsiveIsotope[i][1];
          break;
        }
      }

      return pages;
    }

    function setPagination() {
      var SettingsPagesOnItems = (function () {
        var itemsLength = $container.children(itemSelector).length;

        var pages = Math.ceil(itemsLength / itemsPerPage);
        var item = 1;
        var page = 1;
        var selector = itemSelector;
        selector +=
          currentFilter != "*"
            ? "[" + filterAtribute + '="' + currentFilter + '"]'
            : "";

        $container.children(selector).each(function () {
          if (item > itemsPerPage) {
            page++;
            item = 1;
          }
          $(this).attr(pageAtribute, page);
          item++;
        });

        currentNumberPages = page;
      })();

      var CreatePagers = (function () {
        var $isotopePager =
          $("." + pagerClass).length == 0
            ? $('<div class="' + pagerClass + '"></div>')
            : $("." + pagerClass);

        $isotopePager.html("");

        for (var i = 0; i < currentNumberPages; i++) {
          var $pager = $(
            '<a href="javascript:void(0);" class="pager" ' +
              pageAtribute +
              '="' +
              (i + 1) +
              '"></a>'
          );
          $pager.html(i + 1);

          $pager.click(function () {
            var page = $(this).eq(0).attr(pageAtribute);
            goToPage(page);
          });

          $pager.appendTo($isotopePager);
        }

        $container.after($isotopePager);
      })();
    }

    setPagination();
    goToPage(1);

    //Adicionando Event de Click para as categorias
    $(".filters a").click(function () {
      var filter = $(this).attr(filterAtribute);
      currentFilter = filter;

      setPagination();
      goToPage(1);
    });

    //Evento Responsivo
    $(window).resize(function () {
      itemsPerPage = defineItemsPerPage();
      setPagination();
    });
  });

  $(document).ready(function () {
    // filter items on button click
    $(".isotope-pager").on("click", "a", function () {
      var filterValue = $(this).attr("data-page");

      $(".isotope-pager a").removeClass("active");
      $(this).addClass("active");
    });
  });

  $(document).ready(function () {
    $(".popupimg").magnificPopup({
      type: "image",
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true,
      },

      zoom: {
        enabled: true,

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  });

  window.addEventListener("load", function () {
    var inner = document.querySelector("body");

    var eng = document.getElementById("ribbon_eng");
    var mal = document.getElementById("ribbon_mal");

    ribbon_eng.addEventListener("click", switchEng);
    ribbon_mal.addEventListener("click", switchMal);

    function switchEng() {
      localStorage.setItem("currentsts", "eng");
      inner.classList.add("eng");
      eng.classList.add("hide");
      mal.classList.remove("hide");
    }

    function switchMal() {
      localStorage.setItem("currentsts", "mal");
      inner.classList.remove("eng");
      eng.classList.remove("hide");
      mal.classList.add("hide");
    }

    function setClass() {
      var currentsts = localStorage.getItem("currentsts");

      if (currentsts === null) {
        return;
      }

      if (currentsts === "eng") {
        switchEng();
      } else if (currentsts === "mal") {
        switchMal();
      }
    }

    setClass();
  });
})();
