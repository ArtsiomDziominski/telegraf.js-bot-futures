import UserStore from "../store/index.js";
import {AXIOS_HEADER, MESSAGE, MESSAGE_CODE, REQUEST_SERVER} from "../const/const.js";
import axios from "axios";
import {cancelOpenOrder, checkUser, parseButton, sendAnswer} from "../mixins/helper.js";
import {getBtnNotification, getBtnTrading} from "../../buttons/inline-button.js";
import Notification from "../store/notification.js";
import {Markup} from "telegraf";
import {BUTTONS} from "../const/buttons.js";

export function newOrder(ctx) {
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id; ////Исправить, добавить в checkUser(ctx)
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    const message = ctx.message.text;
    const messageNewOrder = message.split(' ');
    if (messageNewOrder.length !== 7) return MESSAGE.NotAllParametersEntered;
    const newOrderParams = {
        symbol: messageNewOrder[1],
        quantity: messageNewOrder[2],
        price: messageNewOrder[3],
        quantityOrders: messageNewOrder[4],
        priceStep: messageNewOrder[5],
        decimal: messageNewOrder[6]
    }
    axios.post(REQUEST_SERVER.NewOrder, newOrderParams, AXIOS_HEADER)
        .then(r => sendAnswer(chatId, r.status === MESSAGE_CODE.Success ? r.data : MESSAGE.Error));
    return MESSAGE.SendNewOrder;
}

export async function getWatchingSymbols(ctx) {
    const messageDuplicate = ctx.update?.callback_query?.message?.text;
    if (checkUser(ctx)) return ctx.reply(MESSAGE.NoPassword);
    const response = await getWatchingListFromServer(ctx);
    const watchingList = response.data;
    watchingList.unshift('Наблюдаемые ордера:');
    const watchingListText = watchingList.join('\n');
    return !messageDuplicate ? ctx.reply(watchingListText) : messageDuplicate !== watchingListText ? ctx.editMessageText(watchingListText, getBtnTrading(ctx)) : ctx.answerCbQuery('Обнавлено');
}

export async function getProfit(ctx) {
    const messageDuplicate = ctx.update?.callback_query?.message?.text + '\n';
    if (checkUser(ctx)) return ctx.reply(MESSAGE.NoPassword);
    const currentOrders = await getCurrentOrders(ctx);
    return !messageDuplicate
        ? ctx.reply(currentOrders)
        : messageDuplicate === currentOrders
            ? ctx.answerCbQuery('Обнавлено')
            : ctx.editMessageText(currentOrders, getBtnTrading(ctx));
}

export function getCurrentOrders(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    return axios.get(REQUEST_SERVER.GetCurrentOrder)
        .then(r => {
            let text = '';
            const currentOrders = r?.data;
            UserStore.currentOrders = r.data;
            if (!currentOrders) return 'Список пуст';
            currentOrders
                .forEach(order => text = text + `${Number(order.unRealizedProfit).toFixed(2) > 0 ? '🟢' : '🔴'} ${order.symbol}: ${Number(order.unRealizedProfit).toFixed(2)}$\n`);
            return text
        })
}

export function setPassword(ctx) {
    const chatId = ctx.message.chat.id;
    UserStore.whitList.push(chatId);
    return MESSAGE.AfterInputPassword;
}

export function takeProfit(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    const symbolForCancel = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;
    ctx.editMessageReplyMarkup({})

    return ctx.answerCbQuery(`В данный момент функция не работает`);
}

export function cancelOrders(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    const symbolForCancel = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;
    ctx.editMessageReplyMarkup({})
    cancelOpenOrder(symbolForCancel).then(r => sendAnswer(chatId, r.data));
    return ctx.answerCbQuery(`Отмена ордера ${symbolForCancel}`);
}

export function getMessageCancelOpenOrder(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    return MESSAGE.CancelOpenOrder;
}

export function logoutUser(ctx) {
    if (checkUser(ctx)) return '❌⛔️ Сначала нужно войти в аккаунт ⛔️❌';
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    UserStore.whitList = UserStore.whitList.filter(chatIdUser => chatIdUser !== chatId);
    return 'Мы без тебя to the moon 🚀\nВы вышли!'
}

export function cancelWatching(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    return axios.get(REQUEST_SERVER.ClearWatchingList)
        .then(r => r.data)
}

export function getWatchingListFromServer(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    return axios.get(REQUEST_SERVER.GetWatchingList);
}

export async function toggleNotificationNewOrder(ctx) {
    return {
        inline_keyboard: parseButton(BUTTONS.notification),
    };
}

export async function getNotifications() {
    return 'Настройка уведомлений:'
}

