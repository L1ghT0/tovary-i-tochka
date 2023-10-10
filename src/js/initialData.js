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

// cards
const cards = [
    {
        name: 'mir',
        selected: true,
    },
    {
        name: 'visa',
        selected: false,
    },
    {
        name: 'mastercard',
        selected: false,
    },
    {
        name: 'maestro',
        selected: false,
    }
]

export function selectCard(name) {
    if(!cards.filter(card => card.name === name).length) return; // no matches

    cards.forEach(card => card.name === name ? card.selected = true : card.selected = false);
}

export function getSelectedCard(){
    return cards.filter(card => card.selected)[0];
}


// addresses:
const waysToDeliver = [
    {
        name: 'pick-up-point',
        selected: true, // as init value we open pick-up-points first
        addresses: [
            {
                id: '0',
                address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
                rating: '4.99',
                selected: false
            },
            {
                id: '1',
                address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
                rating: '4.99',
                selected: false
            },
            {
                id: '2',
                address: 'г. Бишкек, улица Табышалиева, д. 57',
                rating: '4.99',
                selected: false
            }
        ]
    },
    {
        name: 'courier',
        selected: false,
        addresses: [
            {
                id: '0',
                address: 'Бишкек, улица Табышалиева, 57',
                selected: false,
            },
            {
                id: '1',
                address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
                selected: false,
            },
            {
                id: '2',
                address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
                selected: false,
            }
        ]
    }
]
export function getSelectedWayToDeliver(){
    return waysToDeliver.filter(way => way.selected)[0] || null
}

export function getSelectedAddress(){
    return getSelectedWayToDeliver().addresses.filter(address => address.selected)[0] || null
}

export function selectWayToDeliver(name){
    if(!waysToDeliver.filter(way => way.name === name).length) return; // no matches

    waysToDeliver.forEach(way => way.name === name ? way.selected = true : way.selected = false);
    waysToDeliver.forEach(way => {
        if(!way.selected){
            way.addresses.forEach(address=>address.selected = false)
        }
    })
}

export function selectAddress(id){
    getSelectedWayToDeliver().addresses.forEach(address => address.id === id ? address.selected = true : address.selected = false)
}

export function removeAddress(way, id){
    waysToDeliver.forEach(wayToDeliver => {
        if(wayToDeliver.name === way){
            wayToDeliver.addresses = wayToDeliver.addresses.filter(address => address.id !== id)
        }
    })
}


export let amountOfLikedItems = 0;

export function increaseAmountOfLikedItems(){
    amountOfLikedItems++;
}

export function decreaseAmountOfLikedItems(){
    if(amountOfLikedItems < 1) return;
    amountOfLikedItems--;
}