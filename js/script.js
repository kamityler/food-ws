"use strict";


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
        if (target && target.classList.contains('tabheader__item') && !target.classList.contains('tabheader__item_active')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    startAnimation(hideTabContent, showTabContent, i, 300);
                }
            });
        }
    });

    // timer
    const deadline = '2022-02-14';

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
        clearInterval(modalTimerID);
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

    const modalTimerID = setTimeout(openModal, 2000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll',showModalByScroll);

    startAnimation(hideTabContent, showTabContent, 0, 0);
    setClock('.timer', deadline);

});


//end