window.addEventListener("DOMContentLoaded", () => {
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
});
