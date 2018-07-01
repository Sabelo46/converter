if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('Service worker Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })
}