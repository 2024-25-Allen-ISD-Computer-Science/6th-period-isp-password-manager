document.addEventListener('DOMContentLoaded', function() {
  // Save button event listener
  document.getElementById('save-button').addEventListener('click', function() {
    // On save-button click execute code
    const passwordInput = document.getElementById('password-input').value;
    // Gets user input from text box

    if (passwordInput) {
      chrome.runtime.sendMessage({ action: 'savePassword', password: passwordInput }, (response) => {
        // Sends password to background script
        if (response.success) {
          console.log('Password saved');
        } else {
          console.log('Failed to save password');
        }
      });
    } else {
      console.log('No input to save');
    }
  });

  // Fetch button event listener
  document.getElementById('fetch-button').addEventListener('click', function() {
    // Retrieve saved passwords from local storage in popup.js
    chrome.storage.local.get(['passwords'], (result) => {
      if (result.passwords) {
        // Send the passwords to the background script
        chrome.runtime.sendMessage({ action: 'fetchPassword', passwords: result.passwords }, (response) => {
          // Handle the response from the background script
          if (response.success) {
            console.log('Passwords fetched successfully');
          } else {
            console.log('Failed to fetch passwords');
          }
        });
      } else {
        console.log('No passwords stored in chrome.storage.local');
      }
    });
  });

  document.getElementById('fetch-specific-button').addEventListener('click', function() {
    // Retrieve saved passwords from local storage in popup.js
    const passwordFetchInput = document.getElementById('password-fetch-input').value;

    if (passwordFetchInput) {
      if (!isNaN(passwordFetchInput)) {
        chrome.storage.local.get(['passwords'], (result) => {
          if (result.passwords) {
            // Send the passwords to the background script
            chrome.runtime.sendMessage({ action: 'fetchSpecificPassword', password: result.passwords[passwordFetchInput] }, (response) => {
              // Handle the response from the background script
              if (response.success) {
                console.log('Password fetched successfully');
              } else {
                console.log('Failed to fetch password');
              }
            });
          } else {
            console.log('No passwords stored in chrome.storage.local');
          }
        });
      }
    }

    
  });

});
