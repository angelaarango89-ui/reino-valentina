/* Shared code: saved progress, characters, sound, voice and confetti. */
const $ = s => document.querySelector(s);
const INK = '#4A2361';
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- saved progress ---------------- */
let store = { stars: 0, sound: true, world: 0, unlocked: 1, stickers: [0, 0, 0] };
try {
  const s = JSON.parse(localStorage.getItem('reinoValentina') || 'null');
  if (s) { if (typeof s.stickers === 'number') s.stickers = [s.stickers, 0, 0]; store = Object.assign(store, s); }
} catch (e) {}
function save(){ try { localStorage.setItem('reinoValentina', JSON.stringify(store)); } catch (e) {} }

/* ---------------- characters (original designs) ---------------- */
const CH = {
  kitty: a => KITTY_SMALL(a),
  unicorn: (a = '') => `<svg ${a} viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="30" cy="46" r="13" fill="#FF8CC6"/><circle cx="23" cy="66" r="12" fill="#B99BFF"/><circle cx="27" cy="86" r="11" fill="#6FE0C6"/>
    <circle cx="90" cy="46" r="13" fill="#FFD25E"/><circle cx="97" cy="66" r="12" fill="#FF8CC6"/><circle cx="93" cy="86" r="11" fill="#B99BFF"/>
    <path d="M38 42 L33 16 L54 32 Z" fill="#fff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M82 42 L87 16 L66 32 Z" fill="#fff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="60" cy="66" rx="34" ry="36" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="48" cy="34" r="9" fill="#FF8CC6"/><circle cx="72" cy="34" r="9" fill="#B99BFF"/>
    <path d="M60 4 L51 36 L69 36 Z" fill="#FFC22E" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M54 27 L66 23 M56 18 L64 15" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <g class="eyes"><ellipse cx="47" cy="62" rx="6" ry="8" fill="${INK}"/><circle cx="49" cy="59" r="2.5" fill="#fff"/>
    <ellipse cx="73" cy="62" rx="6" ry="8" fill="${INK}"/><circle cx="75" cy="59" r="2.5" fill="#fff"/></g>
    <path d="M41 56 l-4 -4 M79 56 l4 -4" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="36" cy="76" r="6" fill="#FF9CCB" opacity=".75"/><circle cx="84" cy="76" r="6" fill="#FF9CCB" opacity=".75"/>
    <ellipse cx="60" cy="88" rx="24" ry="15" fill="#FFD6EA" stroke="${INK}" stroke-width="3"/>
    <circle cx="52" cy="85" r="2.6" fill="${INK}"/><circle cx="68" cy="85" r="2.6" fill="${INK}"/>
    <path d="M53 94 q7 6 14 0" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  princess: (a = '') => `<svg ${a} viewBox="0 0 120 120" aria-hidden="true">
    <path d="M22 70 Q18 26 60 24 Q102 26 98 70 Q100 104 88 114 L32 114 Q20 104 22 70 Z" fill="#8A4A2F" stroke="${INK}" stroke-width="3.5"/>
    <path d="M30 120 Q34 98 60 96 Q86 98 90 120 Z" fill="#FF4FA0" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="60" cy="66" r="30" fill="#FFDCC8" stroke="${INK}" stroke-width="3.5"/>
    <path d="M30 62 Q32 36 60 36 Q88 36 90 62 Q78 48 63 52 Q50 46 30 62 Z" fill="#8A4A2F" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 38 L43 14 L52 27 L60 9 L68 27 L77 14 L80 38 Z" fill="#FFC22E" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="60" cy="29" r="4" fill="#A77BFF" stroke="${INK}" stroke-width="1.5"/><circle cx="48" cy="32" r="2.8" fill="#2FC4A4"/><circle cx="72" cy="32" r="2.8" fill="#FF4FA0"/>
    <g class="eyes"><ellipse cx="49" cy="68" rx="5" ry="6.5" fill="${INK}"/><circle cx="51" cy="66" r="2" fill="#fff"/>
    <ellipse cx="71" cy="68" rx="5" ry="6.5" fill="${INK}"/><circle cx="73" cy="66" r="2" fill="#fff"/></g>
    <circle cx="41" cy="78" r="6" fill="#FF9CCB" opacity=".75"/><circle cx="79" cy="78" r="6" fill="#FF9CCB" opacity=".75"/>
    <path d="M53 81 q7 7 14 0 z" fill="#FF6F91" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  </svg>`
};

const FURS = [
  { fur: '#EFE2FF', fur2: '#DCC8FF', stripe: '#C4A6FF', belly: '#FFFFFF', bow: '#FF4FA0', label: 'Lila' },
  { fur: '#FFFFFF', fur2: '#F1ECF7', stripe: '#E2D7F2', belly: '#FFF1F8', bow: '#A77BFF', label: 'Blanca' },
  { fur: '#FFD7AE', fur2: '#FFC28A', stripe: '#F79A4A', belly: '#FFF6EC', bow: '#2FC4A4', label: 'Naranja' },
  { fur: '#E3E6F0', fur2: '#CDD2E0', stripe: '#9EA6BD', belly: '#FFFFFF', bow: '#FF4FA0', label: 'Gris' },
  { fur: '#FFDDEE', fur2: '#FFC6E2', stripe: '#FF9CCB', belly: '#FFFFFF', bow: '#A77BFF', label: 'Rosa' }
];
const VARF = { fur: 'var(--fur)', fur2: 'var(--fur2)', stripe: 'var(--stripe)', belly: 'var(--belly)', bow: 'var(--bow)' };
const sf = c => `style="fill:${c}"`;
const bowSVG = F => `<g transform="translate(178 56) rotate(18)"><path d="M0 0 C-10 -18 -28 -12 -24 2 C-28 16 -10 18 0 0Z M0 0 C10 -18 28 -12 24 2 C28 16 10 18 0 0Z" ${sf(F.bow)} stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><circle r="6.5" fill="#FFC22E" stroke="${INK}" stroke-width="2.5"/></g>`;
function kittyHead(F, big){
  const eye = (x, flip) => `<ellipse cx="${x}" cy="110" rx="18" ry="21" fill="${INK}"/><ellipse cx="${x}" cy="116" rx="12.5" ry="12.5" fill="#7B4FE0"/><ellipse cx="${x}" cy="121" rx="8" ry="5" fill="#B9A2FF"/>
    <circle cx="${x + 7}" cy="101" r="6.5" fill="#fff"/><circle cx="${x - 6}" cy="120" r="3" fill="#fff"/>`;
  return `
  <path d="M56 86 L46 22 Q48 11 59 16 L106 52 Z" ${sf(F.fur)} stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M184 86 L194 22 Q192 11 181 16 L134 52 Z" ${sf(F.fur)} stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M63 68 L58 31 L89 54 Z" fill="#FF9CCB"/><path d="M177 68 L182 31 L151 54 Z" fill="#FF9CCB"/>
  <path d="M120 40 C178 40 208 70 208 110 C208 152 170 172 120 172 C70 172 32 152 32 110 C32 70 62 40 120 40 Z" ${sf(F.fur)} stroke="${INK}" stroke-width="4"/>
  <path d="M40 132 C52 158 84 170 120 170 C100 162 60 156 40 132Z" ${sf(F.fur2)}/>
  <rect x="103" y="46" width="7" height="14" rx="3.5" ${sf(F.stripe)}/><rect x="116.5" y="44" width="7" height="19" rx="3.5" ${sf(F.stripe)}/><rect x="130" y="46" width="7" height="14" rx="3.5" ${sf(F.stripe)}/>
  <path d="M36 98 l12 3 M35 108 l12 1 M204 98 l-12 3 M205 108 l-12 1" style="stroke:${F.stripe}" stroke-width="5" stroke-linecap="round"/>
  <g class="eyes">${eye(86)}${eye(154)}
    <path d="M68 100 l-9 -6 M67 109 l-10 -1 M172 100 l9 -6 M173 109 l10 -1" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/></g>
  ${big ? `<g class="happy-eyes"><path d="M68 116 Q86 94 104 116 M136 116 Q154 94 172 116" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>
  <g class="wow-eyes"><circle cx="86" cy="110" r="15" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="86" cy="110" r="7" fill="${INK}"/><circle cx="154" cy="110" r="15" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="154" cy="110" r="7" fill="${INK}"/></g>` : ''}
  <ellipse cx="60" cy="138" rx="14" ry="8" fill="#FF9CCB" opacity=".8"/><ellipse cx="180" cy="138" rx="14" ry="8" fill="#FF9CCB" opacity=".8"/>
  ${big ? `<g class="mouth-open"><ellipse cx="120" cy="149" rx="11" ry="12" fill="#C2185B" stroke="${INK}" stroke-width="2.5"/><ellipse cx="120" cy="155" rx="7" ry="4.5" fill="#FF8FB1"/></g>` : ''}
  <path d="M113 130 q7 -6 14 0 q-2 7 -7 9 q-5 -2 -7 -9z" fill="#FF6FB0" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M120 139 q-6 9 -14 3 M120 139 q6 9 14 3" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M40 124 L10 118 M40 132 L8 134 M42 140 L14 150 M200 124 L230 118 M200 132 L232 134 M198 140 L226 150" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
}
const KITTY_SMALL = (a = '') => `<svg ${a} viewBox="4 -4 232 190" aria-hidden="true">${kittyHead(FURS[0])}${bowSVG(FURS[0])}</svg>`;

