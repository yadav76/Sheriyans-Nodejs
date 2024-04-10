const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  nickname: String,
  description: String,
  createdData: {
    type: Date,
    default: Date.now(),
  },
  categories: {
    type: Array,
    default: [],
  },
});

mongoose
  .connect(
    "mongodb+srv://santosh76yadav2000:Santosh76@cluster0.brctkzf.mongodb.net/endgame2?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose.model("users", userSchema);
