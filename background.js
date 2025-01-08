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
      // Grabbing the passwords from chrome.storage.local in the background script
      chrome.storage.local.get(['passwords'], (result) => {
        if (result.passwords) {
          console.log('Fetched passwords:', result.passwords);
          sendResponse({ success: true });
        } else {
          console.log('No passwords found');
          sendResponse({ success: false });
        }
      });
  
      // Return true to indicate we're sending a response asynchronously
      return true;
    }

    if (message.action === 'fetchSpecificPassword') {
      chrome.storage.local.get(['passwords'], (result) => {
          if (result.passwords) {
              const password = result.passwords[message.passwordIndex]; // Use passwordIndex from message
              if (password !== undefined) {
                  console.log('Fetched password:', password);
                  sendResponse({ success: true, password: password });
              } else {
                  console.log('Invalid index for password');
                  sendResponse({ success: false, message: 'Invalid index for password' });
              }
          } else {
              console.log('No passwords found');
              sendResponse({ success: false, message: 'No passwords found' });
          }
      });
  
      // Return true to indicate we're sending a response asynchronously
      return true;
    }

});