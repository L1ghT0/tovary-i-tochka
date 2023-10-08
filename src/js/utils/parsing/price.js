export function insertingSpaceInLongPrice(string, narrowNoBreakSpace){

    if(typeof string !== 'string'){ // we only process strings
        return string;
    }

    let space = narrowNoBreakSpace ? '\u202F' : ' '; // 2 different spaces
    let step = 0;

    let arrOfString = string.split('.');
    let stringToParse = arrOfString[0];
    let restOfString = '';

    for (let i = 1; i < arrOfString.length; i++){
        restOfString += '.' + arrOfString[i];   // save the rest we don't parse
    }

    return stringToParse.length > 3
        ? stringToParse.split('').reverse().map(symbol => {
        step++;
        if(step === 3){ // every 4th symbol inserts space behind it
            step = 0;
            return space + symbol;
        }
        return symbol;
    }).reverse().join('') + restOfString
        : string
}