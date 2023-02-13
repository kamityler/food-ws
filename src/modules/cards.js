//import axios from './axios/lib/axios';
import axios from './axios/index';

function cards() {
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

    try {
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
    } catch (error) {
        console.log('error in cards.js axios');
        console.log(error.stack);
    }

}

export default cards;