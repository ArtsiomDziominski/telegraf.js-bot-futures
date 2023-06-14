import {PASSWORD, TOKEN} from "../../config/config.js";
import {Telegraf} from "telegraf";
import UserStore from "../store/index.js";
import {message} from "telegraf/filters";
import {MESSAGE} from "../const/const.js";
import {
    getBtnSetting,
    getProfileBtn,
    getProfileTelegramBtn,
    getSettingTrading,
    getSettingTradingSellOrderPercent, getSettingTradingStep, getSettingUpdateServer,
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
import {getMessageInfo, getStartMessage, getTradingMessage} from "../mixins/get-message.js";
import {
    getMessageActionTelegram, getMessageSellOrderPercent, getMessageSetting, getMessageSettingUpdateServer,
    getMessageStepSellOrder,
    getMessageTelegramVisit
} from "../message/message-profile.js";
import {
    getSettingTradingCheckCurrentOrder, getSettingTradingSetCheckCurrentOrder,
    getSettingTradingUpdateServer,
    settingTradingSellOrderPercent,
    settingTradingStep,
    settingTradingUpdateServer
} from "../components/setting-trading.js";
import {getCommandCancelOrder, getCommandMenu, getCommandProfit} from "../components/commands/main-commands.js";
import {getActionMainMenu, getActionNotificationSetting, getActionTrading} from "../components/commands/main-action.js";

const bot = new Telegraf(TOKEN);

export function botCommandsStart() {
    bot.start(async (ctx) => ctx.reply(await getStartMessage(ctx)));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    bot.command('info', async (ctx) => ctx.reply(getMessageInfo()));
    botCommands();
    botAction();
    userMessage()
    bot.launch();
}

function botCommands() {
    bot.command('newOrder', async (ctx) => await newOrder(ctx));
    bot.command('neworder', async (ctx) => await newOrder(ctx));
    bot.command('watching', async (ctx) => await getWatchingSymbols(ctx));
    bot.command('profit', async (ctx) => await getCommandProfit(ctx));
    bot.command('cancelOrder', async (ctx) => await getCommandCancelOrder(ctx));
    bot.command('cancelorder', async (ctx) => await getCommandCancelOrder(ctx));
    bot.command('logoutUser', async (ctx) => ctx.reply(await logoutUser(ctx)));
    bot.command('logoutuser', async (ctx) => ctx.reply(await logoutUser(ctx)));
    bot.command('cancelWatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));
    bot.command('cancelwatching', async (ctx) => ctx.reply(await cancelWatching(ctx)));

    bot.command('menu', async (ctx) => getCommandMenu(ctx));
}

function botAction() {
    bot.action('MarketAll', async (ctx) => await ctx.answerCbQuery(MESSAGE.FunctionNotWorking));
    bot.action('cancelOrders', async (ctx) => await cancelOrders(ctx));

    bot.action('takeProfit', async (ctx) => await takeProfit(ctx));

    bot.action('watching', async (ctx) => await getWatchingSymbols(ctx));
    bot.action('profit', async (ctx) => await getProfit(ctx));

    bot.action('closeKeyboard', async (ctx) => await ctx.editMessageReplyMarkup({}));



    bot.action('main-menu', async (ctx) => await getActionMainMenu(ctx));
    bot.action('notification-setting', async (ctx) => await getActionNotificationSetting(ctx));
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
    bot.action('trading', async (ctx) => await getActionTrading(ctx));
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

function botActionSettingTrading() {
    bot.action('step-sell-order', async (ctx) => ctx.editMessageText(await getMessageStepSellOrder(ctx), await getSettingTradingStep(ctx)));
    bot.action('sell-order-percent', async (ctx) => ctx.editMessageText(await getMessageSellOrderPercent(ctx), await getSettingTradingSellOrderPercent(ctx)));
    bot.action('update-server', async (ctx) => getSettingTradingUpdateServer(ctx));
    bot.action('check-current-order', async (ctx) => getSettingTradingCheckCurrentOrder(ctx));
    botActionSettingTradingStepSellOrder();
    botActionSettingTradingSellOrderPercent();
    botActionSettingTradingUpdateServer();
    bot.action('set-check-current-order', async (ctx) => getSettingTradingSetCheckCurrentOrder(ctx));
}

function botActionSettingTradingUpdateServer() {
    bot.action('setting-trading-UpdateServer-0', async (ctx) => settingTradingUpdateServer(ctx, 0));
    bot.action('setting-trading-UpdateServer-3', async (ctx) => settingTradingUpdateServer(ctx, 3));
    bot.action('setting-trading-UpdateServer-4', async (ctx) => settingTradingUpdateServer(ctx, 4));
    bot.action('setting-trading-UpdateServer-5', async (ctx) => settingTradingUpdateServer(ctx, 5));
    bot.action('setting-trading-UpdateServer-6', async (ctx) => settingTradingUpdateServer(ctx, 6));
    bot.action('setting-trading-UpdateServer-7', async (ctx) => settingTradingUpdateServer(ctx, 7));
    bot.action('setting-trading-UpdateServer-8', async (ctx) => settingTradingUpdateServer(ctx, 8));
}

function botActionSettingTradingSellOrderPercent() {
    bot.action('setting-trading-SellOrderPercent-5', async (ctx) => settingTradingSellOrderPercent(ctx, 5));
    bot.action('setting-trading-SellOrderPercent-10', async (ctx) => settingTradingSellOrderPercent(ctx, 10));
    bot.action('setting-trading-SellOrderPercent-15', async (ctx) => settingTradingSellOrderPercent(ctx, 15));
    bot.action('setting-trading-SellOrderPercent-20', async (ctx) => settingTradingSellOrderPercent(ctx, 20));
    bot.action('setting-trading-SellOrderPercent-25', async (ctx) => settingTradingSellOrderPercent(ctx, 25));
    bot.action('setting-trading-SellOrderPercent-30', async (ctx) => settingTradingSellOrderPercent(ctx, 30));
    bot.action('setting-trading-SellOrderPercent-0', async (ctx) => settingTradingSellOrderPercent(ctx, 0));
}

function botActionSettingTradingStepSellOrder() {
    bot.action('setting-trading-setStepSellOrder-0', async (ctx) => settingTradingStep(ctx, 0));
    bot.action('setting-trading-setStepSellOrder-2', async (ctx) => settingTradingStep(ctx, 2));
    bot.action('setting-trading-setStepSellOrder-3', async (ctx) => settingTradingStep(ctx, 3));
    bot.action('setting-trading-setStepSellOrder-4', async (ctx) => settingTradingStep(ctx, 4));
    bot.action('setting-trading-setStepSellOrder-5', async (ctx) => settingTradingStep(ctx, 5));
}

