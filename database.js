const mongoose = require("mongoose");

let Movie;
let User;
let Stat;

const connectDB = async () => {
  let db = mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((e) => console.log(e));
  const movieSchema = new mongoose.Schema(
    {
      title: String,
      teaser: String,
      img: String,
      IMDB_rating: String,
      genre: Array,
      links: Object,
      devL: {
        type: String,
        select: false,
      },
    },
    { versionKey: false }
  );
  const statSchema = new mongoose.Schema(
    {
      serverCount: Number,
      userCount: Number,
      queries: Number,
    },
    { versionKey: false }
  );
  const userSchema = new mongoose.Schema(
    {
      userID: Number,
    },
    { versionKey: false }
  );

  User = new mongoose.model("User", userSchema);
  Stat = new mongoose.model("Stat", statSchema);
  Movie = new mongoose.model("Movie", movieSchema);
};

const movieById = async (id) => {
  let found = await Movie.findOne({ _id: id });
  return await found;
};

const moviesByGenre = async (genre, amount) => {
  if (amount == undefined) {
    let found = await Movie.find({
      genre: { $regex: genre, $options: "i" },
    }).limit(30);
    return await found;
  } else {
    let found = await Movie.find({
      genre: { $regex: genre, $options: "i" },
    }).limit(amount);
    return await found;
  }
};

const genreQuery = async (query, genre, amount) => {
  if (amount == undefined) {
    let found = await Movie.find({
      genre: { $regex: genre, $options: "i" },
      title: { $regex: query, $options: "i" },
    }).limit(30);
    return await found;
  } else {
    let found = await Movie.find({
      genre: { $regex: genre, $options: "i" },
      title: { $regex: query, $options: "i" },
    }).limit(amount);
    return await found;
  }
};

const query = async (query, amount) => {
  query = await processString(query);

  if (amount == undefined) {
    let found = await Movie.find({ title: { $regex: query } }).limit(30);
    return await found;
  } else {
    let found = await Movie.find({ title: { $regex: query } }).limit(amount);
    return await found;
  }
};

const processString = async (string) => {
  let arr = string.split(" ");
  let arr2 = await arr.map((x) => {
    return `(?=^.*?${x}.*$)`;
  });
  arr2.push("^.*$");
  let st = arr2.join("");
  let r = new RegExp(st, "gi");
  return r;
};

const getRandom = async () => {
  let found = Movie.aggregate([
    { $match: { IMDB_rating: { $gte: "1.5" } } },
  ]).sample(1);
  return await found;
};

const updateStats = async (key, value) => {
  Stat.findOneAndUpdate({ key: key }, { value: value });
};
const getstats = async (key) => {
  let found = await stat.findOne({ _id: key });
  return await found;
};

const addUser = async (userId) => {
  const user = await User.findOne({ userId: userId });
  console.log(user)
  console.log(!user)
  if (!user) {
    await User.insertOne({ userId: userId });
  } else {
    console.log("Value already exists in the set");
  }
  let userCount;
  await User.count({}).then((count) => {
    userCount = count
  });
  return userCount;
};

const getUsers = async () => {
  const uniqueUsers = new Set();
  User.find({}, (err, users) => {
    if (err) {
      console.error("Error retrieving users:", err);
    } else {
      users.forEach((user) => {
        uniqueUsers.add(user.userId);
      });
    }
  });
  return uniqueUsers;
};

module.exports = {
  connectDB,
  query,
  moviesByGenre,
  genreQuery,
  getRandom,
  movieById,
  updateStats,
  getUsers,
  addUser,
};
