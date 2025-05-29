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
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

