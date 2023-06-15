import {checkUser} from "../../../mixins/helper.js";
import {
    getSettingNotificationWorkedOrder
} from "../../../message/message-profile.js";
import {MESSAGE} from "../../../const/const.js";

export async function getNotificationWorkedOrder(ctx) {
    return await checkUser(ctx) ? getSettingNotificationWorkedOrder(ctx) : ctx.reply(MESSAGE.NoPassword);
}