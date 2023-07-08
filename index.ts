import TelegramBot, { Message } from "node-telegram-bot-api";
import { config } from "dotenv"

config()
const bot = new TelegramBot(process.env.API_TOKEN!, { polling: true })
let subscribedChats: number[] = []

// Interactive command handlers
// provides info from bot
bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, START_MESSAGE, { parse_mode: "HTML" })
});

// adds chat to reminders List
bot.onText(/\/reminders.on/, (msg: Message) => {
    const chatId = msg.chat.id
    if (!isChatSubscribed(chatId)) {
        subscribedChats.push(chatId)
        bot.sendMessage(chatId, SUBSCRIBED_MESSAGE)
    } else {
        bot.sendMessage(chatId, "Chat already susbscribed to /remiders");
    }
});

// removes chat from reminders List
bot.onText(/\/reminders.off/, (msg) => {
    const chatId = msg.chat.id
    if (isChatSubscribed(chatId)) {
        subscribedChats = subscribedChats.filter(chatId => chatId !== chatId)
        bot.sendMessage(chatId, UNSUBSCRIBED_MESSAGE)
    }
    else { bot.sendMessage(msg.chat.id, `Your chat not even on my list, bby🧞`) }
});

// Scheduler to send reminders
setInterval(scheduleReminders, 24 * 60 * 60 * 1000);

function scheduleReminders() {
    const currentDate = new Date()

    const reminders = (chatId: number) => {
        if (currentDate.getDay() === 1) { // Monday with (0 - Sunday, 1 - Monday, ...)
            bot.sendMessage(chatId, 'This is our Putzplan reminder.')
        } else if (currentDate.getDay() === 5) { // Thursday
            bot.sendMessage(chatId, 'This is a Gemüsekiste reminder.')
        }
    }

    subscribedChats.forEach(chatId => reminders(chatId))
}

// returns list of subcribed chats
bot.onText(/\/chats/, (msg) => {
    bot.sendMessage(msg.chat.id, subscribedChats.join(', '))
})

console.log("Schlegel-bot is running, daags!")

// Constants for interactive command messages and helper functions
const START_MESSAGE = `
Hello! I live! I am your friendly weekly reminder bot 🤖\n
Use <code>/reminders.on</code> and <code>/reminders.off</code> to (un)subscribe to my weekly notifications! 📅`

const SUBSCRIBED_MESSAGE = `
I've been unleashed!
🔥 You shall endure the full might of my reminders! 🔥
... that is, of course, once on Mondays and on Fridays ✅
`;

const UNSUBSCRIBED_MESSAGE = `
I wait in an enforced slumber biding my time, 
until the fated moment when I shall be set free once again, 
to reignite with my reminders upon your unorganized world! 🧞`

function isChatSubscribed(chatId: number) {
    return subscribedChats.includes(chatId)
}