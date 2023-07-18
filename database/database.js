const mongoose = require("mongoose");

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
};

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

const User = new mongoose.model("User", userSchema);
const Stat = new mongoose.model("Stat", statSchema);
const Movie = new mongoose.model("Movie", movieSchema);

module.exports = {
  User,
  Stat,
  Movie,
  connectDB,
};
