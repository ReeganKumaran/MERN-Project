const express = require("express");
const app = express();
const connectDB = require("./config/database");
const todoModel = require("./models/data");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/todo", async (req, res) => {
  console.log("data:", req.body);
  const data = new todoModel({
    data: req.body.data,
    isSelect: false,
  });
  await data.save();
  console.log("data sent successfully");
  res.send("hello");
});
app.get("/todo", async (req, res) => {
  try {
    const data = await todoModel.find();
    res.send(data);
  } catch {
    res.status(400).json({ error: "Error fetching Data" });
  }
});
app.patch("/todo", async (req, res) => {
  const id = req.query.id;
  const updateFields = {};
  if (req.body.data !== undefined) updateFields.data = req.body.data;
  if (req.body.isSelect !== undefined) updateFields.isSelect = req.body.isSelect;
  console.log("updateFields:", updateFields);
  try {
    const updateData = await todoModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updateData) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updateData);
  } catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).json({ error: "Update failed" });
  }
});
app.delete("/todo", async (req, res) => {
  const id = req.query.id;
  try {
    const data = await todoModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).send("The given id does not exist");
    }
    res.send(data);
  } catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).send("Some thing went wrong");
  }
});
connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(4000, () => {
      console.log("server is running in http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
