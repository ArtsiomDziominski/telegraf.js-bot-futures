import axios from "axios";
import {REQUEST_DB} from "../const/const.js";

class User {
    isPassword = false;
    currentOrders = {};
    whitList = [];
    notifications = {
        infoNewOrder: false
    };
    settingTrading = {stepSellOrder: 0}
}

export default new User();