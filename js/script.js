'use strict';


window.addEventListener("DOMContentLoaded", () => {

    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((tab, i) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fadeHigh', 'fadeLow');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fadeHigh');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    function startAnimation(funcHide, funcShow, n, sec) {
        tabsContent.forEach((tab, i) => {
            if (tab.classList.contains('show')) {
                console.log('hello');
                tab.classList.add('fadeLow');
            }
            setTimeout(function () {
                tabs[i].classList.remove('tabheader__item_active');
                funcHide();
                funcShow(n);
            }, sec);
        });
    }

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item') &&
        !target.classList.contains('tabheader__item_active')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    startAnimation(hideTabContent, showTabContent, i, 300);
                }
            });
        }
    });

    // timer
    const deadline = '2023-02-27',
        discount = '20%';
    let discountMonth;
    switch (+deadline.split('-')[1]) {
        case 1:
            discountMonth = 'січня';
            break;
        case 2:
            discountMonth = 'лютого';
            break;
        case 3:
            discountMonth = 'березня';
            break;
        case 4:
            discountMonth = 'квітня';
            break;
        case 5:
            discountMonth = 'травня';
            break;
        case 6:
            discountMonth = 'червня';
            break;
        case 7:
            discountMonth = 'липня';
            break;
        case 8:
            discountMonth = 'серпня';
            break;
        case 9:
            discountMonth = 'вересня';
            break;
        case 10:
            discountMonth = 'жовтня';
            break;
        case 11:
            discountMonth = 'листопада';
            break;
        case 12:
            discountMonth = 'грудня';
            break;
        default:
            discountMonth = 'місяця';
            break;
    }
    const lastActionDate = document.querySelectorAll('.promotion__descr span');
    lastActionDate[0].innerHTML = `${discount}`;
    lastActionDate[1].innerHTML = `${deadline.split('-')[2]} ${discountMonth}`;

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

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
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    // modal window
    const openModalBtn = document.querySelectorAll('[data-modal]'),
        closeModalBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerID);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    openModalBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerID = setTimeout(openModal, 2000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // food cards

    class FoodCard {
        constructor(picture, alt, title, descr, price, parentSelector, ...classes) {
            this.picture = picture;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.picture} alt=${this.alt}>
                <h3 class="menu__item-subtitle">
                    ${this.title}
                </h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Ціна:</div>
                    <div class="menu__item-total">
                        <span>${this.price}</span>грн/день
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new FoodCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фітнес"',
        'Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною і високою якістю!',
        9,
        '.menu .container',
        // 'menu__item',
        // 'big'

    ).render();

    new FoodCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Преміум”',
        'Меню “Преміум” - ми використовуємо не тільки красивий дизайн упаковки, але й якісне виконання страв. Червона риба, морепродукти, фрукти - ресторанне меню без походу в ресторан!',
        20,
        '.menu .container',
        'menu__item'
    ).render();

    new FoodCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Пісне"',
        'Меню “Пісне” - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, мигдалеве молоко, вівса, кокоса чи гречки, правильна кількість білків за рахунок тофу та імпортних вегетаріанських стейків.',
        16,
        '.menu .container',
        'menu__item'
    ).render();

    startAnimation(hideTabContent, showTabContent, 0, 0);
    setClock('.timer', deadline);

    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'загрузка',
        success: 'успіх',
        failure: 'невдача'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const r = new XMLHttpRequest();
            r.open("POST", 'server.php');
            // r.setRequestHeader('Content-type', 'multipart/form-data');

            const formData = new FormData(form);
            r.send(formData);
            r.addEventListener('load', () => {
                if (r.status === 200) {
                    console.log(r.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(()=>{
                        statusMessage.remove();
                    },2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }






});

//end