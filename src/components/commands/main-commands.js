import {getTradingMessage} from "../../mixins/get-message.js";
import {btnCancelOrders, btnCurrentOrder, getBtnMenu} from "../../buttons/inline-button.js";
import {checkUser} from "../../mixins/helper.js";
import {Markup} from "telegraf";
import {MESSAGE} from "../../const/const.js";
import {getCurrentOrders, getMessageCancelOpenOrder} from "../../commands/commands-function.js";

export async function getCommandMenu(ctx) {
    return await checkUser(ctx) ? ctx.reply(await getTradingMessage(ctx), await getBtnMenu(ctx)) : ctx.reply(MESSAGE.NoPassword)
}

export async function getCommandProfit(ctx) {
    return await checkUser(ctx) ? ctx.reply(await getCurrentOrders(ctx)) : ctx.reply(MESSAGE.NoPassword); //, await btnCurrentOrder(ctx)
}

export async function getCommandCancelOrder(ctx) {
    return await checkUser(ctx) ? ctx.reply(await getMessageCancelOpenOrder(ctx), await btnCancelOrders()) : ctx.reply(MESSAGE.NoPassword)
}