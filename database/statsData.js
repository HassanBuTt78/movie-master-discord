const { User, Stat } =  require("./database.js")

const updateStats = async (update) => {
    const updated = await Stat.findOneAndUpdate(
      { _id: process.env.STATS_DOCUMENT_ID },
      update
    );
    return updated;
  };

const getstats = async () => {
    let found = await Stat.findOne({ _id: process.env.STATS_DOCUMENT_ID });
    return await found;
  };
  
  const addUser = async (userId) => {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      const newUser = new User({ userId: userId });
      newUser.save().catch((error) => {
        console.error(error);
      });
      return true;
    } else {
      return false;
    }
  };
  
  const countUsers = async () => {
    let userCount;
    await User.count({}).then((count) => {
      userCount = count;
    });
    return userCount;
  };


  module.exports = {
    countUsers,
    addUser,
    getstats,
    updateStats
  }