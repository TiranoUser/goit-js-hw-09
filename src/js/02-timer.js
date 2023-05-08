// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');

const startEl = document.querySelector('[data-start]');
startEl.setAttribute('disabled', true);

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let promotionDate = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (Date.now() > selectedDates) {
      Notify.failure('Please choose a date in the future');
      startEl.setAttribute('disabled', true);

      //   window.alert('Please choose a date in the future');
    } else {
      startEl.removeAttribute('disabled');
      promotionDate = selectedDates;
    }
  },
};

const timer = {
  render() {
    const deltaTime = convertMs(promotionDate - Date.now());

    daysEl.textContent = addLeadingZero(deltaTime.days);
    hoursEl.textContent = addLeadingZero(deltaTime.hours);
    minutesEl.textContent = addLeadingZero(deltaTime.minutes);
    secondsEl.textContent = addLeadingZero(deltaTime.seconds);
  },
  start() {
    const timeId = setInterval(() => {
      timer.render();
      const deltams = promotionDate - Date.now();

      if (deltams < 1000) {
        Notify.success('Time is over');
        clearInterval(timeId);
      }
    }, 1000);
  },
};

inputEl.addEventListener('focus', () => {
  flatpickr(inputEl, options);
});

startEl.addEventListener('click', () => {
  // timer.render();
  timer.start();
  startEl.setAttribute('disabled', true);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
