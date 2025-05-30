let brightness = 0.5;
let stopwatchInterval = null;
let stopwatchStartTime = null;

// Store logged-in user
let loggedInUser = null;
let highestTime = 0; // in milliseconds

function updateStopwatch() {
    if (!stopwatchStartTime) return;
    const now = Date.now();
    const elapsed = now - stopwatchStartTime;
    const hours = String(Math.floor(elapsed / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    stopwatchStartTime = Date.now();
    if (stopwatchInterval) clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    updateStopwatch();
}

function changeBrightness() {
    brightness += 1;
    const elem = document.getElementById("concrete1");
    if (elem) elem.style.filter = `brightness(${brightness})`;
    startStopwatch();
    // Disable the button after first click
    const btn = document.querySelector('button[onclick="changeBrightness()"]');
    if (btn) btn.setAttribute('disabled', 'disabled');
}

function resetBrightness() {
    brightness = 0.5;
    const elem = document.getElementById("concrete1");
    if (elem) elem.style.filter = `brightness(${brightness})`;
}

function showPopup() {
    document.getElementById('popup').style.display = 'block';
}
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Helper to get users array from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Helper to save users array to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Login user function (now with password support)
function loginUser(username, password) {
    let users = getUsers();
    let user = users.find(u => u.username === username);
    if (!user) {
        // New user: save with password
        user = { username, password, highestTime: 0 };
        users.push(user);
        saveUsers(users);
    } else {
        // Existing user: check password
        if (user.password !== password) {
            // Don't use alert, just return false
            return false;
        }
    }
    loggedInUser = username;
    highestTime = user.highestTime;
    updateLeaderboardUser();
    return true;
}

// Display the logged-in user and their highest time under the leaderboard
function updateLeaderboardUser() {
    const userDiv = document.getElementById('leaderboard-user');
    const tableBody = document.querySelector('#leaderboard-table tbody');
    if (userDiv) {
        if (loggedInUser) {
            userDiv.textContent = `Logged in as: ${loggedInUser}`;
        } else {
            userDiv.textContent = '';
        }
    }
    // Show all users in the table, sorted by highest time
    if (tableBody) {
        const users = getUsers().sort((a, b) => b.highestTime - a.highestTime);
        tableBody.innerHTML = users.map(u => `
            <tr>
                <td>${u.username}</td>
                <td>${new Date(u.highestTime).toISOString().substr(11, 8)}</td>
            </tr>
        `).join('');
    }
}

// Update highest time if current session is greater
function updateHighestTime() {
    if (!stopwatchStartTime) return;
    const now = Date.now();
    const elapsed = now - stopwatchStartTime;
    if (elapsed > highestTime) {
        highestTime = elapsed;
        // Update user in users array
        let users = getUsers();
        let user = users.find(u => u.username === loggedInUser);
        if (user) {
            user.highestTime = highestTime;
            saveUsers(users);
        }
        updateLeaderboardUser();
    }
}

// Stop the stopwatch and update highest time when needed
function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        updateHighestTime();
    }
}

// Example: function to check if user is logged in
function isUserLoggedIn() {
    return loggedInUser !== null;
}

document.addEventListener('DOMContentLoaded', function() {
    showPopup();

    const errorMsg = document.getElementById('login-error');
    const popupForm = document.querySelector('#popup form');
    if (popupForm) {
        popupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            errorMsg.textContent = ""; // Clear previous error
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            if (!username) {
                errorMsg.textContent = "Please enter a username.";
                return;
            }
            if (!password) {
                errorMsg.textContent = "Please enter a password.";
                return;
            }
            // Try to login, only hide popup if successful
            if (loginUser(username, password)) {
                hidePopup();
            } else {
                errorMsg.textContent = "Password incorrect";
            }
        });
    }
    updateLeaderboardUser();
});

