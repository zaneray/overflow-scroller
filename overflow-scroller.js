/*
$.overflowScroller();
Dependencies: 
jquery;
jquery-throttle-debounce
Modernizr.hiddenscroll property

adds scrolling arrows to elements with overflow scroll, 
all elements must be the same width
*/

(function ($) {
  $.fn.overflowScroller = function (args) {

    var options = {
      scrollPercentage: 1,
      scrollSpeed: 400,
      snapPoints: true
    };

    var arrowHiddenClass = 'overflow-scroller-arrow-hide';
        
    $.extend( options, args );

    this.each(function(){
      var $overflowScroller = $(this),
          scrollContainerWidth = $overflowScroller.width(), 
          scrollElementWidth = $overflowScroller.children(':eq(0)').width(),
          scrollElementTotalWidth = scrollElementWidth * $overflowScroller.children().length,
          scrollPosition = 0,
          isClicked = false;

      $overflowScroller.toggleClass('snap-points', options.snapPoints);

      $overflowScroller.wrap('<div class="overflow-scroller-outer"></div>');
      
      var $overflowScrollerOuter = $overflowScroller.parent('.overflow-scroller-outer');

      $overflowScrollerOuter.append('<div class="overflow-scroller-arrow overflow-scroller-arrow-previous overflow-scroller-arrow-hide"></div><div class="overflow-scroller-arrow overflow-scroller-arrow-next overflow-scroller-arrow-hide"></div>');

      var $arrows     = $overflowScrollerOuter.find('.overflow-scroller-arrow'),
      $arrowPrevious  = $overflowScrollerOuter.find('.overflow-scroller-arrow-previous'),
      $arrowNext      = $overflowScrollerOuter.find('.overflow-scroller-arrow-next');

      var setScrollArrows = function(){
        scrollPosition = $overflowScroller.scrollLeft();
        if(scrollPosition >= (scrollElementTotalWidth - scrollContainerWidth)) {
          $arrowNext.addClass(arrowHiddenClass);
        }
        else if (scrollPosition === 0) {
          $arrowPrevious.addClass(arrowHiddenClass);
        }
        else {
          $arrows.removeClass(arrowHiddenClass);
        }
      };

     if(scrollElementTotalWidth > scrollContainerWidth) {
      //if the total width is greater than the container show the arrows and trigger functionality
      scrollPosition = $overflowScroller.scrollLeft();

      //detect initial scroll postion and show/hide arrows. 
      if(scrollPosition === 0) {
        $arrowNext.removeClass(arrowHiddenClass);
      } 
      else {
        $arrows.removeClass(arrowHiddenClass);
      }

      //bind events
      $arrowNext.on('click',function(){
        if(!isClicked) {
          $arrowPrevious.removeClass(arrowHiddenClass);
          isClicked = true; //block double clicking

          $overflowScroller.animate({
            scrollLeft: $overflowScroller.scrollLeft() + scrollContainerWidth * options.scrollPercentage
          },
          options.scrollSpeed,
          function(){
            isClicked = false;
          });
        }
      });

      $arrowPrevious.on('click',function(){
        if(!isClicked) {
          $arrowNext.removeClass(arrowHiddenClass);
          isClicked = true; //block double clicking

          $overflowScroller.animate({
            scrollLeft: $overflowScroller.scrollLeft() - scrollContainerWidth * options.scrollPercentage
          },
          options.scrollSpeed,
          function(){
            isClicked = false;
          });
        }
      });

      if($.debounce !== undefined) {
        $overflowScroller.scroll($.debounce( 100, function(){
          setScrollArrows();
        }));
      } else {
        //debounce is not loaded. 
        $overflowScroller.scroll(setScrollArrows);
      }

      //reset total values on resize
      $(window).on('resize.overflowScroller',function(){
        scrollContainerWidth      = $overflowScroller.width();
        scrollElementWidth        = $overflowScroller.children(':eq(0)').width();
        scrollElementTotalWidth   = scrollElementWidth * $overflowScroller.children().length;
      });
    } 
  }); 
  };
})( jQuery );


