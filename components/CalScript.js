'use client';

import Script from 'next/script';

export default function CalScript() {
  return (
    <Script
      id="cal-embed-script"
      src="https://app.cal.com/embed/embed.js"
      onLoad={() => {
        if (typeof window !== 'undefined') {
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === "string") {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["initNamespace", namespace]);
                } else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");

          if (window.Cal) {
            window.Cal("init", "mvp-building", { origin: "https://app.cal.com" });
            window.Cal.config = window.Cal.config || {};
            window.Cal.config.forwardQueryParams = true;
            if (window.Cal.ns && window.Cal.ns["mvp-building"]) {
              window.Cal.ns["mvp-building"]("ui", {
                "cssVarsPerTheme": { "light": { "cal-brand": "#087B8A" } },
                "hideEventTypeDetails": false,
                "layout": "month_view"
              });
            }
          }
        }
      }}
    />
  );
}
