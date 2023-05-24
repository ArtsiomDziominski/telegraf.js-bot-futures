import {getMessage} from "../mixins/helper.js";
import User from "../store/index.js";
import {getProfileTelegramBtn} from "../buttons/inline-button.js";
import {checkLineBreak, getDateTimeformat} from "../../utils/utils.js";

export function getMessageActionTelegram() {
    return 'Просмотреть действия в вашем аккаунте';
}

export function getMessageTelegramVisit(ctx) {
    let text = 'Пользователи которые могут управлять вашим аккаунтом:\n'
    User.whitList.forEach((user, index) =>
        text = `${text}\n${index+1}) ${user.id}, ${user.first_name} ${user.last_name}, ${user.username}, ${getDateTimeformat(user.date)}`);
    text = checkLineBreak(text);
    return getMessage(ctx, text, getProfileTelegramBtn(ctx));
}