const database = require('../database.js')


const recordServerCount = async (client) => {
  const serverCount = client.guilds.cache.size;
  console.log(serverCount);
};

const recordUserActivity = async (interaction) => {
  const userId =   interaction.user.id;
  const userCount = await database.addUser(userId)
  console.log(userCount)
};

module.exports = {
  recordServerCount,
  recordUserActivity,
};


// Tasks 
// 1 = Make a function to check and add new user.
// 2 = make a way to get the number of users.
// 3 = make a way to record number of queries performed for movies
// 4 = make function to update stats on every change.
// 5 = organize things and clean things up
// 6 = make a function to bring out stats
// 7 = add a new command for fetching stats