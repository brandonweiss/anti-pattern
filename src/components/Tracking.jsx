import React from "react"
const isProduction = process.env.NODE_ENV === "production"

let script = `
  var _gauges = _gauges || [];
  (function() {
    var t   = document.createElement('script');
    t.type  = 'text/javascript';
    t.async = true;
    t.id    = 'gauges-tracker';
    t.setAttribute('data-site-id', '4d63cbe7a219863d81000003');
    t.src = '//secure.gaug.es/track.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
  })();
`

const Tracking = () => (
  <>
    {isProduction && (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: script }}
      />
    )}
  </>
)

export default Tracking
