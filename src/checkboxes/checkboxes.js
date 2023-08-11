import {items} from "../../initialData.js";
import {setTotals} from "../../index.js";

let select_all = document.getElementById('select-all-input');
select_all.checked = true;  // initial value of select all checkbox
toggle_select_all_items();  // init other item-checkboxes with same value as 'select all'

select_all.addEventListener('input', (e) => {
    toggle_select_all_items();
})

function toggle_select_all_items() {
    let inputs = Array.prototype.slice.call(document.querySelectorAll('.item .select-input')); // take an arr of all select checkboxes
    for (let input of inputs) {
        input.checked = select_all.checked; // toggle them all same as 'select_all'
    }
    items.forEach(item => item.selected = select_all.checked);
    setTotals();    // refresh totals
}

let select_item_checkboxes = Array.prototype.slice.call(document.querySelectorAll('.item .select-input'));
for (let select_item_checkbox of select_item_checkboxes) {
    select_item_checkbox.addEventListener('input', (e) => {    // automatically toggle 'select all' in true in case every item is selected
        select_all.checked = select_item_checkboxes.filter(select_item_checkbox => select_item_checkbox.checked).length === select_item_checkboxes.length && !select_all.checked;
    })
}




Array.prototype.slice.call(document.querySelectorAll('.item')).forEach(HTMLitem => {
    HTMLitem.addEventListener('click', (e) => {
        setTimeout(() => { // macrotask queue in order to get a proper value
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



document.getElementById('pay-instantly').addEventListener('input', (e)=>{
    if(e.target.checked){
        let totalPriceToPay = items.reduce((sum, item) => sum += item.selected ? item.priceWithDiscount*item.amount : 0, 0);
        document.getElementById('submit').innerText = `Оплатить ${totalPriceToPay}`;
        document.getElementById('pay-right-away-notice').hidden = true;
    } else{
        document.getElementById('submit').innerText = 'Заказать';
        document.getElementById('pay-right-away-notice').hidden = false;
    }
})
