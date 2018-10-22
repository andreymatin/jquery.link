# jQuery Link [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

jQuery Link is a jQuery plugin for creating various anchors

## Features:
* replace target="_blank"
* detection links 
* custom links

## Usage

* Include jQuery and `jquery.link.min.js` into your site

Set up jQuery Link:

```javascript
    $(function () {
      var a = $('a');
      a.link({
        tabs: false,
        links: false,
        auto: false,
        twitter: true
      });

    });
```

## Examples

* Open the file `html/demo.html` in your browser

## Configuration

tabs - opens new tab after click
links - custom link
auto - detect urls
twitter - detect twitter links

## Todo

I had plans to create just plugin with current functionality but in process I invented some additional tasks for the feature:

- [x] any objects as link
- [x] target _blank
- [x] data-url
- [x] data-target
- [ ] spoilers show/hide
- [ ] localScroll
- [x] twitter detection @twitteruser
- [ ] custom social links like twitter (pedefined facebook, instagram etc.)
- [x] any http links wrap as link
- [ ] hashtags
- [ ] pause before relocation

## Inspiration

https://github.com/AnSavvides/jquery.linky
https://github.com/maranomynet/linkify
