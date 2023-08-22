const database = require("./database/database.js");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const DBL = require("dblapi.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// **** Posting Server Count to Top.gg ****
// const dbl = new DBL(process.env.DBLTOKEN, client);
// dbl.on("posted", () => {
//   console.log("Server count posted!");
// });

// **** Listing all commands ****
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// **** Handling Events ****
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

database.connectDB().then(() => {
  client.login(process.env.TOKEN);
});