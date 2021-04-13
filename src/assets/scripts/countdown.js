function getTimeRemaining(deadline) {
  const total = Date.parse(deadline) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id) {
  const clock = document.getElementById(id);
  if (clock) {
    const deadline = clock.getAttribute('data-deadline');
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      const t = getTimeRemaining(deadline);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        const collectingCTA = document.getElementsByClassName('collecting');
        const countdownInfo = clock.parentElement;
        countdownInfo.classList.add('hidden');

        if (collectingCTA) {
          collectingCTA[0].classList.remove('hidden');
        }

        clearInterval(timeinterval);
      }
    }
    const timeinterval = setInterval(updateClock, 1000);
    updateClock();
  }
}

initializeClock('countdown-clock');