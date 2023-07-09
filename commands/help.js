const { SlashCommandBuilder } = require('@discordjs/builders');

const message = "### Movie Master is  a simple bot that can help you to watch and download movies for free from within Discord in easy 2 clicks.\nYou can use command:\n` /ping ` to see if the bot is alive.\n` /help ` to Get list of commands it supports.\n` /search ` to make it search a movie for you.\n` /random ` to bring a random movie.\n\nYou can add bot in your server using this link: https://bit.ly/Movie-Master- \nYou can visit Movie Master website at: https://movie-master.uk.to \n\nMovie master is open source, you can find code on here: https://github.com/HassanBuTt78/movie-master-discord \nIf you are a developer feel free to contribute to the project or report any bugs here. \n"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display commands and useful info')
    ,
    async execute(interaction)
    {
        await interaction.reply(message);
    }
}