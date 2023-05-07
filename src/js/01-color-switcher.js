startEl = document.querySelector('[data-start]');
stopEl = document.querySelector('[data-stop]');
let timerId = null;

startEl.addEventListener('click', changeColor);
stopEl.addEventListener('click', () => {
  clearInterval(timerId);
  startEl.disabled = false;
  //   console.log(`Interval with id ${timerId} has stopped!`);
});

function changeColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startEl.disabled = true;
    // console.log(timerId);
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
