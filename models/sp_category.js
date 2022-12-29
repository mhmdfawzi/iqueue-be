const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spCategorySchema = new Schema({
  name: {
    type: String,
  },
});

const SPCategory = mongoose.model("sp_category", spCategorySchema);

module.exports = SPCategory;
