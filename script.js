(() => {
  "use strict";

  /* ==================== CONFIG ==================== */

  const DIFFS = {
    easy:    { words: 50,  time: 90, label: "Easy" },
    medium:  { words: 100, time: 60, label: "Medium" },
    hard:    { words: 200, time: 45, label: "Hard" },
    timed15: { words: 60,  time: 15, label: "15s" },
    timed30: { words: 100, time: 30, label: "30s" },
    timed60: { words: 150, time: 60, label: "60s" },
    practice:{ words: 120, time: 0,  label: "Practice" },
    daily:   { words: 80,  time: 90, label: "Daily" },
  };
  const QUOTABLE_TAGS = { tech:"technology", nature:"science", motivation:"inspirational", lifestyle:"life" };

  const FALLBACK = [
    {t:"The quick brown fox jumps over the lazy dog. Practice makes perfect, so keep your fingers moving across the keys. Typing well is about rhythm, focus, and simple repetition. Slow and steady wins the race.", tags:["lifestyle"]},
    {t:"Coding is a superpower that anyone can learn. Every great programmer once typed their first line of code, so do not be afraid to make mistakes along the way. Start small and build confidence with every single step.", tags:["tech"]},
    {t:"The sun rose over the mountains and painted the sky in shades of gold and pink. A gentle breeze carried the smell of fresh pine through the quiet valley. It was a morning made for slow walks and deep thoughts.", tags:["nature"]},
    {t:"Drinking enough water keeps your body and your mind sharp. A short walk after lunch can boost your energy for the whole afternoon. Small healthy habits, repeated daily, create big changes over time.", tags:["lifestyle"]},
    {t:"The library is quietest in the early morning. Rows of books stretch out like silent streets, each one holding a story waiting to be discovered. A single page can open a door to another world entirely.", tags:["motivation"]},
    {t:"Music has a way of changing how we feel in an instant. A happy tune can lift a heavy mood, and a slow melody can help us unwind after a long day. It speaks without words and is understood by everyone.", tags:["motivation","lifestyle"]},
    {t:"The old train station still smells of coffee and rain. Travelers hurry past with tickets in hand, chasing departures and arrivals. Every platform holds the promise of somewhere new, somewhere worth going.", tags:["lifestyle"]},
    {t:"Learning a new language opens a window to another culture. You begin to see how people think, joke, and dream in words you once could not understand. Every new phrase is a small step into a bigger world.", tags:["motivation"]},
    {t:"Learning to type quickly is a valuable skill in the modern world. It saves time, reduces fatigue, and lets your ideas flow directly onto the screen. The key is to practice regularly and build muscle memory one letter at a time, keeping your eyes focused on the text rather than the keyboard. Before long your fingers will know exactly where every key lives. Accuracy comes before speed, and with patient repetition you will notice steady progress in just a few short weeks of daily practice.", tags:["tech","motivation"]},
    {t:"A calm mind writes better code. When you are not rushing, you make fewer errors and enjoy the work much more. Set your own comfortable pace, take a breath between words, and let the sentences flow naturally from your thoughts to the page one careful keystroke at a time. Typing is not a race against anyone but yourself. Compare your scores with your own past results, celebrate small improvements, and keep the habit light and consistent. That steady rhythm is exactly what turns you into a confident and productive writer.", tags:["tech","motivation"]},
    {t:"The deep ocean covers more than seventy percent of our planet, yet we have explored only a tiny fraction of it. Strange creatures with glowing bodies drift through water so dark that sunlight can never reach them. Scientists are just beginning to understand how life survives under that crushing pressure. What we learn there may reshape our understanding of biology for years to come.", tags:["nature"]},
    {t:"Great ideas rarely arrive fully finished. They begin as rough sketches, ordinary thoughts, or happy accidents that someone refused to give up on. Inventors test a hundred failed attempts before one of them finally works. Progress is not a straight line but a winding road full of detours and redraws. Patience and curiosity are the real engines of discovery.", tags:["motivation","tech"]},
    {t:"Rain on the window makes the world feel smaller and safer. Steam rises from a mug of tea while the radio plays an old song in the background. Some of the best hours are spent doing nothing in particular. There is value in stillness that a busy calendar cannot measure.", tags:["lifestyle"]},
    {t:"Photography taught me to notice the world differently. Light suddenly matters, shadows become characters, and a single face can tell a story worth a thousand pages. The camera only records what the eye already saw, so you learn to look twice at every moment. Beauty hides in the most ordinary places.", tags:["motivation","nature"]},
    {t:"The chessboard is a tiny universe with its own rules of battle. Every move is a question, and every opponent gives back an answer. Beginners focus on their own pieces, while masters think about the whole board at once. With practice you begin to think several moves ahead, turning simple games into subtle conversations.", tags:["motivation"]},
    {t:"Cities at night have a heartbeat all their own. Streetlights hum, late buses glide past, and windows flicker with the blue glow of screens. The same streets that bustle by day grow quiet and mysterious after midnight, inviting wanderers to see them from a different angle.", tags:["lifestyle"]},
    {t:"Typing at a high speed is not magic; it is the result of disciplined practice and deliberate attention to how your hands move. Skilled typists do not look at their hands because their fingers remember where every key lives. They focus on accuracy first, and speed follows naturally. Start slowly, master the home row, then gently push your limits. Keep your back straight, your wrists relaxed, and your eyes on the source text while your fingers do the work. Eventually the keyboard will feel like an extension of your own hands. Set daily goals, track your words per minute, and review the words that trip you up so the next session is even smoother. Before long you will type entire pages without breaking your rhythm, all because you built the habit one session at a time with patience and consistency rather than rushing to the finish line.", tags:["tech","motivation"]},
    {t:"History is not a simple list of dates and names; it is a tangled web of choices, accidents, and stubborn personalities. The same invention that transformed a nation might have been quietly shelved in another. We read about kings and generals, but the quiet decisions of ordinary people shaped the world just as deeply. Understanding the past means asking why things happened, not just what happened, and accepting that most answers come with more questions.", tags:["nature"]},
    {t:"Space is vast beyond comfortable imagination. The nearest star is four light years away, and the galaxy we call home holds hundreds of billions of others. Every spec of dust on a distant moon is a clue about how planets form and how life might begin elsewhere. A telescope pointed at the night sky is really a time machine, because the light we catch has traveled for millions of years to reach our eyes. This perspective is humbling, but it is also liberating.", tags:["nature"]},
    {t:"Writing well begins with thinking clearly. Before a single sentence is written, the author must decide what matters and what fades into the background. Strong writing removes the unnecessary so the essential can breathe. Every paragraph should move the reader forward, and every word should earn its place on the page. Rewriting is where the real craft happens, turning a rough first draft into something crisp and alive.", tags:["motivation"]},
    {t:"The forest does not hurry. A single oak tree may spend a century reaching toward the sky, growing only a few centimeters in a good year. Mushrooms appear overnight and vanish the next, while the deep roots below hold conversations with the soil and the fungi around them. Everything in the forest is connected in ways that are easy to miss from the trail. Nature teaches patience that great things are built slowly, above and below the surface at the same time.", tags:["nature","lifestyle"]},
    {t:"Cooking is chemistry you can taste. Flour, water, heat, and time combine into bread, while a little sugar turns cream into caramel. The great chefs are really curious experimenters who learn from every burned pan and every golden rise. Recipes are not rigid laws but starting points for your own improvisation. The best meals have stories behind them, stories of substitutions, mistakes, and perfect accidents that no one could reproduce twice.", tags:["lifestyle","nature"]},
  ];

  const QUOTES = [
    {t:"The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle.", tags:["motivation","tech"]},
    {t:"In three words I can sum up everything I have learned about life: it goes on.", tags:["motivation"]},
    {t:"Be yourself; everyone else is already taken.", tags:["motivation"]},
    {t:"If you tell the truth you do not need to remember anything.", tags:["motivation","lifestyle"]},
    {t:"Two things are infinite: the universe and human stupidity; and I am not sure about the universe.", tags:["nature"]},
    {t:"The only impossible journey is the one you never begin.", tags:["motivation"]},
    {t:"Code is like humor. When you have to explain it, it is bad.", tags:["tech"]},
    {t:"First solve the problem then write the code.", tags:["tech"]},
    {t:"The best time to plant a tree was twenty years ago. The second best time is now.", tags:["motivation","nature"]},
    {t:"What you get by achieving your goals is not as important as what you become by achieving your goals.", tags:["motivation"]},
    {t:"Simplicity is the soul of efficiency.", tags:["tech","lifestyle"]},
    {t:"It is during our darkest moments that we must focus to see the light.", tags:["motivation"]},
    {t:"The only limit to our realization of tomorrow is our doubts of today.", tags:["motivation"]},
    {t:"Talk is cheap. Show me the code.", tags:["tech"]},
    {t:"Innovation distinguishes between a leader and a follower.", tags:["tech","motivation"]},
    {t:"Stay hungry. Stay foolish.", tags:["motivation"]},
  ];

  const ARABIC = [
    "Ã˜Â§Ã™â€žÃ™â€žÃ˜ÂºÃ˜Â© Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â±Ã˜Â¨Ã™Å Ã˜Â© Ã™â€¦Ã™â€  Ã˜Â£Ã™â€šÃ˜Â¯Ã™â€¦ Ã˜Â§Ã™â€žÃ™â€žÃ˜ÂºÃ˜Â§Ã˜Âª Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â®. Ã™â€žÃ™â€¡Ã˜Â§ Ã™â€šÃ™Ë†Ã˜Â§Ã˜Â¹Ã˜Â¯ Ã™â€šÃ™Ë†Ã™Å Ã˜Â© Ã™Ë†Ã˜Â£Ã˜Â¯Ã˜Â¨ Ã˜ÂºÃ™â€ Ã™Å  Ã˜ÂªÃ˜Â·Ã™Ë†Ã˜Â± Ã˜Â¹Ã˜Â¨Ã˜Â± Ã˜Â§Ã™â€žÃ™â€šÃ˜Â±Ã™Ë†Ã™â€ . Ã™Å Ã˜ÂªÃ˜Â­Ã˜Â¯Ã˜Â« Ã˜Â¨Ã™â€¡Ã˜Â§ Ã˜Â§Ã™â€žÃ™â€¦Ã™â€žÃ˜Â§Ã™Å Ã™Å Ã™â€  Ã˜Â­Ã™Ë†Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â§Ã™â€žÃ™â€¦.",
    "Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€žÃ™â€¦ Ã™â€ Ã™Ë†Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€žÃ˜Â¬Ã™â€¡Ã™â€ž Ã˜Â¸Ã™â€žÃ˜Â§Ã™â€¦. Ã™Æ’Ã™â€ž Ã˜Â³Ã˜Â·Ã˜Â± Ã™ÂÃ™Å  Ã™Æ’Ã˜ÂªÃ˜Â§Ã˜Â¨ Ã™â€¡Ã™Ë† Ã˜Â¨Ã˜Â§Ã˜Â¨ Ã™â€žÃ™â€¦Ã˜Â¹Ã˜Â±Ã™ÂÃ˜Â© Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯Ã˜Â©. Ã˜Â§Ã™â€žÃ™â€šÃ˜Â±Ã˜Â§Ã˜Â¡Ã˜Â© Ã˜ÂªÃ™ÂÃ˜ÂªÃ˜Â­ Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€šÃ™â€ž Ã™Ë†Ã˜ÂªÃ™Ë†Ã˜Â³Ã˜Â¹ Ã˜Â§Ã™â€žÃ˜Â£Ã™ÂÃ™â€š.",
  ];

  const STORAGE = {
    scores: "typingBlitz.scores.v1",
    profile: "typingBlitz.profile",
    settings: "typingBlitz.settings",
    history: "typingBlitz.history.v1",
    streak: "typingBlitz.streak.v1",
    lbUri: "typingBlitz.lb.uri",
  };

  /* ==================== HELPERS ==================== */

  const $ = (id) => document.getElementById(id);
  function normalize(t) { return (t||"").replace(/\s+/g," ").replace(/[""]/g,'"').replace(/['']/g,"'").trim(); }

  function seedHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function todayKey() { return new Date().toISOString().slice(0,10); }

  function enrichSymbols(text) {
    const sym = ".,!?;:@#$%&*0123456789";
    return text.split("").map((ch) => {
      if (ch !== " " || Math.random() > 0.07) return ch;
      return " " + sym[Math.floor(Math.random() * sym.length)];
    }).join("");
  }

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  /* ==================== SOUND ==================== */

  let audioCtx;
  function getAudio() { return audioCtx || (audioCtx = new AudioContext()); }
  function playTone(freq, dur, type = "sine", vol = 0.04) {
    if (!state.sound) return;
    try {
      const c = getAudio();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = vol;
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      osc.connect(gain).connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + dur);
    } catch {}
  }
  function soundOk()     { playTone(680, 0.04, "triangle", 0.035); }
  function soundError()  { playTone(180, 0.10, "square", 0.04); }
  function soundDone()   { [523,659,784].forEach((f,i) => setTimeout(() => playTone(f, 0.18, "sine", 0.04), i * 90)); }

  /* ==================== DOM ==================== */

  const el = {
    para: $("paragraph"), input: $("hidden-input"), hint: $("hint"), loader: $("loader"),
    timer: $("stat-timer"), wpm: $("stat-wpm"), wps: $("stat-wps"), acc: $("stat-acc"),
    progFill: $("progress-fill"), prog: $("progress"), progLabel: $("progress-label"),
    ghost: $("ghost"),
    mTitle: $("modal-title"), mWpm: $("m-wpm"), mWps: $("m-wps"), mAcc: $("m-acc"), mTime: $("m-time"),
    resultModal: $("result-modal"),
    mNote: $("m-note"), heatmap: $("heatmap"), heatmapBody: $("heatmap-body"),
    ghostResult: $("ghost-result"),
    shareBtn: $("share-btn"),
    history: $("history-btn"), streakBadge: $("streak-badge"), streakVal: $("streak-val"),
    scoreModal: $("scores-modal"), histModal: $("history-modal"), profileModal: $("profile-modal"),
    customModal: $("custom-modal"), customInput: $("custom-input"), profileInput: $("profile-input"),
    onlineNote: $("online-note"), chart: $("chart"), chartEmpty: $("chart-empty"),
    sEasy: $("scores-easy"), sMedium: $("scores-medium"), sHard: $("scores-hard"), sTimed: $("scores-timed"),
    msEasy: $("modal-scores-easy"), msMedium: $("modal-scores-medium"),
    msHard: $("modal-scores-hard"), msTimed: $("modal-scores-timed"),
  };

  /* ==================== STATE ==================== */

  const state = {
    diff: "easy", mode: "paragraph", theme: "mixed", layout: "qwerty",
    text: "", chars: [], charEls: [], words: [], index: 0, keystrokes: 0, errors: 0, errKeys: {},
    strict: false, symbols: false, ghost: false, sound: true, a11y: false,
    startedAt: null, ended: false, timeLeft: 0, timerId: null, loading: false,
    customText: null,
    ghostIndex: 0, ghostWpm: 0, lastStartWpm: 40,
    profile: loadJSON(STORAGE.profile, {name:""}),
    history: loadJSON(STORAGE.history, []),
    streak: loadJSON(STORAGE.streak, { last:"", count:0 }),
  };

  /* ==================== ONLINE LEADERBOARD ==================== */

  let lbOnline = null;
  async function loadOnlineScores() {
    const uri = loadJSON(STORAGE.lbUri, null);
    if (!uri) { el.onlineNote.textContent = "No online store yet Ã¢â‚¬â€ scores will appear after your first upload."; el.onlineNote.hidden = false; return null; }
    try { const r = await Promise.race([fetch(uri), new Promise((_,re)=>setTimeout(()=>re(new Error("timeout")),5000))]); const d = await r.json(); return d; }
    catch { el.onlineNote.textContent = "Offline Ã¢â‚¬â€ could not reach leaderboard."; el.onlineNote.hidden = false; return null; }
  }
  async function uploadScores() {
    const local = loadJSON(STORAGE.scores, {});
    const flat = Object.entries(local).flatMap(([diff,list]) => list.map(s => ({...s, diff}))).sort((a,b)=>b.wpm-a.wpm);
    const payload = { scores: flat.slice(0,30), name: state.profile.name || "anon" };
    try {
      const existing = loadJSON(STORAGE.lbUri, null);
      if (existing) {
        await fetch(existing, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      } else {
        const r = await fetch("https://api.jsonstorage.net/v1/json", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload) });
        if (r.ok) { const d = await r.json(); saveJSON(STORAGE.lbUri, d.uri); }
      }
    } catch {}
  }

  /* ==================== SCORES ==================== */

  function scoreItem(s, i) {
    const li = document.createElement("li");
    const nm = state.profile.name ? `<span class="score-name">${state.profile.name}</span>` : "";
    li.innerHTML = `<span>${nm}${s.wpm} wpm &middot; ${s.accuracy}% &middot; ${s.time}s</span><span class="score-wpm">${s.wpm} wpm</span>`;
    if (i === 0) li.style.color = "var(--correct)";
    return li;
  }
  function renderScores() {
    const scores = loadJSON(STORAGE.scores, {});
    for (const [key, ol] of [["easy",el.sEasy],["medium",el.sMedium],["hard",el.sHard],["timed",el.sTimed]]) {
      const list = scores[key] || [];
      ol.innerHTML = "";
      if (!list.length) { const li = document.createElement("li"); li.className="empty"; li.textContent="No scores yet"; ol.append(li); }
      else list.slice(0,5).forEach((s,i) => ol.append(scoreItem(s,i)));
    }
    ["easy","medium","hard","timed"].forEach(key => {
      const ol = $(`modal-scores-${key}`);
      const list = scores[key] || [];
      ol.innerHTML = "";
      if (!list.length) { const li = document.createElement("li"); li.className="empty"; li.textContent="No scores yet"; ol.append(li); }
      else list.slice(0,10).forEach((s,i) => ol.append(scoreItem(s,i)));
    });
  }
  function saveScore(diff, entry) {
    const scores = loadJSON(STORAGE.scores, {});
    scores[diff] = scores[diff] || [];
    scores[diff].push(entry);
    scores[diff].sort((a,b)=>b.wpm-a.wpm || b.accuracy-a.accuracy);
    scores[diff] = scores[diff].slice(0,10);
    saveJSON(STORAGE.scores, scores);
    renderScores();
  }

  /* ==================== HISTORY ==================== */

  function addHistory(entry) {
    state.history.push(entry);
    if (state.history.length > 50) state.history.shift();
    saveJSON(STORAGE.history, state.history);
  }
  function renderChart() {
    const items = state.history.slice(-20);
    el.chart.innerHTML = "";
    if (!items.length) { el.chart.style.display="none"; el.chartEmpty.style.display=""; return; }
    el.chart.style.display=""; el.chartEmpty.style.display="none";
    items.forEach(h => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${Math.min(100, (h.wpm/130)*100)}%`;
      bar.title = `${h.date?.slice(5) || "?"} Ã¢â‚¬â€ ${h.wpm} WPM (${h.acc}% acc)`;
      el.chart.append(bar);
    });
  }

  /* ==================== STREAK ==================== */

  function updateStreak(completed) {
    const s = state.streak;
    const today = todayKey();
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    if (!completed) {
      if (s.last === today || s.last === yesterday) { showStreak(); return; }
      s.count = 0; showStreak(); return;
    }
    if (s.last === today) { showStreak(); return; }
    s.count = (s.last === yesterday) ? s.count + 1 : 1;
    s.last = today;
    saveJSON(STORAGE.streak, s);
    showStreak();
  }
  function showStreak() {
    const n = state.streak.count;
    el.streakBadge.hidden = n < 1;
    el.streakVal.textContent = n;
  }

  /* ==================== TEXT LOADING ==================== */

  function showLoader(on) { el.loader.classList.toggle("hidden",!on); el.hint.classList.toggle("hidden",on); }

  function filterPool(pool, theme) {
    let arr = theme === "mixed" ? [...pool] : pool.filter(p => p.tags.includes(theme));
    if (!arr.length) arr = [...pool];
    return arr;
  }

  function pickText(theme, wordTarget) {
    const pool = filterPool(FALLBACK, theme);
    const best = pool.reduce((a,b) => Math.abs(a.t.split(/\s+/).length - wordTarget) < Math.abs(b.t.split(/\s+/).length - wordTarget) ? a : b);
    return best.t;
  }

  async function fetchParagraph(theme, words) {
    const minC = Math.round(words*4.5), maxC = Math.round(words*8);
    const tag = QUOTABLE_TAGS[theme];
    const params = new URLSearchParams({minLength:String(minC), maxLength:String(maxC)});
    if (tag) params.set("tags", tag);
    try {
      const r = await Promise.race([
        fetch(`https://api.quotable.io/random?${params}`),
        new Promise((_,re)=>setTimeout(()=>re(new Error("t")),3000))
      ]);
      if (!r.ok) throw 0;
      const d = await r.json();
      return normalize(d.content);
    } catch { return pickText(theme, words); }
  }

  async function fetchQuote(theme) {
    try {
      const params = {minLength:"30", maxLength:"300"};
      const tag = QUOTABLE_TAGS[theme];
      if (tag) params.tags = tag;
      const qs = new URLSearchParams(params);
      const r = await Promise.race([
        fetch(`https://api.quotable.io/random?${qs}`),
        new Promise((_,re)=>setTimeout(()=>re(new Error("t")),3000))
      ]);
      if (!r.ok) throw 0;
      const d = await r.json();
      return normalize(d.content);
    } catch {
      const pool = filterPool(QUOTES, theme);
      return pool[Math.floor(Math.random()*pool.length)].t;
    }
  }

  function loadText() {
    if (state.loading) return;
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null; state.index = 0; state.keystrokes = 0; state.errors = 0;
    state.errKeys = {}; state.startedAt = null; state.ended = false; state.customText = null;
    state.ghostIndex = 0; el.ghost.hidden = true;
    el.input.value = ""; el.resultModal.hidden = true;
    el.prog.setAttribute("aria-valuenow","0");
    state.loading = true; showLoader(true);
    const theme = state.theme;
    const isQuote = state.mode === "quotes";
    const diff = DIFFS[state.diff];
    const wordCount = state.diff === "daily" ? DIFFS.easy.words : diff.words;

    if (state.layout === "arabic") {
      state.text = ARABIC[Math.floor(Math.random()*ARABIC.length)];
      state.loading = false; renderParagraph(state.text); showLoader(false); el.para.setAttribute("dir","rtl"); focusInput(); return;
    }
    (isQuote ? fetchQuote(theme) : fetchParagraph(theme, wordCount)).then(raw => {
      state.text = state.symbols ? enrichSymbols(raw) : raw;
      state.loading = false; renderParagraph(state.text); showLoader(false);
      el.para.setAttribute("dir", "ltr");
      el.hint.textContent = "Click the box or press any key to start typing â€¦";
      el.para.scrollTop = 0; focusInput();
    }).catch(() => {});
  }

  /* ==================== RENDER ==================== */

  function renderParagraph(text) {
    el.para.innerHTML = "";
    state.chars = text.split("");
    state.charEls = [];
    let wordStart = 0;
    state.words = [];
    state.chars.forEach((ch, i) => {
      if (ch === " " || i === state.chars.length - 1) {
        const end = i === state.chars.length - 1 ? i : i;
        state.words.push({s: wordStart, e: end});
        if (ch === " ") wordStart = i + 1;
      }
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.para.append(span);
      state.charEls.push(span);
    });
    el.para.setAttribute("aria-label", text);
    updateChar(); updateStats(); updateWord();
  }

  function updateChar() {
    state.charEls.forEach((s,i) => {
      s.classList.toggle("current", i === state.index);
      if (i === state.index && state.strict) s.classList.add("strict-fail");
    });
    const c = state.charEls[state.index];
    if (c) scrollCaretIntoView(c);
  }

  function updateWord() {
    state.charEls.forEach(s => s.classList.remove("current-word"));
    const word = state.words.find(w => state.index >= w.s && state.index <= w.e);
    if (!word) return;
    for (let i = word.s; i <= word.e; i++) if (state.charEls[i]) state.charEls[i].classList.add("current-word");
  }

  function scrollCaretIntoView(caret) {
    const p = el.para.parentElement;
    const h = 34;
    if (caret.offsetTop < p.scrollTop + 4) p.scrollTop = caret.offsetTop - h;
    else if (caret.offsetTop + h > p.scrollTop + p.clientHeight - 4) p.scrollTop = caret.offsetTop + h - p.clientHeight + 4;
  }

  /* ==================== TIMER ==================== */

  function startTimer() {
    state.startedAt = Date.now();
    state.timeLeft = DIFFS[state.diff].time;
    if (state.diff === "practice") { updateTimerDisplay(); return; }
    state.timerId = setInterval(() => {
      if (state.diff === "practice") { updateTimerDisplay(); return; }
      state.timeLeft = DIFFS[state.diff].time - (Date.now() - state.startedAt) / 1000;
      if (state.timeLeft <= 0) { state.timeLeft = 0; updateTimerDisplay(); finish(); }
      else updateTimerDisplay();
    }, 120);
  }
  function elapsedSec() { return state.startedAt ? (Date.now() - state.startedAt) / 1000 : 0; }
  function updateTimerDisplay() {
    if (state.diff === "practice") { el.timer.textContent = `${elapsedSec().toFixed(1)}s`; return; }
    el.timer.textContent = state.startedAt ? `${Math.max(0,state.timeLeft).toFixed(1)}s` : "0.0s";
  }

  /* ==================== STATS ==================== */

  function updateStats() {
    const secs = elapsedSec();
    const correctTyped = Math.max(0, state.index - state.errors);
    const words = correctTyped / 5;
    const wpm = secs > 0 ? Math.round((words/secs)*60) : 0;
    const wps = secs > 0 ? words/secs : 0;
    el.wpm.textContent = String(wpm);
    el.wps.textContent = wps.toFixed(2);
    const acc = state.keystrokes > 0 ? Math.max(0, ((state.keystrokes-state.errors)/state.keystrokes)*100) : 100;
    el.acc.textContent = `${acc.toFixed(1)}%`;
    const pct = state.chars.length ? Math.min(100,(state.index/state.chars.length)*100) : 0;
    el.progFill.style.width = `${pct}%`;
    el.prog.setAttribute("aria-valuenow", String(Math.round(pct)));
    el.progLabel.textContent = state.diff === "practice"
      ? `${state.index}/${state.chars.length} chars`
      : `Ã°Å¸â€œÅ  Progress`;
    if (state.ghost && state.startedAt) updateGhost(wpm);
  }

  /* ==================== GHOST ==================== */

  function updateGhost(currentWpm) {
    if (!state.startedAt || state.ended) return;
    state.ghostWpm = Math.max(15, state.lastStartWpm * 0.85);
    const elapsed = elapsedSec();
    const ghostChars = Math.floor(state.ghostWpm * 5 / 60 * elapsed);
    state.ghostIndex = Math.min(ghostChars, state.chars.length - 1);
    const c = state.charEls[state.ghostIndex];
    if (!c) return;
    el.ghost.hidden = false;
    el.ghost.style.left = c.offsetLeft + "px";
    el.ghost.style.top = (c.offsetTop - 18) + "px";
    requestAnimationFrame(() => updateGhost(currentWpm));
  }

  /* ==================== GAME LOGIC ==================== */

  function handleChar(key) {
    if (state.ended || state.loading || !state.chars.length) return;
    if (!state.startedAt) { startTimer(); if (state.ghost) requestAnimationFrame(()=>updateGhost(0)); }
    const expected = state.chars[state.index];
    state.keystrokes++;
    if (key === expected) {
      state.charEls[state.index].classList.add("correct");
      soundOk();
      state.index++;
    } else {
      state.charEls[state.index].classList.add("incorrect");
      state.errors++;
      state.errKeys[key] = (state.errKeys[key]||0) + 1;
      soundError();
      if (!state.strict) state.index++;
      else { /* strict: stay on current char */ state.keystrokes--; }
    }
    updateStats(); updateChar(); updateWord();
    if (state.index >= state.chars.length) finish();
  }

  function handleBackspace() {
    if (state.ended || state.loading || state.index <= 0) return;
    state.index--;
    state.charEls[state.index].classList.remove("correct","incorrect");
    updateStats(); updateChar(); updateWord();
  }

  function finish() {
    if (state.ended) return;
    state.ended = true;
    if (state.timerId) clearInterval(state.timerId);
    const secs = elapsedSec();
    const correctTyped = Math.max(0, state.index - state.errors);
    const words = correctTyped / 5;
    const wpm = secs > 0 ? Math.round((words/secs)*60) : 0;
    const wps = secs > 0 ? words/secs : 0;
    const acc = state.keystrokes > 0 ? Math.round(((state.keystrokes-state.errors)/state.keystrokes)*100) : 100;
    const timeStr = secs.toFixed(1);
    const finished = state.index >= state.chars.length;
    const isPractice = state.diff === "practice";
    const bucket = ["timed15","timed30","timed60"].includes(state.diff) ? "timed" : state.diff;
    const label = DIFFS[state.diff].label;

    el.mWpm.textContent = String(wpm);
    el.mWps.textContent = wps.toFixed(2);
    el.mAcc.textContent = `${acc}%`;
    el.mTime.textContent = `${timeStr}s`;
    el.mNote.textContent = finished
      ? `You completed the paragraph (${label} mode).`
      : isPractice ? `Finished! You typed ${Math.round((state.index/state.chars.length)*100)}% of the text.`
      : `Time's up! You reached ${Math.round((state.index/state.chars.length)*100)}% of the text.`;

    // Heatmap
    const entries = Object.entries(state.errKeys).sort((a,b)=>b[1]-a[1]).slice(0,5);
    if (entries.length) {
      el.heatmap.hidden = false;
      el.heatmapBody.textContent = entries.map(([k,c])=>`"${k}" Ãƒâ€”${c}`).join("  ");
    } else { el.heatmap.hidden = true; }

    // Ghost result
    if (state.ghost && state.startedAt) {
      el.ghostResult.hidden = false;
      el.ghostResult.textContent = state.index >= state.ghostIndex
        ? `Ã°Å¸Å½â€° You beat the ghost! (You: index ${state.index}, Ghost: index ${state.ghostIndex})`
        : `Ã°Å¸â€˜Â» The ghost beat you. (You: index ${state.index}, Ghost: index ${state.ghostIndex})`;
    } else { el.ghostResult.hidden = true; }

    el.resultModal.hidden = false;
    if (wpm > 0 || finished) {
      saveScore(bucket, { wpm, wps: Number(wps.toFixed(2)), accuracy: acc, time: Number(timeStr), at: Date.now() });
    }
    addHistory({ wpm, acc, diff: bucket, mode: state.mode, theme: state.theme, date: todayKey() });
    if (state.diff === "daily" || bucket === "easy" || bucket === "medium" || bucket === "hard") updateStreak(finished);
    uploadScores();
    soundDone();
    updateStats();
  }

  function focusInput() { el.input.focus(); }

  /* ==================== SHARE ==================== */

  function shareText() {
    const b = ["timed15","timed30","timed60"].includes(state.diff) ? "timed" : state.diff;
    return `Ã¢Å’Â¨Ã¯Â¸Â Typing Blitz Ã¢â‚¬â€ ${DIFFS[state.diff].label}\nÃ¢Å¡Â¡ WPM: ${el.wpm.textContent} | Ã°Å¸Å¡â‚¬ WPS: ${el.wps.textContent} | Ã°Å¸Å½Â¯ Acc: ${el.acc.textContent} | Ã¢ÂÂ± ${el.timer.textContent}\n#TypingBlitz`;
  }

  /* ==================== EVENTS ==================== */

  function onKey(e) {
    if (state.loading || !el.scoreModal.hidden || !el.histModal.hidden || !el.profileModal.hidden || !el.customModal.hidden) return;
    if (e.key === "Backspace") { e.preventDefault(); handleBackspace(); return; }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); handleChar(e.key); }
  }
  document.addEventListener("keydown", onKey);
    el.para.addEventListener("click", focusInput);
  el.input.addEventListener("click", focusInput);
  
  // Diff buttons
  document.querySelectorAll(".diff-btn").forEach(btn => btn.addEventListener("click", () => {
    if (state.loading) return;
    document.querySelectorAll(".diff-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    state.diff = btn.dataset.diff;
    state.customText = null;
    loadText();
  }));
  
  // Mode buttons
  document.querySelectorAll(".mode-btn[data-mode]").forEach(btn => btn.addEventListener("click", () => {
    if (state.loading) return;
    document.querySelectorAll(".mode-btn[data-mode]").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    state.mode = btn.dataset.mode;
    loadText();
  }));
  
  $("theme").addEventListener("change", e => { state.theme = e.target.value; loadText(); });
  $("layout").addEventListener("change", e => { state.layout = e.target.value; loadText(); });

  $("opt-symbols").addEventListener("change", e => { state.symbols = e.target.checked; loadText(); });
  $("opt-strict").addEventListener("change", e => { state.strict = e.target.checked; });
  $("opt-ghost").addEventListener("change", e => { state.ghost = e.target.checked; el.ghost.hidden = !e.target.checked; });
  
  $("sound-btn").addEventListener("click", () => { state.sound = !state.sound; $("sound-btn").textContent = state.sound ? "Ã°Å¸â€Å " : "Ã°Å¸â€â€¡"; });
  $("a11y-btn").addEventListener("click", () => {
    state.a11y = !state.a11y;
    document.body.classList.toggle("a11y", state.a11y);
    document.body.classList.toggle("a11y-high-contrast", state.a11y);
  });

  $("new-text-btn").addEventListener("click", () => { if (!state.loading) loadText(); });
  $("retry-btn").addEventListener("click", () => { if (!state.loading) { resetText(); } });

  function resetText() {
    if (state.timerId) clearInterval(state.timerId);
    state.index = 0; state.keystrokes = 0; state.errors = 0; state.errKeys = {};
    state.startedAt = null; state.ended = false; state.ghostIndex = 0; el.ghost.hidden = true;
    el.input.value = ""; el.resultModal.hidden = true;
    renderParagraph(state.text); focusInput();
  }

  $("modal-retry").addEventListener("click", () => { resetText(); });
  $("modal-new").addEventListener("click", () => { el.resultModal.hidden = true; loadText(); });
  $("share-btn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(shareText()); $("share-btn").textContent = "Ã¢Å“â€œ Copied!"; setTimeout(()=>$("share-btn").textContent = "Ã°Å¸â€œâ€¹ Share Result", 1200); }
    catch { $("share-btn").textContent = "Ã¢Å“â€¢ Failed"; }
  });

  // Scores
  $("scores-btn").addEventListener("click", () => { renderScores(); el.scoreModal.hidden = false; });
  $("scores-close").addEventListener("click", () => { el.scoreModal.hidden = true; });
  el.scoreModal.addEventListener("click", e => { if (e.target === el.scoreModal) el.scoreModal.hidden = true; });

  // History
  $("history-btn").addEventListener("click", () => { renderChart(); el.histModal.hidden = false; });
  $("history-close").addEventListener("click", () => { el.histModal.hidden = true; });
  el.histModal.addEventListener("click", e => { if (e.target === el.histModal) el.histModal.hidden = true; });

  // Profile
  $("profile-btn").addEventListener("click", () => { el.profileInput.value = state.profile.name; el.profileModal.hidden = false; el.profileInput.focus(); });
  $("profile-save").addEventListener("click", () => {
    state.profile.name = el.profileInput.value.trim().slice(0,14);
    saveJSON(STORAGE.profile, state.profile);
    el.profileModal.hidden = true; renderScores();
  });
  el.profileModal.addEventListener("click", e => { if (e.target === el.profileModal) el.profileModal.hidden = true; });

  // Custom text
  $("custom-btn").addEventListener("click", () => { el.customInput.value = ""; el.customModal.hidden = false; el.customInput.focus(); });
  $("custom-ok").addEventListener("click", () => {
    const txt = normalize(el.customInput.value);
    if (!txt) return;
    state.customText = txt;
    el.customModal.hidden = true;
    if (state.timerId) clearInterval(state.timerId);
    state.index = 0; state.keystrokes = 0; state.errors = 0; state.errKeys = {};
    state.startedAt = null; state.ended = false; state.loading = false; state.ghostIndex = 0;
    showLoader(false);
    renderParagraph(txt); el.para.setAttribute("dir","ltr"); focusInput();
  });
  $("custom-cancel").addEventListener("click", () => { el.customModal.hidden = true; });
  el.customModal.addEventListener("click", e => { if (e.target === el.customModal) el.customModal.hidden = true; });
  
  // Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      [el.scoreModal, el.histModal, el.profileModal, el.customModal, el.resultModal].forEach(m => m.hidden = true);
    }
  });

  // Async fonts (non-blocking, only after the page is fully loaded)
  window.addEventListener("load", () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&display=swap";
    link.media = "print";
    link.onload = () => { link.media = "all"; };
    document.head.append(link);
  });
  
  // Sync settings toggle states
  $("opt-symbols").checked = state.symbols;
    $("opt-strict").checked = state.strict;
  $("opt-ghost").checked = state.ghost;
  
  /* ==================== INIT ==================== */

    renderScores();
    updateStreak(false);
    loadText();
  })();