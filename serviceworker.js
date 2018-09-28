/* ###   Welcome in the Service Worker               ### */
/* ###   This is where all the good stuff happends   ### */

// Just a nice name for our cache database
const cacheName = 'simple-pwa-cache';

// First we wait for a install request
self.addEventListener('install', (event) => {
    console.log('Service worker is installing...');

    // Now lets cache all the very important stuff we at least want to run this PWA
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          return cache.addAll(
            [
                'index.html',
                'manifest.json',
                '/scripts/main.js',
                '/styles/main.css',
                '/images/icons/icon_192.png',
                '/images/icons/icon_512.png'
            ]
          );
        })
      );
});

// Once a service worker has successfully installed, it transitions into the activation stage. 
self.addEventListener('activate', (event) => {

    // Just tell the brower we are live!
    console.log('Service worker is now activated.');
});

// this event will be fired if the page need something 
// like an image, font, javascript, json, ect..
self.addEventListener('fetch', (event) => {
    
    // let the console know what we are looking for
    console.log('i am looking for: ' + event.request.url);

    // the image 'image_1.jpg' and the Google Font are not in the 
    // list above, but will be add when we first ask for it
    event.respondWith(

        // check if it is in the cashe
        caches.open(cacheName).then(function(cache) {
          return cache.match(event.request).then(function (response) {

              // if it is in the cache, just return that
              // but if there is no response try to get if from the internet with Fetch
            return response || fetch(event.request).then(function(response) {

                // ok, now we got it from the www, lets add it to the cache after all
                cache.put(event.request, response.clone());

                // finaly return the data
                return response;
            });

          });

        })

    );

});