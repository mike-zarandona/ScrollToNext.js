/*!
***************************************************************
* ScrollToNext.js
* 
* Version:   v1.0.0
* Author:    Mike Zarandona | @mikezarandona
* Release:   December 01, 2015
*            Initial release.
* 
* Required:  jQuery
* 
* Docs:      https://github.com/mike-zarandona/prettyembed.js
***************************************************************
*/

;(function($) {
  $.scrollToNext = function(options) {

    var defaults = {
          container: undefined,
          children: undefined,

          scrollGroup: undefined,

          scrollTrigger: '.scroll-to-next',
          scrollDuration: 1000,

          afterScroll: undefined
        },
        settings = $.extend({}, defaults, options),
        tops = []
    ;


    // guard against option-less plugin calls
    options = options || {};


    // decide if we're operating based on container/children -or- scrollgroup
    // too many options
    if ( settings.container !== undefined && settings.scrollGroup !== undefined ) {
      console.error('ScrollToNext.js: Please define either options.container, options.container + options.children, -or- options.scrollGroup.');
    }
    // container only (assumed children)
    else if ( settings.container !== undefined && settings.children === undefined ) {
      calculateTopsArray( $(settings.container).children() );
      attachEventHandler( $(settings.container).children(), settings.container + '> *' );
    }
    // container + children
    else if ( settings.container !== undefined && settings.children !== undefined ) {
      calculateTopsArray( $(settings.container).children(settings.children) );
      attachEventHandler( $(settings.container).children(settings.children), settings.children );
    }
    // scrollgroup
    else if ( settings.scrollGroup !== undefined ) {
      calculateTopsArray( $(settings.scrollGroup) );
      attachEventHandler( $(settings.scrollGroup), settings.scrollGroup );
    }
    // not enough options - womp womp
    else {
      console.error('ScrollToNext.js: Please define options.container, options.container + options.children, or options.scrollGroup.');
    }


    // Resize event handler with debounce
    $(window).on('resize', function() {
      clearTimeout($.data(this, 'resizeTimer'));
      $.data(this, 'resizeTimer', setTimeout(function() {

        // decide if we're operating based on container/children -or- scrollgroup
        // container only (assumed children)
        if ( settings.container !== undefined && settings.children === undefined ) {
          calculateTopsArray( $(settings.container).children() );
        }
        // container + children
        else if ( settings.container !== undefined && settings.children !== undefined ) {
          calculateTopsArray( $(settings.container).children(settings.children) );
        }
        else if ( settings.scrollGroup !== undefined ) {
          calculateTopsArray( $(settings.scrollGroup) );
        }
      }, 250));
    });


    /**
     * Function calculateTopsArray(selector)
     * - selector = the group of elements to iterate over and record
     */
    function calculateTopsArray(selector) {
      // reset tops in preparation for a rebuild
      tops = [];

      // iterate over each of the selector matches
      $( selector ).each(function(i) {

        // record the scrollTop property
        tops.push( $(this).offset().top );
      });
    }


    /**
     * Function: attachEventHandler(selector)
     * - selector = the group of elements to iterate over and attach events
     * - child = the group of elements which are the scroll to next objects
     */
    function attachEventHandler(selector, child) {
      // make sure a scroll trigger is defined
      if ( settings.scrollTrigger !== undefined ) {

        // click handler
        selector.find( settings.scrollTrigger ).on('click', function(e) {
          var thisOffset = $(this).parents( child ).offset().top,
              foundItem = $.inArray( thisOffset, tops )
          ;

          e.preventDefault();

          // last in array contingency
          if ( (foundItem + 1) == tops.length ) {
            console.warn('ScrollToNext.js: Ran out of \"Nexts\" to scroll!');
          }
          else if ( foundItem == -1 ) {
            console.error('ScrollToNext.js: Scroll to element not found.');
          }
          else {
            scrollToThis( tops[foundItem + 1] );
          }
        });
      }
      else {
        console.error('ScrollToNext.js: Please specify options.scrollTrigger.');
      }
    }


    /**
     * Function: scrollToThis(target)
     * - Executes the scroll to a thing
     */
    function scrollToThis(target) {
      $( 'body' ).animate({
        scrollTop: target
      }, {
        duration: settings.scrollDuration,
        easing: 'easeInOutQuart',
        complete: settings.afterScroll
      });
    }


    /**
     * EaseInOutQuart bezier-curve function definition
     * - Because it looks nice
     */
    $.extend( $.easing, {
      def: 'easeInOutQuart',
      easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
      },
    });
  };
})(jQuery);
