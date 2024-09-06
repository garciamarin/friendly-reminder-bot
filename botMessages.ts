// bots messages
const M: { [key: string]: string } = {};

// general
M.START = `
Hello! I live! I am your friendly weekly reminder bot 🤖\n
Use <code>/reminders-on</code> (<code>/reminders-off</code>) to (un)subscribe to my weekly notifications! 📅`;
M.STATUS = `
I'm doing just fine, buddy. Thanks for asking 🫶
`;

// subscriptions
M.SUBSCRIBED = `
I've been unleashed!
🔥 You shall endure the full might of my reminders! 🔥
... that is, of course, once on Mondays and again once on Fridays ✅`;
M.UNSUBSCRIBED = `
I wait in an enforced slumber biding my time, 
until the fated moment when I shall be set free once again, 
to reignite with my reminders upon your unorganized world! 🧞`;
M.SUBSCRIBED_FAIL = `Chat already susbscribed to /remiders`;
M.UNSUBSCRIBED_FAIL = `Your chat is not even on my list, bby 🧞`;

// cleaning plan
M.REMINDERS_CLEANING_PLAN_EVEN_WEEK = `🧹🪥 This is an automated Putzplan reminder! Left (side) nothing behind! 🧼🫧`;
M.REMINDERS_CLEANING_PLAN_ODD_WEEK = `🧹🪥 This is an automated Putzplan reminder! Shine right (side) like a diamond 🧼🫧`;

// vegtable box
M.REMINDERS_VEGTABLE_BOX = `🌶️🥦🥕 This is an automated Gemüsekiste reminder! 🔥🌶️🔥\n
Unleash your full potential by picking up that box today!`;
M.CONFIRM_PICKUP = `will pick up the 🥦🥕🌶️
\nAll heil to the Königin! 👑
`;
M.CONFIRM_PICKUP_FAIL = `can't go (looong Frisurtermin)`;

export { M };
