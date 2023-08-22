const { Events } = require("discord.js");
const stats = require("../utils/stats.js");

const welcomeMessage = `Hey @everyone \nIn the mood for a movie? \nJust use me to watch or download movies for free in 2 clicks.\nDo \`/help\` for more information.`;
module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild, client) {
    //Sending The Greeting Message
    const defaultChannel = guild.systemChannel;
    if (defaultChannel) {
      defaultChannel
        .send(welcomeMessage)
        .then((message) =>
          console.log(`Sent Greeting message in ${guild.name}`)
        )
        .catch((e)=>{console.error(`Error Sending Welcome Message to ${guild.name}`)});
    } else {
      console.log(
        `Failed to find systemChannel in ${guild.name} - ${guild.id}`
      );
    }

    // Record server count for statistics
    stats.recordServerCount(client);
  },
};
