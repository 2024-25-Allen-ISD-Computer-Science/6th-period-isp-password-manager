document.getElementById('save-button').addEventListener('click', function() {
  // On save-button click execute code

  const userInput = document.getElementById('user-input').value;
  // Gets user input from text box

  if (userInput) {
    chrome.runtime.sendMessage({ action: 'savePassword', password: userInput }, (response) => {
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

document.getElementById('fetch-button').addEventListener('click', function() {

  chrome.runtime.sendMessage({ action: 'fetchPassword', passwords: result.passwords }, (response) => {
    // Sends password to background script
    if (response.success) {
      console.log('Password fetched');
    } else {
      console.log('Failed to fetch password');
    }
  });

});