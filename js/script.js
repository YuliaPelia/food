window.addEventListener("DOMContentLoaded", () => {
  // tabs
  const tabs = document.querySelectorAll(".preview_tab-header-item");
  const content = document.querySelectorAll(".preview_tab");
  const parent = document.querySelector(".preview_tab-content");
  // приховуєм таби
  const hideTabContent = () => {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("preview_tab-header-item_active");
    });
  };

  // i - num show
  const showTabContent = (i = 0) => {
    content[i].classList.add("show");
    content[i].classList.add("fade");
    content[i].classList.remove("hide");

    tabs[i].classList.add("preview_tab-header-item_active");
  };

  hideTabContent();
  showTabContent();

  parent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("preview_tab-header-item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Slider

  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slidesWrapper).width;
  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("offer-indicators");

  slidesWrapper.append(indicators);

  function createDot(i) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    return dot;
  }

  function updateSlideIndexText() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function updateDotOpacity() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  for (let i = 0; i < slides.length; i++) {
    const dot = createDot(i);
    indicators.append(dot);
    if (i === 0) {
      dot.style.opacity = 1;
    }
    dots.push(dot);
  }

  total.textContent = `0${slides.length}`;
  updateSlideIndexText();

  slidesField.style.width = 100 * slides.length + "%";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    updateSlideIndexText();
    updateDotOpacity();
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    updateSlideIndexText();
    updateDotOpacity();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;
      updateSlideIndexText();
      updateDotOpacity();
    });
  });
  let touchStartX = 0;
  let touchEndX = 0;

  slidesField.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slidesField.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const minSwipeDistance = 50;

    if (touchStartX - touchEndX > minSwipeDistance) {
      // Свайп вліво
      nextSlide();
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      // Свайп вправо
      prevSlide();
    }
  }

  function nextSlide() {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    updateSlideIndexText();
    updateDotOpacity();
  }

  function prevSlide() {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    updateSlideIndexText();
    updateDotOpacity();
  }

  // calculator
  const result = document.querySelector(".calculator_kall span");

  let sex, height, weight, age, ratio;
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = "fema";
    localStorage.setItem("sex", "female");
  }
  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }
  };

  calcTotal();

  const getStaticInfo = (parentSelector, activeClass) => {
    const elements = document.querySelectorAll(`${parentSelector} button`);
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  };

  getStaticInfo("#gender", "calculator_btn-active");
  getStaticInfo(".calculator_change", "calculator_btn-active");

  const getDynamicInfo = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  };
  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");

  //modal
  let btnPressed = false;

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      header = document.querySelector(".header"),
      scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = "none";
          item.classList.add("animate__animated", "animate__fadeIn");
        });
        header.style.overflowY = "";
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });
      header.style.overflowY = "";
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        header.style.overflowY = "";
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener("scroll", () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      if (
        !btnPressed &&
        window.pageYOffset + document.documentElement.clientHeight >=
          scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal(".modal_btn", ".modal", ".modal .modal__close");

  // timer

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

  // const deadline = "2023-12-11";

  // function getTimeRemaining(endtime) {
  //   const t = Date.parse(endtime) - Date.parse(new Date()),
  //     days = Math.floor(t / (1000 * 60 * 60 * 24)),
  //     seconds = Math.floor((t / 1000) % 60),
  //     minutes = Math.floor((t / 1000 / 60) % 60),
  //     hours = Math.floor((t / (1000 * 60 * 60)) % 24);

  //   return {
  //     // total: t,
  //     // days: days,
  //     // hours: hours,
  //     // minutes: minutes,
  //     // seconds: seconds,
  //     t,
  //     days,
  //     hours,
  //     minutes,
  //     seconds,
  //   };
  // }

  // function getZero(num) {
  //   if (num >= 0 && num < 10) {
  //     return "0" + num;
  //   } else {
  //     return num;
  //   }
  // }

  // function setClock(selector, endtime) {
  //   const timer = document.querySelector(selector),
  //     days = timer.querySelector("#days"),
  //     hours = timer.querySelector("#hours"),
  //     minutes = timer.querySelector("#minutes"),
  //     seconds = timer.querySelector("#seconds"),
  //     timeInterval = setInterval(updateClock, 1000);

  //   updateClock();

  //   function updateClock() {
  //     const t = getTimeRemaining(endtime);

  //     days.innerHTML = getZero(t.days);
  //     hours.innerHTML = getZero(t.hours);
  //     minutes.innerHTML = getZero(t.minutes);
  //     seconds.innerHTML = getZero(t.seconds);

  //     if (t.total <= 0) {
  //       clearInterval(timeInterval);
  //     }
  //   }
  // }

  // setClock(".day_timer", deadline);
});

new WOW().init();
