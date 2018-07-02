let cacheName = 'v2';
var cacheFiles = [
                 'index.html',
                  'main.js',
                  'node_modules/bootstrap/dist/css/bootstrap.css',
                  'node_modules/bootstrap/dist/js/bootstrap.js',
                  'node_modules/jquery/dist/jquery.js',
                  'https://free.currencyconverterapi.com/api/v5/currencies'
                  
                  ];
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
       e.respondWith(
      caches.match(e.request).then(function(response){
        if(response){
          return response;
        }
        var requestClone = e.request.clone();
        fetch(requestClone).then(function(response){
            if(!response){
                console.log("[ServiceWorker] no response");
                return response;
            }
            var responseClone = response.clone();
            caches.open(cacheName).then(function(cache){
                cache.put(e.request, requestClone);
                return response; 
            });
        })
        
      })
    )
})
     