'use strict'
import {validateEnn, validateInputEmpty, validateTelNubmer, validateEmail} from "./validators/validators.js";


const submit = document.getElementById('submit');
let formInputs = document.querySelectorAll('.form-input');
const validateAll = [validateInputEmpty, validateEmail, validateTelNubmer, validateEnn]; // an array of functions(validators)


submit.addEventListener('click', (e) => {
    e.preventDefault();

    if(document.documentElement.offsetWidth <= 480){    // it works only on mobile devices
        document.querySelector('.form-error-make-it-red').scrollIntoView(); // scroll into the first input that has an error
    }
    if(validate()){
        cleanForm(); // validate passed, now we can clean the form;
    }
});

const validate = () => {
    return validateAll.filter(validator => validator()).length === validateAll.length; // in case the validator isn't passed - validator returns false
}

function cleanForm() {
    formInputs.forEach(input => input.value = '');
}

let placeholder = '';
const form = document.getElementById('form');

form.addEventListener('focusin', function (e) {
    placeholder = e.target.placeholder;
    e.target.placeholder = '';

    document.querySelector(`#legend-${e.target.id}`).hidden = false;

});

let touched = false;
form.addEventListener('focusout', function (e) {
    e.target.placeholder = placeholder;
    document.querySelector(`#legend-${e.target.id}`).hidden = true;
    let emptyInputs = Array.prototype.slice.call(document.querySelectorAll('.customer-form input')).filter(input => input.value !== '')

    if(emptyInputs.length ){ // in case we have at least one input with value when focus goes out we start validate everytime focus goes out
        validateAll.forEach(validator => validator());
        touched = true;
    }
    if(touched){
        validateAll.forEach(validator => validator());
    }
});


const letNumberInput = document.getElementById('telNumber');
letNumberInput.addEventListener('input', (e)=>{
    e.target.value = e.target.value.trim(); // remove space in the beginning and the end

    if(e.target.value.replace(/\s/g, '') === ''){ // do not let spam 'space' without symbols
        e.target.value = '';
    }

    e.target.value = e.target.value.replace(/[A-Za-zА-Яа-я]/g,''); // do not allow type letters (only english and russian letters);

});





