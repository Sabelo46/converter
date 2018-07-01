
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('serviceWorker for sabelo Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })