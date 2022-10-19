/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

    // Calc

    // 1. Створ змінну в якій присвоюємо елемент зі сторінки на якому буде виводитися результат
    const result = document.querySelector('.calculating__result span');


    // 2. Створюємо ще 5 змінних через let стать, ріст, вага, вік, коефіцієнт активності
    let sex, height, weight, age, ratio;

    // 5. для того щоб скрипт зразу відпрацьовував і користувач не нажимав на зелені блоки ще раз
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        // 1) беремо діви 1 і 3 блоку і будемо їх перебирати
        // 2) забрати класи активності зі всіх блоків щоб вони спочатку були чистими а потім назначити клас активності тому елементу який відповідає значенням з localStorage
        elements.forEach(elem => {
            // видаляєм клас активності
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // 3. Розбиваєм функціонал калькулятора на декілька частин 
    // 1) загальна функція яка буде займатись підрахунками (головна формула зі статті в якій є всі дані)
    // 2) окремі функціональності для получення значень з цих елементів (в 1 і 3 блоці буде одна ф-ція, яка буде брати з div значення, друга ф-ція буде працювати з imput в 2 блоці)

    // розрахунки по формулі (1 ф-ція)й
    // ця ф-ція буде запускатись кожен раз коли виконується якась зміна
    function calcTotal() {
        // починаємо з перевірки чи всі дані заповнені
        if(!sex || !height || !weight || !age || !ratio) {
            // якщо хоча б один з цих елементів не заповнений тоді ми не будемо розраховувати
            result.textContent = "____";
            return;
        }
        if (sex === 'female') {
            // якщо стать є жіноча (ми це будемо получати зі сторінки)
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    // Math.round - округляє до блищого цілого числа
    calcTotal();
    // створюєм ф-цію по полученню даних статичного контенту

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        // відслідковування кліків по батьківському елементу 
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // якщо в блока на який ми клікнули є певний атрибут data- , тоді ми змінюємо змінну ratio, якщо в нього немає такого атрибуту тоді ми беремо id
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    //якщо користуавч клікнув на кнопку умереная активность ми взяли і витягнули ту активність яка в нього стоїть в data - атрибуті потім якщо ми клікнули в низьку активність в нас перекоючається значення (при кліканні на іншу активність)
                    // при цьому якщо ми клікаєм на стать то там такого атрибуту нема і наша умова спрацьовувати не буде
                    // працюємо з локальним сховищем, що б при кожному перезаході на цей сайт в користувача запамятовувались вибрані параметри (стать, та рівень активності)
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    // те саме робимо і для статі
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
    
            
        
                // якщо в блока на який ми клікнули є певний атрибут data- , тоді ми змінюємо змінну ratio, якщо в нього немає такого атрибуту тоді ми беремо id
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    //якщо користуавч клікнув на кнопку умереная активность ми взяли і витягнули ту активність яка в нього стоїть в data - атрибуті потім якщо ми клікнули в низьку активність в нас перекоючається значення (при кліканні на іншу активність)
                    // при цьому якщо ми клікаєм на стать то там такого атрибуту нема і наша умова спрацьовувати не буде
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            
            });
        });

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // створити ф-цію яка буде обробляти кожен окремий imput
    // створити тільки одну ф-ція яка буде навішуватись на певний імпут і виконувати певну дію
    function getDynamicInformation(selector) {
        const  input = document.querySelector(selector);
        
        // навішує на цей інпут обробника події, щоб відслідковувати коли користувач вводить щось (в 2 блок)
        input.addEventListener('input', () => {
            // робимо так щоб коли користувач ввів букву замість цифри блок підсвічувався червоним
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            // тепер чітко вказуємо що будем робити коли користувач щрсь вводить
            // треба перевірити чи це буде ріст / вага / вік використовуємо switchcase - для того щоб перевірити відповідність рядка
            switch(input.getAttribute('id')) {
                case 'height':
                height = +input.value;
                break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
 // Використовуєм класи для карточок

    // 1. Для створення класу карточки товару нам знадобиться:
    // 1) src картинки
    // 2) альтернативний текст (alt) який буде підгружатись якщо картинка не загрузиться
    // 3) title (заголовок картинки)
    // 4) опис
    // 5) ціна (price)
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            // 2. Властивості які знадобляться на даному етапі
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // DOM - елемент
            this.transfer = 36;
            this.changeToUAH();
        }

        // 3. Створюєм метод по конвертації валют
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        // 4. Формування верстки
        // 1) створити елемент
        // 2) в нього помістити певну верстку
        // 3) доповнити верстку даними які приходять як аргументи 
        // 4) помістити цей елемент на сторінку
        render() {
            const element = document.createElement('div');


            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            // - допомагає динамічно сформувати цю структуру
            element.innerHTML = ` 
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }


    // 1 варіант
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // викор синтаксис деструктуризації обєкта
                // деструктуризація обєкта - це коли з обєкта витягаєм окремі властивості в якості окремої змінної
            });
        });
    // 2 варіант
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
    // Forms

    // 1) Створюєм змунну, щоб получити всі форми по тегу form
    const forms = document.querySelectorAll(formSelector);

    // 3) Створюєм об'єкт з повдомленнями які будуть показуватися в різних ситуаціях
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякую, скоро ми з вами звяжемося',
        failure: 'Щось пішло не так...'
    }; 

    // 4) підвязуємо під всі форми postData
    forms.forEach(i => { 
        bindPostData(i);
    });

    // function expresion - це функції, які створюються в потоці коду (виглядають як присвоєння в звичайну змінну)
    // 2) Створюєм функцію яка буде відповідати за привязку постингу
        function bindPostData(form) { 
            // спрацьовує кожен раз коли ми намагаємся відправити якусь форму
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // віжміняєм стандартну поведінку браузера

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
                `;
                statusMessage.textContent = message.loading; // виводиться коли йде загрузка
                // відправляєм statusMessage на сторінку
                form.insertAdjacentElement('afterend', statusMessage);



                // зробити так щоб всі дані які заповнив користувач ми получили в js
                // відправка даних з форми
                // form Data - це спеціальний об'єкт, який дозволяє з певної форми сформувати всі дані які заповнив 
                // користувач, вона формує також формат ключ-значення
                // завжди перевіряй атрибут name у форм в html
                // налаштовуєм заголовки які будуть казати серверу що саме приходить
                // request.setRequestHeader('Content-type', 'application/json');
                const formData = new FormData(form); 
                const json = JSON.stringify(Object.fromEntries(formData.entries()));


                // відправка даних сучасніший спосіб
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // data - це ті дані які повертаються з промісу(які вернув сервер)
                    showThanksModal(message.success); // виводиться коли все успішно пройшло
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure); // виводиться коли все успішно пройшло

                }).finally(() => {
                    form.reset(); // очистка форми
                });
                // тепер опрацьовуєм результат нашого запиту

                // request.send(json); // відправили дані на сервер
                // request.addEventListener('load', () => { // load-відслідковуєм кінцеву загрузку нашого запиту
                //     if(request.status === 200) { // перевіряєм чи доюре дані пішли на сервер
                //         console.log(request.response);
                //         showThanksModal(message.success); // виводиться коли все успішно пройшло
                //         form.reset();
                //         statusMessage.remove();
                        
                //     } else {
                //         showThanksModal(message.failure); // виводиться коли все успішно пройшло
 
                //     }

                // });
                // 1) зробити очощення форми коли завантажились дані
                // 2) зробити щоб через декілька секунд повідомлення пропадало
                
            });
    }
    // 1. зробити модальні вікна з подякою після заповнення модального вікна
     function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); 

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        // поміщаєм наше повідомлення на сторінку
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';   
    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId); // 2 якщо користувач вже відкрив вікно, тоді його більше не буде показувати
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal
    // 1. В HTML знайти кнопки які будуть відповідати за виклик модального вікна і назначити їм data-атрибути (open)
    // назначити data-атрибути тим класам які будуть закривати модальні вікна (close) 
    // тепер ці атрибути будемо використовувати в скрипті
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    // 2. Створюємо 2 ф-ції: 
    // 1) відповідає за відкриття модальних вікон (коли клікаєш на кнопку відкривається модальне вікно)
    // 2) відповідає за закриття модальних вікон
    // 3. При відкритті модального вікна зафіксувати сторінку так щоб вона не прогортувалась
    // 4. Перебрати всі кнопки які відповідають за виклик модального вікна 
    // (щоб коли користувач нажимав на ці кнопки відкривалось модальне вікно)
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // () => openModal(modalSelector) - для того щоб ф-ція зразу не викликалась
    });
    // modalTrigger.addEventListener('click', () => {
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden'; // - 3 зупиняє прогортування сторінки (скрол)
    // });
    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = ''; 
    // 3 - при закритті модального вікна прогортування (скрол) буде знову працювати
    // });

    // 5. Зробити так щоб модальне вікно закривалось при кліку за його межами (подложка), або по кліку на клавішу esc
    // щоб закривалось при кліку за межою модульного вікна

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });
    // щоб закривалось при натисканні на клавішу esc
    document.addEventListener('keydown', (e) => {
        // об'єкт подій (e) має властивості відслідковування натискання різних клавіш на клавіатурі
        // та count(код нашої клавіші) 
        // 6. Зробити так щоб модальне вікно реагувало на клавішу esc тільки коли воно відкрите

        if(e.code === "Escape" && modal.classList.contains('show')) {
                                    // 6 чи є клас show в модального відкна, тобто чи показане воно
            closeModal(modalSelector);
        }
    });
    // 7. Зробити так щоб коли користувач догортав сайт до кінця появлялось модальне вікно через певний проміжок часу
    // 1) створюєм setTimeout - для того щоб модальне вікно відкрилось черех певний проміжок часу
    // 2) якщо користувач вже відкривав модальне вікно тоді modalInterval відмінити, для цього в ф-ції openModal подив.
    // коли користувач долистав сторінку до кінця йому покажу модальне вікно
    // для того щоб відслідкувати як скролить сторінку користувач ми використовуєм подію яка називається scroll
    // scroll вішається на глобальний об'єкт window
    // pageYOffset - відслідковує скільки px зверху прогортав користувач по осі Y
    // scrollHeight -  получаєм повну висоту певного елемента з врахування прогортування зверху і видної частини
    
    function showModalByScroll() {
            // видна частина (частина яку ми бачимо) без прокрутки 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            // для того щоб модальне вікно відкривалось тільки один раз при догортуванні до кінця сторінки
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider
    // простіший варіант слайдера 
    // // 1) Створюєм змінні з ементами з HTML
    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');
    
    // // 2) Створюєм індекс, який буде визн теперішній слайд
    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // // 3) Створ ф-цію по показу та приховуванню слайдів
    // function showSlides(n) {
    //     // 1. Встанов граничні значення, щоб показувати тільки к-сть слайдів які є
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     // 2. Якщо n < 1, то ми переходимо в самий кінець 
    //     if(n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     // 3. Приховування слайдів 
    //     slides.forEach((i) => i.style.display = 'none'); 
        
    //     // 4. Показує той слайд який цікавить/підходить
    //     slides[slideIndex - 1].style.display = 'block';
        

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    // // 4) Змінює slideIndex, коли гортаєш слайдер вперед збільшужм на 1, коли гртаєм слайдер назад - зменшуєм на 1
    // function plusSlider(n) {
    //     showSlides(slideIndex += n);
    // }
    // // 5) Назначаєм обробників подій на prev і next
    // prev.addEventListener('click', () => {
    //     plusSlider(-1)
    // });
    // next.addEventListener('click', () => {
    //     plusSlider(1);
    // });

    // складніший варінт слайдера
    // 1) Створюєм змінні з ементами з HTML
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container), // для dots
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper), // головна обгортка
          slidesField = document.querySelector(field), // цей inner ми добавили і обгорнули наші класи з img
          // для того щоб знати скільки місця звймає головний блок (wrapper)
          width = window.getComputedStyle(slidesWrapper).width;
    
    // 2) Створюєм індекс, який буде визн теперішній слайд
    let slideIndex = 1;

    // для того щоб їх зміщувати створюємо орієнтир
    let offset = 0; // - відступ


    // працюємо з нумерацією (цифрами), щоб коли ми прогортували слайди цифри змінювали по рахунку
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`; 
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;

    }

    // 3) Пишемо функціонал на якому буде будуватися наш слайдер
    // * для того щоб ми всі слайди які є на сторінці могли помісти всередину slidesField
    slidesField.style.width = 100 * slides.length + '%';
    // * добавляємо ще стилі до inner щоб всі слайди вистроїлись в лінійку
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // * обмежуємо в wrapper к-сть показу слайдів
    slidesWrapper.style.overflow = 'hidden';

    // * фіксуємо по ширині і висоті
    slides.forEach(slide => { // кожному слайду встановлюєм певну ширину
        slide.style.width = width;
    });

    function dotsStyle() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function slidesCurrent() {
        
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function slidesTransform() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
    // dots
    // для dots встановлюєм position: relative
    slider.style.position = 'relative';

    // створюємо обгортку для всіх крапок і стилізуємо її 
    const indicators = document.createElement('ol'),
          dots = [];  
    indicators.classList.add('carousel-indicators'); // назначаєм йому клас
    // стилізуємо блок
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    // поміщаєм цю обгортку всередину слайдера
    slider.append(indicators);
    // створюєм від к-сть слайдів к-сть крапок
    for(let i = 0; i < slides.length; i++) {
        // створюєм тут всередині крапки 
        const dot = document.createElement('li');
        // встановлюємо атрибут який буде давати зрозуміти що 1 крапка - 1 слайд
        dot.setAttribute('data-slide-to', i + 1); // це озн що кожній крапці буде встановлюватись 
        // атрибут data-slide-to (тобто до якого слайду вона буде належати), і будем встоновлювати нумерацію почитаючи з 1 (i + 1)
        // красива стилізація крапки
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // добавляєм клас активності
        if( i == 0) {
            dot.style.opacity = 1; // виділяє першу крапку
            // коли користувач переключає слайди потрібно щоб мінявся клас активності

        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    // створюєм обробника подій щоб пересувати слайдер
    // робить прогортування слайди при натисканні на next (що на сторінці)
    next.addEventListener('click', () => {
        // створюєм механізм зміни offset і його перевірки
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            // 1) необхідно width перетворити в числовий тип даних (добавити до нього унарний +)
            // 2) відрізати 2 останніх символа (викристовуючи метод slice() який вирізає певний кусочок рядка)
            offset = 0;
        } else { // якщо це не останній слайд
            offset += deleteNotDigits(width);
        }

        slidesTransform();

        // для того щоб контролювати slideIndex 
        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slidesCurrent();

        dotsStyle();
    });

    // тепер робим те саме для кнопки prev
    prev.addEventListener('click', () => {
        if (offset == 0) {
            // коли ми дізнались що зараз в нас перший слайд, переміщуємся в самий кінець
            offset = deleteNotDigits(width) * (slides.length - 1);
            // видаляєм всі не числа
        } else { // якщо це не перший слайд
            offset -= deleteNotDigits(width);
        }

        slidesTransform();
        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        slidesCurrent();
        
        dotsStyle();
    });

        // dot's
    // робимо навігацію на сайті
    // 1) необхідно получити як елемент весь слайдер і встановити йому position: relative
    // 2) створити обгортку для крапок 
    // 3) зробити так щоб кількість крапок бу ла рівна к-сті слайдів (за допомогою перебираючого метода)
    // 4) втановити кожній крапці конкретний атрибут для того щоб розуміти що 1 крапка веде до 1 слайда 4 кнопка до 4 слайда
    // 5) зробити їм клас активності щоб розуміти який слайд зараз активний
    // 6) при кліканні на певну з крапок ми будем переміщуватись на відповідний слайд   

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesTransform();
            slidesCurrent();
            

            dotsStyle();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    // Що необхідно зробити: 
    // 1) функція яка буде приховувати непотрібні таби
    // 2) показати потрібний Tab
    // 3) назначити обробника подій на меню яке і буде маніпулювати цими функціями
    // добавимо css-анімацію щоб картинки переключались плавно (для цього необхідні css класи)

    // 1. Получити змінні з якими будем взаємодіяти
    const tabs = document.querySelectorAll(tabsSelector), // ті вкладки на які ми будемо клікати (фітнес, пісне)
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector); // батько який зберігає в собі всі таби
    // 2. Створюємо функцію яка буде приховувати всі непотрібні таби
    function hideTabContent() {
        // приховуєм весь контент який є на сайті
        tabsContent.forEach(i => {
            // з css стилів які там добавили
            i.classList.add('hide');
            i.classList.remove('show', 'fade'); // fade - для того щоб плавно скривати (в css стилях)
        });
        // працюємо з класом активності (active), коли ми приховуємо всі таби з видимості,
        // тоді будемо забирати клас активності у всіх табів які там знаходяться
        tabs.forEach(tab => { // звертаємся до кожного окремого таба
            tab.classList.remove(activeClass); // будем у кожного з елементів табів видаляти клас (active)
        });
    }
    // 3. Створюємо функцію яка буде показувати нам таби
    function showTabContent(n = 0) {
        // з css стилів які там добавили
        // клас fade відповідє за анімацію щоб слайди плавно переключались
        tabsContent[n].classList.add('show', 'fade'); // пояснюєм до якого елементу ми будем звертатися
        tabsContent[n].classList.remove('hide');
        tabs[n].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent(); // 0 означає що ми на початку передаємо перший слайд

    // 4. визначити делегування подій і назначити  обробника події кліку
    tabsParent.addEventListener('click', (e) => {
        // коли ми часто будем використовувати e.target ми можемо його оприділити в певну змінну
        const target = e.target;
        // будем оприділяти задопомогою contains чи ми точно клікнули в таб
        if(target && target.classList.contains(tabsSelector.slice(1))) { // tabsSelector.slice(1) видаляє крапку в селектора
            // коли ми клікаєм на певний елемент нам необхіжно оприділити його номер в списку всіх наших табів
            // і по цьому номеру викликати функцію яка буде показувати нам необхідний таб (showTabContent)
            // робиться це звичайним перебором 
            tabs.forEach((tab, i) => { // tab - це кожний таб який будем перебирати. i - номер елемента попорядку
                if(target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer


    // 2. Створюєм функцію яка буде оприділяти різницю між дедлайном(кінуевою датою) і теперішнім часом
    // функція буде приймати в себе кінцувий час
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // Data.parse - перетворює рядок в числовий, в ньому ми получимо к-сть мілісек, яке буде в нашому кінцевому часі
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
        // тепер цю різницю в млсек необхідно перетворити в к-сть днів, год, хв, сек
        // к-сть днів які будуть відображатись в нашому таймері:
        // Math.floor() - це округлення до ближньго цілого

    
        // 3. Для того щоб повурнути ці змінні на зовні використовуєм
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            
        };

    }
    function getZero(num) { // 1
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // 4. Створюємо ф-цію яка буде встановлювати цей таймер на сторінку
    function setClock(selector, endtime) { // 2
        // Для того щоб налаштувати наш таймер нам знадобиться: 
        // 1) головний елемент на сторінці 
        // 2) дедлайн в який ми будем його передавати
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); // 2
        // 5. Створюєм ф-цію, яка буде оновлювати таймер кожну секунду
        function updateClock() {
            // 1) розрахунок часу який залишився прямо в цю секунду
            const t = getTimeRemaining(endtime);
            // 2) помістити розрахункові величини на сторінку
            days.innerHTML = getZero(t.days); // доставляємо ф-цію getZero щоб коли числа менше 10 до них підставлявся 0
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // 3) запускати ф-цію updateClock кожну секунду (прописати вище TimeInterval)
            // 4) в майбутньому коли час вийде потрібно щоб цей таймер зупинився

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    // 1) зробити щоб перші два значення коли вони однозначні(тобто в них одна цифра) то до них підставлявся 0
    // напириклад: 08 днів, 09 годин
    // 2) зробити так щоб НЕ було мигання дати на сторінці (спочатку підставляються значення з верстки а потім з js)
    // для того щоб це зробити треба викликати ф-цію updateClock в самому початку (перед самою ф-цією updateClock) 
    setClock(id, deadline);



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
// змінна яка буде відповідати за постинг даних (коли ми відправляєм їх на сервер)
const postData = async (url, data) => {
    const res = await fetch(url, { // це все асинхронний код (ми не знаєм через скільки часу вернеться відповідь від сервера) не чекає інший код
        method: "POST", // яким чином
        headers: {
            'Content-type': 'application/json'
        }, // для того щоб відправити в форматі json
        body: data // що саме
    });
    // fetch - повертає проміс з який потрібно обробити
    return await res.json(); // це проміс
    // зробити так щоб асинхроний код перетворювався в синхронний (для цього викор оператори async, await)
};

async function getResource (url) {
    let res = await fetch(url); // це все асинхронний код (ми не знаєм через скільки часу вернеться відповідь від сервера) не чекає інший код

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); 
    // зробити так щоб асинхроний код перетворювався в синхронний (для цього викор оператори async, await)
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");





  



// 1. Назначаєм глобального обробника подій DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-01-01');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow:'.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner', 
        slide: '.offer__slide'
        
    });
    
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map