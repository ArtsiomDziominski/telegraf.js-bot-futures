import UserStore from "../store/index.js";
import User from "../store/index.js";
import axios from "axios";
import {REQUEST_DB} from "./const.js";

export const BUTTONS = {
    notification: [],
    trading: [
        [
            {
                message: 'Новый одер',
                action: 'trading-newOrder'
            },
            {
                message: 'Наблюдаемые валюты',
                action: 'watching'
            },
            {
                message: 'Профит',
                action: 'profit'
            }
        ],
        [{
            message: 'Остановить бота',
            action: 'trading-stopBot'
        }],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ],
    profile: [
        [
            {
                message: 'Действия в телеграме',
                action: 'action-telegram'
            }
        ],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ],
    profileTelegram: [
        [
            {
                message: 'Ваши визиты',
                action: 'profile-telegram-visit'
            },
            {
                message: 'Залогиненные пользователи',
                action: 'profile-telegram-login'
            }
        ],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ],
    settingTrading: [
        [
            {
                message: 'Ордер продажи',
                action: 'step-sell-order'
            },
            {
                message: '% ордер продажи',
                action: 'sell-order-percent'
            },
            {
                message: 'Обновление сервера',
                action: 'update-server'
            }
        ],
        [
            {
                message: 'Активные ордера',
                action: 'check-current-order'
            },
            {
                message: 'Назад',
                action: 'main-menu'
            }
        ]
    ],
    backToActionTelegram: [
        [{
            message: 'Назад',
            action: 'action-telegram'
        }]
    ]
}

export async function getBtnSettingTradingCheckCurrentOrder() {
    User.settingTrading = (await axios.get(REQUEST_DB.settingTrading)).data;
    return [
        [{
            message: (UserStore.settingTrading.isCurrentOrder ? '✅ ' : '') + 'Проверить активные ордера',
            action: 'set-check-current-order'
        }],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ]
}

export function getNotificationsBtn() {
    return [
        [{
            message: (UserStore.notifications.infoNewOrder ? '✅ ' : '') + 'Закрытие позиции',
            action: 'notification-new-order'
        }],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ]
}

export function getBtnSettingTradingStep() {
    return [
        [
            {
                message: (User.settingTrading.stepSellOrder === 2 ? '✅ ' : '') + '2',
                action: 'setting-trading-setStepSellOrder-2'
            },
            {
                message: (User.settingTrading.stepSellOrder === 3 ? '✅ ' : '') + '3',
                action: 'setting-trading-setStepSellOrder-3'
            },
            {
                message: (User.settingTrading.stepSellOrder === 4 ? '✅ ' : '') + '4',
                action: 'setting-trading-setStepSellOrder-4'
            },
            {
                message: (User.settingTrading.stepSellOrder === 5 ? '✅ ' : '') + '5',
                action: 'setting-trading-setStepSellOrder-5'
            }
        ],
        [
            {
                message: (User.settingTrading.stepSellOrder < 2 ? '✅ Отключено' : 'Отключить'),
                action: 'setting-trading-setStepSellOrder-0'
            },
            {
                message: 'Назад',
                action: 'main-menu'
            }
        ]
    ]
}

export function getBtnSettingTradingSellOrderPercent() {
    return [
        [
            {
                message: (User.settingTrading.sellOrderPercent === 5 ? '✅ ' : '') + '5',
                action: 'setting-trading-SellOrderPercent-5'
            },
            {
                message: (User.settingTrading.sellOrderPercent === 10 ? '✅ ' : '') + '10',
                action: 'setting-trading-SellOrderPercent-10'
            },
            {
                message: (User.settingTrading.sellOrderPercent === 15 ? '✅ ' : '') + '15',
                action: 'setting-trading-SellOrderPercent-15'
            },
            {
                message: (User.settingTrading.sellOrderPercent === 20 ? '✅ ' : '') + '20',
                action: 'setting-trading-SellOrderPercent-20'
            }
        ],
        [
            {
                message: (User.settingTrading.sellOrderPercent === 25 ? '✅ ' : '') + '25',
                action: 'setting-trading-SellOrderPercent-25'
            },
            {
                message: (User.settingTrading.sellOrderPercent === 30 ? '✅ ' : '') + '30',
                action: 'setting-trading-SellOrderPercent-30'
            },
            {
                message: (User.settingTrading.sellOrderPercent < 2 ? '✅ Отключено' : 'Отключить'),
                action: 'setting-trading-SellOrderPercent-0'
            },
            {
                message: 'Назад',
                action: 'main-menu'
            }
        ]
    ]
}

export function getBtnSettingTradingUpdateServer() {
    return [
        [
            {
                message: (User.settingTrading.updateServer === 3 ? '✅ ' : '') + '3',
                action: 'setting-trading-UpdateServer-3'
            },
            {
                message: (User.settingTrading.updateServer === 4 ? '✅ ' : '') + '4',
                action: 'setting-trading-UpdateServer-4'
            },
            {
                message: (User.settingTrading.updateServer === 5 ? '✅ ' : '') + '5',
                action: 'setting-trading-UpdateServer-5'
            },
            {
                message: (User.settingTrading.updateServer === 6 ? '✅ ' : '') + '6',
                action: 'setting-trading-UpdateServer-6'
            }
        ],
        [
            {
                message: (User.settingTrading.updateServer === 7 ? '✅ ' : '') + '7',
                action: 'setting-trading-UpdateServer-7'
            },
            {
                message: (User.settingTrading.updateServer === 8 ? '✅ ' : '') + '8',
                action: 'setting-trading-UpdateServer-8'
            },
            {
                message: (User.settingTrading.updateServer <= 0 ? '✅ Отключено' : 'Остановить сервер'),
                action: 'setting-trading-UpdateServer-0'
            },
            {
                message: 'Назад',
                action: 'main-menu'
            }
        ]
    ]
}
