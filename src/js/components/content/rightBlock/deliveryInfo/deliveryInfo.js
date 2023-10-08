

// green word "free" hover ----->
import {getComponent_free_PopUp} from "../../../common/greenWordFree_PopUp/greenWordFree_PopUp.js";
import {positionInCenter} from "../../../../utils/positioning/center.js";

Array.prototype.slice.call(document.querySelectorAll('.pick-up-point .free-green-word')).forEach(free_green_word => {
    free_green_word.addEventListener('mouseover', (e) => {
        let popUpElem = getComponent_free_PopUp();
        let relativeElem = document.querySelector('.pick-up-point .delivery-confirmed .free');
        let container = document.querySelector('.pick-up-point .delivery-confirmed');
        document.querySelector('.pick-up-point .free').append(popUpElem);

        positionInCenter(popUpElem, relativeElem, container)();
    });
    free_green_word.addEventListener('mouseout', (e) =>{
        document.querySelector('.pick-up-point .free-pop-up').remove();
    })
})