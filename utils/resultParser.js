const {
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  userMention,
} = require("@discordjs/builders");

const movieMasterIcon = "https://movie-master.uk.to/images/icons/favicon-32x32.png"

const parseArray = (array, query) => {
  const buttons = array.map((data) => {
    return new ButtonBuilder()
      .setCustomId("mov" + "-" + data.id)
      .setLabel(data.title_long)
      .setStyle("Secondary");
  });
  const row = new ActionRowBuilder().addComponents(buttons);
  const obj = {
    content: `Search Results for '${query}':`,
    components: [row],
  };
  return obj;
};

const parseMovie = (obj, user) => {
  let torrents = obj.torrents
  if(torrents.length > 5){ torrents = torrents.slice(0,5);}
  const torButtons = torrents.map((data) => {
    return new ButtonBuilder()
      .setLabel(`${data.quality} Torrent`)
      .setEmoji({ name: '⬇️' })
      .setStyle("Link")
      .setURL(data.url);
  });
  const strButtons = torrents.map((data) => {
    return new ButtonBuilder()
      .setLabel(data.quality + " Stream")
      .setEmoji({name: '📽'})
      .setStyle("Link")
      .setURL(`https://movie-master.uk.to/movie/watch/${obj.id}?q=${data.quality}`);
  });

  let description
  if(obj.description_full.length > 1500){
    description = `${obj.description_full.slice(0,1500)}...`
  }
  else{
    description = obj.description_full
  }
  const embed = new EmbedBuilder()
    .setTitle(obj.title_long)
    .setDescription(description)
    .setImage(obj.large_cover_image)
    .setColor([224, 12, 60])
    .addFields({ name: "Genre", value: obj.genres.toString() ,inline: true })
    .addFields({ name: "IMDB Rating", value: obj.rating.toString() ,inline: true })
    .addFields({ name: "Length", value: obj.runtime.toString() + " minutes" ,inline: true })
    .addFields({ name: "Bot Links", value: "**[Vote for Bot](https://top.gg/bot/1123604438934884513/vote) - [Write a Review](https://top.gg/bot/1123604438934884513#reviews) - [Support Server](https://discord.gg/mJgFDJY26w)**"})
    .setFooter({
      text: `Visit --> https://movie-master.uk.to/movie/${obj.id}`,
      iconURL:
        movieMasterIcon,
    });
  const row = new ActionRowBuilder().addComponents(torButtons);
  const row2 = new ActionRowBuilder().addComponents(strButtons);
  embed.components = [{ type: "ACTION_ROW", components: [] }];
  const exportt = {
    content: `Here is your Movie, ${userMention(user)}`,
    embeds: [embed],
    components: [row, row2],
  };
  return exportt;
};

const parseStats = (stats) => {
  const embed = new EmbedBuilder()
    .setTitle("Statistics")
    .addFields({ name: "Servers", value: stats.serverCount.toString() })
    .addFields({ name: "Users", value: stats.userCount.toString() })
    .addFields({ name: "Movies Served", value: stats.queries.toString() })
    .addFields({ name: "Discord.js", value: "v14.11.0" })
    .addFields({ name: "Node.js", value: "v18.15.0" })
    .setColor([224, 12, 60])
    .addFields({ name: "Bot Links", value: "**[Vote for Bot](https://top.gg/bot/1123604438934884513/vote) - [Write a Review](https://top.gg/bot/1123604438934884513#reviews) - [Support Server](https://discord.gg/mJgFDJY26w)**"})
    .setTimestamp()
    .setFooter({
      text: `https://movie-master.uk.to/`,
      iconURL:
        movieMasterIcon,
    });
  const exportt = {
    content: "",
    embeds: [embed],
  };
  return exportt;
};

module.exports = {
  parseArray,
  parseMovie,
  parseStats,
};
