let cacheName = 'v1';
var cacheFiles = [
                  'index.html',
                  'ext.css',
                  'im/a.jpg',
                  'im/b.jpg',
                  'im/c.jpg',
                  'idb/db.js',
                  'js/convert.js',
                  'js/currenciesController.js',
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
        console.log("[ServiceWorker] Actiated");
    })
    self.addEventListener('fetch',function(e){
        console.log("[ServiceWorker] Fetching",e.request.url);
    })
    