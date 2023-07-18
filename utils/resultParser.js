const {
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  userMention,
} = require("@discordjs/builders");

const parseArray = (array, query) => {
  const buttons = array.map((data) => {
    return new ButtonBuilder()
      .setCustomId("mov" + "-" + JSON.parse(JSON.stringify(data._id)))
      .setLabel(data.title)
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
  const torrentKeys = Object.keys(obj.links.torrents);
  const torButtons = torrentKeys.map((data) => {
    return new ButtonBuilder()
      .setLabel(data)
      .setStyle("Link")
      .setURL(obj.links.torrents[data]);
  });
  const strButtons = torrentKeys.map((data) => {
    data = data.split(" ")[0];
    return new ButtonBuilder()
      .setLabel(data + " Stream")
      .setStyle("Link")
      .setURL(`https://movie-master.uk.to/movie/watch/${obj._id}?q=${data}`);
  });
  const embed = new EmbedBuilder()
    .setTitle(obj.title)
    .setDescription(obj.teaser)
    .setImage(obj.img)
    .setColor((0, 219, 212))
    .setFooter({
      text: `Visit --> https://movie-master.uk.to/movie/${obj._id}`,
      iconURL:
        "https://clipartix.com/wp-content/uploads/2016/04/Popcorn-clip-art.png",
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
    .setColor((0, 219, 212))
    .setFooter({
      text: `https://movie-master.uk.to/`,
      iconURL:
        "https://clipartix.com/wp-content/uploads/2016/04/Popcorn-clip-art.png",
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
