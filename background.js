chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Waits for the message to be sent from the popup.js
    if (message.action === 'savePassword') {
      const password = message.password;
  
      chrome.storage.local.get(['passwords'], (result) => {
        // Grabs any saved passwords from Google account, then adds password to the array
        const passwords = result.passwords || [];
        passwords.push(password);
  
        chrome.storage.local.set({ passwords: passwords }, () => {
          // Finishes the sync then tells the extension that the sync was completed
          console.log('Password saved to local storage');
          sendResponse({ success: true });
        });
      });
  
      // Keeps the connection up while waiting for asynchronous response
      return true;
    }

    if (message.action === 'fetchPassword') {
      
      chrome.storage.local.get(['passwords'], (result) => {
        // Grabs any saved passwords from Google account, and displays them in console
        console.log(message.passwords)
      })
    }
  });