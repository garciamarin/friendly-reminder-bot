import { config } from "dotenv";
import TelegramBot, { type Message } from "node-telegram-bot-api";
import { M } from "./botMessages";
import { isEvenWeek } from "./utils";

config();

let subscribedChats: number[] = [];
let isWgRemindersActive = true;

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
	bot.sendMessage(chatId, M.START, { parse_mode: "HTML" });
});
bot.onText(/\/status/, (msg: Message) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, M.STATUS, { parse_mode: "HTML" });
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
		bot.sendMessage(chatId, M.SUBSCRIBED);
		scheduleReminders();
	} else bot.sendMessage(chatId, M.SUBSCRIBED_FAIL);
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
				(chatId) => chatId !== chatId,
			));
		bot.sendMessage(chatId, M.UNSUBSCRIBED);
	} else {
		bot.sendMessage(msg.chat.id, M.UNSUBSCRIBED_FAIL);
	}
});

// keyboard for Gemüsekiste
const keyboard = {
	"reply_markup": {
		"inline_keyboard": [
			[{ text: "I'll pick the freakin' thing up!", callback_data: 'yes' }],
			[{ text: 'hell no!', callback_data: 'no' }],
		]
	}
}
bot.onText(/\/keyboard/, (msg) => {
	bot.sendMessage(msg.chat.id, "Can you pick the box this week?/n", keyboard);
});

// callback from keyboard
bot.on("callback_query", (msg) => {
	// on positive response remove Keyboard and confirm 
	if (msg.data == "yes") {
		bot.editMessageReplyMarkup(
			{
				inline_keyboard: []
			},
			{
				chat_id: msg.message?.chat.id,
				message_id: msg.message?.message_id,
				inline_message_id: msg.inline_message_id,
			}
		);
		bot.sendMessage(msg.message!.chat.id, `✅ ${msg.from.first_name} ${M.CONFIRM_PICKUP}`);
	}
	else {
		bot.sendMessage(msg.message!.chat.id, `❌ ${msg.from.first_name} ${M.CONFIRM_PICKUP_FAIL}`);
	}
});


function scheduleReminders() {
	const currentDate = new Date();
	const reminders = (chatId: number) => {
		if (currentDate.getDay() === 1) {
			// Monday with (0 - Sunday, 1 - Monday, ...)
			if (isEvenWeek(currentDate)) {
				bot.sendMessage(chatId, M.REMINDERS_CLEANING_PLAN_EVEN_WEEK);
			} else {
				bot.sendMessage(chatId, M.REMINDERS_CLEANING_PLAN_ODD_WEEK);
			}
		} else if (currentDate.getDay() === 5) {
			// Friday
			bot.sendMessage(chatId, M.REMINDERS_VEGTABLE_BOX);
			bot.sendMessage(chatId, "Can you pick the box 896 this week?", keyboard);
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

// Removes Fixed keyboards
bot.onText(/\/removeKey/, (msg) => {
	bot.sendMessage(msg.chat.id, "keyboard");
	bot.sendMessage(msg.chat.id, "remove",
		{
			"reply_markup": {
				remove_keyboard: true
			}

		});

});

function isChatSubscribed(chatId: number) {
	return subscribedChats.includes(chatId);
}

console.log("Schlegel-bot is running, daags!");
