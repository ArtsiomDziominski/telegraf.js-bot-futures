import {BURL, DB_URL} from "../../config/config.js";

export const REQUEST_SERVER = {
    NewOrder: BURL + '/newOrder',
    CancelOpenOrder: BURL + '/cancelOpenOrder',
    GetWatchingList: BURL + '/getWatchingList',
    GetCurrentOrder: BURL + '/getCurrentOrder',
    ClearWatchingList: BURL + '/cancelWatching',
    getNotification: BURL + '/getNotification',
    setNotification: BURL + '/setNotification'
}

export const REQUEST_DB = {
    watchingSymbols: '/watchingSymbols/mainSymbolsList',
    orderParams: '/orderParams',
    notifications: DB_URL + '/notifications',
    users: DB_URL + '/users',
    settingTrading: DB_URL + '/settingTrading'
}

export const MESSAGE = {
    WatchingListEmpty : 'Наблюдаемый список пуст',
    FunctionNotWorking : `Функция в данный момент не работает`,
    YouLogged : 'Вы в системе',
    Enter_password : '❌ Доступ запрещен, введите пароль ❌',
    AfterInputPassword: '🤑 Добро пожаловать в богатство 💵',
    NotAllParametersEntered: 'Выберите из списка ⤵️',
    Error: 'Что-то пошло не так',
    SendNewOrder: `Отправлен новый ордер`,
    CancelOpenOrder: 'Выберите ордер в ожидании, который хотите отменить:',
    NoPassword: '❌⛔️ Доступ запрещен ⛔️❌',
    loggedIn: 'Залогинен уже 🤑',
    ErrorRequestServer: 'Ошибка с сервером❗️'
}

export const MESSAGE_CODE = {
    Success: 200
}

export const TIME_REPLAY_SEND_MESSAEGE = 600000;
export const MIN_WARNING_PRICE = -1;
export const MAX_WARNING_PRICE = 5;
export const AXIOS_HEADER = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};

export const FIAT = {
    USDT: 'USDT',
    BUSDT: 'BUSDT'
}

