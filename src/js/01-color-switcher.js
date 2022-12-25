const body = document.querySelector('body');
const startBtn = body.querySelector('[data-start]');
const stopBtn = body.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', changeColorStart);
stopBtn.addEventListener('click', changeColorStop);
stopBtn.setAttribute('disabled', '');

function changeColorStop() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

function changeColorStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', '');
    stopBtn.removeAttribute('disabled');
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
