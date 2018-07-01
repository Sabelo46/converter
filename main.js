
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
          for(c in currencies.results){ 
            let option=document.createElement('option');
            option.value = `${currencies.results[c].id}`;  
            let check = currencies.results[c].id;
            if(typeof check === 'undefined'){
              check =''; 
            }
            option.text =  ` ${check} (${currencies.results[c].currencyName})`;  
            expect.appendChild(option);
            have.appendChild(option.cloneNode(true));
          }
          }).catch(function(err){
          console.log(err);
          console.log('fake');
      })