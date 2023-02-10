function slider() {

    const slider = document.querySelector('.offer__slider'),
        prevButton = slider.querySelector('.offer__slider-prev'),
        nextButton = slider.querySelector('.offer__slider-next'),
        curSlide = slider.querySelector('#current'),
        totSlide = slider.querySelector('#total'),
        imgSlide = slider.querySelector('.offer__slide'),
        slides = slider.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    //slider 4 *********************************************************************************************************

    if (slides.length < 10) {
        totSlide.textContent = `0${slides.length}`;
        curSlide.textContent = `0${slideIndex}`;
    } else {
        totSlide.textContent = slides.length;
        curSlide.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
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

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
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
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextButton.addEventListener('click', () => {
        if (offset == getWidth(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getWidth(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        curSlideIndex(slideIndex);
        dotsChange();
    });
    prevButton.addEventListener('click', () => {
        if (offset == 0) {
            offset = getWidth(width) * (slides.length - 1);
        } else {
            offset -= getWidth(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        curSlideIndex(slideIndex);
        dotsChange();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getWidth(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            curSlideIndex(slideIndex);
            dotsChange();
        });
    });

    function curSlideIndex(index) {
        if (slides.length < 10) {
            curSlide.textContent = `0${index}`;
        } else {
            curSlide.textContent = index;
        }
    }

    function dotsChange() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function getWidth(value) {
        return +value.replace(/\D/g, '');
    }

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
    /*
    showSlides(slideIndex);
    totSlide.textContent = slides.length > 9 ? slides.length : `0${slides.length}`;

    function showSlides(n) {

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach(item => {
        item.style.display = 'none';
    });
    console.log(slideIndex);
    slides[slideIndex - 1].style.display = 'block';
    curSlide.textContent = slideIndex > 9 ? slideIndex : `0${slideIndex}`;

    }

    nextButton.addEventListener('click', async (e) => {
    showSlides(slideIndex += 1);
    });

    prevButton.addEventListener('click', async (e) => {
    showSlides(slideIndex += -1);
    });
    */
}

module.exports = slider;