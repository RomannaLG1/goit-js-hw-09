/* <button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button> */

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyEl: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startGenerateColor);
refs.stopBtn.addEventListener('click', stopGenerateColor);

let colorChangeId = null;

function startGenerateColor() {

  refs.startBtn.setAttribute('disabled', false);
  refs.bodyEl.style.backgroundColor = getRandomHexColor();//Перше присвоєння, щоб не було паузи 
  colorChangeId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
    console.log(1);
  }, 1000);
}

function stopGenerateColor() {
  clearInterval(colorChangeId);
  refs.startBtn.removeAttribute('disabled');
}
