'use strict'
import {validateEnn, validateInputEmpty, validateTelNubmer, validateEmail} from "./validators/validators.js";


const submit = document.getElementById('submit');
let formInputs = document.querySelectorAll('.form-input');
const validateAll = [validateInputEmpty, validateEmail, validateTelNubmer, validateEnn]; // an array of functions(validators)


submit.addEventListener('click', (e) => {
    e.preventDefault();

    form.addEventListener('focusout', function (e) {
        if(formTouched){
            validateAll.forEach(validator => validator());
        }
    });

    if(validate()){
        cleanForm(); // validate passed, now we can clean the form;
    }
});

const validate = () => {
    if(formTouched){
        return validateAll.filter(validator => validator()).length === validateAll.length; // in case the validator isn't passed - validator returns false
    }
    return false;
}

function cleanForm() {
    formInputs.forEach(input => input.value = '');
}


let formTouched = false;
const form = document.getElementById('form');
form.addEventListener('focusin', function (e) {
    formTouched = true;
});




const letNumberInput = document.getElementById('telNumber');
letNumberInput.addEventListener('input', (e)=>{

    e.target.value = e.target.value.trim(); // remove space in the beginning and the end

    if(e.target.value.replace(/\s/g, '') === ''){ // do not let spam 'space' without symbols
        e.target.value = '';
    }

    e.target.value = e.target.value.replace(/[A-Za-zА-Яа-я]/g,''); // do not allow type letters (only english and russian letters);

});





