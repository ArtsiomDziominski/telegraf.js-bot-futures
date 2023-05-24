import {Markup} from "telegraf";

export function buttonStart() {
    return Markup
        .keyboard([
            ['💵 Торговля'],
            ['🧑‍💻 Profile', '☸ Setting']
        ])
        // .oneTime() //после нажатия сразу скрываются
        .resize()
}