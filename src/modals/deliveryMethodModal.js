'use strict'
import {freezeHTML, scrollPosition, unfreezeHTML} from "./modalsGeneral.js";



// show either pick up addresses or customer addresses
function showSelectedMethod() {
    setTimeout(()=>{
        if(document.querySelector('#pick-up-point').checked){
            document.querySelector('.delivery-method-modal .pick-up-addresses').style.display = 'flex';
            document.querySelector('.delivery-method-modal .customer-addresses').style.display = 'none';
        } else {
            document.querySelector('.delivery-method-modal .pick-up-addresses').style.display = 'none';
            document.querySelector('.delivery-method-modal .customer-addresses').style.display = 'flex';
        }

    },0)
}


function openDeliveryMethodModal(){
    freezeHTML();
    showSelectedMethod();

    document.documentElement.offsetWidth <= 480
        ? document.querySelector('.delivery-method-modal').style.display = 'grid'
        : document.querySelector('.delivery-method-modal').style.display = 'block'
    document.querySelector('.delivery-method-modal').style.top = scrollPosition + 'px';
}

function closeDeliveryMethodModal(){
    unfreezeHTML();
    document.querySelector('.delivery-method-modal').style.display = 'none'
}



// click event to open delivery-method-modal
document.querySelectorAll('.delivery-method-edit').forEach(edit => {
    edit.addEventListener('click', (e)=>{
        openDeliveryMethodModal();
    })
})


// click event to close payment-method-modal
document.querySelector('.close-delivery-modal').addEventListener('click', (e)=>{
    closeDeliveryMethodModal();
})


// every click on modal it checks what method should be shown
document.querySelector('.delivery-method-modal').addEventListener('click',(e)=>{
    showSelectedMethod();
})


// choose-button doesn't do anything except closing the modal
document.querySelector('.delivery-method-modal .choose-button').addEventListener('click', (e)=>{
    closeDeliveryMethodModal();
})