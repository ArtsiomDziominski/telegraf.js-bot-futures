import {DB_URL, TOKEN} from "../../config/config.js";
import {Markup, Telegraf} from "telegraf";
import {AXIOS_HEADER, REQUEST_SERVER} from "../const/const.js";
import axios from "axios";
import UserStore from "../store/index.js";
import {getBtnTrading} from "../buttons/inline-button.js";

const bot = new Telegraf(TOKEN);

export function sendAnswer(chatId, text) {
    bot.telegram.sendMessage(chatId, text)
}

export async function cancelOpenOrder(symbol) {
    const params = {symbol: symbol};
    return await axios.post(REQUEST_SERVER.CancelOpenOrder, params, AXIOS_HEADER);
}

export async function checkUser(ctx) {
    const chatId = ctx.message?.chat?.id || ctx.update.callback_query.from.id;
    const whitListUsers = await axios.get(DB_URL + '/users');
    const idIndex = whitListUsers.data.findIndex(user => user.id === chatId);
    return idIndex < 0;
}

export function parseButton(button) {
    return  button.map(section => {
        return section.map(btn => Markup.button.callback(btn.message, btn.action))
    })
}

export async function getMessage(ctx, message, inlineButton) {
    const messageDuplicate = ctx.update?.callback_query?.message?.text;
    return !messageDuplicate
        ? ctx.reply(message)
        : messageDuplicate === message
            ? ctx.answerCbQuery('Обнавлено')
            : ctx.editMessageText(message, await inlineButton);
}


