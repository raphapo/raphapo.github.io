let brightness = 0.5;
let stopwatchInterval = null;
let stopwatchStartTime = null;

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

function changeBrightness(newBrightness){
    brightness +=1;
    const elem = document.getElementById("concrete1");
    elem.style.filter = `brightness(${brightness})`;
    startStopwatch();
    // Disable the button after first click
    const btn = document.querySelector('button[onclick="changeBrightness()"]');
    if (btn) btn.setAttribute('disabled', 'disabled');
}
function resetBrightness(newBrightness){
    brightness =0.5;
    const elem = document.getElementById("concrete1");
    elem.style.filter = `brightness(${brightness})`;

}

// Store logged-in user
let loggedInUser = null;
let highestTime = 0; // in milliseconds

function showPopup() {
    document.getElementById('popup').style.display = 'block';
}
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Display the logged-in user and their highest time under the leaderboard
function updateLeaderboardUser() {
    const userDiv = document.getElementById('leaderboard-user');
    const tableBody = document.querySelector('#leaderboard-table tbody');
    if (userDiv) {
        if (loggedInUser) {
            const time = new Date(highestTime).toISOString().substr(11, 8);
            userDiv.textContent = `Logged in as: ${loggedInUser} | Highest Time: ${time}`;
            // Update table
            if (tableBody) {
                tableBody.innerHTML = `
                  <tr>
                    <td>${loggedInUser}</td>
                    <td>${time}</td>
                  </tr>
                `;
            }
        } else {
            userDiv.textContent = '';
            if (tableBody) tableBody.innerHTML = '';
        }
    }
}

// Update highest time if current session is greater
function updateHighestTime() {
    if (!stopwatchStartTime) return;
    const now = Date.now();
    const elapsed = now - stopwatchStartTime;
    if (elapsed > highestTime) {
        highestTime = elapsed;
        updateLeaderboardUser();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Show popup immediately when the page loads
    showPopup();

    const popupForm = document.querySelector('#popup form');
    if (popupForm) {
        popupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            loggedInUser = username;
            highestTime = 0; // Reset for new user
            hidePopup();
            updateLeaderboardUser();
        });
    }
    updateLeaderboardUser(); // Show on page load if already set
});

// Example: function to check if user is logged in
function isUserLoggedIn() {
    return loggedInUser !== null;
}

// Stop the stopwatch and update highest time when needed
function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        updateHighestTime();
    }
}

// Optionally, call stopStopwatch() when you want to stop timing
// For example, you could add a "Stop" button and call stopStopwatch() on click