/* ---------------- sound effects ---------------- */
let ac;
function ensureAc(){ try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state !== 'running') ac.resume(); } catch (e) {} return ac; }
const hasVoice = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
const SILENT = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAACAgICA';
function unlockAudio(){
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  try { ensureAc(); const s = ac.createBufferSource(); s.buffer = ac.createBuffer(1, 1, 22050); s.connect(ac.destination); s.start(0); } catch (e) {}
  try { const a = new Audio(SILENT); a.volume = .01; const p = a.play(); if (p) p.catch(() => {}); } catch (e) {}
  try { if (hasVoice) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); pickVoice(); } } catch (e) {}
}
document.addEventListener('pointerdown', () => { try { if (ac && ac.state !== 'running') ac.resume(); } catch (e) {} }, true);
function tone(f, t0, dur, type = 'sine', vol = .14, dest){
  if (!store.sound) return;
  try {
    ensureAc();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + t0;
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g); g.connect(dest || ac.destination); o.start(t); o.stop(t + dur + .05);
  } catch (e) {}
}
const sfx = {
  ok(){ [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .35, 'triangle')); },
  no(){ tone(330, 0, .25); tone(262, .18, .3); },
  tap(){ tone(880, 0, .12, 'sine', .08); },
  flip(){ tone(660, 0, .1, 'triangle', .08); },
  snap(){ tone(988, 0, .12, 'triangle', .1); tone(1319, .07, .18, 'triangle', .1); },
  win(){ [523, 659, 784, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .12, .4, 'triangle')); },
  fanfare(){ [392, 523, 659, 784, 659, 784, 1047, 1047, 1319, 1568].forEach((f, i) => tone(f, i * .14, .5, 'triangle', .13)); }
};
function meow(){
  if (!store.sound) return;
  try {
    ensureAc(); const t = ac.currentTime, k = .85 + Math.random() * .4;
    const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(520 * k, t); o.frequency.linearRampToValueAtTime(880 * k, t + .18); o.frequency.linearRampToValueAtTime(460 * k, t + .6);
    f.type = 'bandpass'; f.Q.value = 2.5; f.frequency.setValueAtTime(900, t); f.frequency.linearRampToValueAtTime(1900, t + .2); f.frequency.linearRampToValueAtTime(800, t + .6);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.32, t + .05); g.gain.setValueAtTime(.26, t + .4); g.gain.exponentialRampToValueAtTime(.001, t + .65);
    o.connect(f); f.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + .7);
  } catch (e) {}
}


