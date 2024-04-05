const startButton = document.querySelector(".button-start");
const session = document.querySelector(".minutes");
let interval;
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
                
        }
        interval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
    }
}