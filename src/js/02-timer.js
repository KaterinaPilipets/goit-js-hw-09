import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysTimer = timer.querySelector('[data-days]');
const hoursTimer = timer.querySelector('[data-hours]');
const minutesTimer = timer.querySelector('[data-minutes]');
const secondsTimer = timer.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', startTimer);

function startTimer() {
  const finishData = new Date(document.querySelector('#datetime-picker').value);
  setInterval(() => {
    const timerValue = convertMs(finishData - new Date());

    daysTimer.textContent = addLeadingZero(timerValue.days);
    hoursTimer.textContent = addLeadingZero(timerValue.hours);
    minutesTimer.textContent = addLeadingZero(timerValue.minutes);
    secondsTimer.textContent = addLeadingZero(timerValue.seconds);
  }, 1000);

  //   console.log(timerValue.days);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
