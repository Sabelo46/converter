var cacheName = 'v1';
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
    'https://free.currencyconverterapi.com/api/v5/currencies',
    ];
self.addEventListener('install',function(event){
    console.log("install");
    event.waitUntil(
	    caches.open(cacheName).then(function(cache){
	    	console.log('Adding files to cache');
	    	return cache.addAll(cacheFiles);
	    })
	  )
})
self.addEventListener('activate',function(event){
    console.log("activated");
    console.log('Service worker activated');
		 event.waitUntil(
				 	caches.keys().then(function(cacheNames){
				 		return Promise.all(cacheNames.map(function(thisCacheName){
				           if(thisCacheName !== cacheName){
				             console.log('Removing cache files',thisCacheName);
				             return caches.delete(thisCacheName);
				           }
				         }))
				 	})
		 	)
})
    self.addEventListener('fetch',function(event){
        console.log('fetching',event.request.url);
            event.respondWith(
                caches.match(event.request).then(function(response){
                    if(response){
                        console.log('Found Service worker in cache',event.request.url);
                        return response;
                     }    
                     var requestClone = event.request.clone();
                     fetch(requestClone)
                        .then(function(response){
                            if(!response){
                                console.log('No response for you..');
                                return response;
                            }
                            var requestClone = response.clone();
                            caches.open(cacheName).then(function(cache){
                                console.log('Your new code comes here..');
                                cache.put(event.request, responseClone);
                                return response;
                            })
                         })
                       
                     return fetch(event.request);
                    }).catch(function(err){
                        console.log("Error fetching cache for you");
                    })
            )
});





