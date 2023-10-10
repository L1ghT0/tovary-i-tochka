'use strict'
import {animate, timing} from "../../../utils/animation/animation.js";

let tabbar = document.querySelector('.tabbar-bottom');
tabbar.style.top = document.body.offsetHeight;
let isTabbarShown = false;
let timerId;

window.addEventListener("scroll", (e) => {

    setTimeout(() => {
        if (!isTabbarShown) {
            animate({duration: 200, timing, draw: showTabbar});
            isTabbarShown = true;
        } else {
            hideTabbar();
        }
    }, 150)
});


function showTabbar(progress) {
    return tabbar.style.top = document.body.offsetHeight - (tabbar.offsetHeight * (progress * 100) / 100)  + 'px';
}

function hideTabbar() {
    clearInterval(timerId)
    timerId = setInterval(() => {
        clearInterval(timerId)
            animate({
                duration: 200, timing, draw: (progress) => {
                    return tabbar.style.top = document.body.offsetHeight - tabbar.offsetHeight + (tabbar.offsetHeight * (progress * 100) / 100) + 'px';
                }
            });
            isTabbarShown = false;
    }, 1500)
}

let observer = new ResizeObserver(() => {
    if(isTabbarShown){
        tabbar.style.top = document.body.offsetHeight - 56 + 'px';
    } else {
        tabbar.style.top = document.body.offsetHeight + 'px';
    }
})
observer.observe(document.body)