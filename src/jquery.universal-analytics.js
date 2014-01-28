/*
 * universal-analytics
 *
 *
 * Copyright (c) 2013 Tom Fuertes
 * Licensed under the MIT license.
 */

(function ($) {

  $.universalAnalytics = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.universalAnalytics.options, options);
    for (var key in options) {
      if (options.hasOwnProperty(key) && typeof $.universalAnalytics[key] === "function") {
        $.universalAnalytics[key]();
      }
    }
  };

  // enable everything by default
  $.universalAnalytics.options = {
    trackLinks: true,
    trackForms: true
  };

  /**
   * track links
   * - Downloads
   * - Mailto
   * - Outbound Links
   */
  $.universalAnalytics.trackLinks = function () {
    $('document').on('mousedown', 'a', function () {
      var $this = $(this);
      var href = $this.prop('href').split('?')[0];
      var ext = href.split('.').pop();
      if ('xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip,rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv'.split(',').indexOf(ext) !== -1) {
        ga('send', 'event', 'Download', ext, href);
      }
      if (href.toLowerCase().indexOf('mailto:') === 0) {
        ga('send', 'event', 'Mailto', href.substr(7));
      }
      if ((this.protocol === 'http:' || this.protocol === 'https:') && this.hostname.indexOf(document.location.hostname) === -1) {
        ga('send', 'event', 'Outbound', this.hostname, this.pathname);
      }
    });
  };

  /**
   * track forms
   */
  $.universalAnalytics.trackForms = function () {
    function trackField() {
      var $this = $(this);
      var form = $this.is('form') ? $this[0] : $(this).closest('form')[0] || {};
      ga('send', 'event', 'Form Tracking',
        'form (' + (form.name || form.id || 'none') + ')', // action
        (this.name || this.id || this.type || this.nodeName) + ' (' + this.type + ')' // label
      );
    }
    $('input, select, textarea, hidden').one('change', trackField);
    $('form').one('submit', trackField);
  };

  /**
   * TODO: track social
   * - Facebook
   * - Twitter
   */

  /**
   * TODO: track media
   * - html5
   * - youtube
   * - vimeo
   */

}(jQuery));
