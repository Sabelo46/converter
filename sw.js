var cache = '';
self.addEventListener('install',function(event){
    console.log("install");
})
self.addEventListener('activate',function(event){
    console.log("activated");
})
self.addEventListener('fetch',function(event){
    console.log("installed");
})