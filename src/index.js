import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal, {
    openModal
} from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 100000);

    calculator();
    cards();
    forms(modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider();
    tabs();
    timer();
});
