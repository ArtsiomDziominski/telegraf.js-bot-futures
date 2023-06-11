import WebSocket from 'ws';
import {Telegraf} from "telegraf";
import {DB_URL, TOKEN, WS_URL} from "../../config/config.js";
import UserStore from "../store/index.js";
import axios from "axios";

const bot = new Telegraf(TOKEN);

let isWSServerActive = false;

export function webSocketStart() {
    const ws = new WebSocket(WS_URL);

    ws.on('error', console.error);

    ws.on('open', function open() {
        ws.send('Connection with server');
        console.log('Connection with server')
        isWSServerActive = true;
    });

    ws.on('message', async function message(data) {
        const responseUsers = await axios.get(DB_URL + '/users');
        UserStore.whitList = responseUsers.data;
        console.log(data.toString())
        UserStore.whitList.forEach(user => bot.telegram.sendMessage(user.id, data ? data.toString() : 'Неведомая ошибка WS'))
    });

    ws.on('close', async function close() {
        const responseUsers = await axios.get(DB_URL + '/users');
        UserStore.whitList = responseUsers.data;
        if (isWSServerActive) UserStore.whitList.forEach(user =>
            bot.telegram.sendMessage(user.id, 'Сервер лёг, напиши мне @mrbulldozer'))
        console.log('Disconnect WS')
        setTimeout(() => webSocketStart(), 10000)
        isWSServerActive = false;
    });
    return ws;
}
