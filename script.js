const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errorCount = 0;
var letterCount = 0;

// Add leading zero to numbers below 10 (purely for aesthetics):
function leadingZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTimer = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`
  theTimer.innerHTML = currentTimer;
  timer[3]++;
  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length)
  letterCount ++;
  if(textEntered == originText) {
    testWrapper.style.borderColor = "#40CC90";
    clearInterval(interval);
    let typingSpeed = letterCount / (timer[0] * 60 + timer[1])  * 60;
    alert(`You finished the test doing ${errorCount} mistakes. Your typing speed is ${Math.round(typingSpeed)} letter per minute.`)
    reset()
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCF5";
    } else {
      testWrapper.style.borderColor = "#EE5500"
      errorCount ++;
    }
  }
}

// Start the timer:
function start() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }

}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00"
  testWrapper.style.boderColor = "grey";
  errorCount = 0;
  letterCount = 0;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false)
resetButton.addEventListener("click", reset, false)