/* Offline support for El Reino de Valentina.
   - Pages and code: the newest from the internet, but if the internet is slow (more than 2.5 s) the saved copy opens at once.
   - Voices: kept in their own box that survives app updates; downloaded again only when the voices themselves change. */
const CACHE = 'reino-v7';
const VOZ_CACHE = 'reino-voz-371df0a9';
const CORE = ["./", "./index.html", "./mimi.html", "./comun.css", "./comun.js", "./voz/textos.js", "./manifest.webmanifest", "./icono-192.png", "./icono-512.png", "./apple-touch-icon.png"];
const VOZ = ["./voz/album_done.mp3", "./voz/c_diamantes.mp3", "./voz/c_estrellas.mp3", "./voz/c_flores.mp3", "./voz/c_fresas.mp3", "./voz/c_mariposas.mp3", "./voz/c_monos.mp3", "./voz/c_ponquecitos.mp3", "./voz/extra.mp3", "./voz/hi_kitty.mp3", "./voz/hi_princess.mp3", "./voz/hi_unicorn.mp3", "./voz/locked.mp3", "./voz/mem_done.mp3", "./voz/mem_intro.mp3", "./voz/mimi_again.mp3", "./voz/mimi_dance.mp3", "./voz/mimi_intro.mp3", "./voz/mimi_pet.mp3", "./voz/mimi_pretty.mp3", "./voz/mimi_tail.mp3", "./voz/mimi_tickle1.mp3", "./voz/mimi_tickle2.mp3", "./voz/mimi_yum.mp3", "./voz/n1.mp3", "./voz/n10.mp3", "./voz/n2.mp3", "./voz/n3.mp3", "./voz/n4.mp3", "./voz/n5.mp3", "./voz/n6.mp3", "./voz/n7.mp3", "./voz/n8.mp3", "./voz/n9.mp3", "./voz/ok_abeja.mp3", "./voz/ok_arcoiris.mp3", "./voz/ok_banano.mp3", "./voz/ok_castillo.mp3", "./voz/ok_conejo.mp3", "./voz/ok_corona.mp3", "./voz/ok_estrella.mp3", "./voz/ok_fresa.mp3", "./voz/ok_gato.mp3", "./voz/ok_globo.mp3", "./voz/ok_leon.mp3", "./voz/ok_luna.mp3", "./voz/ok_mariposa.mp3", "./voz/ok_nube.mp3", "./voz/ok_oso.mp3", "./voz/ok_pato.mp3", "./voz/ok_rana.mp3", "./voz/ok_raton.mp3", "./voz/ok_rosa.mp3", "./voz/ok_sol.mp3", "./voz/ok_torta.mp3", "./voz/ok_tortuga.mp3", "./voz/ok_uva.mp3", "./voz/ok_vaca.mp3", "./voz/okn1.mp3", "./voz/okn10.mp3", "./voz/okn2.mp3", "./voz/okn3.mp3", "./voz/okn4.mp3", "./voz/okn5.mp3", "./voz/okn6.mp3", "./voz/okn7.mp3", "./voz/okn8.mp3", "./voz/okn9.mp3", "./voz/praise1.mp3", "./voz/praise2.mp3", "./voz/praise3.mp3", "./voz/praise4.mp3", "./voz/praise5.mp3", "./voz/praise6.mp3", "./voz/praise7.mp3", "./voz/puz_castle.mp3", "./voz/puz_friends.mp3", "./voz/puz_garden.mp3", "./voz/puz_intro.mp3", "./voz/puz_rainbow.mp3", "./voz/q_abeja.mp3", "./voz/q_arcoiris.mp3", "./voz/q_banano.mp3", "./voz/q_castillo.mp3", "./voz/q_conejo.mp3", "./voz/q_corona.mp3", "./voz/q_estrella.mp3", "./voz/q_fresa.mp3", "./voz/q_gato.mp3", "./voz/q_globo.mp3", "./voz/q_leon.mp3", "./voz/q_luna.mp3", "./voz/q_mariposa.mp3", "./voz/q_nube.mp3", "./voz/q_oso.mp3", "./voz/q_pato.mp3", "./voz/q_rana.mp3", "./voz/q_raton.mp3", "./voz/q_rosa.mp3", "./voz/q_sol.mp3", "./voz/q_torta.mp3", "./voz/q_tortuga.mp3", "./voz/q_uva.mp3", "./voz/q_vaca.mp3", "./voz/queen.mp3", "./voz/retry1.mp3", "./voz/retry2.mp3", "./voz/retry3.mp3", "./voz/sound_on.mp3", "./voz/sum.mp3", "./voz/tr_intro.mp3", "./voz/tr_next.mp3", "./voz/trl_a.mp3", "./voz/trl_e.mp3", "./voz/trl_i.mp3", "./voz/trl_l.mp3", "./voz/trl_m.mp3", "./voz/trl_n.mp3", "./voz/trl_o.mp3", "./voz/trl_s.mp3", "./voz/trl_u.mp3", "./voz/trokl_a.mp3", "./voz/trokl_e.mp3", "./voz/trokl_i.mp3", "./voz/trokl_l.mp3", "./voz/trokl_m.mp3", "./voz/trokl_n.mp3", "./voz/trokl_o.mp3", "./voz/trokl_s.mp3", "./voz/trokl_u.mp3", "./voz/troku_a.mp3", "./voz/troku_c.mp3", "./voz/troku_e.mp3", "./voz/troku_i.mp3", "./voz/troku_l.mp3", "./voz/troku_m.mp3", "./voz/troku_n.mp3", "./voz/troku_o.mp3", "./voz/troku_p.mp3", "./voz/troku_s.mp3", "./voz/troku_t.mp3", "./voz/troku_u.mp3", "./voz/tru_a.mp3", "./voz/tru_c.mp3", "./voz/tru_e.mp3", "./voz/tru_i.mp3", "./voz/tru_l.mp3", "./voz/tru_m.mp3", "./voz/tru_n.mp3", "./voz/tru_o.mp3", "./voz/tru_p.mp3", "./voz/tru_s.mp3", "./voz/tru_t.mp3", "./voz/tru_u.mp3", "./voz/w_abeja.mp3", "./voz/w_arcoiris.mp3", "./voz/w_banano.mp3", "./voz/w_castillo.mp3", "./voz/w_conejo.mp3", "./voz/w_corona.mp3", "./voz/w_estrella.mp3", "./voz/w_fresa.mp3", "./voz/w_gato.mp3", "./voz/w_globo.mp3", "./voz/w_leon.mp3", "./voz/w_luna.mp3", "./voz/w_mariposa.mp3", "./voz/w_nube.mp3", "./voz/w_oso.mp3", "./voz/w_pato.mp3", "./voz/w_rana.mp3", "./voz/w_raton.mp3", "./voz/w_rosa.mp3", "./voz/w_sol.mp3", "./voz/w_torta.mp3", "./voz/w_tortuga.mp3", "./voz/w_uva.mp3", "./voz/w_vaca.mp3", "./voz/welcome.mp3", "./voz/win_sticker.mp3", "./voz/world0.mp3", "./voz/world1.mp3", "./voz/world2.mp3"];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE); await c.addAll(CORE);
    const v = await caches.open(VOZ_CACHE);
    await Promise.all(VOZ.map(async u => {
      if (await v.match(u)) return;
      const old = await caches.match(u); if (old) return v.put(u, old);
      try { const r = await fetch(u); if (r.ok) await v.put(u, r); } catch (err) {}
    }));
  })());
  self.skipWaiting();
});
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== VOZ_CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
const saveTo = (name, req, r) => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(name).then(c => c.put(req, cp)); } return r; };
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url), same = url.origin === location.origin;
  if (same && url.pathname.includes('/voz/') && url.pathname.endsWith('.mp3')) {
    e.respondWith(caches.open(VOZ_CACHE).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || fetch(req).then(r => saveTo(VOZ_CACHE, req, r))));
    return;
  }
  if ((same && /\.png$/.test(url.pathname)) || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => saveTo(CACHE, req, r))));
    return;
  }
  if (!same) return;
  e.respondWith((async () => {
    const net = fetch(req).then(r => saveTo(CACHE, req, r));
    const cached = await caches.match(req, { ignoreSearch: true });
    if (!cached) return net;
    const timer = new Promise(res => setTimeout(() => res(cached), 2500));
    return Promise.race([net.catch(() => cached), timer]);
  })());
});
