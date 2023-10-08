'use strict'
import './components/components.js'

import {items, MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE} from "./initialData.js";
import {shouldDisable} from "./components/content/main/items/selected/counter/counter.js";
import {insertingSpaceInLongPrice} from "./utils/parsing/price.js";

initializeApp();

function initializeApp() {
    refresh_data();
}

document.querySelector('.selected-items .items').addEventListener('click', (e) => {
    refresh_data();
})

export function refresh_data() {
    items.forEach(initialize_item_data);
    items.forEach(shouldDisable);
    setTotals();
    setReadyToDeliverItems();
}


function initialize_item_data(item) {
    setCounterValue(item);
    calculatePrice(item);
    setItemDiscount(item);
}

function setCounterValue(item) {
    document.querySelector(`.amount-of-${item.name}s`).innerText = item.amount;
}

function calculatePrice(item) {
    Array.prototype.slice.call(document.querySelectorAll(`.with-discount .${item.name}-price`)).forEach(price => {
        price.firstChild.nextSibling.innerText = insertingSpaceInLongPrice(String(Math.round(item.priceWithDiscount * item.amount * 100) / 100), true)
    });
    Array.prototype.slice.call(document.querySelectorAll(`.without-discount .${item.name}-price`)).forEach(price => {
        price.firstChild.innerText = insertingSpaceInLongPrice(String(Math.round(item.price * item.amount * 100) / 100), true)
    })
}

function setItemDiscount(item) {
    document.getElementById(`item-${item.id}-discount`).innerText = (Math.round(item.discount * 100) / 100);
    document.getElementById(`item-${item.id}-discount-price`).innerText = (Math.round((item.price - item.priceWithDiscount) * 100) / 100);
}


export function setTotals() {
    let totalPriceWithDiscount = items.reduce((sum, item) => sum += item.selected ? (Math.round((item.priceWithDiscount * item.amount) * 100) / 100) : 0, 0)
    let totalPriceWithoutDiscount = items.reduce((sum, item) => sum += item.selected ? (Math.round((item.price * item.amount) * 100) / 100) : 0, 0)
    let totalDiscount = (Math.round((totalPriceWithoutDiscount - totalPriceWithDiscount) * 100) / 100);
    let total_item_amount = items.reduce((sum, item) => sum += item.selected ? item.amount : 0, 0)

    document.getElementById('total-price-with-discount').innerText      = insertingSpaceInLongPrice(String(totalPriceWithDiscount), false);
    document.getElementById('total-price-without-discount').innerText   = insertingSpaceInLongPrice(String(totalPriceWithoutDiscount), false);
    document.getElementById('total-discount').innerText                 = insertingSpaceInLongPrice(String(totalDiscount), true);
    document.getElementById('total-items').innerText                    = insertingSpaceInLongPrice(String(total_item_amount), false);
    document.getElementById('pay-instantly').checked
        ? document.getElementById('submit').innerText                   = `Оплатить ${insertingSpaceInLongPrice(String(totalPriceWithDiscount), false)}`
        : document.getElementById('submit').innerText                   = 'Заказать';
}








function setReadyToDeliverItems (){
    items.forEach(item =>{
        setTimeout(()=>{
            setAmountInRedCircle(item)
            item.selected
                ? showSmallItem(item)
                : hideSmallItem(item)
            shouldHideRedCircleNumber();
            shouldHideDeliveryDates();
        },0)
    })
}

function setAmountInRedCircle(item){
    if(item.amount > MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE){
        document.querySelector(`#${item.name}-item-${item.id}-small .red-circle-number span`).innerText = MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE;
        document.querySelector(`#delivery-late-day-item-${item.id}-small .red-circle-number span`).innerText = item.amount - MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE;
    } else {
        document.querySelector(`#${item.name}-item-${item.id}-small .red-circle-number span`).innerText = item.amount;
    }
}

function showSmallItem(item){
    document.getElementById(`${item.name}-item-${item.id}-small`).style.display = 'block';
    item.amount > MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE
        ? document.getElementById(`delivery-late-day-item-${item.id}-small`).style.display = 'block'
        : document.getElementById(`delivery-late-day-item-${item.id}-small`).style.display = 'none'
}

function hideSmallItem(item){
    let deliveryLate_itemSmall = document.getElementById(`delivery-late-day-item-${item.id}-small`);
    document.getElementById(`${item.name}-item-${item.id}-small`).style.display = 'none';
    if(deliveryLate_itemSmall){
        document.getElementById(`delivery-late-day-item-${item.id}-small`).style.display = 'none';
    }
}

function shouldHideRedCircleNumber(){
    document.querySelectorAll(`.delivery-method-details .red-circle-number span`).forEach(number=>{
        number.innerText === '1'    // we do not show the amount of items in 'red circle' when amount is 1
            ? number.parentElement.style.display = 'none'
            : number.parentElement.style.display = 'block'
    })
}

function shouldHideDeliveryDates(){ // we do not show the whole block when there's no items displayed
    // check if 'closest-delivery-date' should be hidden
    Array.prototype.slice.call(document.querySelectorAll(`.closest-delivery-date  .ready-to-deliver-items>div`)).filter(item=> item.style.display === 'none').length === items.length
        ? document.querySelector('.closest-delivery-date').style.display = 'none'
        : document.querySelector('.closest-delivery-date').style.display = 'flex'

    // check if 'another-delivery-date' should be hidden
    Array.prototype.slice.call(document.querySelectorAll(`.another-delivery-date  .ready-to-deliver-items>div`)).filter(item=> item.style.display === 'none').length === items.length
        ? document.querySelector('.another-delivery-date').style.display = 'none'
        : document.querySelector('.another-delivery-date').style.display = 'flex'
}
