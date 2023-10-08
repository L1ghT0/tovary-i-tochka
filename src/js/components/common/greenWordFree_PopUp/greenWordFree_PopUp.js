
// I might have a slight problem with naming this component
// I leave this comment so you to know what it is:
// when you do hover on element with the word 'бесплатно' the information appears
// that information is this component
// and because it uses more than 1 time I put it in folder 'common'
// it could be used somewhere else

const _text = 'Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно'

export function getComponent_free_PopUp(){
    return _createComponent_free();
}

function _createComponent_free(){
    let container = document.createElement('div');
    container.classList.add('free-pop-up');

    let text = document.createElement('p');
    text.innerText = _text;

    container.append(text)

    return container;
}
