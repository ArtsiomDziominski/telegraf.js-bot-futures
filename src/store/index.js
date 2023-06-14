import axios from "axios";
import {REQUEST_DB} from "../const/const.js";

class User {
    isPassword = false;
    currentOrders = {};
    whitList = [];
    notifications = {
        infoNewOrder: false
    };
    settingTrading = {stepSellOrder: 0, sellOrderPercent: 0, requestToServer: 5, updateServer: 3, isCurrentOrder: true};
    info = {requestToServerTime: 0, isRequestToServer: false};
}

export default new User();