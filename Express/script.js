const express = require("express");
const app = express(); //running express

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use((req, res, next) => {
  console.log("Middleware1 is Running");

  next(); //to push the controll to next middleware OR Route
});

//Now send html page by using ejs from server
app.get("/", (req, res) => {
  res.render("index", { name: "Santosh" });
});

//show contact page from ejs
app.get("/contact", (req, res) => {
  res.render("contact", { age: 12 });
});

app.get("/", function (req, res) {
  res.send("Response");
});

app.get("/profile/:username", function (req, res) {
  res.send(`Hi From ${req.params.username}`);
});

app.get("/ejs", function (req, res) {
  res.send("<h1>Hiii</h1>");
});

app.get("/error", (req, res, next) => {
  throw Error("Something Went Wrong!");
});

//Search on Google for Express js Error Handling go to expressjs.com and copy and Error Handler
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(8000, () => {
  console.log("App is Running");
});
