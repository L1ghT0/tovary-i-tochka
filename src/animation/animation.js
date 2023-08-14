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
document.querySelectorAll('.items').forEach(item => item.style.overflow = 'hidden');

for (let i = 0; i < arrows_collapse.length; i++) {
    let unroll = makeUnroll(HTMLitems[i])
    let roll = makeRoll(HTMLitems[i])
    let rotate = rotate_collapse_arrow();
    let overflowHidden = setOverflow('hidden');
    let overflowVisible = setOverflow('visible');

    arrows_collapse[i].addEventListener(('click'), (e) => {
        if (e.target.classList.contains('collapsed')) { // we do unroll items
            let draw = unroll;
            animate({duration: 300, timing, draw});
            e.target.classList.remove('collapsed');
            disableArrow(e.target);
            overflowVisible(e.target)
        } else {
            disableArrow(e.target);
            overflowHidden(e.target)
            let draw = roll;
            animate({duration: 300, timing, draw,});
            e.target.classList.add('collapsed');

        }
        rotate(e.target);
    })
}

function setOverflow(value) {
    let overflow = value;
    return (target) => {
        if (target.id === 'collapse-items') {
            if (overflow === 'hidden') {
                document.querySelectorAll('.selected-items .items').forEach(item => item.style.overflow = overflow);
            } else {
                setTimeout(() => {
                    document.querySelectorAll('.selected-items .items').forEach(item => item.style.overflow = overflow);
                }, 300)
            }
        }
    }
}

function disableArrow(target){
    target.style.pointerEvents = 'none';
    setTimeout(()=>{
        target.style.pointerEvents = 'auto';
    },300)
}
