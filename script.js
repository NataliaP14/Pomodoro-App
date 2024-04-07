const startButton = document.querySelector(".button-start");
const stopButton = document.querySelector(".button-stop");
const session = document.querySelector(".minutes");
let interval;
let state = true;
let totalSeconds;
let remainingSeconds;


const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        totalSeconds = sessionAmount * 60;

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

                clearInterval(interval);
            } 
        }
        
        clearInterval(interval);
        interval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
    }
}

const stopTimer = () => {
    
    clearInterval(interval);
    state = true;
    
}

startButton.addEventListener("click", appTimer);
stopButton.addEventListener("click", stopTimer);