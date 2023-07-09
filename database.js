const mongoose = require("mongoose");

let Movie;

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

module.exports = {
  connectDB,
  query,
  moviesByGenre,
  genreQuery,
  getRandom,
  movieById,
};
