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
        //closeModalBtn = document.querySelector('[data-close]'),
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

    // closeModalBtn.addEventListener('click', () => {
    //     closeModal();
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerID = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    startAnimation(hideTabContent, showTabContent, 0, 0);
    setClock('.timer', deadline);

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
            this.transfer = 40;
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

    const getResources = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu').then(obj => {
        obj.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // getResources('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">
    //             ${title}
    //         </h3>
    //         <div class="menu__item-descr">
    //             ${descr}
    //         </div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Ціна:</div>
    //             <div class="menu__item-total">
    //                 <span>${price}</span>грн/день
    //             </div>
    //         </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }


    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        success: 'успіх',
        failure: 'невдача'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showMyModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showMyModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }

    function showMyModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //slider

    let sliderCounter = 1;
    let sliderCounterMax = 0; 
    axios.get("http://localhost:3000/slides").then(data => sliderCounterMax = data.data.length).then(()=>console.log(sliderCounterMax));
    
    const slider = document.querySelector('.offer__slider');

    slider.querySelector('#current').innerHTML = sliderCounter < 10 ? '0' + sliderCounter : sliderCounter;
    axios.get("http://localhost:3000/slides")
        .then(i => slider.querySelector('#total').innerHTML =
            i.data.length < 10 ? '0' + i.data.length : i.data.length)
        .catch();
    
        
    slider.querySelector('.offer__slider-next').addEventListener('click', () => {
        
        sliderCounter++;
        if(changeImage(sliderCounter)){
            sliderCounter = 1;
        }
        changeImage(sliderCounter);
        slider.querySelector('#current').innerHTML = sliderCounter < 10 ? '0' + sliderCounter : sliderCounter;
    });

    function changeImage(id) {
        axios.get("http://localhost:3000/slides")
        .then(data => {
            let i = 1;
            data.data.forEach(item => {
                if (item.id != id) {
                    i++;
                }
            });
            if (i > data.data.length) {
                id=1;
            }
            data.data.forEach(item => {
                if (item.id == id) {
                    slider.querySelector('.offer__slide').innerHTML = `
                        <img src="${item.img}" alt="${item.alt}">
                    `;
                    return true;
                }
                else { return false; }
            });
        }).catch(() => console.error('no item'));
    }

    //end   
});
