let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true; 
let enteredTime = null;
let sessionType = "work";

function startTimer() {
    isPaused = false;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        if (sessionType === "work") {
            alert('Time is up! Take a 5 minute break.');
            sessionType = "break";
            minutes = 5;
            seconds = 0;
            startTimer();
        } else {
            alert('Break is over! Back to work.');
            sessionType = "work";
            minutes = enteredTime || 25;
            seconds = 0;
            startTimer();
        }
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.querySelector('.buttons button:nth-of-type(2)');
    if (!isPaused) {
        isPaused = true;
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

function restartTimer() {
    clearInterval(timer);
    sessionType = "work"; 
    minutes = enteredTime || 25;
    seconds = 0;
    isPaused = true;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);
    const pauseResumeButton = document.querySelector('.buttons button:nth-of-type(2)');
    pauseResumeButton.textContent = 'Resume';
}