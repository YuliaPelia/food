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
  slider();
  calculator();
  modal();
  timer();
});

new WOW().init();
