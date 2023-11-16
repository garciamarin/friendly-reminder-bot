// bots messages
const MESSAGES: { [key: string]: string } = {};

MESSAGES.START = `
Hello! I live! I am your friendly weekly reminder bot 🤖\n
Use <code>/reminders-on</code> (<code>/reminders-off</code>) to (un)subscribe to my weekly notifications! 📅`

MESSAGES.STATUS = `
I'm doing just fine, buddy. Thanks for asking 🫶
`

MESSAGES.SUBSCRIBED = `
I've been unleashed!
🔥 You shall endure the full might of my reminders! 🔥
... that is, of course, once on Mondays and again once on Fridays ✅`

MESSAGES.UNSUBSCRIBED = `
I wait in an enforced slumber biding my time, 
until the fated moment when I shall be set free once again, 
to reignite with my reminders upon your unorganized world! 🧞`

MESSAGES.SUBSCRIBED_FAIL = `Chat already susbscribed to /remiders`;

MESSAGES.UNSUBSCRIBED_FAIL = `Your chat is not even on my list, bby 🧞`;

MESSAGES.REMINDERS_CLEANING_PLAN_EVEN_WEEK = `🧹🪥 This is an automated Putzplan reminder! Left nothing behind! 🧼🫧`;
MESSAGES.REMINDERS_CLEANING_PLAN_ODD_WEEK = `🧹🪥 This is an automated Putzplan reminder! Shine right like a diamond 🧼🫧`;

MESSAGES.REMINDERS_VEGTABLE_BOX = `🌶️🥦🥕 This is an automated Gemüsekiste reminder! 🔥🌶️🔥\n
Unleash your full potential by picking up that box today!`;

export { MESSAGES };
