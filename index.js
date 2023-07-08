"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const bot = new node_telegram_bot_api_1.default(process.env.API_TOKEN, { polling: true });
let subscribedChats = [];
// Interactive command handlers
// provides info from bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, START_MESSAGE, { parse_mode: "HTML" });
});
// adds chat to reminders List
bot.onText(/\/reminders.on/, (msg) => {
    const chatId = msg.chat.id;
    if (!isChatSubscribed(chatId)) {
        subscribedChats.push(chatId);
        bot.sendMessage(chatId, SUBSCRIBED_MESSAGE);
    }
    else {
        bot.sendMessage(chatId, "Chat already susbscribed to /remiders");
    }
});
// removes chat from reminders List
bot.onText(/\/reminders.off/, (msg) => {
    const chatId = msg.chat.id;
    if (isChatSubscribed(chatId)) {
        subscribedChats = subscribedChats.filter(chatId => chatId !== chatId);
        bot.sendMessage(chatId, UNSUBSCRIBED_MESSAGE);
    }
    else {
        bot.sendMessage(msg.chat.id, `Your chat not even on my list, bby🧞`);
    }
});
// Scheduler to send reminders
setInterval(scheduleReminders, 24 * 60 * 60 * 1000);
function scheduleReminders() {
    const currentDate = new Date();
    const reminders = (chatId) => {
        if (currentDate.getDay() === 1) { // Monday with (0 - Sunday, 1 - Monday, ...)
            bot.sendMessage(chatId, 'This is our Putzplan reminder.');
        }
        else if (currentDate.getDay() === 5) { // Thursday
            bot.sendMessage(chatId, 'This is a Gemüsekiste reminder.');
        }
    };
    subscribedChats.forEach(chatId => reminders(chatId));
}
// returns list of subcribed chats
bot.onText(/\/chats/, (msg) => {
    bot.sendMessage(msg.chat.id, subscribedChats.join(', '));
});
console.log("Schlegel-bot is running, daags!");
// Constants for interactive command messages and helper functions
const START_MESSAGE = `
Hello! I live! I am your friendly weekly reminder bot 🤖\n
Use <code>/reminders.on</code> and <code>/reminders.off</code> to (un)subscribe to my weekly notifications! 📅`;
const SUBSCRIBED_MESSAGE = `
I've been unleashed!
🔥 You shall endure the full might of my reminders! 🔥
... that is, of course, once on Mondays and on Fridays ✅
`;
const UNSUBSCRIBED_MESSAGE = `
I wait in an enforced slumber biding my time, 
until the fated moment when I shall be set free once again, 
to reignite with my reminders upon your unorganized world! 🧞`;
function isChatSubscribed(chatId) {
    return subscribedChats.includes(chatId);
}
