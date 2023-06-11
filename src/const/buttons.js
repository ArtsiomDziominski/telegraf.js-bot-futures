import UserStore from "../store/index.js";
import User from "../store/index.js";

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
            }
        ],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ],
    backToActionTelegram: [
        [{
            message: 'Назад',
            action: 'action-telegram'
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
