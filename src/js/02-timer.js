import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css"; 


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

let countdown;
let timer; 

startBtn.disabled = true;

function updateTimer() {
  const timeLeft = countdown - Date.now();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    clearInterval(timer);
    Notiflix.Notify.success('Countdown is over!');
    startBtn.disabled = false;
    return;
  }

  daysEl.textContent = days < 10 ? `0${days}` : days;
  hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
  minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startTimer() {
  countdown = new Date(datePicker.value).getTime();
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
}

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(correctDates) {
    if (correctDates[0] < Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  }
});

startBtn.addEventListener('click', startTimer);