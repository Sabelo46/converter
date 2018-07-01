
     navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('ServiceWorker Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })

      var get = function(err){
          return new Promise(function(resolve,reject){
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
              if(xhr.readyState === XMLHttpRequest.DONE)
              {
                  if(xhr.status === 200)
                  {
                      var result = xhr.responseText
                      result = JSON.parse(result);
                      resolve(result);
                  }else{
                      reject(xhr);
                  }
              }
          };
          xhr.open("GET","https://free.currencyconverterapi.com/api/v5/currencies",true);
          xhr.send();
        });
      };
      get("https://free.currencyconverterapi.com/api/v5/currencies").then(function(response){
          currencies = response;
          console.log(currencies.results);
          }).catch(function(err){
          console.log(err);
          console.log('fake');
      })