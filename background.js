chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'savePassword') {
      const password = message.password;
  
      // Save password in chrome.storage.sync (this is the sync version)
      chrome.storage.sync.get(['passwords'], (result) => {
        const passwords = result.passwords || [];
        passwords.push(password);
  
        chrome.storage.sync.set({ passwords: passwords }, () => {
          console.log('Password saved to synced storage');
          sendResponse({ success: true });
        });
      });
  
      // Return true to indicate you will send a response asynchronously
      return true;
    }
  });