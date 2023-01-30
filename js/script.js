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

    const sliderGlobal = document.querySelector('.offer__slider'),
        prevButton = sliderGlobal.querySelector('.offer__slider-prev'),
        nextButton = sliderGlobal.querySelector('.offer__slider-next'),
        curSlide = sliderGlobal.querySelector('#current'),
        totSlide = sliderGlobal.querySelector('#total'),
        imgSlide = sliderGlobal.querySelector('.offer__slide'),
        imgsSlide = sliderGlobal.querySelectorAll('.offer__slide');

    //slider 1 *********************************************************************************************************
    /*
    axios.get('http://localhost:3000/slides')
        .then(item => {
            totSlide.textContent = item.data.length > 10 ? item.data.length : '0' + item.data.length
            item.data.forEach(i => {
                if (i.vis == 'true') {
                    imgSlide.innerHTML = `<img src=${i.img} alt=${i.alt}/>`;
                    curSlide.textContent = i.id > 10 ? i.id : '0' + i.id;
                }
            });
        });

    prevButton.addEventListener('click', async (e) => {
        let obj;
        await axios.get('http://localhost:3000/slides').then(item => obj = item.data);
        let counter = 0;
        await obj.forEach(item => {
            if (item.vis == 'true') {
                counter = (item.id - 1) < 1 ? 4 : item.id - 1;
            }
        });
        await obj.forEach(async item => {
            if (item.id == counter) {
                await axios.put(`http://localhost:3000/slides/${item.id}`, {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'true'
                });
                imgSlide.innerHTML = `<img src=${item.img} alt=${item.alt}/>`;
                curSlide.textContent = item.id > 10 ? item.id : '0' + item.id;
            } else {
                await axios.put(`http://localhost:3000/slides/${item.id}`, {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'false'
                });
            }
        });
    });

    nextButton.addEventListener('click', async (e) => {
        let obj;
        await axios.get('http://localhost:3000/slides').then(item => obj = item.data);
        let counter = 0;
        await obj.forEach(item => {
            if (item.vis == 'true') {
                counter = (item.id + 1) > obj.length ? 1 : item.id + 1;
            }
        });
        await obj.forEach(async item => {
            if (item.id == counter) {
                await axios.put(`http://localhost:3000/slides/${item.id}`, {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'true'
                });
                imgSlide.innerHTML = `<img src=${item.img} alt=${item.alt}/>`;
                curSlide.textContent = item.id > 10 ? item.id : '0' + item.id;
            } else {
                await axios.put(`http://localhost:3000/slides/${item.id}`, {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'false'
                });
            }
        });
    }); 
    */

    //slider 2 *********************************************************************************************************
    /*
    imgSlide[0].classList.remove('hide');

    const getResources = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        let obj = await res.json();
        return await obj;
    };

    let objWithSlides = getResources('http://localhost:3000/slides').then(async data => {
        totSlide.textContent = data.length > 10 ? data.length : '0' + data.length;
        data.forEach(i => {
            if (i.vis == 'true') {
                imgSlide.innerHTML = `<img src=${i.img} alt=${i.alt}/>`;
                curSlide.textContent = i.id > 10 ? i.id : '0' + i.id;
            }
        });
        return await data;
    });

    prevButton.addEventListener('click', async (e) => {
        changeSlides();
    });

    nextButton.addEventListener('click', async (e) => {
        changeSlides('true');
    });

    async function changeSlides(boolean){
        let obj;
        await objWithSlides.then(data => obj = data);
        let counter = 0;
        await obj.forEach(item => {
            if (item.vis == 'true') {
                if(boolean == 'true'){
                counter = (item.id + 1) > obj.length ? 1 : item.id + 1;
                } else {
                    counter = (item.id - 1) < 1 ? 4 : item.id - 1;
                }
            }
        });
        await obj.forEach(async item => {
            if (item.id == counter) {
                obj[item.id - 1] = {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'true'
                };
                imgSlide.innerHTML = `<img src=${item.img} alt=${item.alt}/>`;
                curSlide.textContent = item.id > 10 ? item.id : '0' + item.id;
            } else {
                obj[item.id - 1] = {
                    'img': item.img,
                    'alt': item.alt,
                    'id': item.id,
                    'vis': 'false'
                };
            }
        });
    }
    */

    //slider 3 *********************************************************************************************************

    let slideIndex = 1;

    showSlides(slideIndex);
    totSlide.textContent = imgsSlide.length > 9 ? imgsSlide.length : `0${imgsSlide.length}`;

    function showSlides(n) {

        if (n > imgsSlide.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = imgsSlide.length;
        }
        imgsSlide.forEach(item => {
            item.style.display = 'none';
        });
        console.log(slideIndex);
        imgsSlide[slideIndex - 1].style.display = 'block';
        curSlide.textContent = slideIndex > 9 ? slideIndex : `0${slideIndex}`;

    }

    nextButton.addEventListener('click', async (e) => {
        showSlides(slideIndex += 1);
    });

    prevButton.addEventListener('click', async (e) => {
        showSlides(slideIndex += -1);
    });

    //end   
});
