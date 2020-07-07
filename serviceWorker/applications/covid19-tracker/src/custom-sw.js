/**
 * Created by sanchitgupta001 on 02/07/2020
 */
// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
/* eslint  no-restricted-globals: 0 */
/* eslint   no-undef: 0 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

workbox.setConfig({ debug: true });

self.addEventListener('install', (event) =>
  event.waitUntil(self.skipWaiting())
);
self.addEventListener('activate', (event) =>
  event.waitUntil(self.clients.claim())
);

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// app-shell
workbox.routing.registerRoute(
  new RegExp('/*.png'),
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());

workbox.routing.registerRoute(
  new RegExp('^https://disease.sh/v2/countries?'),
  new workbox.strategies.NetworkFirst()
);
