const { SlashCommandBuilder } = require('@discordjs/builders');
const {getRandom} = require('../database/movieData.js')
const {parseMovie} =  require('../utils/resultParser')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Brings you a random Movie')
    ,
    async execute(interaction)
    {
        random = await getRandom()
        random = random[0]
        await interaction.reply(parseMovie(random, interaction.user.id));
    }
}