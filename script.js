const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startbtn = document.getElementById('startbtn');
const stopbtn = document.getElementById('stopbtn');
const pausebtn = document.getElementById('pausebtn');
const resetbtn = document.getElementById('resetbtn');

const laplist = document.getElementById('laplist');

/// Stopwatch Variables

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startbtn.addEventListener('click', startTimer);
stopbtn.addEventListener('click', stopTimer);
pausebtn.addEventListener('click', pauseTimer);
resetbtn.addEventListener('click', resetTimer);

function startTimer() {

    interval = setInterval(updateTimer, 10);
    startbtn.disabled = true;
}

function stopTimer() {
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startbtn.disabled = false;
}

function pauseTimer() {
    clearInterval(interval);
    startbtn.disabled = false;
}

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startbtn.disabled = false;
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) { //// 1000 -> 1 seconds = 1000 milliseconds
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${laplist.childElementCount + 1}: </span>${lapTime}`;
    laplist.appendChild(listItem);
}