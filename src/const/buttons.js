import UserStore from "../store/index.js";

export const BUTTONS = {
    notification: [
        [{
            message: UserStore.notification.newOrderAuto ? '✅ Выставление новых ордеров' : 'Выставление новых ордеров',
            action: 'notification-new-order'
        }],
        [{
            message: 'Назад',
            action: 'main-menu'
        }]
    ],
    trading: [
        [
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
            message: 'Назад',
            action: 'main-menu'
        }]
    ]
}
