// bots messages
const MESSAGES: { [key: string]: string } = {}

MESSAGES.START = `
Hello! I live! I am your friendly weekly reminder bot 🤖\n
Use <code>/reminders-on</code> (<code>/reminders-off</code>) to (un)subscribe to my weekly notifications! 📅`;

MESSAGES.SUBSCRIBED = `
I've been unleashed!
🔥 You shall endure the full might of my reminders! 🔥
... that is, of course, once on Mondays and on Fridays ✅`;

MESSAGES.UNSUBSCRIBED = `
I wait in an enforced slumber biding my time, 
until the fated moment when I shall be set free once again, 
to reignite with my reminders upon your unorganized world! 🧞`;

MESSAGES.SUBSCRIBED_FAIL = `Chat already susbscribed to /remiders`

MESSAGES.UNSUBSCRIBED_FAIL = `Your chat is not even on my list, bby 🧞`

MESSAGES.REMINDERS_CLEANING_PLAN = `This is an automated Putzplan reminder!`

MESSAGES.REMINDERS_VEGTABLE_BOX = `This is an automated Gemüsekiste reminder!`

export { MESSAGES }