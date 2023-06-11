import {checkUser} from "./helper.js";
import {MESSAGE} from "../const/const.js";

export async function getTradingMessage(ctx) {
    return 'Здесь вы можете управлять своим ботом 🤖';
}

export async function getStartMessage(ctx) {
    return await checkUser(ctx) ? MESSAGE.YouLogged : MESSAGE.Enter_password;
}

export function getMessageInfo(ctx) {
    return 'Бот создан для торговли на фьючас.';
}