'use strict'
import {items} from "../../initialData.js";

positioning_free_pop_up();


// the free green word('бесплатно') hover
Array.prototype.slice.call(document.querySelectorAll('.free-green-word')).forEach(free_green_word => {
    free_green_word.addEventListener('mouseover', (e) =>{
         e.target.nextSibling.nextSibling.style.opacity = 1
    });
    free_green_word.addEventListener('mouseout', (e) =>{
        e.target.nextSibling.nextSibling.style.opacity = 0
    })
})
function positioning_free_pop_up() {
    let free_pop_up = document.querySelectorAll('.delivery-confirmed .free-pop-up'); // the element that should appear
    let free = document.querySelectorAll('.delivery-confirmed .free');  // the actual word 'бесплатно' on which we do hover
    let delivery_confirmed = document.querySelectorAll('.delivery-confirmed'); // the container

    let paddings = document.body.offsetWidth > 480 ? 24 : 16; // to center in mobile devices we need to move the element on only one padding but on 2 paddings when desktop is being used
    let margin = document.body.offsetWidth > 480 ? 8 : 16; // desktop margin is supposed to be '8'; modile: '16'

    for(let i = 0; i < free.length; i++){
        let content_right_block_offsetWidth = delivery_confirmed[i].offsetWidth + paddings*2; // the offsetWidth of the container with paddings
        let spaceLeftAtTheRight =  content_right_block_offsetWidth - free[i].offsetLeft - free[i].offsetWidth; // width from the word 'беслпатно' to the right side of the container
        let spaceLeftAtTheLeft =  free[i].offsetLeft;   // width from the left side of the container to the word 'беслпатно'
        let widthWeNeedToMoveTheElementFromTheLeft = free_pop_up[i].offsetWidth/2 - spaceLeftAtTheLeft - free[i].offsetWidth/2 + margin;
        let widthWeNeedToMoveTheElementFromTheRight = free_pop_up[i].offsetWidth/2 - spaceLeftAtTheRight - free[i].offsetWidth/2 + margin;


        free_pop_up[i].style.left =
            spaceLeftAtTheLeft > free_pop_up[i].offsetWidth/2 // enough space at the left ?
            && spaceLeftAtTheRight > free_pop_up[i].offsetWidth/2 // and enough space at the right ?
            ? -(free_pop_up[i].offsetWidth/2) + (free[i].offsetWidth/2) + 'px' // ok, now, we can position at the center
            : spaceLeftAtTheLeft > spaceLeftAtTheRight // at the left more space than at the right ?
            ? -(free_pop_up[i].offsetWidth/2) + (free[i].offsetWidth/2) - widthWeNeedToMoveTheElementFromTheRight + 'px' // position within the width of right-block content in center as
            : -(free_pop_up[i].offsetWidth/2) + (free[i].offsetWidth/2) + widthWeNeedToMoveTheElementFromTheLeft  + 'px'// at the left more space than at the right ?
    }

}

let observer = new ResizeObserver(positioning_free_pop_up)
observer.observe(document.body)





// item-organization-info hover
document.querySelectorAll('.organization-info-icon').forEach(item=>{
    item.addEventListener('mouseover', (e) =>{
        e.target.nextSibling.nextSibling.style.display = 'flex';
    });
    item.addEventListener('mouseout', (e) =>{
        e.target.nextSibling.nextSibling.style.display = 'none';
    })
})






// item-discount-info hover
items.forEach(item => {
    let item_discount_price = document.getElementsByClassName(`${item.name}-price-without-discount-hover`)[0]

    item_discount_price.addEventListener('mouseover', (e) =>{
        let discount_info = document.querySelector(`.${item.name}-discount-info`);
        discount_info.style.display = 'flex';
        discount_info.style.left = -discount_info.offsetWidth + item_discount_price.offsetWidth + 8 + 'px';
    })
    item_discount_price.addEventListener('mouseout', (e) =>{
        let discount_info = document.querySelector(`.${item.name}-discount-info`);
        discount_info.style.display = 'none';
    })
})
