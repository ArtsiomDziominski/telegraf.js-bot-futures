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
    getBtnTrading, getProfileBtn, getProfileTelegramBtn, getSettingTrading, getSettingTradingStep
} from "../buttons/inline-button.js";
import {
    cancelOrders, cancelWatching,
    getCurrentOrders,
    getMessageCancelOpenOrder, getNotifications, getProfit,
    getWatchingSymbols, logoutUser,
    newOrder, setNotificationNewOrder,
    setPassword, stopWatchingSymbols,
    takeProfit, toggleNotificationNewOrder
} from "./commands-function.js";
import {buttonStart} from "../buttons/button.js";
import {getStartMessage, getTradingMessage} from "../mixins/get-message.js";
import {
    getMessageActionTelegram, getMessageSetting,
    getMessageStepSellOrder,
    getMessageTelegramVisit
} from "../message/message-profile.js";
import {getBtnSettingTradingStep} from "../const/buttons.js";
import {setStepSellOrder, settingTradingStep} from "../components/setting-trading.js";

const bot = new Telegraf(TOKEN);

export function botCommandsStart() {
    bot.start(async (ctx) => ctx.reply(await getStartMessage(ctx)));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    botCommands();
    botAction();
    userMessage()
    bot.launch();
}

function botCommands() {
    bot.command('newOrder', async (ctx) => await newOrder(ctx));
    bot.command('neworder', async (ctx) => await newOrder(ctx));
    bot.command('watching', async (ctx) => await getWatchingSymbols(ctx));
    bot.command('profit', async (ctx) => ctx.reply(await getCurrentOrders(ctx), await btnCurrentOrder()));
    bot.command('cancelOrder', async (ctx) => ctx.reply(await getMessageCancelOpenOrder(ctx), await btnCancelOrders()));
    bot.command('cancelorder', async (ctx) => ctx.reply(await getMessageCancelOpenOrder(ctx), await btnCancelOrders()));
    bot.command('logoutUser', async (ctx) => ctx.reply(await logoutUser(ctx)));
    bot.command('logoutuser', async (ctx) => ctx.reply(await logoutUser(ctx)));
    bot.command('cancelWatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));
    bot.command('cancelwatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));

    bot.command('menu', async (ctx) => ctx.reply(await getTradingMessage(ctx), await getBtnMenu(ctx)));
}

function botAction() {
    bot.action('MarketAll', async (ctx) => await ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
    bot.action('cancelOrders', async (ctx) => await cancelOrders(ctx));

    bot.action('takeProfit', async (ctx) => await takeProfit(ctx));

    bot.action('watching', async (ctx) => await getWatchingSymbols(ctx));
    bot.action('profit', async (ctx) => await getProfit(ctx));

    bot.action('closeKeyboard', async (ctx) => await ctx.editMessageReplyMarkup({}));



    bot.action('main-menu', async (ctx) => ctx.editMessageText('Меню:', await getBtnMenu(ctx)));
    bot.action('notification-setting', async (ctx) => ctx.editMessageText(await getNotifications(), await getBtnNotification(ctx)));
    // bot.action('notification-new-order', (ctx) => ctx.editMessageText(toggleNotificationNewOrder(), getBtnNotification(ctx)));
    bot.action('notification-new-order', async (ctx) => await setNotificationNewOrder(ctx));
    botActionMenu();
}

function userMessage() {
    // bot.hears('💵 Торговля', async (ctx) => await ctx.reply(await getTradingMessage(ctx), await getBtnTrading(ctx)));
    // bot.hears('🧑‍💻 Profile', async (ctx) => await ctx.reply(await getTradingMessage(ctx), await getBtnTrading(ctx)));
    // bot.hears('☸️ Setting', async (ctx) => await ctx.reply(await getTradingMessage(ctx), await getBtnTrading(ctx)));
    bot.hears(PASSWORD, async (ctx) => ctx.reply(await setPassword(ctx)));
    bot.on('message', async (ctx) => ctx.reply('Слава Украине! 🇺🇦'));
}


function botActionMenu() {
    bot.action('trading', async (ctx) => ctx.editMessageText(await getTradingMessage(ctx), await getBtnTrading(ctx)));
    bot.action('profile', async (ctx) => ctx.editMessageText('Профиль', await getProfileBtn(ctx)));
    bot.action('setting', async (ctx) => ctx.editMessageText(await getTradingMessage(ctx), await getBtnSetting(ctx)));
    botActionMenuProfile();
    botActionMenuTrading();
    botActionSetting();
    botActionSettingTrading();
}

function botActionMenuProfile() {
    bot.action('action-telegram', async (ctx) => ctx.editMessageText(getMessageActionTelegram(ctx), await getProfileTelegramBtn(ctx)));
    botActionMenuProfileTelegram();
}

function botActionMenuProfileTelegram() {
    bot.action('profile-telegram-visit', (ctx) => ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
    bot.action('profile-telegram-login', async (ctx) => await getMessageTelegramVisit(ctx));
}

function botActionMenuTrading() {
    bot.action('trading-newOrder', async (ctx) => ctx.editMessageText('Напишите команду /newOrder'));
    bot.action('trading-stopBot', async (ctx) => await stopWatchingSymbols(ctx));
}

function botActionSetting() {
    bot.action('notification-trading', async (ctx) => ctx.editMessageText(getMessageSetting(ctx), await getSettingTrading(ctx)));
}

function botActionSettingTradingStepSellOrder() {
    bot.action('setting-trading-setStepSellOrder-0', async (ctx) => settingTradingStep(ctx, 0));
    bot.action('setting-trading-setStepSellOrder-2', async (ctx) => settingTradingStep(ctx, 2));
    bot.action('setting-trading-setStepSellOrder-3', async (ctx) => settingTradingStep(ctx, 3));
    bot.action('setting-trading-setStepSellOrder-4', async (ctx) => settingTradingStep(ctx, 4));
    bot.action('setting-trading-setStepSellOrder-5', async (ctx) => settingTradingStep(ctx, 5));
}

function botActionSettingTrading() {
    bot.action('step-sell-order', async (ctx) => ctx.editMessageText(await getMessageStepSellOrder(ctx), await getSettingTradingStep(ctx)));
    botActionSettingTradingStepSellOrder();
}

