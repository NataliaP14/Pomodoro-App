const startButton = document.querySelector(".button-start");
const stopButton = document.querySelector(".button-stop");
const resetButton = document.querySelector(".button-reset");
const session = document.querySelector(".minutes");
const bells = new Audio("./assets/bell.wav");
const openSettingsButtons = document.querySelectorAll("[data-setting-target]");
const closeSettingsButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
let interval;
let state = true;
let totalSeconds = 25 * 60;
let remainingSeconds;


const appTimer = () => {
    if (state) {
        state = false;
        clearInterval(interval);
        interval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
    } 
}

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
        
const stopTimer = () => {
    clearInterval(interval);
    state = true;
    
}

const resetTimer = () => {
    clearInterval(interval);
    totalSeconds = 25 * 60 + 1;
    state = true;
    updateSeconds();
}

openSettingsButtons.forEach(button => {
    button.addEventListener("click", () => {
        const settings = document.querySelector(button.dataset.settingTarget);
        openSettings(settings);
    })
})

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

startButton.addEventListener("click", appTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

