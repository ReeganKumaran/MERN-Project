const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const todoSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  data: {
    type: String,
  },
  isSelect: {
    type: Boolean,
  },
});
todoSchema.plugin(AutoIncrement, { inc_field: "_id" });
const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
