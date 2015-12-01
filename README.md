# ScrollToNext.js [![GitHub version](https://badge.fury.io/gh/mike-zarandona%2Fscrolltonext.js.png)](https://badge.fury.io/gh/mike-zarandona%2Fscrolltonext.js) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
A jQuery plugin to quickly and easily scroll to the "next thing" using best performance practices.

### Why Would Anyone Use This?
**I'm glad you asked.** Some folks might write a custom function to handle something as simple as on-page navigation scrolling. However, others work on a lot of different projects and need a solid bit of functionality which they can plug in quickly and get on with their lives. ScrollToNext.js also uses best practices and keeps performance and flexibility in mind. _Why reinvent the wheel?_  

### Features
[Demo on CodePen.io]()

## Requirements
- jQuery
- Call the plugin on window load (to avoid a race condition) *-or-* load your scripts right before the `</body>` tag.

## Examples
Please note that ScrollToNext.js can be run in three distinct ways:
- Defining a `container` only
- Defining a `container` and `children`
- Defining a `scrollGroup`

Defining all three or none (or other weird combinations) will result in constructive criticism via the console.

### Container Only
Defining only the `container` will step through the direct descendants of the `container`.

```javascript
// JavaScript
$.scrollToNext({
  container: '.main-wrapper',
  scrollTrigger: '.scroll-to-next'
});
```

### Container + Children
Defining the `container` and `children` will step through the `children` of the `container`. Makes sense, huh?

```javascript
$.scrollToNext({
  container: '.main-wrapper',
  children: 'section',

  scrollTrigger: '.scroll-to-next'
});
```

### ScrollGroup
Defining a `scrollGroup` steps through the objects which match this selector. This provides greater and more granular control of what makes the "*scroll-to*" group.

```javascript
$.scrollToNext({
  scrollGroup: 'section.scrolling, section.an-outlier, footer',
  scrollTrigger: '.scroll-to-next'
});
```

### Kitchen Sink
The whole shebang.

```javascript
$.scrollToNext({
  container: '.main-wrapper',
  children: 'section',

  scrollTrigger: '.scroll-to-next',
  scrollDuration: 1000,

  afterScroll: function() {
    console.log('Done scrolling!');
  }
});
```

## Options
| Option | Type |  Description |
| --- | --- | --- | --- |
| **`container`** | *string* | Defines the wrapper of elements to be scrolled through. |
| **`children`** | *string* | Defines the elements to be scrolled through. In most cases, these are direct children of the `container`. |
| **`scrollGroup`** | *string* | Defines the elements to be scrolled through. |
| **`scrollTrigger`** | *string* | Defines the element contained in each scrolling element which will trigger the next scroll on click. **`Required`**. |
| **`scrollDuration`** | *integer* | Scroll duration in milliseconds. Defaults to `1000`. |
| **`afterScroll`** | *function* | Callback function which is executed after each scroll. |

## Changelog

### v1.0.0
Initial release.

## Author
By [Mike Zarandona](http://mike.zarandona.com) | [@mikezarandona](http://twitter.com/mikezarandona).
