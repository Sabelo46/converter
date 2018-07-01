let cacheName = 'v2';
var cacheFiles = [
                 'index.html',
                  'main.js',
                  'sw.js',
                  'node_modules/bootstrap/dist/css/bootstrap.css',
                  'node_modules/bootstrap/dist/js/bootstrap.js',
                  'node_modules/jquery/dist/jquery.js',
                  'https://free.currencyconverterapi.com/api/v5/currencies'
                  
                  ]
	self.addEventListener('install',function(e){
	  // Perform install step
      console.log("[ServiceWorker] Installing");
      e.waitUntil(
          caches.open(cacheName).then(function(cache){
              console.log("[ServiceWorker] Caching cachefiles");
              return cache.addAll(cacheFiles);
          })
      )
    })
    self.addEventListener('activate',function(e){
        console.log("[ServiceWorker] Activated");
        e.waitUntil(
            caches.keys().then(function(cacheNames){
                return Promise.all(cacheNames.map(function(thisCacheName){
                    if(thisCacheName !== cacheName){
                        console.log("[ServiceWorker] Removing cached file");
                        return caches.delete(thisCacheName);
                    }
                }))
            })
        )
    })
    self.addEventListener('fetch',function(e){
        console.log("[ServiceWorker] Fetching",e.request.url);
        e.respondWith(
            caches.match(e.request).then(function(response){
                if(response) {
                    console.log("[ServiceWorker] found in cache",e.request.url);
                    return response;
                }
                return fetch(e.request);
            })
        )
    })
     