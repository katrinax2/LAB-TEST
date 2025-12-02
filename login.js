// Sample user data for testing
const sampleUsers = [
  {
    fname: "Katrina",
    lname: "Watson",
    email: "katrinamwatson@students.utech.edu.jm",
    accountnum: "123-456-789",
    csv: "123",
    password: "password123",
    balance: 1600.0,
    accountType: "Silver",
  },
];

// Initialize localStorage with sample data on first load
function initializeSampleData() {
  if (!localStorage.getItem("wecreditUsers")) {
    localStorage.setItem("wecreditUsers", JSON.stringify(sampleUsers));
    console.log("Sample users added to localStorage");
    console.log("Test credentials:");
    console.log("Email: katrinamwatson@students.utech.edu.jm");
    console.log("Password: password123");
    console.log("Account: 1234567890, CSV: 123");
  }
}

// Load and display stored user data on startup
function loadStoredData() {
  const users = JSON.parse(localStorage.getItem("wecreditUsers"));

  if (users && users.length > 0) {
    console.log("Loaded", users.length, "users from localStorage");
  }
}

// Validate NAMES AND EMAIL
function validateForm() {
  const firstName = document.getElementById("fname").value.trim();
  const lastName = document.getElementById("lname").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const accountnum = document.getElementById("accountnum").value.trim();
  const csv = document.getElementById("csv").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Check first and last name length
  if (firstName.length < 3 || lastName.length < 3) {
    errorMessage.textContent =
      "First and Last name must be at least 3 characters long.";
    return false;
  }

  // Email pattern
  const emailPattern = /^[^\s@]+@students\.utech\.edu\.jm$/;

  if (!emailPattern.test(emailInput)) {
    errorMessage.textContent =
      "Please enter a valid @students.utech.edu.jm email address.";
    return false;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("wecreditUsers")) || [];

  // Check if user exists with matching login input
  const user = users.find(
    (u) =>
      u.fname.toLowerCase() === firstName.toLowerCase() &&
      u.lname.toLowerCase() === lastName.toLowerCase() &&
      u.email.toLowerCase() === emailInput.toLowerCase() &&
      u.accountnum === accountnum &&
      u.csv === csv &&
      u.password === password
  );

  if (user) {
    errorMessage.style.color = "green";
    errorMessage.textContent = "Login successful! Redirecting...";

    // Store logged-in user session
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to Home page after 1 second
    setTimeout(() => {
      // window.location.href = 'account.html';
      alert("Login successful! Welcome, " + user.fname + "!");
    }, 1000);

    return false; // Prevent form submission
  } else {
    errorMessage.style.color = "red";
    errorMessage.textContent =
      "Invalid credentials. Please check all fields and try again.";
    return false; // Prevent form submission
  }
}

// Add a new user to localStorage
function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem("wecreditUsers")) || [];

  // Check if user already exists
  const exists = users.some(
    (u) =>
      u.email.toLowerCase() === userData.email.toLowerCase() ||
      u.accountnum === userData.accountnum
  );

  if (exists) {
    return { success: false, message: "User already exists" };
  }

  users.push(userData);
  localStorage.setItem("wecreditUsers", JSON.stringify(users));
  return { success: true, message: "Registration successful" };
}

// Get current logged-in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Clear all users (for testing/admin purposes)
function clearAllUsers() {
  localStorage.removeItem("wecreditUsers");
  localStorage.removeItem("currentUser");
  console.log("All user data cleared");
}

// Run on page load
window.onload = function () {
  initializeSampleData();
  loadStoredData();
};
