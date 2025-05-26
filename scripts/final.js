let brightness = 0.5;
function changeBrightness(newBrightness){
    brightness +=1;
    const elem = document.getElementById("concrete1");
    elem.style.filter = `brightness(${brightness})`;
    
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

