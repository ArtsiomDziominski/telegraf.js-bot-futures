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
    backToActionTelegram: [
        [{
            message: 'Назад',
            action: 'action-telegram'
        }]
    ]
}
