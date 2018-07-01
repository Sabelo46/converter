if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log('ServiceWorker Registered');
      }).catch(function(err){
        console.log('Not registered',err);
      })
 }

var get= function(url){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status == 200){
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
get('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(function(data){
        console.log("Success",data);
        let currencies = data.results; 
        for(c in currencies){ 
          let option=document.createElement('option');
          option.value = `${currencies[c].id}`;  
          let check = currencies[c].id;
          if(typeof check === 'undefined'){
            check ='';
          
          }
          option.text =  ` ${check} (${currencies[c].currencyName})`;  
          expect.appendChild(option);
          have.appendChild(option.cloneNode(true));
        }

    }).catch(function(err){
        console.log('sabelo1');
    })
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(
      function(response) {
        if (response.status !== 200) {
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          
          // console.log(data.results);
          // let currenciesHolder = data;
          let store =[];
          let currencies = data.results;
          
          for(c in currencies){ 
               store.push(currencies[c].id);
          }
         for(let x =0;x<store.length;x++){
             for(let y=0;y<store.length;y++){
                 if(store[x]==store[y]){
                     continue;
                 }
                 fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${store[x]}_${store[y]},${store[y]}_${store[x]}`)
                 .then(function(response){
                     console.log(`{store[x]}=Done`);
                 }).catch(function(err){
                     console.log('Too bad');
                 })
             }
         }
          console.log(store)
        });
      }
    )
    .catch(function(err) {
      console.log('Oops!, err')
      ;})