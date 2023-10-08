import {items} from "../../../../initialData.js";
import {insertingSpaceInLongPrice} from "../../../../utils/parsing/price.js";


// pay-instantly toggle checkbox
document.getElementById('pay-instantly').addEventListener('input', (e)=>{
    if(e.target.checked){
        let totalPriceToPay = items.reduce((sum, item) => sum += item.selected ? item.priceWithDiscount*item.amount : 0, 0);
        document.getElementById('submit').innerText = `Оплатить ${insertingSpaceInLongPrice(String(totalPriceToPay), false)}`;
        document.getElementById('pay-right-away-notice').hidden = true;
    } else{
        document.getElementById('submit').innerText = 'Заказать';
        document.getElementById('pay-right-away-notice').hidden = false;
    }
})