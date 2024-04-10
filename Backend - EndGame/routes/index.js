var express = require("express");
var router = express.Router();

const userModal = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

//passport.use(new localStrategy(userModal.authenticate()));

//using Passport Authentication

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.send("Welcom To Profile");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send("Welcom To Profile");
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);

    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

router.post("/register", (req, res) => {
  var userData = new userModal({
    username: req.body.username,
    password: req.body.password,
    secret: req.body.secret,
  });

  userModal
    .register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

//************************** | Intermediate MongoDB | ********************* */

router.get("/mongodb", async (req, res) => {
  const user = await userModal.create({
    username: "harsha",
    nickname: "harsha",
    description: "I love learning JS and React",

    categories: ["js", "react", "node", "express", "java"],
  });

  res.send(user);
});

//perform case insesitive search from mongodb
router.get("/getUser", async (req, res) => {
  //convert 1st letter of word to lowercase
  const name = new RegExp("Santosh", "i");

  console.log(name); ///Santosh/i
  //const user = await userModal.find({ username: /harsh/i });  //it will return "harsh", "harshit", "harsha"
  // all 3 users because it is not search for perfectly matched

  const user = await userModal.find({ username: /^harsh$/i }); //It will only search for "harsh"

  //if I type "santosh" insted of "Santosh" then Mongodb treat both as different user. So I have to
  //remove this case sensitive search
  //const user = await userModal.find({ username: "Santosh" });

  //search on the basis of categories value
  const user1 = await userModal.find({ categories: { $all: ["js", "java"] } });
  //find "$all" all user on the basis of which has "js","java" in there categories array of mongodb

  //now search user between specific time range
  //  $gte = greater then equal  && $lte= less then equal
  const date1 = new Date("2023-12-12");
  const date2 = new Date("2023-12-14");

  const user2 = await userModal.find({
    createdData: { $gte: date1, $lte: date2 },
  });

  //Search Users if they have Same Field no matter that field has values or NOt

  const user3 = await userModal.find({ categories: { $exists: true } });
  res.send(user2);
});

//**************************  | Connect Flash | ************************** */

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//create flash in this route and use in different route
router.get("/createFlash", function (req, res, next) {
  //creates to diff Arrays which can be used in any route
  req.flash("name", "santosh");
  req.flash("age", 22);

  res.render("index", { title: "Express" });
});

router.get("/checkFlash", function (req, res, next) {
  console.log(flash.name, flash.age);
  res.send("Check Server Console");
});

module.exports = router;
