/* Season 1 closed: the public root now opens the completion-kit page. */
(function () {
  "use strict";
  var qs = new URLSearchParams(location.search);
  if (qs.has("scoreproof") || qs.get("open") === "preview") return;

  var cfg = window.MUNIVERSE_CONFIG || {};
  var exitCfg = cfg.exitCeremony || {};
  var target = exitCfg.kitPath || "exit/index.html?tab=kit";
  var here = location.pathname || "/";

  if (here.indexOf("/exit/") !== -1) return;

  try {
    var st = document.createElement("style");
    st.textContent = "html{background:#F7F3E7}body{visibility:hidden!important}";
    (document.head || document.documentElement).appendChild(st);
  } catch (_) {}

  location.replace(new URL(target, location.href).href);
})();
