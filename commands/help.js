const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const message = "### Movie Master is  a simple bot that can help you to watch and download movies for free from within Discord in easy 2 clicks.\nYou can use command:\n` /ping ` to see if the bot is alive.\n` /help ` to Get list of commands it supports.\n` /search ` to make it search a movie for you.\n` /random ` to bring a random movie.\n` /stats ` to get stats of bot \n\nYou can add bot in your server using this link: <https://bit.ly/Movie-Master-> \nYou can visit Movie Master website at: <https://movie-master.uk.to> \n\nMovie master is open source, you can find code on here: <https://github.com/HassanBuTt78/movie-master-discord> \nIf you are a developer feel free to contribute to the project or report any bugs here. \n"

const embed = new EmbedBuilder()
    .setTitle("Movie Master")
    .setDescription("Here are all the bot commands")
    .addFields({ name: "**/ping**", value: "```Checks if the bot is alive and ready to go```" ,inline: true })
    .addFields({ name: "**/help**", value: "```Get list of commands bot supports```" ,inline: true })
    .addFields({ name: "**/random**", value: "```Brings you a totally random movie```" ,inline: true })
    .addFields({ name: "**/search**", value: "```Allows you to search and get a movie```" ,inline: true })
    .addFields({ name: "**/suggest**", value: "```Suggests you a good movie of your liking```" ,inline: true })
    .addFields({ name: "**/stats**", value: "```Brings you the stats related to Movie Master```" ,inline: true })
    .addFields({ name: "Useful Links", value: "[Invite Bot](https://discord.com/oauth2/authorize?client_id=1123604438934884513&permissions=2147698688&scope=bot%20applications.commands)  |  [Vote for Bot](https://top.gg/bot/1123604438934884513/vote)  |  [Write a Review](https://top.gg/bot/1123604438934884513#reviews)  |  [Support Server](https://discord.gg/mJgFDJY26w)"})
    .setColor([224, 12, 60])
    .setFooter({
        text: `Visit -->  https://movie-master.uk.to/`,
        iconURL:
          "https://movie-master.uk.to/images/icons/favicon-32x32.png",
      });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display All Commands')
    ,
    async execute(interaction)
    {
        await interaction.reply({embeds: [embed]});
    }
}