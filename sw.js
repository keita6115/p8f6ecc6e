// 復号済みのファイルを、このサイトの s/ 以下として返す
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || !u.pathname.startsWith(new URL("s/", self.registration.scope).pathname)) return;
  e.respondWith(caches.open("site").then(c => c.match(u.origin + u.pathname)).then(r => r || Response.redirect(self.registration.scope, 302)));
});
