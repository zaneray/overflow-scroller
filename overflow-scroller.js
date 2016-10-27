/*
$.overflowScroller();
Dependencies: 
jquery, 
jquery-throttle-debounce
Modernizr.hiddenscroll property


adds scrolling arrows to elements with overflow scroll, 
all elements must be the same width

*/

(function ($) {
  $.fn.overflowScroller = function (args) {
    var options = {
      scrollPercentage: 0.9,
      scrollSpeed: 400

    };


    var scrollContainerWidth, 
    scrollElementWidth, 
    scrollElementWidth, 
    scrollElementTotalWidth,
    scrollPosition,
    isClicked = false,
    arrowHiddenClass = 'overflow-scroller-arrow-hide';


    $.extend( options, args );

    $this = this;




    this.each(function(){
      var $overflowScroller = $(this);
      $overflowScroller.wrap('<div class="overflow-scroller-outer"></div>');
      
      var $overflowScrollerOuter = $this.parent('.overflow-scroller-outer');



      $overflowScrollerOuter.append('<div class="overflow-scroller-arrow overflow-scroller-arrow-previous overflow-scroller-arrow-hide"></div><div class="overflow-scroller-arrow overflow-scroller-arrow-next overflow-scroller-arrow-hide"></div>');

      var $arrows         = $overflowScrollerOuter.find('.overflow-scroller-arrow'),
      $arrowPrevious  = $overflowScrollerOuter.find('.overflow-scroller-arrow-previous'),
      $arrowNext      = $overflowScrollerOuter.find('.overflow-scroller-arrow-next');


      var setScrollArrows = function(){
        scrollPosition = $overflowScroller.scrollLeft();
        //console.log('scrollPosition: ' + scrollPosition);
        //console.log('scrollElementTotalWidth - scrollContainerWidth: ' + (scrollElementTotalWidth - scrollContainerWidth));
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


      // if(!Modernizr.hiddenscroll) {
      //   $overflowScroller.addClass('hidden-scroll');

        //$(window).load(function(){ 
          //TODO this isn't quite right yet but it should already work well with the class
        // console.log('$overflowScrollerOuter: ' + $overflowScrollerOuter.height());
        // console.log('$overflowScroller: ' + $overflowScroller.children(':eq(0)').height());
        // var heightDifference = (($overflowScrollerOuter.height() - $overflowScroller.children(':eq(0)').height()) + -17);
        // console.log('heightDifference: ' + heightDifference); 

        // $overflowScroller.css('margin-bottom', heightDifference + 'px');
        
      // }

      scrollContainerWidth = $overflowScroller.width();
      scrollElementWidth = $overflowScroller.children(':eq(0)').width();
      scrollElementTotalWidth = scrollElementWidth * $this.children().length;
     //console.log('scrollContainerWidth: ' + scrollContainerWidth);
     // console.log('scrollElementWidth: ' + scrollElementWidth);
     //console.log('scrollElementTotalWidth: ' + scrollElementTotalWidth);


     if(scrollElementTotalWidth > scrollContainerWidth) {
      //if the total width is great than the container show the arrows and trigger functionality
      scrollPosition = $overflowScroller.scrollLeft();
      //console.log('scrollPostion: ' + scrollPosition);

      //detect initial scroll postion and show/hide arrows. 
      if(scrollPosition === 0) {
        $arrowNext.removeClass(arrowHiddenClass);
      } 
      else {
        $arrows.removeClass(arrowHiddenClass);
      }


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


      if($.debounce != undefined) {
        $overflowScroller.scroll($.debounce( 100, function(){
          setScrollArrows();
        }));
      } else {
        //debounce is not loaded. 
        $overflowScroller.scroll( 100, function(){
          setScrollArrows();
        });
      }
    } 
  }); //end each
  };
})( jQuery );


