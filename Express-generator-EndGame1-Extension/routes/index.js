var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "Santy",
    age: 23,
    name: "Santosh",
  });

  res.send(user);
});

//create session (data we store on server) on the server
router.get("/session", async (req, res) => {
  req.session.ban = true;
  res.send("index");
});

//check Session
router.get("/checkSession", async (req, res) => {
  console.log(req.session);

  if (req.session.ban === true) {
    res.send("You are Banned!");
  } else {
    res.send("You are not Banned!");
  }
});

//delete the session
router.get("/deleteSession", async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;

    res.send("Ban Removed");
  });
});

//Create Cookie
router.get("/createCookie", (req, res) => {
  res.cookie("name", "Santosh");
  res.render("index");
});

//Check cookie
router.get("/checkCookie", (req, res) => {
  console.log(req.cookies.name);

  res.send("Check console");
});

//Delete Cookie
router.get("/deleteCookie", (req, res) => {
  res.clearCookie("name");

  res.send("Cleared Cookie");
});

module.exports = router;
