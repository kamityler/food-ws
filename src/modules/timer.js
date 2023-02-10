function timer(id, deadline) {
    const discount = '22%';
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
    setClock(id, deadline);
}

export default timer;