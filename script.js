const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");
const outerCircle = document.querySelector(".outer-circle");

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let isFirstStart = true;
let laps = [];

function generateRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

// function changeOuterCircleColor() {
//     outerCircle.style.background = generateRandomColor();
// }

function formatTime(milliseconds) {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const ms = Math.floor((milliseconds % 1000) / 10);

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
		.toString()
		.padStart(2, "0")}`;
}

function startTimer() {
	if (!isRunning) {
		if (isFirstStart) {
			startTime = Date.now() - elapsedTime;
			isFirstStart = false;
			startBtn.textContent = "Resume";
		} else {
			startTime = Date.now() - elapsedTime;
		}

		timerInterval = setInterval(() => {
			elapsedTime = Date.now() - startTime;
			display.textContent = formatTime(elapsedTime);
			changeOuterCircleColor();
		}, 10);
		isRunning = true;
	}
}

function pauseTimer() {
	if (isRunning) {
		clearInterval(timerInterval);
		isRunning = false;
	}
}

function resetTimer() {
	clearInterval(timerInterval);
	display.textContent = "00:00:00.00";
	elapsedTime = 0;
	isRunning = false;
	isFirstStart = true;
	startBtn.textContent = "Start";
	laps = [];
	lapList.innerHTML = "";
	outerCircle.style.background = "transparent";
}

function recordLap() {
	if (isRunning) {
		laps.push(elapsedTime);
		const lapItem = document.createElement("div");
		lapItem.innerHTML = `<span>Lap ${laps.length}</span><span>${formatTime(
			elapsedTime
		)}</span>`;
		lapList.prepend(lapItem);
	}
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
