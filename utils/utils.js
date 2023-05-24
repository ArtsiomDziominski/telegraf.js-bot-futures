import {FIAT} from "../src/const/const.js";

export function getMarketProfit(unRealizedProfit) {
    return Number(unRealizedProfit) > 0 ? '🟢' : '🔴'
}

export function removeNameFiat(symbol) {
    symbol = symbol.replace(FIAT.USDT, '');
    symbol = symbol.replace(FIAT.BUSDT, '');
    return symbol.toLowerCase();
}

export function checkLineBreak(text) {
    return text.at(-1) === '\n' ? text.slice(0, text.length - 1) : text;
}

export function getDateTimeformat(date = Date.now()) {
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'full', timeStyle: 'long' }).format(date);
}