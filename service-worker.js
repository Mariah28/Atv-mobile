var cacheName = 'CodingCourse+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        './cursos.html',
        './login.html',
        './contato.html',
        './sobre-nos.html',

        './css/style.css',

        './css/login.css',

        './js/jquery-script.js',

        './js/scripts.js',
        
        './assets/img/android/512.png',
        './assets/img/android/192.png',
        './assets/img/android/144.png',
        './assets/img/android/96.png',
        './assets/img/android/72.png',
        './assets/img/android/48.png',
        './assets/img/ios/29.png',
        './assets/img/ios/40.png',
        './assets/img/ios/57.png',
        './assets/img/ios/58.png',
        './assets/img/ios/60.png',
        './assets/img/ios/76.png',
        './assets/img/ios/80.png',
        './assets/img/ios/87.png',
        './assets/img/ios/114.png',
        './assets/img/ios/120.png',
        './assets/img/ios/180.png',
        './assets/img/ios/1024.png',
        './assets/img/appstore.png',
        './assets/img/playstore.png',

        './assets/img/cursos/datasci.png',
        './assets/img/cursos/desenvol.jpg',
        './assets/img/cursos/ia.jpg',
        './assets/img/cursos/mobile.png',
        './assets/img/cursos/programacao.png',
        './assets/img/cursos/ux_design.jpg',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});