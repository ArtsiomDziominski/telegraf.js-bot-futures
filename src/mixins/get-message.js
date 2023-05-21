import {checkUser} from "./helper.js";
import {MESSAGE} from "../const/const.js";

export function getTradingMessage(ctx) {
    if (checkUser(ctx)) return MESSAGE.NoPassword;
    return 'Здесь вы можете управлять своим ботом 🤖';
}