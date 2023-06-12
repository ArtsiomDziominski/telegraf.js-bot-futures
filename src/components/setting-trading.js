import axios from "axios";
import {MESSAGE, REQUEST_DB} from "../const/const.js";
import UserStore from "../store/index.js";
import {checkUser, getMessage} from "../mixins/helper.js";
import {
    getSettingTradingSellOrderPercent,
    getSettingTradingStep,
    getSettingUpdateServer
} from "../buttons/inline-button.js";
import {getMessageSettingUpdateServer} from "../message/message-profile.js";

async function setSettingTradingToUserStore() {
    UserStore.settingTrading = (await axios.get(REQUEST_DB.settingTrading)).data
}

async function setSettingTrading(settingTrading) {
    UserStore.settingTrading = (await axios.patch(REQUEST_DB.settingTrading, settingTrading)).data;
}

export async function setUpdateServer(seconds) {
    await setSettingTradingToUserStore;
    UserStore.settingTrading.updateServer = seconds;
    await setSettingTrading(UserStore.settingTrading);
    return `Раз в ${seconds} секнуды обновляется сервер`;
}

export async function setStepSellOrder(step) {
    await setSettingTradingToUserStore;
    UserStore.settingTrading.stepSellOrder = step;
    await setSettingTrading(UserStore.settingTrading);
    return 'Шаг установлен: ' + step;
}

async function setStepSellOrderPercent(sellOrderPercent) {
    await setSettingTradingToUserStore;
    UserStore.settingTrading.sellOrderPercent = sellOrderPercent;
    await setSettingTrading(UserStore.settingTrading);
    return UserStore.settingTrading.sellOrderPercent > 0 ?
        `Ордера на продажу будут выставляться автоматически с ${UserStore.settingTrading.sellOrderPercent}%` :
        `Авто. выставление ордеров на продажу Отключены`;
}

export async function settingTradingUpdateServer(ctx, seconds) {
    return await checkUser(ctx) ? getMessage(ctx, await setUpdateServer(seconds), await getSettingUpdateServer(ctx)) : ctx.reply(MESSAGE.NoPassword);
}

export async function getSettingTradingUpdateServer(ctx) {
    return await checkUser(ctx) ? ctx.editMessageText(await getMessageSettingUpdateServer(ctx), await getSettingUpdateServer(ctx)) : ctx.reply(MESSAGE.NoPassword);
}

export async function settingTradingStep(ctx, step) {
    return await checkUser(ctx) ? getMessage(ctx, await setStepSellOrder(step), await getSettingTradingStep(ctx)) : ctx.reply(MESSAGE.NoPassword);
}

export async function settingTradingSellOrderPercent(ctx, step) {
    return await checkUser(ctx) ? getMessage(ctx, await setStepSellOrderPercent(step), await getSettingTradingSellOrderPercent(ctx)) : ctx.reply(MESSAGE.NoPassword);
}