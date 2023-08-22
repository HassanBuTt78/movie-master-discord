const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { suggestMovie } = require("../database/movieData.js");
const { parseMovie } = require("../utils/resultParser.js");

const genres = [
  "all",
  "all",
  "all",
  "all",
  "all",
  "all",
  "all",
  "all",
  "all",
  "action",
  "adventure",
  "animation",
  "biography",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "music",
  "musical",
  "mystery",
  "romance",
  "sci-fi",
  "sport",
  "thriller",
  "war",
  "western",
];

// Function to get a random genre value
function getRandomGenre() {
  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
}

function getRandomYear() {
  const minYear = 1997;
  const maxYear = 2023;
  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  if (year < 2000) return "";
  return year;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Get a movie suggestion according to your taste. Choose a genre and a year (Optional)")
    .addStringOption((option) =>
      option
        .setName("genre")
        .setDescription("Choose a genre you would like to watch")
        .setRequired(false)
        .setChoices(
          { name: "Action", value: "action" },
          { name: "Adventure", value: "adventure" },
          { name: "Animation", value: "animation" },
          { name: "Biography", value: "biography" },
          { name: "Comedy", value: "comedy" },
          { name: "Crime", value: "crime" },
          { name: "Documentary", value: "documentary" },
          { name: "Drama", value: "drama" },
          { name: "Family", value: "family" },
          { name: "Fantasy", value: "fantasy" },
          { name: "History", value: "history" },
          { name: "Horror", value: "horror" },
          { name: "Music", value: "music" },
          { name: "Musical", value: "musical" },
          { name: "Mystery", value: "mystery" },
          { name: "Romance", value: "romance" },
          { name: "Sci-Fi", value: "sci-fi" },
          { name: "Sport", value: "sport" },
          { name: "Thriller", value: "thriller" },
          { name: "War", value: "war" },
          { name: "Western", value: "western" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("year")
        .setDescription(
          "Choose release year for the movie (enter a valid year)"
        )
        .setRequired(false)
        .setChoices(
          { name: "2023", value: "2023" },
          { name: "2022", value: "2022" },
          { name: "2021", value: "2021" },
          { name: "2020", value: "2020" },
          { name: "2019", value: "2019" },
          { name: "2018", value: "2018" },
          { name: "2017", value: "2017" },
          { name: "2016", value: "2016" },
          { name: "2015", value: "2015" },
          { name: "2014", value: "2014" },
          { name: "2013", value: "2013" },
          { name: "2012", value: "2012" },
          { name: "2011", value: "2011" },
          { name: "2010", value: "2010" },
          { name: "2009", value: "2009" },
          { name: "2008", value: "2008" },
          { name: "2007", value: "2007" },
          { name: "2006", value: "2006" },
          { name: "2005", value: "2005" },
          { name: "2004", value: "2004" },
          { name: "2003", value: "2003" },
          { name: "2002", value: "2002" },
          { name: "2001", value: "2001" },
          { name: "2000", value: "2000" }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const genre = interaction.options.getString("genre") || getRandomGenre();
    const year = interaction.options.getString("year") || getRandomYear();
    const movie = await suggestMovie(genre, year);
    const embed = parseMovie(movie, interaction.user.id);
    await interaction.editReply(embed);
  },
};
