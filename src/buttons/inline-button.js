import {Markup} from "telegraf";
import axios from "axios";
import {MESSAGE, REQUEST_SERVER} from "../const/const.js";
import UserStore from "../store/index.js";
import {
    BUTTONS,
    getBtnSettingTradingSellOrderPercent,
    getBtnSettingTradingStep, getBtnSettingTradingUpdateServer,
    getNotificationsBtn
} from "../const/buttons.js";
import {checkUser, parseButton} from "../mixins/helper.js";

export const btnProfit = Markup.inlineKeyboard([
    Markup.button.callback('Market all', 'MarketAll'),
    Markup.button.callback('Закрыть', 'closeKeyboard')
])

export async function getBtnTrading(ctx) {
    const btnNotification = parseButton(BUTTONS.trading);
    return Markup.inlineKeyboard(btnNotification);
}

export async function getBtnSetting(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('Торговля', 'notification-trading'),
            Markup.button.callback('Уведомление', 'notification-setting')
        ],
        [Markup.button.callback('Назад', 'main-menu')]
    ]);
}

export async function getBtnNotification(ctx) {
    const btnNotification = await parseButton(getNotificationsBtn());
    return Markup.inlineKeyboard(btnNotification);
}

export async function getBtnMenu(ctx) {
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

export async function getProfileBtn(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(BUTTONS.profile);
    return Markup.inlineKeyboard(btnProfile);
}

export async function getProfileTelegramBtn(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(BUTTONS.profileTelegram);
    return Markup.inlineKeyboard(btnProfile);
}

export async function getBtnBackToActionTelegram(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(BUTTONS.backToActionTelegram);
    return Markup.inlineKeyboard(btnProfile);
}

export async function getSettingTrading(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(BUTTONS.settingTrading);
    return Markup.inlineKeyboard(btnProfile);
}

export async function getSettingTradingStep(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(getBtnSettingTradingStep());
    return Markup.inlineKeyboard(btnProfile);
}

export async function getSettingTradingSellOrderPercent(ctx) {
    if (!(await checkUser(ctx))) return Markup.inlineKeyboard({});
    const btnProfile = parseButton(getBtnSettingTradingSellOrderPercent());
    return Markup.inlineKeyboard(btnProfile);
}

export async function getSettingUpdateServer(ctx) {
    const btnProfile = parseButton(getBtnSettingTradingUpdateServer());
    return Markup.inlineKeyboard(btnProfile);
}