/* ---------------- voice: one small file per phrase, loaded only when needed ---------------- */
let esVoice = null;
function pickVoice(){ try { const v = speechSynthesis.getVoices(); esVoice = v.find(x => /es[-_](CO|MX|US|419)/i.test(x.lang)) || v.find(x => /^es/i.test(x.lang)) || null; } catch (e) {} }
try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch (e) {}
const slug = k => k.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9_]/g, '');
const VCACHE = new Map(), VPEND = {}, VMAX = 10; let vSrc = null, sayId = 0;
function decode(ab){ return new Promise((res, rej) => { try { const p = ac.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); } catch (e) { rej(e); } }); }
function getClip(k){
  if (VCACHE.has(k)) { const b = VCACHE.get(k); VCACHE.delete(k); VCACHE.set(k, b); return Promise.resolve(b); }
  if (VPEND[k]) return VPEND[k];
  if (!ensureAc()) return Promise.resolve(null);
  const p = fetch('voz/' + slug(k) + '.mp3').then(r => { if (!r.ok) throw 0; return r.arrayBuffer(); }).then(decode)
    .then(b => { VCACHE.set(k, b); while (VCACHE.size > VMAX) VCACHE.delete(VCACHE.keys().next().value); return b; }, () => null);
  VPEND[k] = p; p.then(() => { delete VPEND[k]; });
  return p;
}
const prefetchVoice = (...keys) => keys.forEach(k => k && getClip(k));
function stopVoice(){
  try { if (vSrc) { const s = vSrc; vSrc = null; s.stop(); } } catch (e) {}
  try { if (hasVoice && (speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel(); } catch (e) {}
}
let lastU = null;
function robot(t, done){
  if (!hasVoice) return done();
  try {
    if (!esVoice) pickVoice();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = esVoice ? esVoice.lang : 'es-ES'; if (esVoice) u.voice = esVoice;
    u.rate = .9; u.pitch = 1.15; u.onend = done; u.onerror = done; lastU = u;
    setTimeout(() => { try { speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { done(); } }, 90);
    setTimeout(done, 7000);
  } catch (e) { done(); }
}
/* say(key) -> Promise that resolves when the phrase ends (or is interrupted) */
function say(key, rate = 1){
  return new Promise(res => {
    let fin = false; const done = () => { if (!fin) { fin = true; res(); } };
    if (!store.sound) return done();
    const id = ++sayId; stopVoice();
    const txt = (window.VOICE_TEXT && window.VOICE_TEXT[key]) || key;
    getClip(key).then(buf => {
      if (id !== sayId) return done();
      if (!buf) return robot(txt, done);
      try {
        const s = ac.createBufferSource(), gn = ac.createGain(); gn.gain.value = 1.2;
        s.buffer = buf; s.playbackRate.value = rate; s.connect(gn); gn.connect(ac.destination); s.onended = done; s.start(0); vSrc = s;
        setTimeout(done, buf.duration / rate * 1000 + 500);
      } catch (e) { robot(txt, done); }
    });
  });
}

/* blinking: one character at a time, only when visible (cheaper than animating every eye forever) */
setInterval(() => {
  if (document.hidden) return;
  const eyes = [...document.querySelectorAll('.eyes')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; });
  if (!eyes.length) return;
  const e = pick(eyes); e.classList.add('blinking'); setTimeout(() => e.classList.remove('blinking'), 160);
}, 1300);

/* first tap anywhere wakes up the sound (for pages opened without the welcome screen) */
function unlockOnFirstTap(){ const f = () => { unlockAudio(); document.removeEventListener('pointerdown', f, true); }; document.addEventListener('pointerdown', f, true); }

/* ---------------- confetti ---------------- */
function confetti(count){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('#fx'), x = cv.getContext('2d'), W = cv.width = innerWidth, H = cv.height = innerHeight;
  const cols = ['#FF4FA0', '#A77BFF', '#2FC4A4', '#FFC22E', '#FF8A6B', '#5BB8F5', '#FFFFFF'];
  count = Math.min(count, 160);
  const ps = Array.from({ length: count }, () => ({ x: W / 2, y: H * .45, vx: (Math.random() - .5) * 15, vy: -Math.random() * 15 - 4, s: 6 + Math.random() * 8, r: Math.random() * 6, c: pick(cols), h: Math.random() < .3 }));
  const t0 = performance.now();
  (function step(t){
    x.clearRect(0, 0, W, H);
    ps.forEach(p => {
      p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += .1; x.fillStyle = p.c;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r);
      if (p.h) { x.beginPath(); x.arc(0, 0, p.s / 2, 0, 7); x.fill(); } else x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      x.restore();
    });
    if (t - t0 < 3200) requestAnimationFrame(step); else x.clearRect(0, 0, W, H);
  })(t0);
}

