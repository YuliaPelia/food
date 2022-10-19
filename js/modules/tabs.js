function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {


    const tabs = document.querySelectorAll(tabsSelector), 
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
    function hideTabContent() {
        tabsContent.forEach(i => {
            i.classList.add('hide');
            i.classList.remove('show', 'fade'); 
        });

        tabs.forEach(tab => { 
            tab.classList.remove(activeClass); 
        });
    }
    function showTabContent(n = 0) {

        tabsContent[n].classList.add('show', 'fade'); 
        tabsContent[n].classList.remove('hide');
        tabs[n].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent(); 

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if(target && target.classList.contains(tabsSelector.slice(1))) { 

            tabs.forEach((tab, i) => {
                if(target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

export default tabs;