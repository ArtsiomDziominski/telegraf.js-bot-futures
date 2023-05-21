import {BURL} from "../config/config.js";

export const REQUEST_SERVER = {
    NewOrder: BURL + '/newOrder',
    CancelOpenOrder: BURL + '/cancelOpenOrder',
    GetWatchingList: BURL + '/getWatchingList',
    GetCurrentOrder: BURL + '/getCurrentOrder',
    ClearWatchingList: BURL + '/cancelWatching'
}

export const MESSAGE = {
    WatchingListEmpty : 'Наблюдаемый список пуст',
    FunctionNotWorking : `Функция в данный момент не работает`,
    YouLogged : 'Вы в системе',
    Enter_password : '❌ Доступ запрещен, введите пароль ❌',
    AfterInputPassword: '🤑 Добро пожаловать в богатство 💵',
    NotAllParametersEntered: 'Не все параметры введены',
    Error: 'Что-то пошло не так',
    SendNewOrder: `Отправлен новый ордер`,
    CancelOpenOrder: 'Выберите ордер в ожидании, который хотите отменить:',
    NoPassword: '❌⛔️ Доступ запрещен ⛔️❌'
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
