// requiring libraries
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const PORT = 8080;

// Setting ejs and bodyParser
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  name: "cookies",
  keys: ["user_id"]
}));


// Database for saving all unique id with the corresponding link
// Database will be updated if user add/update/delete any elements

// This will be the testing database

let users = {
  "admin": {
    id: "admin",
    email: "leo442183205@gmail.com",
    password: bcrypt.hashSync("123456", 10)
  }
};

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This is the start for all GET requests.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Default route
app.get("/", function (req, res) {
  if(!req.session.user_id){
    res.redirect("/login");
  } else {
    res.redirect("/user");
  }
});

app.get("/login", function(req, res) {
  let cookieID = req.session.user_id;
  let templateVars = {
    usersObject: users[cookieID]
  };
  res.render("usr_login", templateVars);
});

app.get("/register", function(req, res) {
  let cookieID = req.session.user_id;
  let templateVars = {
    usersObject: users[cookieID]
  };
  res.render("usr_register", templateVars);
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This is the end of all GET requests.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This is the start of all POST requests.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

app.post("/login", function(req, res) {
});

// This post is for handling when user logout, and redirect
// back to login back after user has logged out
app.post("/logout", function(req, res) {
  req.session = null;
  res.redirect("/login");
});

// This post handles what is being passed from register from
// if user inputs are valid, a cookie will be set up and redirect
// to user interface page
app.post("/register", function(req, res) {
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This is the end of all POST requests.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Even handler
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});


