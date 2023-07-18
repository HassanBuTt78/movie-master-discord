const mongoose = require("mongoose");

let Movie;
let User;
let Stat;

const connectDB = async () => {
  let db = await mongoose
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
      userId: Number,
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

const updateStats = async (update) => {
  const updated = await Stat.findOneAndUpdate(
    { _id: "64b2d30c77259452adea05f9" },
    update
  );
  return updated;
};

const getstats = async () => {
  let found = await Stat.findOne({ _id: "64b2d30c77259452adea05f9" });
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
  connectDB,
  query,
  moviesByGenre,
  genreQuery,
  getRandom,
  movieById,
  updateStats,
  addUser,
  getstats,
  countUsers
};
