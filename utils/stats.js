const database = require('../database/statsData.js')
const statsEnabled = "DATABASE" in process.env



//Recording number of servers the bot is in, running on startup.... 
const recordServerCount = async (client) => {
  if (!statsEnabled) return

  const serverCount = client.guilds.cache.size;
  database.updateStats({serverCount: serverCount})
};


//Recording new User, Counting Queries, Counting Users.... 
// ...intracts with database 3 times when unique user and 2 times when recurring.
const recordUserActivity = async (interaction) => {
  if (!statsEnabled) return

  const userId =   interaction.user.id;
  const unique = await database.addUser(userId)
  if(unique){
    userCount = await database.countUsers()
    database.updateStats({ $inc: { queries: 1 }, $set: { userCount: userCount } })
  }
  else{
    database.updateStats({ $inc: { queries: 1 }})
  }
};


module.exports = {
  recordServerCount,
  recordUserActivity,
};

