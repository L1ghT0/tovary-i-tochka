'use strict'

export const MAX_AMOUNT_OF_ITEMS_COULD_BE_DELIVERED_IN_CLOSEST_DATE = 184; // this variable is not supposed to be declared like this as much as all data in this file
export const NARROW_NO_BREAK_SPACE = '\u202F';

// all the values below has been taken from figma pattern in order to initialize app
const TShirtPrice_withDiscount = 522;
const mobileCasePrice_withDiscount = 10500.235;
const pencilPrice_withDiscount = 247;

const TShirtPrice_withoutDiscount = 1051;
const mobileCasePrice_withoutDiscount = 11500.235;
const pencilPrice_withoutDiscount = 475;

const tShirtDiscount = 100 - (TShirtPrice_withDiscount * 100) / TShirtPrice_withoutDiscount;
const mobileCaseDiscount = 100 - (mobileCasePrice_withDiscount * 100) / mobileCasePrice_withoutDiscount;
const pencilDiscount = 100 - (pencilPrice_withDiscount * 100) / pencilPrice_withoutDiscount;

export let items = [
    {
        id: "0",
        name: 'TShirt',
        selected: true,
        description: 'Футболка UZcotton мужская',
        imageUrl: 'images/items/TShirt.png',
        currency: 'сом',
        price: 1051,
        priceWithDiscount: 522,
        discount: tShirtDiscount,
        amount: 1,
        amount_left: 2,
        location: 'Коледино WB',
        companyName: 'OOO Вайлдберриз',
        additionalInfo: {
            color: 'белый',
            size: '56',
        }
    },
    {
        id: "1",
        name: 'mobileCase',
        selected: true,
        description: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        imageUrl: 'images/items/MobileCase.png',
        currency: 'сом',
        price: 11500.235,
        priceWithDiscount: 10500.235,
        discount: mobileCaseDiscount,
        amount: 200,
        amount_left: null,
        location: 'Коледино WB',
        companyName: 'OOO Мегапрофстиль',
        additionalInfo: {
            color: 'прозрачный',
        }
    },
    {
        id: "2",
        name: 'pencil',
        selected: true,
        description: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        imageUrl: 'images/items/Pencils.png',
        currency: 'сом',
        price: 475,
        priceWithDiscount: 247,
        discount: pencilDiscount,
        amount: 2,
        amount_left: 2,
        location: 'Коледино WB',
        companyName: 'OOO Вайлдберриз',
        additionalInfo: {},
    }];

export function removeItem(id){
    items = items.filter(item => item.id !== id);
}

export function getItem(id){
    return items.filter(item => item.id === id);
}