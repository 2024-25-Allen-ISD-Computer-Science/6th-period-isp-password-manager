document.getElementById('saveBtn').addEventListener('click', () => {
  const website = document.getElementById('website').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!website || !username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  chrome.storage.local.get({ credentials: [] }, (result) => {
    const credentials = result.credentials;
    credentials.push({ website, username, password });
    chrome.storage.local.set({ credentials }, () => {
      displayCredentials();
      document.getElementById('website').value = '';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    });
  });
});

function displayCredentials() {
  chrome.storage.local.get({ credentials: [] }, (result) => {
    const savedList = document.getElementById('savedList');
    savedList.innerHTML = '';

    result.credentials.forEach((cred, index) => {
      const item = document.createElement('div');
      item.innerHTML = `<strong>${cred.website}</strong><br>Username: ${cred.username}<br>Password: ${cred.password}<hr>`;
      savedList.appendChild(item);
    });
  });
}

document.addEventListener('DOMContentLoaded', displayCredentials);