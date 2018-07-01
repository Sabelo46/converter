navigator.serviceWorker.register('sw.js').then(function(reg){
    console.log('Service worker Registered for sabelocurren',reg);
  }).catch(function(err){
    console.log('Not registered',err);
  })