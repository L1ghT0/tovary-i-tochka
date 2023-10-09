import './counter/counter.js'
import {items} from "../../../../../initialData.js";
import {refresh_data, setTotals} from "../../../../../index.js";


// checkboxes ------->>>

// initialize checkboxes
let select_all = document.getElementById('select-all-input');
select_all.checked = true;  // initial value of select all checkbox
toggle_select_all_items();  // init other item-checkboxes with same value as 'select all'


// toggle every item checkbox when select-all checked
select_all.addEventListener('input', (e) => {
    toggle_select_all_items();
})

function toggle_select_all_items() {
    let inputs = Array.prototype.slice.call(document.querySelectorAll('.item .select-input')); // take an arr of all select checkboxes
    for (let input of inputs) {
        input.checked = select_all.checked; // toggle them all same as 'select_all'
    }
    items.forEach(item => item.selected = select_all.checked);
    refresh_data();   // refresh all data
}


// toggle 'select-all' when every item is selected
let select_item_checkboxes = Array.prototype.slice.call(document.querySelectorAll('.item .select-input'));
for (let select_item_checkbox of select_item_checkboxes) {
    select_item_checkbox.addEventListener('input', (e) => {    // automatically toggle 'select all' in true in case every item is selected
        select_all.checked = select_item_checkboxes.filter(select_item_checkbox => select_item_checkbox.checked).length === select_item_checkboxes.length && !select_all.checked;
    })
}
document.querySelectorAll('.selected-items .item').forEach(item=>{
    item.addEventListener('click', (e)=>{
        setTimeout(() => {
            let select_item_checkboxes = Array.prototype.slice.call(document.querySelectorAll('.item .select-input'));
            select_all.checked = select_item_checkboxes.filter(select_item_checkbox => select_item_checkbox.checked).length === select_item_checkboxes.length && select_item_checkboxes.length > 0
        })
    })
})


// single-item toggle checkbox
Array.prototype.slice.call(document.querySelectorAll('.selected-items .item')).forEach(HTMLitem => {
    HTMLitem.addEventListener('click', (e) => {
        setTimeout(() => { // macrotask queue in order to get a proper value
            if(!document.querySelector(`[id='${HTMLitem.id}'] .select-input`)) return
            let checked = document.querySelector(`[id='${HTMLitem.id}'] .select-input`).checked;
            items.forEach((item) => {
                if (item.id === HTMLitem.id) {  // looking for an item by ID that has been clicked
                    item.selected = checked;
                }
            });
            setTotals();
        }, 0)
    })
});





// hover elements ---->

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


// item-organization-info hover
document.querySelectorAll('.organization-info-icon').forEach(item=>{
    item.addEventListener('mouseover', (e) =>{
        e.target.nextSibling.nextSibling.style.display = 'flex';
    });
    item.addEventListener('mouseout', (e) =>{
        e.target.nextSibling.nextSibling.style.display = 'none';
    })
})