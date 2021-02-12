import throttle from 'lodash/throttle'

(function () {
  var scrollPosition = 0;
  var mastheadHeight = 120;
  var promoBarHeight = 40;
  var navFixed = false;
  var masthead = document.getElementById('masthead')

  window.addEventListener('scroll', throttle(toggleMasthead, 200));

  function toggleMasthead() {
    if (window.pageYOffset < scrollPosition) {
      //scrolling up toggle active on the nav.
      masthead.classList.add('active');

      if (window.pageYOffset < mastheadHeight + 100) {
        masthead.classList.add('default');
      }
    } else if (window.pageYOffset > mastheadHeight) {
      masthead.classList.remove('active');
      masthead.classList.remove ('default');
    }


    //fix the nav
    if (window.pageYOffset > mastheadHeight && !navFixed) {
      masthead.classList.add('fixed');
    }



    scrollPosition = window.pageYOffset;
  }

}());
