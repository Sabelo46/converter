
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
                      var result = xhr.responseText;
                      result = JSON.parse(result);
                      resolve(result);
                  }else{
                      reject(xhr);
                  }
              }
          };
          xhr.open("GET",url,true);
          xhr.send();
        })
      };
      get().then(function(data){
          console.log('Success',data);
        //   let currencies = data.results;
        
        //   for(c in currencies){ 
        //     let option=document.createElement('option');
        //     option.value = `${currencies[c].id}`;  
        //     let check = currencies[c].id;
        //     if(typeof check === 'undefined'){
        //       check ='';
            
        //     }
        //     option.text =  ` ${check} (${currencies[c].currencyName})`;  
        //     expect.appendChild(option);
        //     have.appendChild(option.cloneNode(true));
        //   }
      }).catch(function(err){
          console.log('Err');
      })