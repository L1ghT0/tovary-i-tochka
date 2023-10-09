'use strict'
import {freezeHTML, unfreezeHTML, scrollPosition} from '../modalsGeneral.js'
import {getSelectedCard, selectCard} from "../../../initialData.js";

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
let _current_card;
document.querySelectorAll('.payment-method-edit').forEach(edit => {
    edit.addEventListener('click', (e) => {
        openPaymentModal();
        _current_card = getSelectedCard();
    })
})

// click event to close payment-method-modal
document.querySelector('.close-payment-modal').addEventListener('click', (e) => {
    document.getElementById(`card-${_current_card.name}`).checked = true;
    closePaymentModal();
})


// click event to set selected card
// this event only changes and sets the image in html-element directly
document.querySelector('.payment-method-modal .choose-button').addEventListener('click', (e) => {
    let selectedCard = Array.prototype.slice.call(document.querySelectorAll('.card-item input')).filter(item => item.checked);
    document.querySelectorAll('.card-info .card-background span').forEach(card => {
        card.classList.remove(`${card.className}`);
        card.classList.add(`${selectedCard[0].id}-icon`)
    })

    selectCard(selectedCard[0].id.substring('card-'.length))

    closePaymentModal();
})