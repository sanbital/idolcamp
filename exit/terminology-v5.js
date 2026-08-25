(function () {
  "use strict";

  var COPY = {
    ko: {
      season: "아이돌 수련회는 시즌2에서 다시 만나요!",
      lead: "본편에 담지 못한 이야기까지 — 뜻밖의 설렘이 피어난 캠프파이어부터, 어색함마저 추억이 된 수련회행 버스 안까지",
      title: "〈아이돌 수련회〉 확장판 글로벌 공개 중"
    },
    en: {
      season: "See you again in Idol School Camp Season 2!",
      lead: "From unexpected sparks around the campfire to the awkward bus ride that became a memory—discover the stories left out of the original",
      title: "〈IDOL SCHOOL CAMP〉 Extended Edition Now Available Worldwide"
    },
    ja: {
      season: "アイドル修練会はシーズン2でまた会いましょう！",
      lead: "思いがけないときめきが生まれたキャンプファイヤーから、ぎこちなさまで思い出になった修練会行きのバスの中まで、本編に収まりきらなかった物語を公開",
      title: "『アイドル修練会』拡張版 グローバル公開中"
    },
    "zh-Hant": {
      season: "《偶像修練會》第二季再見！",
      lead: "從意外心動的營火時光，到連尷尬都成為回憶的修練會巴士旅程，正片未能收錄的故事也一次公開",
      title: "《偶像修練會》擴充版 全球公開中"
    },
    "zh-CN": {
      season: "《偶像修炼会》第二季再见！",
      lead: "从意外心动的篝火时光，到连尴尬都成为回忆的修炼会巴士旅程，正片未能收录的故事也一次公开",
      title: "《偶像修炼会》扩展版 全球上线中"
    }
  };

  function language() {
    var value = (document.documentElement.lang || "ko").trim();
    if (/^zh-(Hant|TW)/i.test(value)) return "zh-Hant";
    if (/^zh-(Hans|CN)/i.test(value)) return "zh-CN";
    if (/^ja/i.test(value)) return "ja";
    if (/^en/i.test(value)) return "en";
    return "ko";
  }

  function setDisplay(element, value) {
    if (!element) return;
    if (element.style.getPropertyValue("display") !== value ||
        element.style.getPropertyPriority("display") !== "important") {
      element.style.setProperty("display", value, "important");
    }
  }

  function installStyle() {
    if (document.getElementById("season2-close-style")) return;
    var style = document.createElement("style");
    style.id = "season2-close-style";
    style.textContent = [
      ".season2Banner{display:flex;align-items:center;justify-content:center;gap:12px;margin:14px 0 18px;padding:18px 22px;border-radius:18px;background:linear-gradient(180deg,#FFFDF6 0%,#F8F2DF 100%);border:1.5px solid rgba(31,107,68,.22);box-shadow:0 8px 22px rgba(20,48,61,.08);color:#123A2E;text-align:center}",
      ".season2Banner strong{font-family:var(--sans,\"Pretendard\",sans-serif);font-size:clamp(18px,2.8vw,28px);font-weight:900;line-height:1.3;letter-spacing:-.035em;word-break:keep-all}",
      ".season2Mark{display:grid;place-items:center;width:32px;height:32px;flex:0 0 32px;border-radius:50%;background:#FFF3C4;border:1.5px solid rgba(31,107,68,.22);color:#1F6B44;font-size:16px;font-weight:900}",
      "#kit{margin-top:0!important}",
      "@media(max-width:640px){.season2Banner{gap:8px;padding:15px 12px;border-radius:15px}.season2Banner strong{font-size:17px}.season2Mark{width:27px;height:27px;flex-basis:27px;font-size:13px}}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function apply() {
    installStyle();

    var text = COPY[language()] || COPY.ko;
    var tabbar = document.getElementById("tabbar");
    if (tabbar) {
      if (!tabbar.classList.contains("season2Banner")) {
        tabbar.className = "season2Banner";
        tabbar.removeAttribute("aria-label");
        tabbar.innerHTML = '<span class="season2Mark" aria-hidden="true">△</span><strong id="season2Message"></strong><span class="season2Mark" aria-hidden="true">♢</span>';
      }
      var seasonMessage = document.getElementById("season2Message");
      if (seasonMessage && seasonMessage.textContent !== text.season) {
        seasonMessage.textContent = text.season;
      }
    }

    ["home", "question", "result"].forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      section.classList.remove("on");
      section.setAttribute("aria-hidden", "true");
      setDisplay(section, "none");
    });

    var kit = document.getElementById("kit");
    if (kit) {
      kit.classList.add("on");
      kit.removeAttribute("aria-hidden");
      setDisplay(kit, "block");
    }
    setDisplay(document.getElementById("kitBack2"), "none");

    var lead = document.querySelector(".exbar-lead");
    var title = document.querySelector(".exbar-title");
    if (lead && lead.textContent !== text.lead) lead.textContent = text.lead;
    if (title && title.textContent !== text.title) title.textContent = text.title;
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      apply();
    });
  }

  function boot() {
    apply();
    if (document.body) {
      new MutationObserver(schedule).observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
    new MutationObserver(schedule).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
    window.addEventListener("pageshow", apply);
    window.addEventListener("popstate", apply);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
