// <!-- Google Tag Manager -->
(
  function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })
    var f = d.getElementsByTagName(s)[0]
    var j = d.createElement(s)
    var dl = l !== 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  }
)(window, document, 'script', 'dataLayer', 'GTM-5M4G965');
//   <!-- End Google Tag Manager -->
//   <!-- Google Analytics -->
(
  function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }
    i[r].l = 1 * new Date()
    /* eslint no-unused-expressions: "error" */
    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  }
)(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
/* global ga:true */
/* eslint no-undef: "error" */
ga('create', 'UA-123581532-1', 'auto')
ga('send', 'pageview')
//    <!-- End Google Analytics -->
