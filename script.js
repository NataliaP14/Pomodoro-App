const startButton = document.querySelector(".button-start");
const stopButton = document.querySelector(".button-stop");
const resetButton = document.querySelector(".button-reset");
const session = document.querySelector(".minutes");
const bells = new Audio("./assets/bell.wav");
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


startButton.addEventListener("click", appTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

