import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayEl = document.querySelector('[name="delay"]');
const delayStepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

const form = document.querySelector('form');
form.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function formSubmit(event) {
  event.preventDefault();
  const amount = Number(amountEl.value);
  let delay = Number(firstDelayEl.value);
  const step = Number(delayStepEl.value);
  let position = 1;
  for (let i = 0; i < amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    position += 1;
    delay += step;
  }
}
