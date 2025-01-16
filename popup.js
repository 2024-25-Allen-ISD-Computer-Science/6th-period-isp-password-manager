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
    // Retrieve the value from the input field
    const passwordFetchInput = document.getElementById('password-fetch-input').value;

    // Check if input is not empty and is a valid number (index)
    if (passwordFetchInput && !isNaN(passwordFetchInput)) {
        const index = parseInt(passwordFetchInput, 10);  // Convert to integer

        chrome.storage.local.get(['passwords'], (result) => {
            if (result.passwords) {
                // Check if the index is within bounds of the array
                if (index >= 0 && index < result.passwords.length) {
                    // Send the password index to the background script
                    chrome.runtime.sendMessage({ 
                        action: 'fetchSpecificPassword', 
                        passwordIndex: index // Send the index
                    }, (response) => {
                        // Handle the response from the background script
                        if (response.success) {
                            console.log('Password fetched successfully');
                            console.log('Password:', response.password);  // Log the fetched password
                        } else {
                            console.log('Failed to fetch password');
                            if (response.message) {
                                console.log('Error message:', response.message);  // Log specific error message
                            }
                        }
                    });
                } else {
                    console.log('Index out of bounds');
                }
            } else {
                console.log('No passwords stored in chrome.storage.local');
            }
        });
    } else {
        console.log('Invalid index input');
    }
  });

});
