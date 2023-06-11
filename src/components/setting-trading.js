import axios from "axios";
import {REQUEST_DB} from "../const/const.js";
import UserStore from "../store/index.js";
import {getMessage} from "../mixins/helper.js";
import {getSettingTradingStep} from "../buttons/inline-button.js";

export async function setStepSellOrder(step) {
    UserStore.settingTrading.stepSellOrder = step;
    UserStore.settingTrading = (await axios.patch(REQUEST_DB.settingTrading, UserStore.settingTrading)).data;
    return 'Шаг установлен: ' + step;
}

export async function settingTradingStep(ctx, step) {

    return getMessage(ctx, await setStepSellOrder(step), await getSettingTradingStep(ctx));
}