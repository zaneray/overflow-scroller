Overflow Scroller is a simple package of CSS and javascript that harnesses the simple <code>overflow: auto</code> behavior allowing for swipeability at mobile and on touch enabled devices (trackpads, magic mouse). On desktop devices it is enhanced to have previous and next arrows that control the scrolling. 
  
### dependencies
There are a couple dependencies, it will work fine without them but it provides a better experience &amp; performance if they are added.
  
* __[Modernizr:](https://modernizr.com/download/?-hiddenscroll-setclasses)__Has browser feature detection for Hidden Scrollbars which is true for Mac OS and mobile OS. If 'hiddenscroll' is false (pc browser) the scrollbars will automatically be hidden.
* __[Jquery Throttle Debounce:](http://benalman.com/projects/jquery-throttle-debounce-plugin/)__ This adds the performace benefit of waiting until the scrolling is complete to show/hide the scrollbars. 

### Getting Started
Overflow scroller only requires a simple set of items in a div to get started, the use the css the containing div should have a class name of `overflow-scroller`

#### The Markup
The HTML is pretty simple. A div with a collection of items that are ideally all the same height.
```html
<div class="overflow-scroller">
  <div class="child-item">...</div>
  <div class="child-item">...</div>
  <div class="child-item">...</div>
  ....
</div>
```

#### The Script
Overflow scroller is written as a jQuery plugin, there are a few options you can pass to it as well.

* __scrollPercentage:__ A number from 0-1 which dictates how far each click on a previous or next arrow scrolls the container.
_Default: .9_
* __scrollSpeed:__ A number in milliseconds indicating how fast the container scrolls.
_Default: 400_

```javascript
  $('.overflow-scroller').overflowScroller();

  //passing options
  $('.overflow-scroller').overflowScroller({
    scrollPercentage: .9,
    scrollSpeed: 400
  });
```

<h4>The Styles</h4>
Feel free to overwrite the styles to your liking. There is a provided .less file and .css file. We use the less file to build the css file. Before creating a pull request make sure to edit the .less file and then run

`lessc overflow-scroller.less overflow-scroller.css`