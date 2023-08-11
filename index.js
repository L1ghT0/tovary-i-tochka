'use strict'
import {items} from "./initialData.js";
import {shouldDisable} from "./src/counter/counter.js";
import './src/checkboxes/checkboxes.js';
import './src/form/form.js'
import './src/counter/counter.js'
import './src/hover/hover.js'


initializeApp();

function initializeApp() {
    refresh_data();
}

document.querySelector('.items').addEventListener('click', (e) => {
    refresh_data();
})

function refresh_data() {
    items.forEach(initialize_item_data);
    items.forEach(shouldDisable);
    setTotals();
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
        price.firstChild.nextSibling.innerText = Math.round(item.priceWithDiscount * item.amount * 100) / 100
    });
    Array.prototype.slice.call(document.querySelectorAll(`.without-discount .${item.name}-price`)).forEach(price => {
        price.firstChild.innerText = Math.round(item.price * item.amount * 100) / 100
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

    document.getElementById('total-price-with-discount').innerText = totalPriceWithDiscount;
    document.getElementById('total-price-without-discount').innerText = totalPriceWithoutDiscount;
    document.getElementById('total-discount').innerText = totalDiscount;
    document.getElementById('total-items').innerText = total_item_amount;
    document.getElementById('pay-instantly').checked
        ? document.getElementById('submit').innerText = `Оплатить ${totalPriceWithDiscount}`
        : document.getElementById('submit').innerText = 'Заказать';
}

