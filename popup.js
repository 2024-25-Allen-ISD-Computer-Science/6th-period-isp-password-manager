document.getElementById('save-btn').addEventListener('click', function() {
  const userInput = document.getElementById('user-input').value;

  if (userInput) {
    // Send the password data to the background script
    chrome.runtime.sendMessage({ action: 'savePassword', password: userInput }, (response) => {
      if (response.success) {
        console.log('Password saved');
      } else {
        console.log('Failed to save password');
      }
    });

    // Optionally save input to Chrome's local storage
    chrome.storage.local.set({ userInput: userInput }, function() {
      console.log('Input saved: ' + userInput);
    });
  } else {
    console.log('No input to save');
  }
});