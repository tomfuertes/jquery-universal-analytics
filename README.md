# jQuery Universal Analytics

Auto track forms and links with events in Universal Analytics.

## Getting Started

`bower install jquery.universal-analytics --save`

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/tomfuertes/jquery-universal-analytics/master/dist/jquery.universal-analytics.min.js
[max]: https://raw.github.com/tomfuertes/jquery-universal-analytics/master/dist/jquery.universal-analytics.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="jquery.universal-analytics.min.js"></script>
<script>
jQuery(function($) {
  $.universalAnalytics(); // activate all tracking
});
</script>
```

## Documentation

### $.universalAnalytics.trackLinks()

* Downloads - `ga('send', 'event', 'Download', extension, href);`
* Mailto - `ga('send', 'event', 'Mailto', emailAddress);`
* Outbound Links - `ga('send', 'event', 'Outbound', externalDomain, externalDomainPath)`

```html
<a href="/file.pdf">Foo</a>
<!-- onMouseDown: ga('send', 'event', 'Download', 'pdf', 'http://foo.bar/file.pdf'); -->
<a href="mailto:foo@bar.com">Foo</a>
<!-- onMouseDown: ga('send', 'event', 'Mailto', 'foo@bar.com'); -->
<a href="//external.com/landing-page">Foo</a>
<!-- onMouseDown: ga('send', 'event', 'Outbound', 'external.com', '/landing-page'); -->
```

### $.universalAnalytics.trackForms()

`ga('send', 'event', 'Form Tracking', 'form (' + id + ')', inputNode + ' (' + inputType + ')');`

```html
<!-- Example -->
<form id="landing-form">
<!-- onSubmit: ga('send', 'event', 'Form Tracking', 'form (landing-form)', landing-form (submit)') -->
<input type="text" id="name" name="name" />
<!-- onChange: ga('send', 'event', 'Form Tracking', 'form (landing-form)', name (text)'); -->
<input type="text" id="email" name="email" />
<!-- onChange: ga('send', 'event', 'Form Tracking', 'form (landing-form)', email (text)'); -->
<input type="submit" />
</form>
```

### $.universalAnalytics.trackSocial()

```javascript
ga('send', 'social', 'facebook', 'like', opt_target);
ga('send', 'social', 'twitter', socialAction);
```

Adapted from Google's [ga_social_tracking.js](http://goo.gl/3ejQan).

```javascript
// psuedocode
$.universalAnalytics.trackSocial = function (waitInSeconds) {
  try {
  twttr.events.bind("click", trackTwitter('click'));
  twttr.events.bind("tweet", trackTwitter('tweet'));
  FB.Event.subscribe("edge.create", trackFacebook('like');
  FB.Event.subscribe("edge.remove", trackFacebook('unlike');
  FB.Event.subscribe("message.send", trackFacebook('send');
  } catch(e) {}
};
```

## Examples

```html
<script src="jquery.js"></script>
<script src="jquery.universal-analytics.min.js"></script>
<script>
jQuery(function($) {
  
  // Example 1
  $.universalAnalytics(); // activate all tracking
  
  // Examples 2, 3, 4
  $.universalAnalytics({
    trackForms: false, // disable form tracking
    // trackLinks: false, // track everything but links
    // trackSocial: false // track everything but Social
  }); 
  
  // Example 4
  $.universalAnalytics.trackForms();    // track forms on this page
  $.universalAnalytics.trackLinks();    // track links on this page
  // $.universalAnalytics.trackTwitter();  // track twitter
  // $.universalAnalytics.trackFacebook(); // track facebook
  $.universalAnalytics.trackSocial();   // track all social

});
</script>
```

## Release History

TODO: Unit tests so tripple releases like 2014.01.27 don't happen

* **0.0.6 - 2014.01.27**
  * Maintain api
* **0.0.5 - 2014.01.27**
  * Social Tracking
* **0.0.4 - 2014.12.27**
  * Bugfixes
* **0.0.3 - 2013.12.XX**
  * Segment out
* **0.0.2 - 2013.11.XX**
  * Bugfix Release
* **0.0.1 - 2013.10.XX**
  * Initial Version

