'use strict'

function animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function timing(timeFraction) {
    return timeFraction;
}




function makeRoll(elem) {
    let height = elem.offsetHeight;
    return (progress) => {
        elem.style.height = height - (height * (progress * 100) / 100) + 'px';
    }
}

function makeUnroll(elem) {
    let height = elem.offsetHeight;
    return (progress) => {
        elem.style.height = (height * (progress * 100) / 100) + 'px';
    }
}

function rotate_collapse_arrow() {
    let rotated = false;
    return (collapse_arrow) => {
        let degree = rotated ? -45 : 135;

        collapse_arrow.style.webkitTransform = 'rotate(' + degree + 'deg)';
        collapse_arrow.style.mozTransform = 'rotate(' + degree + 'deg)';
        collapse_arrow.style.msTransform = 'rotate(' + degree + 'deg)';
        collapse_arrow.style.oTransform = 'rotate(' + degree + 'deg)';
        collapse_arrow.style.transform = 'rotate(' + degree + 'deg)';

        rotated = !rotated;
    }
}



let HTMLitems = document.querySelectorAll('.items');
let arrows_collapse = document.querySelectorAll('.arrow-collapse')

for (let i = 0; i < arrows_collapse.length; i++) {
    let unroll = makeUnroll(HTMLitems[i])
    let roll = makeRoll(HTMLitems[i])
    let rotate = rotate_collapse_arrow();

    arrows_collapse[i].addEventListener(('click'), (e) => {
        if (e.target.classList.contains('collapsed')) { // we do unroll items
            let draw = unroll;
            animate({
                duration: 300,
                timing,
                draw
            });
            e.target.classList.remove('collapsed');
        } else { // we do roll items
            let draw = roll;
            animate({
                duration: 300,
                timing,
                draw,
            });
            e.target.classList.add('collapsed');
        }
        rotate(e.target);
    })
}
