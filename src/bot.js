import {TOKEN} from "./config/config.js";
import {Telegraf} from "telegraf";
import {botCommandsStart} from "./commands/commands.js";

const bot = new Telegraf(TOKEN);

botCommandsStart();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
console.log('Telegram started')
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
