const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://santosh76yadav2000:Santosh76@cluster0.brctkzf.mongodb.net/endgame2?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model("User", userSchema);
