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
\nAll heil to the Königin! 👑`;

const CONFIRM_PICKUP_FAIL = () => `can't go (${getRandomExcuse()})`;

const excuses = [
    "stuck in traffic behind a tractor",
    "keys lost in the fridge",
    "caught in an intense staring contest with a cat",
    "car hijacked by squirrels",
    "on a mission to find the perfect avocado",
    "trapped under an avalanche of laundry",
    "GPS rerouted me to a pizza place",
    "mid-crisis over carrot quality",
    "bike chain tangled in spaghetti",
    "outwitted by a stubborn jar of pickles",
    "too busy debating fruit vs. vegetable",
    "lost in the supermarket’s vegetable aisle",
    "misread box as bomb",
    "stuck explaining what kale is",
    "caught napping under a tree",
    "too busy chasing runaway tomatoes",
    "emergency dance-off with a broccoli",
    "mistook the pickup day for next week",
    "waiting for onions to stop making me cry",
    "held hostage by a zucchini rebellion"
];
const getRandomExcuse = () => excuses[Math.floor(Math.random() * excuses.length)];
export { M, CONFIRM_PICKUP_FAIL };