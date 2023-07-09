const database = require("./database.js");
const parsers = require("./utils/resultParser.js");
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
} = require("discord.js");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

database.connectDB();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

client.on("ready", async () => {
  // Get all ids of the servers
  const guild_ids = client.guilds.cache.map((guild) => guild.id);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  for (const guildId of guild_ids) {
    rest
      .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully updated commands for guild " + guildId)
      )
      .catch(console.error);
  }

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    try {
      await interaction.reply({
        content: "`There was an error executing this command`",
      });
    } catch (e) {
      try {
        await interaction.editReply({
          content: "`There was an error executing this command`",
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  const [type, movID] = interaction.customId.split("-");
  if (!type === "mov") {
    return;
  }
  await interaction.deferUpdate();
  const movie = await database.movieById(movID);
  await interaction.editReply(parsers.parseMovie(movie, interaction.user.id));
});

client.on("guildCreate", (guild) => {
  const welcomeMessage = `Hey @everyone \nIn mood for a movie? \nJust use to me watch or download movies for free in 2 clicks.\nDo \`/help\` for more on how.`;
  const defaultChannel = guild.systemChannel;

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  rest
    .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), {
      body: commands,
    })
    .then(() =>
      console.log("Successfully updated commands for guild " + guild.id)
    )
    .catch(console.error);

  if (defaultChannel) {
    defaultChannel
      .send(welcomeMessage)
      .then((message) => console.log(`Sent welcome message in ${guild.name}`))
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
