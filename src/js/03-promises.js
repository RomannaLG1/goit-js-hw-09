import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleSubmit);

function createPromise(position, newDelay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
      if (shouldResolve) {
    return resolve({position, newDelay});
  } else {
    return reject({position, newDelay});
  }
  })

}

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delayValue = Number(delay.value);
  stepValue = Number(step.value);
  amountValue = Number(amount.value);

  let position = null;

  for (let index = 0; index <= amountValue; index++) {
    position = index;
    const firstDelay = delayValue;
    let newDelay = (delayValue += stepValue);

    createPromise(position, firstDelay, newDelay)
      .then(({ position, newDelay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${newDelay}ms`
          );
        }, newDelay);
      })
      .catch(({ position, newDelay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `❌ Rejected promise ${position} in ${newDelay}ms`
          );
        }, newDelay);
      });
  }
}


