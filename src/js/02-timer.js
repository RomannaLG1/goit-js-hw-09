import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
/* <input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button> */

const refs = {
  bodyEl: document.querySelector('body'),
  inputEl: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('button[data-start]'),
  daySpanEl: document.querySelector('span[data-days]'),
  hoursSpanEl: document.querySelector('span[data-hours]'),
  minutesSpanEl: document.querySelector('span[data-minutes]'),
  secondsSpanEl: document.querySelector('span[data-seconds]'),
};
refs.buttonEl.setAttribute('disabled', true);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
      return;
    }
    refs.buttonEl.removeAttribute('disabled');

    refs.buttonEl.addEventListener(
      'click',
      () => {
        const startTime = selectedDates[0];
    
        const timerId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          if (deltaTime < 0) {
            clearInterval(timerId);
          } else {
            refs.daySpanEl.textContent = `${days}`;
            refs.hoursSpanEl.textContent = `${hours}`;
            refs.minutesSpanEl.textContent = `${minutes}`;
            refs.secondsSpanEl.textContent = `${seconds}`;
          }
        });
      },
      1000
    );
  },
};

const fp = flatpickr('#datetime-picker', { ...options });

// options.onClose;
