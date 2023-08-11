'use strict'
const telNumberRegex = /^[+][0-9]{1,3}[\s]?[(]?[-\s]?[0-9]{3}[\s]?[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let formInputs = document.querySelectorAll('.form-input');


export function validateInputEmpty() {
    let inputsWithValue = [];
    let inputsWithoutValue = [];
    formInputs.forEach((input)=> {
        if(input.value === ""){ // looking for an input with no value
            inputsWithoutValue.push(input);
        } else {
            inputsWithValue.push(input);
        }
    });
    if(inputsWithValue.length){
        hideInputEmptyError(inputsWithValue);
    }
    if(inputsWithoutValue.length){
        showInputEmptyError(inputsWithoutValue);
        return false;
    }
    return true;   // every input has a value
}

function showInputEmptyError(inputs) {
    for (let input of inputs){
        switch (input.id){
            case 'name':
                document.getElementById(`${input.id}-error`).innerText = 'Укажите имя';
                break;
            case 'familyName':
                document.getElementById(`${input.id}-error`).innerText = 'Введите фамилию';
                break;
            case 'email':
                document.getElementById(`${input.id}-error`).innerText = 'Укажите электронную почту';
                break;
            case 'telNumber':
                document.getElementById(`${input.id}-error`).innerText = 'Укажите номер телефона';
                break;
            case 'enn':
                document.getElementById(`${input.id}-error`).innerText = 'Укажите ИНН';
                break;
            default:
                break;
        }
    }
}

function hideInputEmptyError (inputs){
    for (let input of inputs){
        document.getElementById(`${input.id}-error`).innerText = '';
    }
}







export function validateEnn() {
    const enn = document.getElementById('enn').value;
    if(isEnnCorrect(enn)){
        showEnnError(false); // enn is correct, don't show the error
        return true;
    }
    showEnnError(true); // enn is incorrect, show the error
    return false;
}
function showEnnError(needShow) {
    let ennError = document.getElementById(`enn-error`);
    if(needShow){
        if(ennError.innerText === ''){
            ennError.innerText = 'Проверьте ИНН';
        }
    }else {
        ennError.innerText = '';
    }
}
function isEnnCorrect(enn){
    return enn.length === 14 && isNumeric(enn);
}











export function validateTelNubmer(){
    const telNumber = document.getElementById('telNumber').value;

    if(isTelNumberCorrect(telNumber)){
        showTelNumberError(false); // tel number is correct, don't show the error
        return true;
    }
    showTelNumberError(true); // tel number is incorrect, show the error
    return false;
}

function showTelNumberError (needShow){
    let telNumberError = document.getElementById(`telNumber-error`);
    if(needShow){
        if(telNumberError.innerText === ''){
            telNumberError.innerText = 'Формат: +9 999 999 99 99';
        }
    }else {
        telNumberError.innerText = '';
    }
}
function isTelNumberCorrect (telNumber) {
    return telNumber.match(telNumberRegex) && telNumber.length <= 30;
}








export function validateEmail(){
    const email = document.getElementById('email').value;

    if(isEmailCorrect(email)){
        showEmailError(false);
        return true;   // email is correct
    }
    showEmailError(true);
    return false; // email is incorrect
}

function showEmailError (needShow){
    let emailError = document.getElementById(`email-error`);
    if(needShow){
        if(emailError.innerText === ''){
            emailError.innerText = 'Проверьте адрес электронной почты';
        }
    } else{
        emailError.innerText = ''
    }
}
function isEmailCorrect (email) {
    return email.toLowerCase().match(emailRegex);
}










function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


