'use strict'
import {items} from "../../../../../../initialData.js";

let counters = Array.prototype.slice.call(document.querySelectorAll('.counter'));
counters.forEach(counter => {
    counter.addEventListener('click', (e) => {
        items.forEach(item => {
            if (e.target.classList.contains('increase')) {
                let amount = e.target.previousSibling.previousSibling;
                if (amount.id.endsWith(`${item.name}s`)) {
                    if (!e.target.classList.contains('disabled')) {
                        item.amount++;
                    }
                    shouldDisable(item)
                }
            } else if (e.target.classList.contains('decrease')) {
                let amount = e.target.nextSibling.nextSibling;
                if (amount.id.endsWith(`${item.name}s`)) {
                    if (!e.target.classList.contains('disabled')) {
                        item.amount--;
                    }
                    shouldDisable(item)
                }
            }
        })
    })
})

export function shouldDisable(item) {
    let amount = item.amount;
    let decrease_button = document.querySelector(`.amount-of-${item.name}s`).previousSibling.previousSibling;
    let increase_button = document.querySelector(`.amount-of-${item.name}s`).nextSibling.nextSibling;

    if (amount == '1') {
        decrease_button.classList.add('disabled');
    } else {
        decrease_button.classList.remove('disabled');
    }

    if (item.amount_left && amount == item.amount_left) {
        increase_button.classList.add('disabled');
    } else {
        increase_button.classList.remove('disabled');
    }
}