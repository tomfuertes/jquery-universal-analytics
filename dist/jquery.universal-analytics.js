/*! jquery.universal-analytics - v0.0.7 - 2014-03-01
* https://github.com/tomfuertes/jquery-universal-analytics
* Copyright (c) 2014 Tom Fuertes; Licensed MIT */
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
    trackForms: true,
    trackSocial: true
  };

  /**
   * track links
   * - Downloads
   * - Mailto
   * - Outbound Links
   */
  $.universalAnalytics.trackLinks = function () {
    $(document).on('mousedown', 'a', function () {
      var $this = $(this);
      var href = ($this.prop('href') || '').split('?')[0];
      var ext = href.split('.').pop();
      if (href.toLowerCase().indexOf('mailto:') === 0) {
        ga('send', 'event', 'Mailto', href.substr(7));
      }
      if ('xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip,rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv'.split(',').indexOf(ext) !== -1) {
        ga('send', 'event', 'Download', ext, href);
      } else if ((this.protocol === 'http:' || this.protocol === 'https:') && this.hostname.indexOf(document.location.hostname) === -1) {
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
   * TODO: track social - adaptation of http://goo.gl/3ejQan
   * - Facebook
   * - Twitter
   */
  function trackFacebook() {
    /*global FB*/
    try {
      FB.Event.subscribe("edge.create", function (opt_target) {
        ga('send', 'social', 'facebook', 'like', opt_target);
      });
      FB.Event.subscribe("edge.remove", function (opt_target) {
        ga('send', 'social', 'facebook', 'unlike', opt_target);
      });
      FB.Event.subscribe("message.send", function (opt_target) {
        ga('send', 'social', 'facebook', 'send', opt_target);
      });
    } catch (e) {}
  }
  $.universalAnalytics.trackFacebook = trackFacebook;

  function trackTwitter() {
    function trackTwitterHandler(intent_event) {
      if (intent_event && intent_event.type === "tweet" || intent_event.type === "click") {
        var socialAction = intent_event.type + (intent_event.type === "click" ? "-" + intent_event.region : "");
        ga('send', 'social', 'twitter', socialAction);
      }
    }

    try {
      /*global twttr*/
      twttr.events.bind("click", trackTwitterHandler);
      twttr.events.bind("tweet", trackTwitterHandler);
    } catch (e) {}
  }
  $.universalAnalytics.trackTwitter = trackTwitter;

  /**
   * default track hook waits 5 seconds after window.onload
   */
  $.universalAnalytics.trackSocial = function (waitInSeconds) {
    $(window).load(function () {
      setTimeout(function () {
        trackFacebook();
        trackTwitter();
      }, waitInSeconds || 5000);
    });
  };

  /**
   * TODO: track media
   * - html5
   * - youtube
   * - vimeo
   */

}(jQuery));
