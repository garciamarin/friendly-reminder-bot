# friendly (schlegel) reminder bot 🤖🏡🤖

## Description 📝

A friendly assistance bot for the Schlegel WG, created using Node.js and TypeScript with the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md) package.

## Table of Contents 📚

- [Prerequisites ⚙️](#prerequisites-⚙️)
- [Installation 💻](#installation-💻)
- [Development 🛠️](#development-🛠️)
- [Scripts 📜](#scripts-📜)
- [Production Deployment and Maintenance 🚀](#production-deployment-and-maintenance-🚀)
- [Collaboration 💚🧡🩵](#collaboration-💚🧡🩵)

## Prerequisites ⚙️

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation 💻

1. Clone the repository:

   ```bash
   git clone https://github.com/garciamarin/friendly-reminder-bot.git
   cd friendly-reminder-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following:

   ```env
   API_TOKEN=production_token
   DEV_API_TOKEN=dev_token
   WG_CHAT_ID=wg_chat_id
   ```

   Replace `production_token`, `dev_token`, and `wg_chat_id` with the correct values which you can get from me. If there are enough people interested we can find a more effective way to do this.

## Development 🛠️

To run the bot in development mode with automatic reloading:

```bash
npm run dev
```

The bot will be accessible on Telegram, and you can interact with it using the defined commands.

## Scripts 📜

- **build**: Compile TypeScript files to JavaScript.
- **start**: Run the compiled bot in production mode.
- **dev**: Run the bot in dev mode: runs **npm run build** followed by **npm start**. Also reloads automaticaly with changes.

## Production Deployment and Maintenance 🚀

The bot is hosted on [Fly.io](https://fly.io/). To deploy changes to the container, use the following command in the terminal:

```bash
fly deploy --ha=false
```

This command will update the production deployment. The flag is important since it ensures high availability is set to false to prevent redundancy which will make the bot crash 🔥🔥

Use the follow command to restart the server:

```bash
fly apps restart friendly-reminder-bot
```

People interested in collaborating should contact me to get access to the fly.io project.

---

## Collaboration 💚🧡🩵

Collaboration is highly valued: Let's work together to enhance and improve the friendly bot and make it robo-practial!

Feel free to open feature requests or bug reports by creating issues. If you're interested in contributing code, please fork the repository, create a new branch for your changes, and submit a pull request.

Stay cool Dogs and be nice to each other 🐶
