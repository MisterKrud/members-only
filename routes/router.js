const { Router } = require("express");
const router = Router();
const passport = require("../config/passport")
const controllers = require("../controllers/controllers");
const messageControllers = require("../controllers/messageControllers")
const managementControllers = require("../controllers/managementControllers");
const isAuth = require("../controllers/authMiddleware")

router.get("/", messageControllers.getAllMessages);


router.get("/login-form", (req, res)=> res.render("login-form"));
router.get("/sign-up-form", (req, res) => res.render("sign-up-form"));


router.post("/sign-up", controllers.addUser);

router.get("/success", (req, res) => res.render("success", {
    user: req.user
}));

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

router.get("/member-upgrade", (req, res) => res.render("member-upgrade"))

router.post("/upgrade-to-member", controllers.memberUpgrade)

router.get("/members", isAuth.isMember,(req, res) => {
        res.render("members");
    })

router.get("/admin", isAuth.isAdmin, (req, res) => {
    res.render("admin")
})

router.get("/site-manager", isAuth.isSiteManager, managementControllers.displayMainUserTable)

router.get("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
    
})

//management
router.post("/:id/delete-user", managementControllers.deleteUser)

//messages
router.get("/messages", messageControllers.getAllMessages)
router.post("/new-message", messageControllers.postNewMessage)



router.get("/failed", (req, res) => res.render("failed"))
module.exports = router;