'use strict'
import {freezeHTML, scrollPosition, unfreezeHTML} from "../modalsGeneral.js";
import {getSelectedWayToDeliver, getSelectedAddress, selectWayToDeliver, selectAddress} from "../../../initialData.js";

// init
let _current_way_to_deliver = getSelectedWayToDeliver()
let _current_address = getSelectedAddress();
document.getElementById(`${_current_way_to_deliver.name}`).checked = true;

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
        _current_way_to_deliver = getSelectedWayToDeliver();
        _current_address = getSelectedAddress();
    })
})


// click event to close payment-method-modal
document.querySelector('.close-delivery-modal').addEventListener('click', (e)=>{
    closeDeliveryMethodModal();
    document.getElementById(`${_current_way_to_deliver.name}`).checked = true;
    setProperRadio();
})


// every click on modal it checks what method should be shown
document.querySelector('.delivery-method-modal').addEventListener('click',(e)=>{
    showSelectedMethod();
})


// choose-button click event
document.querySelector('.delivery-method-modal .choose-button').addEventListener('click', (e)=>{
    let [pick_up_point, courier] = document.querySelectorAll(`.delivery-method-modal-choose-method-container input[name='delivery-method']`)
    if(pick_up_point.checked && !Array.prototype.slice.call(document.querySelectorAll('.pick-up-address-items input[name="pick-up-addresses"]')).filter(address => address.checked).length){
        return;
    }
    if(courier.checked && !Array.prototype.slice.call(document.querySelectorAll('.customer-addresses input[name="customer-addresses"]')).filter(address => address.checked).length){
        return;
    }

    let selectedWayToDeliver = pick_up_point.checked ? pick_up_point.id : courier.id
    selectWayToDeliver(selectedWayToDeliver);


    let selectedAddress;
    if(getSelectedWayToDeliver().name === 'pick-up-point'){
        selectedAddress = document.querySelector('.pick-up-address-items input:checked')
    } else {
        selectedAddress = document.querySelector('.customer-address-items input:checked')
    }
    selectAddress(selectedAddress.id.substring(selectedAddress.id.length-1))


    setProperRadio();
    closeDeliveryMethodModal();
})

function setProperRadio(){
    document.querySelectorAll('.delivery-method-modal-content-container .delivery-addresses input[type="radio"]').forEach(radio => radio.checked = false)

    if(getSelectedWayToDeliver().name === 'pick-up-point' && getSelectedAddress()){
        document.querySelector(`.delivery-method-modal-content-container .delivery-addresses #pick-up-address-${getSelectedAddress().id}`).checked = true;
    }
    if(getSelectedWayToDeliver().name === 'courier' && getSelectedAddress()){
        document.querySelector(`.delivery-method-modal-content-container .delivery-addresses #customer-address-${getSelectedAddress().id}`).checked = true;
    }
}