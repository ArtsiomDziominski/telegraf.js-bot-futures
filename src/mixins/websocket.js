import WebSocket from 'ws';
import {Telegraf} from "telegraf";
import {TOKEN} from "../config/config.js";
import UserStore from "../store/index.js";

const bot = new Telegraf(TOKEN);

export function webSocketStart() {
    const ws = new WebSocket('ws://localhost:2020');

    ws.on('error', console.error);

    ws.on('open', function open() {
        ws.send('Connection with client');
    });

    ws.on('message', function message(data) {
        UserStore.whitList.forEach(chat_id => bot.telegram.sendMessage(chat_id, data ? data.toString() : 'Неведомая ошибка WS'))
    });
    return ws;
}
