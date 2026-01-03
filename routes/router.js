const { Router } = require("express");
const router = Router();
const passport = require("../config/passport")
const controllers = require("../controllers/controllers");
const isAuth = require("../controllers/authMiddleware")

router.get("/", (req, res) => res.render("index"));

router.get("/login-form", (req, res)=> res.render("login-form"));
router.get("/sign-up-form", (req, res) => res.render("sign-up-form"));


router.post("/sign-up", controllers.addUser);

router.get("/success", (req, res) => res.render("success", {
    user: req.user
}));

router.post("/login", passport.authenticate("local", {
    successRedirect: "success",
    failureRedirect: "/"
}))

router.get("/members", isAuth.isMember,(req, res) => {
        res.render("members");
    })

router.get("/admin", isAuth.isAdmin, (req, res) => {
    res.render("admin")
})



module.exports = router;