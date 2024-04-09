const startButton = document.querySelector(".button-start");
const stopButton = document.querySelector(".button-stop");
const resetButton = document.querySelector(".button-reset");
const customButton = document.getElementById("customButton");
const session = document.querySelector(".minutes");
const bells = new Audio("./assets/bell.wav");
const openSettingsButtons = document.querySelectorAll("[data-setting-target]");
const closeSettingsButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
let interval;
let state = true;
let totalSeconds = 25 * 60;
let remainingSeconds;

//app timer when you press start
const appTimer = () => {
    if (state) {
        state = false;
        clearInterval(interval);
        interval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
    } 
}
//logic for updating the seconds
const updateSeconds = () => {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds/60);
    let secondsLeft = totalSeconds % 60;

     if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;

    } else {
        secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = minutesLeft;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(interval);
    } 
}
//stops the timer      
const stopTimer = () => {
    clearInterval(interval);
    state = true;
    
}
//resets the timer
const resetTimer = () => {
    clearInterval(interval);
    totalSeconds = 25 * 60 + 1;
    state = true;
    updateSeconds();
}

//logic for if user wants to input a custom time
const customTimeInput = () => {
    const customMin = parseInt(document.getElementById("customMin").value);
    const customSec = parseInt(document.getElementById("customSec").value);
    if (customMin >= 0 && customMin <= 500 && customSec >= 0 && customSec <= 59) {
        customButton.disabled = false;
    } else {
        customButton.disabled = true;
    }
}
//logic for when user submits their custom time, gets updates
const customTime = () => {
    clearInterval(interval);
     customMin = parseInt(document.getElementById("customMin").value);
     customSec = parseInt(document.getElementById("customSec").value);
     totalSeconds = customMin * 60 + customSec + 1;
     state = true;
     updateSeconds();
}

//logic for when the user clicks on the settings button
openSettingsButtons.forEach(button => {
    button.addEventListener("click", () => {
        const settings = document.querySelector(button.dataset.settingTarget);
        openSettings(settings);
    })
})
//logic for when the user closes the settings button
closeSettingsButtons.forEach(button => {
    button.addEventListener("click", () => {
        const settings = button.closest(".settings");
        closeSettings(settings);
    })
})

function openSettings(settings) {
    if (settings == null) 
        return
    
    settings.classList.add("active");
    overlay.classList.add("active");
}

function closeSettings(settings) {
    if (settings == null) return
        
    settings.classList.remove("active");
    overlay.classList.remove("active");
}


//event listeners
startButton.addEventListener("click", appTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
customMin.addEventListener("input", customTimeInput);
customSec.addEventListener("input", customTimeInput);
customButton.addEventListener("click", customTime);
