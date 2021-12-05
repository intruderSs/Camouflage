const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encryption = require("mongoose-encryption");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/camDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = "MynameisShahil";
userSchema.plugin(encryption, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (!err){
      res.render("camouflage");
    }else{
      console.log(err);
    }
  });
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

User.findOne({email: username}, function(err, foundUser) {
  if (err) {
    console.log(err);
  }else{
    if (foundUser) {
      if(foundUser.password === password) {
        res.render("camouflage");
      }
    }
  }
});

});

app.listen(3000, function() {
  console.log("App Started at port 3000 successfully");
});
