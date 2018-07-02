if('serviceworker' in navigator){
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('ServiceWorker Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })

}
   