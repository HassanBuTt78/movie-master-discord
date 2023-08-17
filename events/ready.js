const { Events, REST, Routes, ActivityType } = require("discord.js");
const stats = require("../utils/stats.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const guild_ids = client.guilds.cache.map((guild) => guild.id);
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const commands = [];
    client.commands.forEach((command) => {
      commands.push(command.data.toJSON());
    });

    for (const guildId of guild_ids) {
      rest
        .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
          body: [],
        })
        .then(() =>
          console.log("Successfully updated commands for guild " + guildId)
        )
        .catch(console.error);
    }

    rest
      .put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      })
      .then(() => console.log("Successfully updated Global Commands"))
      .catch(console.error);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      activities: [
        {
          name: "53,000+ Movies",
        },
      ],
      status: "online",
    });
    stats.recordServerCount(client);
  },
};
