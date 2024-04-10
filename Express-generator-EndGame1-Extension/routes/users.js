var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

mongoose
  .connect(
    "mongodb+srv://santosh76yadav2000:Santosh76@cluster0.brctkzf.mongodb.net/endgame?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDb Connected"))
  .catch(() => console.log("Failed To Connect MongoDb"));

const userSchema = mongoose.Schema({
  username: String,
  age: Number,
  name: String,
});

module.exports = mongoose.model("user", userSchema);

// module.exports = router;
