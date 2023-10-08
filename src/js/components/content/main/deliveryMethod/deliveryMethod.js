import {getComponent_free_PopUp} from "../../../common/greenWordFree_PopUp/greenWordFree_PopUp.js";
import {positionInCenter} from "../../../../utils/positioning/center.js";

// green word "free" hover ----->
Array.prototype.slice.call(document.querySelectorAll('.delivery-method .free-green-word')).forEach(free_green_word => {
    free_green_word.addEventListener('mouseover', (e) => {
        let popUpElem = getComponent_free_PopUp();
        let relativeElem = document.querySelector('.delivery-method .delivery-confirmed .free');
        let container = document.querySelector('.delivery-method .delivery-confirmed');
        document.querySelector('.delivery-method .free').append(popUpElem);

        positionInCenter(popUpElem, relativeElem, container)();
    });
    free_green_word.addEventListener('mouseout', (e) =>{
        document.querySelector('.delivery-method .free-pop-up').remove();
    })
})