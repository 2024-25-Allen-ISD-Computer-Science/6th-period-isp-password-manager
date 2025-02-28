import CryptoJS from 'crypto-js';

const encryptedPassword = CryptoJS.AES.encrypt("myPassword", "mySecretKey").toString();
const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, "mySecretKey").toString(CryptoJS.enc.Utf8);


const secretKey = 'mySecretKey';

// Encrypt the password before sending to the server
function encryptPassword(password) {
  const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
  return encrypted;
}

// Handle the form submission when the user clicks "Save"
function saveCredentials() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    displayMessage("Please enter both username and password.", "error");
    return;
  }

  // Encrypt the password
  const encryptedPassword = encryptPassword(password);

  fetch('http://localhost:3000/api/passwords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: encryptedPassword
    })
  })
  .then(response => response.json())
  .then(data => {
    displayMessage("Password saved successfully!", "success");
    console.log(data);
  })
  .catch(error => {
    displayMessage("Error saving password.", "error");
    console.error("Error:", error);
  });
}

// Display success or error message
function displayMessage(message, type) {
  const messageDiv = document.getElementById('responseMessage');
  messageDiv.textContent = message;
  if (type === "success") {
    messageDiv.style.color = "green";
  } else {
    messageDiv.style.color = "red";
  }
}

// Event listener for the save button
document.getElementById('saveButton').addEventListener('click', saveCredentials);
