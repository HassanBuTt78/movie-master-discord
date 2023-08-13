const { SlashCommandBuilder } = require('@discordjs/builders');
const {movieById} = require('../database/movieData.js')
const {parseMovie} =  require('../utils/resultParser')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Brings you a random Movie')
    ,
    async execute(interaction)
    {
        await interaction.deferReply()
        const randomId = Math.floor(Math.random()*	53000) +1 
        random = await movieById(randomId)
        await interaction.editReply(parseMovie(random, interaction.user.id));
    }
}