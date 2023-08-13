'use strict'
import {freezeHTML, unfreezeHTML, scrollPosition} from './modalsGeneral.js'

//  IMPORTANT !!
//
// We don't have, contain and process the data of cards yet.
// that means - events change html directly and don't save the changes or the data

// init
document.getElementById('card-mir').checked = true;



function openPaymentModal(){
    freezeHTML();

    document.documentElement.offsetWidth <= 480
        ? document.querySelector('.payment-method-modal').style.display = 'grid'
        : document.querySelector('.payment-method-modal').style.display = 'block'
    document.querySelector('.payment-method-modal').style.top = scrollPosition + 'px';
}
function closePaymentModal(){
    unfreezeHTML();
    document.querySelector('.payment-method-modal').style.display = 'none'
}


// click event to open payment-method-modal
document.querySelectorAll('.payment-method-edit').forEach(edit => {
    edit.addEventListener('click', (e) => {
        openPaymentModal();
    })
})

// click event to close payment-method-modal
document.querySelector('.close-payment-modal').addEventListener('click', (e) => {
    closePaymentModal();
})


// click event to set selected card
// We don't have, contain and process the data of cards yet.
// this event only changes and sets the image in html-element directly
document.querySelector('.payment-method-modal .choose-button').addEventListener('click', (e) => {
    let selectedCard = Array.prototype.slice.call(document.querySelectorAll('.card-item input')).filter(item => item.checked);
    document.querySelectorAll('.card-info .card-background span').forEach(card => {
        card.classList.remove(`${card.className}`);
        card.classList.add(`${selectedCard[0].id}-icon`)
    })
    closePaymentModal();
})