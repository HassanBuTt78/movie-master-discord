const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require('../database.js')
const { parseStats } = require("../utils/resultParser.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows you stats of Bot')
    ,
    async execute(interaction)
    {
        await interaction.deferReply()
        const stats = await database.getstats()
        const statsMessage = parseStats(stats)
        await interaction.editReply(statsMessage)         
    }
}