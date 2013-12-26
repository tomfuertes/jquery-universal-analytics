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

## Examples

```html
<script src="jquery.js"></script>
<script src="jquery.universal-analytics.min.js"></script>
<script>
jQuery(function($) {
  
  // Example 1
  $.universalAnalytics(); // activate all tracking
  
  // Examples 2+3
  $.universalAnalytics({
    trackForms: false // track everything but forms
  }); 
  $.universalAnalytics({
    trackLinks: false // track everything but links
  }); 
  
  // Example 4
  $.universalAnalytics.trackForms(); // track forms on this page
  $.universalAnalytics.trackLinks(); // track links on this page

});
</script>
```

## Release History

* **0.0.3 - 2013.12.XX**
  * Segment out
* **0.0.2 - 2013.11.XX**
  * Bugfix Release
* **0.0.1 - 2013.10.XX**
  * Initial Version

