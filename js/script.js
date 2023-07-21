import tab from "./modules/tabs";
import slider from "./modules/slider";
import calculator from "./modules/calculator";
import modal from "./modules/modal";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  tab(
    ".preview_tab-header-item",
    ".preview_tab",
    ".preview_tab-content",
    "preview_tab-header-item_active"
  );
  slider(
    ".offer__slide",
    ".offer__slider-prev",
    ".offer__slider-next",
    "#total",
    "#current",
    ".offer__slider-wrapper",
    ".offer__slider-inner",
    "offer-indicators"
  );
  calculator(".calculator_kall span");
  modal(".modal_btn", ".modal", ".modal .modal__close");
  timer(".day_timer", "title");
});

new WOW().init();
