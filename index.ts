import TelegramBot, { Message } from "node-telegram-bot-api";
import { config } from "dotenv";
import { MESSAGES } from "./botMessages";
import { isEvenWeek } from "./utils";

config();

let subscribedChats: number[] = []
let isWgRemindersActive = true

const API_TOKEN =
  process.env.NODE_ENV === "production"
    ? process.env.API_TOKEN!
    : process.env.DEV_API_TOKEN!;
const WG_CHAT_ID = Number(process.env.WG_CHAT_ID);

const bot = new TelegramBot(API_TOKEN, { polling: true });

// Interactive command handlers

// provides info from bot
bot.onText(/\/start/, (msg: Message) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, MESSAGES.START, { parse_mode: "HTML" });
});
bot.onText(/\/status/, (msg: Message) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, MESSAGES.STATUS, { parse_mode: "HTML" })
});

// adds chat to reminders List
bot.onText(/\/reminders-on/, (msg: Message) => {
  const chatId = msg.chat.id;
  const isWgChatId = chatId === WG_CHAT_ID;
  const isRemindersActive =
    (isWgChatId && isWgRemindersActive) ||
    (!isWgChatId && isChatSubscribed(chatId));

  if (!isRemindersActive) {
    isWgChatId ? (isWgRemindersActive = true) : subscribedChats.push(chatId);
    bot.sendMessage(chatId, MESSAGES.SUBSCRIBED);
    scheduleReminders();
  } else bot.sendMessage(chatId, MESSAGES.SUBSCRIBED_FAIL);
});

// removes chat from reminders List
bot.onText(/\/reminders-off/, (msg) => {
  const chatId = msg.chat.id;
  const isWgChatId = chatId === WG_CHAT_ID;
  const isRemindersActive =
    (isWgChatId && isWgRemindersActive) ||
    (!isWgChatId && isChatSubscribed(chatId));

  if (isRemindersActive) {
    isWgChatId
      ? (isWgRemindersActive = false)
      : (subscribedChats = subscribedChats.filter(
        (chatId) => chatId !== chatId
      ));
    bot.sendMessage(chatId, MESSAGES.UNSUBSCRIBED);
  } else {
    bot.sendMessage(msg.chat.id, MESSAGES.UNSUBSCRIBED_FAIL);
  }
});

function scheduleReminders() {
  const currentDate = new Date();
  const reminders = (chatId: number) => {
    if (currentDate.getDay() === 1) {
      // Monday with (0 - Sunday, 1 - Monday, ...)
      if (isEvenWeek(currentDate)) {
        bot.sendMessage(chatId, MESSAGES.REMINDERS_CLEANING_PLAN_EVEN_WEEK);
      } else {
        bot.sendMessage(chatId, MESSAGES.REMINDERS_CLEANING_PLAN_ODD_WEEK);
      }
    } else if (currentDate.getDay() === 5) {
      // Friday
      bot.sendMessage(chatId, MESSAGES.REMINDERS_VEGTABLE_BOX);
    }
  };

  isWgRemindersActive && reminders(WG_CHAT_ID);
  subscribedChats.forEach((chatId) => reminders(chatId));
}

scheduleReminders();
setInterval(scheduleReminders, 24 * 60 * 60 * 1000);

// helpers
bot.onText(/\/chats/, (msg) => {
  !!subscribedChats.length &&
    bot.sendMessage(msg.chat.id, subscribedChats.join(", "));
});

bot.onText(/\/gimmeId/, (msg) => {
  console.log("chatId -------------> ", msg.chat.id);
});

bot.onText(/\/testId/, (msg) => {
  bot.sendMessage(WG_CHAT_ID, "the provided id seems to be alright, doggo 🐶");
});

function isChatSubscribed(chatId: number) {
  return subscribedChats.includes(chatId);
}

console.log("Schlegel-bot is running, daags!");
