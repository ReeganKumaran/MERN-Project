require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", true);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = connectDB;

