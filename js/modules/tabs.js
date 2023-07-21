// tabs
const tab = (
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) => {
  const tabs = document.querySelectorAll(tabsSelector);
  const content = document.querySelectorAll(tabsContentSelector);
  const parent = document.querySelector(tabsParentSelector);
  // приховуєм таби
  const hideTabContent = () => {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  };

  // i - num show
  const showTabContent = (i = 0) => {
    content[i].classList.add("show");
    content[i].classList.add("fade");
    content[i].classList.remove("hide");

    tabs[i].classList.add(activeClass);
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
};
export default tab;
