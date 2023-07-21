const timer = () => {
  const deadline = "2022-12-11";

  const getTimeRemaining = (endtime) => {
    const timer = document.querySelector(".day_timer");
    const title = document.getElementById("title");
    const t = Date.parse(endtime) - Date.parse(new Date());

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);
    if (t <= 0) {
      // (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
      timer.style.display = "none";
      title.innerHTML = "Акція закінчилась";
    }
    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };
  setClock(".day_timer", deadline);
};

export default timer;
