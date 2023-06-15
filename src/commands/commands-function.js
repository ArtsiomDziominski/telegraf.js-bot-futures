import UserStore from "../store/index.js";
import {AXIOS_HEADER, REQUEST_DB, MESSAGE, MESSAGE_CODE, REQUEST_SERVER} from "../const/const.js";
import axios from "axios";
import {cancelOpenOrder, checkUser, getMessage, parseButton, sendAnswer} from "../mixins/helper.js";
import {getBtnNotification, getBtnTrading} from "../buttons/inline-button.js";
import {BUTTONS} from "../const/buttons.js";
import {getMarketProfit, removeNameFiat} from "../utils/utils.js";
import {DB_URL} from "../../config/config.js";
import {buttonNewOrder} from "../buttons/button.js";

export async function newOrder(ctx) {
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id; ////Исправить, добавить в checkUser(ctx)
    if (!(await checkUser(ctx))) return ctx.reply(MESSAGE.NoPassword);
    const message = ctx.message.text;
    const messageNewOrder = message.split(' ');
    if (messageNewOrder.length !== 7) return ctx.reply(MESSAGE.NotAllParametersEntered, await buttonNewOrder(ctx));
    const newOrderParams = {
        symbol: messageNewOrder[1],
        quantity: messageNewOrder[2],
        price: messageNewOrder[3],
        quantityOrders: messageNewOrder[4],
        priceStep: messageNewOrder[5],
        decimal: messageNewOrder[6]
    }
    axios.post(REQUEST_SERVER.NewOrder, newOrderParams, AXIOS_HEADER)
        .then(r => sendAnswer(chatId, r.status === MESSAGE_CODE.Success ? r.data : MESSAGE.Error))
        .catch(r => sendAnswer(chatId, MESSAGE.ErrorRequestServer));
    return ctx.reply(MESSAGE.SendNewOrder);
}

export async function stopWatchingSymbols(ctx) {
    return await checkUser(ctx) ? getMessage(ctx, await cancelWatching(ctx), await getBtnTrading(ctx)) : ctx.reply(MESSAGE.NoPassword);
}

export async function getWatchingSymbols(ctx) {
    const messageDuplicate = ctx.update?.callback_query?.message?.text;
    if (!(await checkUser(ctx))) return ctx.reply(MESSAGE.NoPassword);
    const response = await getWatchingListFromServer(ctx);
    const watchingList = response.data;
    watchingList.unshift('Наблюдаемые ордера:');
    const watchingListText = watchingList.join('\n');
    return !messageDuplicate ? ctx.reply(watchingListText) : messageDuplicate !== watchingListText ? ctx.editMessageText(watchingListText, await getBtnTrading(ctx)) : ctx.answerCbQuery('Обнавлено');
}

export async function getProfit(ctx) {
    const messageDuplicate = ctx.update?.callback_query?.message?.text + '\n';
    if (!(await checkUser(ctx))) return ctx.reply(MESSAGE.NoPassword);
    const currentOrders = await getCurrentOrders(ctx);
    return !messageDuplicate
        ? ctx.reply(currentOrders)
        : messageDuplicate === currentOrders
            ? ctx.answerCbQuery('Обнавлено')
            : ctx.editMessageText(currentOrders, await getBtnTrading(ctx));
}

export async function getCurrentOrders(ctx) {
    return axios.get(REQUEST_SERVER.GetCurrentOrder)
        .then(r => {
            let text = 'Профит:\n';
            const currentOrders = r?.data;
            UserStore.currentOrders = r.data;
            if (!currentOrders) return 'Список пуст';
            currentOrders
                .forEach(order => text = text + `${getMarketProfit(order.unRealizedProfit)} ${order.symbol}: ${Number(order.unRealizedProfit).toFixed(2)}$       ${order.positionAmt} ${removeNameFiat(order.symbol)}\n`);
            return text
        })
        .catch(reason => {
            return MESSAGE.ErrorRequestServer;
        })
}

export async function setPassword(ctx) {
    const chat = ctx.message.chat;
    const message = ctx.message;
    const whitListUsers = await axios.get(DB_URL + '/users');
    const idIndex = whitListUsers.data.findIndex(user => user.id === chat.id);
    if (idIndex >= 0) {
        return MESSAGE.loggedIn;
    } else {
        await axios.post(DB_URL + '/users', {...chat, dateLogin: Date.now()})
    }

    return MESSAGE.AfterInputPassword;
}

export async function takeProfit(ctx) {
    if (!(await checkUser(ctx))) return MESSAGE.NoPassword;
    const symbolForCancel = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;
    ctx.editMessageReplyMarkup({})

    return ctx.answerCbQuery(`В данный момент функция не работает`);
}

export async function cancelOrders(ctx) {
    if (!(await checkUser(ctx))) return MESSAGE.NoPassword;
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    const symbolForCancel = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text;
    ctx.editMessageReplyMarkup({})
    cancelOpenOrder(symbolForCancel).then(r => sendAnswer(chatId, r.data));
    return ctx.answerCbQuery(`Отмена ордера ${symbolForCancel}`);
}

export async function getMessageCancelOpenOrder(ctx) {
    return MESSAGE.CancelOpenOrder;
}

export async function logoutUser(ctx) {
    if (!(await checkUser(ctx))) return '❌⛔️ Для начало нужно войти в аккаунт ⛔️❌';
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    const resUsers = await axios.get(REQUEST_DB.users);
    UserStore.whitList = resUsers.data;
    await axios.delete(`${REQUEST_DB.users}/${chatId}`);
    return 'Мы без тебя to the moon 🚀\nВы вышли!'
}

export async function cancelWatching(ctx) {
    if (!(await checkUser(ctx))) return MESSAGE.NoPassword;
    return axios.get(REQUEST_SERVER.ClearWatchingList)
        .then(r => r.data)
}

export async function getWatchingListFromServer(ctx) {
    if (!(await checkUser(ctx))) return MESSAGE.NoPassword;
    return axios.get(REQUEST_SERVER.GetWatchingList);
}

export async function toggleNotificationNewOrder(ctx) {
    return {
        inline_keyboard: parseButton(BUTTONS.notification),
    };
}

export async function getNotifications() {
    UserStore.notifications = (await axios.get(REQUEST_DB.notifications)).data;
    return 'Настройка уведомлений:'
}

export async function setNotificationNewOrder(ctx) {
    const response = await axios.get(REQUEST_DB.notifications);
    UserStore.notifications = response.data;
    UserStore.notifications.infoNewOrder = !UserStore.notifications.infoNewOrder;
    await axios.patch(REQUEST_DB.notifications, UserStore.notifications);
    const message = 'Иноформация о выставления ордеров: ' + UserStore.notifications.infoNewOrder;
    return getMessage(ctx, message, await getBtnNotification(ctx));
}

