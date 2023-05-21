import {Markup} from "telegraf";
import axios from "axios";
import {MESSAGE, REQUEST_SERVER} from "../src/const/const.js";
import UserStore from "../src/store/index.js";
import {checkUser} from "../src/mixins/helper.js";

export const btnProfit = Markup.inlineKeyboard([
    Markup.button.callback('Market all', 'MarketAll'),
    Markup.button.callback('Закрыть', 'closeKeyboard')
])

export function getBtnTrading(ctx) {
    if (checkUser(ctx)) return Markup.inlineKeyboard({});
    return Markup.inlineKeyboard([
        [Markup.button.callback('Наблюдаемые валюты', 'watching')],
        [Markup.button.callback('Назад', 'main-menu')]
    ]);
}

export function getBtnMenu(ctx) {
    if (checkUser(ctx)) return Markup.inlineKeyboard({});
    return Markup.inlineKeyboard(
        [[
            Markup.button.callback('💵 Торговля', 'trading'),
            Markup.button.callback('🧑‍💻 Profile', 'profile'),
            Markup.button.callback('☸ Setting', 'setting')
        ],
            [Markup.button.callback('Закрыть', 'closeKeyboard')]
        ]);
}


export function btnCancelOrders() {
    if (!UserStore.isPassword) return;
    return axios.get(REQUEST_SERVER.GetWatchingList)
        .then(response => {
            const watchingSymbols = response.data;
            const watchingKeyboard = watchingSymbols?.map(symbol => {
                return {
                    text: symbol,
                    callback_data: 'cancelOrders',
                    hide: false
                }
            });
            watchingKeyboard.push({text: 'Закрыть', callback_data: 'closeKeyboard', hide: false});
            return Markup.inlineKeyboard(watchingKeyboard);
        });
}

export function btnCurrentOrder() {
    if (!UserStore.isPassword) return;
    const currentOrdersKeyboard = UserStore.currentOrders?.map(order => {
        return {
            text: order.symbol,
            callback_data: 'takeProfit',
            hide: false
        }
    });
    currentOrdersKeyboard.push({text: 'Закрыть', callback_data: 'closeKeyboard', hide: false});
    return Markup.inlineKeyboard(currentOrdersKeyboard);
}
