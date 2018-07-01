
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('serviceWorker Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })