import {getMessage} from "../mixins/helper.js";
import User from "../store/index.js";
import {getProfileTelegramBtn} from "../buttons/inline-button.js";
import {checkLineBreak, getDateTimeformat} from "../utils/utils.js";
import axios from "axios";
import {DB_URL} from "../../config/config.js";
import {REQUEST_DB} from "../const/const.js";

export function getMessageActionTelegram() {
    return 'Просмотреть действия в вашем аккаунте';
}

export async function getMessageTelegramVisit(ctx) {
    let text = 'Пользователи которые могут управлять вашим аккаунтом:\n';
    const response = await axios.get(DB_URL + '/users');
    User.whitList = response.data;
    User.whitList.forEach((user, index) =>
        text = `${text}\n${index + 1}) ${user.id}, ${user.first_name} ${user.last_name}, ${user.username}, ${getDateTimeformat(user.dateLogin)}`);
    text = checkLineBreak(text);
    return getMessage(ctx, text, await getProfileTelegramBtn(ctx));
}

export async function getMessageStepSellOrder() {
    User.settingTrading = (await axios.get(REQUEST_DB.settingTrading)).data;
    return `Шаг ордера на продажу: ${User.settingTrading.stepSellOrder}`;
}

export async function getMessageSellOrderPercent() {
    User.settingTrading = (await axios.get(REQUEST_DB.settingTrading)).data;
    return `Как сработает ордер, бот автоматически выставит ордер на продажу с процентом`;
}

export async function getMessageSettingUpdateServer() {
    User.settingTrading = (await axios.get(REQUEST_DB.settingTrading)).data;
    return `Обновлени серевера ${User.settingTrading.updateServer}`;
}

export function getMessageSetting() {
    return 'Настройки торговли:'
}