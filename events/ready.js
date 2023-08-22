const { Events, REST, Routes, ActivityType } = require("discord.js");
const stats = require("../utils/stats.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const commands = [];
    client.commands.forEach((command) => {
      commands.push(command.data.toJSON());
    });
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
          name: "/suggest",
        },
      ],
      status: "online",
    });
    stats.recordServerCount(client);
  },
};
