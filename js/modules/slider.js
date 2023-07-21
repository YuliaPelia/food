const slider = (
  slide,
  slidePrev,
  slideNext,
  sliderTotal,
  sliderCurrent,
  wrapper,
  inner,
  styleIndicatorsCss
) => {
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(slide);
  const prev = document.querySelector(slidePrev);
  const next = document.querySelector(slideNext);
  const total = document.querySelector(sliderTotal);
  const current = document.querySelector(sliderCurrent);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(inner);
  const width = window.getComputedStyle(slidesWrapper).width;
  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add(styleIndicatorsCss);

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
};

export default slider;
