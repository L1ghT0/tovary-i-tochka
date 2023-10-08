
// this function centers an element relative to another element without going beyond the container
// Also it automatically repositions an element when website is resized
export function positionInCenter(elem, relativeElem, container){
    let observer = new ResizeObserver(positioning);
    observer.observe(document.body);

    return positioning;

    function positioning(){
        let paddings = document.body.offsetWidth > 480 ? 24 : 16; // to center in mobile devices we need to move the element on only one padding but on 2 paddings when desktop is being used
        let margin = document.body.offsetWidth > 480 ? 8 : 16; // desktop margin is supposed to be '8'; mobile: '16'

        let container_offsetWidth_with_paddings = container.offsetWidth + paddings*2; // the offsetWidth of the container with paddings
        let spaceLeftAtTheRight =  container_offsetWidth_with_paddings - relativeElem.offsetLeft - relativeElem.offsetWidth; // width from the word 'беслпатно' to the right side of the container
        let spaceLeftAtTheLeft =  relativeElem.offsetLeft;   // width from the left side of the container to the word 'беслпатно'
        let widthWeNeedToMoveTheElementFromTheLeft = elem.offsetWidth/2 - spaceLeftAtTheLeft - relativeElem.offsetWidth/2 + margin;
        let widthWeNeedToMoveTheElementFromTheRight = elem.offsetWidth/2 - spaceLeftAtTheRight - relativeElem.offsetWidth/2 + margin;

        elem.style.left =
            spaceLeftAtTheLeft > elem.offsetWidth/2 // enough space at the left ?
            && spaceLeftAtTheRight > elem.offsetWidth/2 // and enough space at the right ?
                ? -(elem.offsetWidth/2) + (relativeElem.offsetWidth/2) + 'px' // ok, now, we can position at the center
                : spaceLeftAtTheLeft > spaceLeftAtTheRight // at the left more space than at the right ?
                    ? -(elem.offsetWidth/2) + (relativeElem.offsetWidth/2) - widthWeNeedToMoveTheElementFromTheRight + 'px' // position within the width of right-block content in center
                    : -(elem.offsetWidth/2) + (relativeElem.offsetWidth/2) + widthWeNeedToMoveTheElementFromTheLeft  + 'px'
    }
}