const express = require("express");
const app = express();

app.set("view engine", "ejs"); //setting ejs

//link root path of public folder
app.use(express.static("./"));

app.get("/", (req, res) => {
  //   res.send("HIII");

  res.render("index");
});

app.listen(8000);
