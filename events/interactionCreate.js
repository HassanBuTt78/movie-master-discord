const { Events } = require("discord.js");
const movData = require('../database/movieData.js')
const parsers =  require('../utils/resultParser.js')
const stats =  require('../utils/stats.js')

const errorMessage =
  "```There was an error executing this command```\nReport it in **[Support Server](<https://discord.gg/mJgFDJY26w>)** if issue Persists.";
module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async button(interaction,client) {
    const [type, movID] = interaction.customId.split("-");
    if (!type === "mov") {
      return;
    }
    try {
      await interaction.deferUpdate();
      const movie = await movData.movieById(movID);
      await interaction.editReply(
        parsers.parseMovie(movie, interaction.user.id)
      );
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: errorMessage,
        });
      } catch (e) {
        try {
          await interaction.editReply({
            content: errorMessage,
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async command(interaction, client) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    stats.recordUserActivity(interaction);
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: errorMessage,
        });
      } catch (e) {
        try {
          await interaction.editReply({
            content: errorMessage,
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      await this.command(interaction, client);
    } else if (interaction.isButton()) {
      await this.button(interaction, client);
    }
  },
};
