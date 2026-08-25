/* 아이돌 수련회 최종 점수판 — 2026-08-25 17:30 KST 자동 공개 */
(function () {
  "use strict";

  var CFG = window.MUNIVERSE_CONFIG || {};
  var REVEAL_AT = Date.parse("2026-08-25T08:30:00Z"); /* 2026-08-25 17:30 KST */
  var serverOffset = 0;
  var currentMode = "";
  var timer = null;

  var ROWS = [
    { rank: 1, team: "AHOF", pledge: 1036640, like: 6510182, share: 6650, meme: 476600, finalVote: 5407900, bonus: 10000000, total: 23437972 },
    { rank: 2, team: "FLARE U", pledge: 1054000, like: 13357213, share: 7350, meme: 128100, finalVote: 1663200, bonus: 0, total: 16209863 },
    { rank: 3, team: "idntt", pledge: 3730, like: 225, share: 1350, meme: 25800, finalVote: 19600, bonus: 0, total: 50705 },
    { rank: 4, team: "CLOSE YOUR EYES", pledge: 7570, like: 1939, share: 3400, meme: 12900, finalVote: 21400, bonus: 0, total: 47209 }
  ];

  var I18N = {
    ko: {
      tally: "최종 점수 집계 중", tallySub: "정확한 결과 확인을 위해 점수를 검수하고 있어요", closed: "투표 종료 · 8/17 17:00 KST",
      s1: "투표 종료", s2: "점수 검수", s3: "결과 공개",
      title: "최종 점수판", winner: "최종 점수", first: "1위", champion: "CHAMPION", point: "점", team: "TEAM",
      pledge: "다짐 점수", pledgeSub: "10점/건", like: "좋아요 점수", likeSub: "1점/건", share: "공유 점수", shareSub: "50점/건",
      meme: "짤기자랑 예선 점수", memeSub: "최종 인정 점수", finalVote: "짤기자랑 결선 투표 점수", finalVoteSub: "100점/표",
      bonus: "우승팀 보너스", bonusSub: "1위팀 가산", total: "최종 점수"
    },
    en: {
      tally: "Final tally in progress", tallySub: "We are reviewing the scores to ensure an accurate result", closed: "Voting closed · Aug 17, 5:00 PM KST",
      s1: "Voting closed", s2: "Score review", s3: "Results",
      title: "Final Scoreboard", winner: "Final Score", first: "1st", champion: "CHAMPION", point: "pts", team: "TEAM",
      pledge: "Pledge Score", pledgeSub: "10 pts/entry", like: "Like Score", likeSub: "1 pt/like", share: "Share Score", shareSub: "50 pts/share",
      meme: "Meme Prelim Score", memeSub: "Final approved score", finalVote: "Meme Final Vote Score", finalVoteSub: "100 pts/vote",
      bonus: "Winner Bonus", bonusSub: "Winning team bonus", total: "Final Score"
    },
    ja: {
      tally: "最終集計中", tallySub: "正確な結果確認のためスコアを検収しています", closed: "投票終了 · 8/17 17:00 KST",
      s1: "投票終了", s2: "スコア検収", s3: "結果発表",
      title: "最終スコアボード", winner: "最終スコア", first: "1位", champion: "CHAMPION", point: "点", team: "TEAM",
      pledge: "決意スコア", pledgeSub: "10点/件", like: "いいねスコア", likeSub: "1点/件", share: "シェアスコア", shareSub: "50点/件",
      meme: "ミーム予選スコア", memeSub: "最終認定スコア", finalVote: "ミーム決選投票スコア", finalVoteSub: "100点/票",
      bonus: "優勝チームボーナス", bonusSub: "1位チーム加算", total: "最終スコア"
    },
    "zh-TW": {
      tally: "最終計分中", tallySub: "為確認準確結果，正在核對分數", closed: "投票結束 · 8/17 17:00 KST",
      s1: "投票結束", s2: "分數核對", s3: "結果公開",
      title: "最終積分榜", winner: "最終分數", first: "第1名", champion: "CHAMPION", point: "分", team: "TEAM",
      pledge: "宣言分數", pledgeSub: "10分/次", like: "按讚分數", likeSub: "1分/次", share: "分享分數", shareSub: "50分/次",
      meme: "迷因才藝秀預賽分數", memeSub: "最終認定分數", finalVote: "迷因才藝秀決賽投票分數", finalVoteSub: "100分/票",
      bonus: "冠軍隊伍加分", bonusSub: "第1名隊伍加分", total: "最終分數"
    },
    "zh-CN": {
      tally: "最终计分中", tallySub: "为确认准确结果，正在核对分数", closed: "投票结束 · 8/17 17:00 KST",
      s1: "投票结束", s2: "分数核对", s3: "结果公开",
      title: "最终积分榜", winner: "最终分数", first: "第1名", champion: "CHAMPION", point: "分", team: "TEAM",
      pledge: "宣言分数", pledgeSub: "10分/次", like: "点赞分数", likeSub: "1分/次", share: "分享分数", shareSub: "50分/次",
      meme: "表情包才艺秀预赛分数", memeSub: "最终认定分数", finalVote: "表情包才艺秀决赛投票分数", finalVoteSub: "100分/票",
      bonus: "冠军队伍加分", bonusSub: "第1名队伍加分", total: "最终分数"
    }
  };

  function langKey() {
    var l = (document.documentElement.lang || "ko").trim();
    if (/^zh-(Hant|TW)/i.test(l)) return "zh-TW";
    if (/^zh-(Hans|CN)/i.test(l)) return "zh-CN";
    if (/^ja/i.test(l)) return "ja";
    if (/^en/i.test(l)) return "en";
    return "ko";
  }
  function T() { return I18N[langKey()] || I18N.ko; }
  function n(v) { return Number(v || 0).toLocaleString(langKey() === "ko" ? "ko-KR" : "en-US"); }

  function installStyle() {
    if (document.getElementById("idolcamp-final-score-style")) return;
    var st = document.createElement("style");
    st.id = "idolcamp-final-score-style";
    st.textContent = [
      "#scoreboard.is-final .sb-reload,#scoreboard.is-final .sb-notice,#scoreboard.is-final #scoreList,#scoreboard.is-final #scoreUpdated,#scoreboard.is-final #scoreCta,#scoreboard.is-final .sb-vote-go{display:none!important}",
      "#voteBanner.is-final-hidden,.votebar.is-final-hidden{display:none!important}",

      ".sf{position:relative;overflow:hidden;margin:6px 0 2px;padding:34px 20px 30px;border-radius:22px;background:linear-gradient(180deg,#FCF8EC,#F7F1DF);border:1px solid rgba(20,48,61,.08);text-align:center}",
      ".sf-badge{width:112px;height:112px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:#FFF7DC;border:5px solid #4CA96F;box-shadow:inset 0 0 0 1px rgba(214,178,74,.28)}",
      ".sf-tent{font-size:48px;line-height:1;color:#1F6B44}",
      ".sf-head{margin:0;font-size:clamp(25px,6.4vw,34px);font-weight:900;letter-spacing:-.035em;color:#1B5E3F;word-break:keep-all}",
      ".sf-sub{margin:10px auto 0;max-width:30em;font-size:clamp(12.5px,3.4vw,15px);font-weight:600;line-height:1.6;color:rgba(20,48,61,.62);word-break:keep-all}",
      ".sf-when{display:inline-block;margin:16px 0 0;padding:9px 18px;border-radius:999px;background:#FDF0C4;border:1px solid rgba(214,178,74,.45);color:#6E5312;font-size:13px;font-weight:800}",
      ".sf-steps{display:grid;grid-template-columns:repeat(3,1fr);align-items:start;gap:0;margin:26px auto 0;max-width:420px}",
      ".sf-step{position:relative;display:grid;justify-items:center;gap:9px;font-size:12px;font-weight:800;color:rgba(20,48,61,.6)}",
      ".sf-dot{position:relative;z-index:2;width:26px;height:26px;border-radius:50%;background:#F7F1DF;border:2px solid rgba(20,48,61,.16)}",
      ".sf-step.done .sf-dot{background:#1F6B44;border-color:#1F6B44}.sf-step.done .sf-dot:after{content:'✓';color:white;font-size:15px;line-height:22px}",
      ".sf-step.now .sf-dot{background:#fff;border-color:#1F6B44}.sf-step.now .sf-dot:after{content:'';position:absolute;inset:5px;border-radius:50%;background:#F2C230}",
      ".sf-step:before{content:'';position:absolute;top:12px;left:-50%;width:100%;height:2px;background:rgba(20,48,61,.16)}.sf-step:first-child:before{display:none}.sf-step.done:before,.sf-step.now:before{background:#1F6B44}",

      ".finalBoard{margin:6px 0 2px;padding:clamp(14px,2.1vw,22px);border-radius:24px;background:#FBF6E9;border:1px solid rgba(20,48,61,.09);box-shadow:0 12px 28px rgba(20,48,61,.08);overflow:hidden}",
      ".finalBoardTitle{display:flex;align-items:center;justify-content:center;gap:10px;margin:0 0 18px;font-size:clamp(27px,4.4vw,42px);font-weight:900;letter-spacing:-.04em;color:#123A2E}",
      ".finalBoardTitle:before{content:'⛺';font-size:.78em}",

      ".winnerCard{position:relative;isolation:isolate;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(15px,2.4vw,28px);padding:clamp(20px,2.6vw,30px);margin-bottom:18px;border:3px solid #E7AA16;border-radius:22px;background:radial-gradient(circle at 17% 50%,rgba(255,211,79,.22),transparent 26%),linear-gradient(180deg,#FFFDF9 0%,#FFF8E2 100%);box-shadow:0 6px 0 rgba(210,151,8,.16),0 16px 30px rgba(167,116,10,.10);overflow:hidden}",
      ".winnerCard:before,.winnerCard:after{content:'✦';position:absolute;z-index:-1;color:#E7AA16;opacity:.46;font-size:28px}.winnerCard:before{right:3.2%;top:13%}.winnerCard:after{right:7%;top:25%;font-size:15px}",
      ".winnerBadge{display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;align-items:center;column-gap:9px;min-width:132px;color:#C78900}",
      ".winnerCrown{grid-row:1/3;display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFF4B2,#F7C83A 58%,#D99700);border:3px solid #E2A100;box-shadow:inset 0 2px 0 rgba(255,255,255,.8),0 5px 12px rgba(167,116,10,.18);font-size:29px;color:#805800}",
      ".winnerRank{align-self:end;font-size:clamp(28px,4.2vw,48px);line-height:.9;font-weight:900;color:#E5A400;white-space:nowrap}.winnerChampion{align-self:start;margin-top:6px;font-size:10px;font-weight:900;letter-spacing:.13em;color:#8E6811}",
      ".winnerTeam{font-size:clamp(50px,7.3vw,82px);font-weight:900;line-height:1;letter-spacing:-.05em;color:#0F4D37;text-align:left;text-shadow:0 2px 0 rgba(255,255,255,.9)}",
      ".winnerScore{text-align:right;min-width:0}.winnerScore small{display:block;margin-bottom:5px;font-size:clamp(12px,1.5vw,15px);font-weight:900;color:#164C38}.winnerScore strong{display:block;font-size:clamp(38px,5.8vw,66px);line-height:1;font-weight:900;letter-spacing:-.035em;color:#E5A400;white-space:nowrap}.winnerScore em{font-style:normal;font-size:.32em;color:#123A2E;margin-left:4px}",

      ".finalTableWrap{width:100%;overflow:visible;border-radius:18px;border:1px solid rgba(20,48,61,.10);background:#FFFDF8;box-shadow:0 5px 14px rgba(20,48,61,.04)}",
      ".finalTable{width:100%;min-width:0!important;table-layout:fixed;border-collapse:separate;border-spacing:0;color:#123A2E}",
      ".finalTable col.team{width:17%}.finalTable col.pledge{width:10.5%}.finalTable col.like{width:10.5%}.finalTable col.share{width:9%}.finalTable col.meme{width:13.5%}.finalTable col.vote{width:14%}.finalTable col.bonus{width:12%}.finalTable col.total{width:13.5%}",
      ".finalTable th{padding:12px 5px;background:linear-gradient(180deg,#175D43,#0E4936);color:#fff;font-size:clamp(9px,1.18vw,12px);font-weight:900;text-align:center;border-right:1px solid rgba(255,255,255,.17);line-height:1.2;word-break:keep-all;overflow-wrap:break-word}.finalTable th:first-child{border-radius:16px 0 0 0}.finalTable th:last-child{color:#FFD34F;border-right:0;border-radius:0 16px 0 0}.finalTable th small{display:block;margin-top:4px;font-size:clamp(8px,.96vw,10px);font-weight:700;line-height:1.2;opacity:.92}",
      ".finalTable td{height:64px;padding:11px 5px;text-align:center;border-right:1px solid rgba(20,48,61,.075);border-bottom:1px solid rgba(20,48,61,.075);background:#FFFDF8;font-size:clamp(10.5px,1.22vw,13px);font-weight:650;white-space:nowrap;letter-spacing:-.025em}.finalTable tr:last-child td{border-bottom:0}.finalTable td:last-child{border-right:0;font-size:clamp(17px,2vw,22px);font-weight:900;color:#0F4D37}.finalTable tbody tr:nth-child(even):not(.champion) td{background:#FCFAF4}",
      ".finalTable .teamCell{font-size:clamp(13px,1.7vw,18px);font-weight:900;white-space:normal;word-break:keep-all;line-height:1.15}.finalTable .totalCell{font-weight:900}",
      ".champTeam{display:flex;align-items:center;justify-content:center;gap:8px}.champMedal{position:relative;display:grid;place-items:center;flex:0 0 30px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFF4B2,#F7C83A 58%,#D99700);border:2px solid #D99B08;color:#795300;font-size:14px;font-weight:900;box-shadow:0 2px 5px rgba(167,116,10,.18)}.champMedal:before{content:'♛';position:absolute;top:-13px;font-size:15px;color:#E3A000}.champName{font-size:clamp(19px,2.4vw,28px);color:#0F4D37;letter-spacing:-.03em}",
      ".finalTable tr.champion td{height:72px;background:linear-gradient(180deg,#FFFDF7,#FFF8E3);font-size:clamp(11.5px,1.38vw,14px);font-weight:800;border-top:2px solid #E7AA16;border-bottom:2px solid #E7AA16}.finalTable tr.champion td:first-child{border-left:2px solid #E7AA16}.finalTable tr.champion td:last-child{border-right:2px solid #E7AA16;font-size:clamp(21px,2.5vw,28px);color:#0F4D37}.finalTable tr.champion .teamCell{background:radial-gradient(circle at 22% 50%,rgba(247,200,58,.18),transparent 42%),linear-gradient(180deg,#FFFDF7,#FFF8E3)}",

      "@media(max-width:900px) and (min-width:721px){.finalBoard{padding:13px}.winnerCard{padding:18px 16px;gap:14px}.winnerCrown{width:54px;height:54px;font-size:24px}.winnerBadge{min-width:112px}.finalTable th{padding-left:3px;padding-right:3px}.finalTable td{padding-left:3px;padding-right:3px}.champMedal{width:26px;height:26px;flex-basis:26px}.champTeam{gap:5px}}",

      "@media(max-width:720px){.finalBoard{padding:12px;border-radius:20px}.finalBoardTitle{font-size:28px;margin-bottom:14px}.winnerCard{grid-template-columns:1fr;text-align:center;gap:11px;padding:20px 14px}.winnerBadge{justify-self:center;min-width:0}.winnerCrown{width:58px;height:58px}.winnerTeam{text-align:center;font-size:clamp(48px,15vw,66px)}.winnerScore{text-align:center}.winnerScore strong{font-size:clamp(34px,10vw,48px)}.finalTableWrap{border:0;background:transparent;box-shadow:none}.finalTable,.finalTable tbody{display:block;width:100%}.finalTable colgroup,.finalTable thead{display:none}.finalTable tr{display:grid;grid-template-columns:1fr 1fr;margin:0 0 12px;border:1px solid rgba(20,48,61,.11);border-radius:16px;overflow:hidden;background:#FFFDF8;box-shadow:0 5px 12px rgba(20,48,61,.05)}.finalTable td{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:3px;width:auto!important;height:auto;min-height:58px;padding:9px 11px;border-right:1px solid rgba(20,48,61,.07);border-bottom:1px solid rgba(20,48,61,.07);font-size:13px;text-align:left;white-space:normal;background:#FFFDF8}.finalTable td:before{content:attr(data-label);font-size:9.5px;line-height:1.15;font-weight:850;color:rgba(20,48,61,.54)}.finalTable .teamCell{grid-column:1/-1;min-height:62px;display:flex;flex-direction:row;align-items:center;justify-content:center;border-right:0;font-size:20px;background:#F7F4EA}.finalTable .teamCell:before{display:none}.finalTable .totalCell{grid-column:1/-1;display:flex;flex-direction:row;align-items:center;justify-content:space-between;border-right:0;border-bottom:0;font-size:25px!important;text-align:right;color:#0F4D37}.finalTable .totalCell:before{font-size:11px;color:#8B6914}.finalTable tr.champion{border:2px solid #E7AA16;box-shadow:0 6px 16px rgba(167,116,10,.11)}.finalTable tr.champion td{height:auto;min-height:58px;border-top:0;border-bottom:1px solid rgba(231,170,22,.24);font-size:13px}.finalTable tr.champion td:first-child{border-left:0}.finalTable tr.champion td:last-child{border-right:0;border-bottom:0;font-size:27px!important}.finalTable tr.champion .teamCell{min-height:74px}.champName{font-size:28px}.champMedal{width:34px;height:34px;flex-basis:34px}}",
      "@media(max-width:390px){.finalTable td{padding:8px;font-size:12px}.winnerScore strong{font-size:32px}.finalBoardTitle{font-size:25px}}"
    ].join("\n");
    document.head.appendChild(st);
  }

  function prepBoard() {
    installStyle();
    var board = document.getElementById("scoreboard");
    if (!board) return null;
    board.classList.add("is-final");
    var banner = document.getElementById("voteBanner");
    if (banner) { banner.classList.add("is-final-hidden"); banner.hidden = true; }
    return board;
  }

  function renderTally() {
    if (currentMode === "tally") return;
    var board = prepBoard();
    if (!board) return;
    var t = T();
    var old = document.getElementById("scoreFinal");
    if (old) old.remove();
    var box = document.createElement("div");
    box.id = "scoreFinal";
    box.className = "sf";
    box.innerHTML = '<div class="sf-badge"><span class="sf-tent">⛺</span></div>' +
      '<h3 class="sf-head">' + t.tally + '</h3>' +
      '<p class="sf-sub">' + t.tallySub + '</p>' +
      '<span class="sf-when">' + t.closed + '</span>' +
      '<div class="sf-steps">' +
        '<div class="sf-step done"><span class="sf-dot"></span><span>' + t.s1 + '</span></div>' +
        '<div class="sf-step now"><span class="sf-dot"></span><span>' + t.s2 + '</span></div>' +
        '<div class="sf-step"><span class="sf-dot"></span><span>' + t.s3 + '</span></div>' +
      '</div>';
    var list = document.getElementById("scoreList");
    if (list && list.parentNode) list.parentNode.insertBefore(box, list); else board.appendChild(box);
    currentMode = "tally";
  }

  function header(label, sub) {
    return '<th>' + label + (sub ? '<small>' + sub + '</small>' : '') + '</th>';
  }

  function renderFinal() {
    if (currentMode === "final") return;
    var board = prepBoard();
    if (!board) return;
    var t = T();
    var old = document.getElementById("scoreFinal");
    if (old) old.remove();
    var box = document.createElement("div");
    box.id = "scoreFinal";
    box.className = "finalBoard";

    var rows = ROWS.map(function (r) {
      var team = r.rank === 1
        ? '<div class="champTeam"><span class="champMedal" aria-hidden="true">1</span><span class="champName">' + r.team + '</span></div>'
        : r.team;
      return '<tr class="' + (r.rank === 1 ? 'champion' : '') + '">' +
        '<td class="teamCell">' + team + '</td>' +
        '<td data-label="' + t.pledge + '">' + n(r.pledge) + '</td>' +
        '<td data-label="' + t.like + '">' + n(r.like) + '</td>' +
        '<td data-label="' + t.share + '">' + n(r.share) + '</td>' +
        '<td data-label="' + t.meme + '">' + n(r.meme) + '</td>' +
        '<td data-label="' + t.finalVote + '">' + n(r.finalVote) + '</td>' +
        '<td data-label="' + t.bonus + '">' + n(r.bonus) + '</td>' +
        '<td class="totalCell" data-label="' + t.total + '">' + n(r.total) + '</td>' +
      '</tr>';
    }).join('');

    box.innerHTML = '<h3 class="finalBoardTitle">' + t.title + '</h3>' +
      '<div class="winnerCard">' +
        '<div class="winnerBadge"><span class="winnerCrown" aria-hidden="true">♛</span><b class="winnerRank">' + t.first + '</b><small class="winnerChampion">' + t.champion + '</small></div>' +
        '<div class="winnerTeam">AHOF</div>' +
        '<div class="winnerScore"><small>' + t.winner + '</small><strong>' + n(23437972) + '<em>' + t.point + '</em></strong></div>' +
      '</div>' +
      '<div class="finalTableWrap"><table class="finalTable">' +
        '<colgroup><col class="team"><col class="pledge"><col class="like"><col class="share"><col class="meme"><col class="vote"><col class="bonus"><col class="total"></colgroup>' +
        '<thead><tr>' +
          header(t.team, '') + header(t.pledge, t.pledgeSub) + header(t.like, t.likeSub) + header(t.share, t.shareSub) +
          header(t.meme, t.memeSub) + header(t.finalVote, t.finalVoteSub) + header(t.bonus, t.bonusSub) + header(t.total, '') +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>';

    var list = document.getElementById("scoreList");
    if (list && list.parentNode) list.parentNode.insertBefore(box, list); else board.appendChild(box);
    currentMode = "final";
  }

  function nowMs() { return Date.now() + serverOffset; }
  function renderByTime() {
    if (nowMs() >= REVEAL_AT) renderFinal(); else renderTally();
  }
  function scheduleReveal() {
    if (timer) clearTimeout(timer);
    var delay = REVEAL_AT - nowMs();
    if (delay <= 0) { renderFinal(); return; }
    timer = setTimeout(function () { renderFinal(); }, Math.min(delay + 50, 2147483647));
  }

  function syncClock() {
    if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) {
      renderByTime(); scheduleReveal(); return Promise.resolve();
    }
    return fetch(CFG.supabaseUrl + "/rest/v1/camp_exit_settings?select=id&id=eq.1&limit=1", {
      headers: { apikey: CFG.supabaseAnonKey, Authorization: "Bearer " + CFG.supabaseAnonKey }, cache: "no-store"
    }).then(function (r) {
      var dh = r.headers.get("date");
      if (dh) {
        var ms = Date.parse(dh);
        if (isFinite(ms)) serverOffset = ms - Date.now();
      }
    }).catch(function () {}).then(function () { renderByTime(); scheduleReveal(); });
  }

  function boot() {
    renderByTime();
    syncClock();
    setInterval(function () { if (!document.hidden) syncClock(); }, 60000);
    new MutationObserver(function () {
      currentMode = "";
      renderByTime();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();