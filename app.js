const express = require("express");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/camouflage", function(req, res) {
  res.render("camouflage");
});

app.get("/submit", function(req, res) {
  res.render("submit");
});

app.listen(3000, function() {
  console.log("App Started at port 3000 successfully");
});
