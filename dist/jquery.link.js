"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  Project: jQuery Hyper Link
 *  Description: Hyperlink wrapper
 *  Author: A.
 *  License: MIT and GPL
 */
(function ($) {
  var pluginName = "link",
      // plugin name
  dataKey = "plugin_" + pluginName; // key using in $.data()

  var Plugin = function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this.element = element;
    this.options = {
      'tabs': true,
      // Open All links by new Tabs
      'links': true,
      // Wrap link objects
      'auto': true // Detect urls

    };
    /*
     * Initialization
     */

    this.init(options);
  };

  Plugin.prototype = {
    // initialize options
    init: function init(options) {
      $.extend(this.options, options);
      /*
       * Update plugin for options
       */
    },
    publicMethod: function publicMethod() {// ...
    }
  };
  /*
   * Plugin wrapper, preventing against multiple instantiations and
   * return plugin instance.
   */

  $.fn[pluginName] = function (options) {
    /**
     * Detect Links
     * https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
     */
    function linkify(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3; //URLs starting with http://, https://, or ftp://

      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>'); //URLs starting with "www." (without // before it, or it'd re-link the ones done above).

      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>'); //Change email addresses to mailto:: links.

      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
      return replacedText;
    }

    var plugin = this.data(dataKey); // has plugin instantiated ?

    if (plugin instanceof Plugin) {
      // if have options arguments, call plugin.init() again
      if (typeof options !== 'undefined') {
        plugin.init(options);
      }
    } else {
      plugin = new Plugin(this, options);
      this.data(dataKey, plugin);
    }
    /*
     * Get Settings
     */


    var settings = plugin.options;
    /*
     * Autodetect urls
     */

    if (settings.auto) {
      var p = $('p');
      p.each(function () {
        var text = $(this).text();
        var rp = linkify(text);
        $(this).html(rp);
      });
    }
    /*
     * Wrap link objects
     */


    if (settings.links) {
      var b = $('[data-href]');
      b.on('click', function (e) {
        e.preventDefault();
        var url = $(this)[0].dataset.href;
        var target = $(this)[0].dataset.target;
        /*
         * Settings: Tabs
         */

        if (settings.tabs) {
          target = '_blank';
          window.open(url, target);
        } else {
          if (target) {
            window.open(url, target);
          } else {
            target = '_self';
            window.open(url, target);
          }
        }
      });
    }
    /*
     * Click On Link
     */


    this.on('click', function (e) {
      e.preventDefault();
      /*
       * Settings: Tabs
       */

      var url = $(this)[0].href;
      var target = $(this)[0].target;

      if (settings.tabs) {
        target = '_blank';
        window.open(url, target);
      } else {
        if (target) {
          window.open(url, target);
        } else {
          target = '_self';
          window.open(url, target);
        }
      }
    });
    return plugin;
  };
})(jQuery);
