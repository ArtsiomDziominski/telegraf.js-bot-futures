import {checkUser} from "../../mixins/helper.js";
import {getNotifications} from "../../commands/commands-function.js";
import {getBtnMenu, getBtnNotification, getBtnTrading} from "../../buttons/inline-button.js";
import {MESSAGE} from "../../const/const.js";
import {getTradingMessage} from "../../mixins/get-message.js";


export async function getActionNotificationSetting(ctx) {
    return await checkUser(ctx) ? ctx.editMessageText(await getNotifications(), await getBtnNotification(ctx)) : ctx.reply(MESSAGE.NoPassword)
}

export async function getActionMainMenu(ctx) {
    return await checkUser(ctx) ? ctx.editMessageText('Меню:', await getBtnMenu(ctx)) : ctx.reply(MESSAGE.NoPassword)
}

export async function getActionTrading(ctx) {
    return await checkUser(ctx) ? ctx.editMessageText(await getTradingMessage(ctx), await getBtnTrading(ctx)) : ctx.reply(MESSAGE.NoPassword)
}