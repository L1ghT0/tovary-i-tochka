'use strict'


// set amount of not found items
let not_found_amount_of_items = document.getElementById('not-found-amount-of-items');
document.querySelector('.not-found-items .items').addEventListener('click', (e)=>{
    not_found_amount_of_items.innerText = document.querySelector('.not-found-items .items').children.length
})

