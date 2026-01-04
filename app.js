require("dotenv").config();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const router = require("./routes/router");
const pool = require("./db/pool");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: false}));


app.use(session({
  store: new pgSession({ pool }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 1 * 60 * 60 * 1000 } //1 hour

}));

app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use("/", router);

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) {
        throw error
        
    }
    console.log(`Webserver active on port: ${PORT}`)
})