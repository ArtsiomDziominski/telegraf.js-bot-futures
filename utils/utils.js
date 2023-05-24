import {FIAT} from "../src/const/const.js";

export function getMarketProfit(unRealizedProfit) {
    return Number(unRealizedProfit) > 0 ? '🟢' : '🔴'
}

export function removeNameFiat(symbol) {
    symbol = symbol.replace(FIAT.USDT, '');
    symbol = symbol.replace(FIAT.BUSDT, '');
    return symbol.toLowerCase();
}