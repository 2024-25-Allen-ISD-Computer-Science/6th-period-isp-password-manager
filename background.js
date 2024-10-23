// Get the input to go where the 1 is
chrome.storage.sync.set({ "username": "1" }, function(){
    console.log('Data stored');
});
chrome.storage.sync.set({ "password": "2" }, function(){
    console.log('Data pulled');
});