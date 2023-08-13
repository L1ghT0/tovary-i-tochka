'use strict'

let _html = document.documentElement;
export let scrollPosition;

export function freezeHTML(){
    let marginSize = window.innerWidth - _html.clientWidth;
    _bodyScrollControl(marginSize);
    if(_html.offsetWidth <= 480){
        document.querySelector('.modals').style.top = _html.offsetHeight;
    }
    //сохраним текущую прокрутку:
    scrollPosition = window.pageYOffset;
    _html.style.top = -scrollPosition  + "px";
    _html.classList.add("hystmodal__opened");

    let turnBackgroundOn = _toggleModalBackground(true);
    turnBackgroundOn(marginSize);
}

export function unfreezeHTML(){
    _html.classList.remove("hystmodal__opened");
    window.scrollTo(0, scrollPosition);
    _html.style.top = "";

    _bodyScrollControl(0);
    _html.style.marginRight = "";

    let turnBackgroundOff = _toggleModalBackground(false);
    turnBackgroundOff('');
}




function _bodyScrollControl(marginSize){
    if (marginSize) {
        _html.style.marginRight = marginSize + "px";
    }
    document.querySelector('.content-main').style.paddingRight = marginSize + "px"
    document.querySelector('header').style.paddingRight = marginSize + "px"
    document.querySelector('footer').style.paddingRight = marginSize + "px"
}

function _toggleModalBackground(turn){
    return (marginSize) => {
        document.querySelector('.modals-background').style.top = scrollPosition + 'px'
        document.querySelector('.modals-background').style.paddingRight = marginSize + 'px'
        turn ? document.querySelector('.modals-background').style.display = 'block'
            : document.querySelector('.modals-background').style.display = 'none'
    }
}