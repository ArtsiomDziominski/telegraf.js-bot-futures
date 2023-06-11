import {Markup} from "telegraf";
import axios from "axios";
import {DB_URL} from "../../config/config.js";
import {REQUEST_DB} from "../const/const.js";

export function buttonStart() {
    return Markup
        .keyboard([
            ['💵 Торговля'],
            ['🧑‍💻 Profile', '☸ Setting']
        ])
        // .oneTime() //после нажатия сразу скрываются
        .resize()
}

export async function buttonNewOrder() {
    const responseOrderParams = await axios.get(DB_URL + REQUEST_DB.orderParams);
    const orderParams = responseOrderParams.data;
    const buttonOrderParams = orderParams.map(param => `/newOrder ${param.symbol} ${param.quantity} ${param.price} ${param.quantityOrders} ${param.priceStep} ${param.decimal}`)
    return Markup
        .keyboard(buttonOrderParams)
        // .oneTime() //после нажатия сразу скрываются
        .resize()
}