import {PASSWORD, TOKEN} from "../../config/config.js";
import {Telegraf} from "telegraf";
import UserStore from "../store/index.js";
import {message} from "telegraf/filters";
import {MESSAGE} from "../const/const.js";
import {
    btnCancelOrders,
    btnCurrentOrder,
    btnProfit, getBtnBackToActionTelegram,
    getBtnMenu, getBtnNotification,
    getBtnSetting,
    getBtnTrading, getProfileBtn, getProfileTelegramBtn
} from "../buttons/inline-button.js";
import {
    cancelOrders, cancelWatching,
    getCurrentOrders,
    getMessageCancelOpenOrder, getNotifications, getProfit,
    getWatchingSymbols, logoutUser,
    newOrder,
    setPassword,
    takeProfit, toggleNotificationNewOrder
} from "./commands-function.js";
import {buttonStart} from "../buttons/button.js";
import {getTradingMessage} from "../mixins/get-message.js";
import {getMessageActionTelegram, getMessageTelegramVisit} from "../message/message-profile.js";

const bot = new Telegraf(TOKEN);

export function botCommandsStart() {
    bot.start((ctx) => ctx.reply((UserStore.whitList.findIndex(user => user.id === ctx.message.chat.id) >= 0) ? MESSAGE.YouLogged : MESSAGE.Enter_password, buttonStart()));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    botCommands();
    botAction();
    userMessage()
    bot.launch();
}

function botCommands() {
    bot.command('newOrder', (ctx) => ctx.reply(newOrder(ctx)));
    bot.command('neworder', (ctx) => ctx.reply(newOrder(ctx)));
    bot.command('watching', async (ctx) => await getWatchingSymbols(ctx));
    bot.command('profit', async (ctx) => ctx.reply(await getCurrentOrders(ctx), await btnCurrentOrder()));
    bot.command('cancelOrder', async (ctx) => ctx.reply(getMessageCancelOpenOrder(ctx), await btnCancelOrders()));
    bot.command('cancelorder', async (ctx) => ctx.reply(getMessageCancelOpenOrder(ctx), await btnCancelOrders()));
    bot.command('logoutUser', async (ctx) => ctx.reply(logoutUser(ctx)));
    bot.command('logoutuser', async (ctx) => ctx.reply(logoutUser(ctx)));
    bot.command('cancelWatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));
    bot.command('cancelwatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));

    bot.command('menu', (ctx) => ctx.reply(getTradingMessage(ctx), getBtnMenu(ctx)));
}

function botAction() {
    bot.action('MarketAll', (ctx) => ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
    bot.action('cancelOrders', (ctx) => cancelOrders(ctx));

    bot.action('takeProfit', (ctx) => takeProfit(ctx));

    bot.action('watching', async (ctx) => getWatchingSymbols(ctx));
    bot.action('profit', async (ctx) => getProfit(ctx));

    bot.action('closeKeyboard', (ctx) => ctx.editMessageReplyMarkup({}));



    bot.action('main-menu', (ctx) => ctx.editMessageText('Меню:', getBtnMenu(ctx)));
    bot.action('notification-setting', async (ctx) => ctx.editMessageText(await getNotifications(), await getBtnNotification(ctx)));
    // bot.action('notification-new-order', (ctx) => ctx.editMessageText(toggleNotificationNewOrder(), getBtnNotification(ctx)));
    bot.action('notification-new-order', async (ctx) => ctx.answerCbQuery(MESSAGE.FunctionNotWorking))//ctx.editMessageReplyMarkup(await toggleNotificationNewOrder(ctx)));
    botActionMenu();
}

function userMessage() {
    bot.hears('💵 Торговля', (ctx) => ctx.reply(getTradingMessage(ctx), getBtnTrading(ctx)));
    bot.hears(PASSWORD, async (ctx) => ctx.reply(setPassword(ctx)));
    bot.on('message', async (ctx) => ctx.reply('Слава Украине! 🇺🇦'));
}


function botActionMenu() {
    bot.action('trading', (ctx) => ctx.editMessageText(getTradingMessage(ctx), getBtnTrading(ctx)));
    bot.action('profile', (ctx) => ctx.editMessageText('Профиль', getProfileBtn(ctx)));
    bot.action('setting', (ctx) => ctx.editMessageText(getTradingMessage(ctx), getBtnSetting(ctx)));
    botActionMenuProfile();
}

function botActionMenuProfile() {
    bot.action('action-telegram', (ctx) => ctx.editMessageText(getMessageActionTelegram(), getProfileTelegramBtn(ctx)));
    botActionMenuProfileTelegram();
}

function botActionMenuProfileTelegram() {
    bot.action('profile-telegram-visit', (ctx) => ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
    bot.action('profile-telegram-login', (ctx) => getMessageTelegramVisit(ctx));
    bot.action('profile-telegram-login', (ctx) => ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
}
