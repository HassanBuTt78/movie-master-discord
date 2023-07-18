const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require("../database/movieData.js");
const { parseArray } = require("../utils/resultParser.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription(`Get you Movie by it's Name`)
    .addStringOption((option) =>
      option
        .setName("movie-name")
        .setDescription("Search Field")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    query = interaction.options.getString("movie-name");
    results = await database.query(query, 5);
    if (results.length > 0) {
      await interaction.editReply(parseArray(results, query));
    } else {
      await interaction.editReply(`Sorry Can't Find '${query}'`);
    }
  },
};
