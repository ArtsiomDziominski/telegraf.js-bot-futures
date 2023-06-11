import {checkUser} from "./helper.js";
import {MESSAGE} from "../const/const.js";

export async function getTradingMessage(ctx) {
    if (await checkUser(ctx)) return MESSAGE.NoPassword;
    return 'Здесь вы можете управлять своим ботом 🤖';
}

export async function getStartMessage(ctx) {
    return await checkUser(ctx) ? MESSAGE.Enter_password: MESSAGE.YouLogged;
}