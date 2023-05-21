import {TOKEN} from "../config/config.js";
import {Markup, Telegraf} from "telegraf";
import {AXIOS_HEADER, MESSAGE, REQUEST_SERVER} from "../const/const.js";
import axios from "axios";
import UserStore from "../store/index.js";

const bot = new Telegraf(TOKEN);

export function sendAnswer(chatId, text) {
    bot.telegram.sendMessage(chatId, text)
}

export async function cancelOpenOrder(symbol) {
    const params = {symbol: symbol};
    return await axios.post(REQUEST_SERVER.CancelOpenOrder, params, AXIOS_HEADER);
}

export function checkUser(ctx) {
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    return false//!UserStore.whitList.includes(chatId);
}