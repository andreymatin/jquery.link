/*
 *  Project: jQuery Hyper Link
 *  Description: Hyperlink wrapper
 *  Author: A.
 *  License: MIT and GPL
 */

(function ($) {

  let
    pluginName = "link", // plugin name
    dataKey = "plugin_" + pluginName; // key using in $.data()

  class Plugin {
    constructor(element, options) {
      this.element = element;
      this.options = {
        'tabs': true, // Open All links by new Tabs
        'links': true, // Wrap link objects
        'auto': true // Detect urls
      };

      /*
       * Initialization
       */
      this.init(options);
    }
  }

  Plugin.prototype = {
    // initialize options
    init: function (options) {
      $.extend(this.options, options);

      /*
       * Update plugin for options
       */
    },

    publicMethod: function () {
      // ...
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
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

      return replacedText;
    }

    let plugin = this.data(dataKey);

    // has plugin instantiated ?
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
    let settings = plugin.options;

    /*
     * Autodetect urls
     */
    if (settings.auto) {
      let p = $('p');
      p.each(function () {
        let text = $(this).text();
        let rp = linkify(text);

        $(this).html(rp);
      });
    }

    /*
     * Wrap link objects
     */
    if (settings.links) {
      let b = $('[data-href]');
      b.on('click', function (e) {
        e.preventDefault();

        let url = $(this)[0].dataset.href;
        let target = $(this)[0].dataset.target;

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
      let url = $(this)[0].href;
      let target = $(this)[0].target;

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

}(jQuery));