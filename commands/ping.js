const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const embed = new EmbedBuilder()
    .setTitle("Pong! Bot is alive and ready to serve you movies :metal:")
    .addFields({ name: "Help Us keep Bot Alive", value: "[Invite Bot](https://discord.com/oauth2/authorize?client_id=1123604438934884513&permissions=2147698688&scope=bot%20applications.commands)  |  [Vote for Bot](https://top.gg/bot/1123604438934884513/vote)  |  [Support Server](https://discord.gg/mJgFDJY26w)"})
    .setColor([224, 12, 60])
    .setFooter({
        text: `Visit -->  https://movie-master.uk.to/`,
        iconURL:
          "https://movie-master.uk.to/images/icons/favicon-32x32.png",
      });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks if the bot is alive.')
    ,
    async execute(interaction)
    {
        await interaction.reply({embeds: [embed]});
    }
}