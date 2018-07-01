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