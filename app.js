require("dotenv").config();
const bcrypt = require("bcrypt.js");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const router = require("./routes/router");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}));

app.use(session({secret: "cats", resave: false, saveUninitialized: false}))
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.use("/", router);

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) {
        throw error
        
    }
    console.log(`Webserver active on port: ${PORT}`)
})