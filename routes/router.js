const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/controllers");

router.get("/", (req, res) => res.render("index"));

router.get("/login-form", (req, res)=> res.render("login-form"));
router.get("/sign-up-form", (req, res) => res.render("sign-up-form"));

router.post("/sign-up", controllers.addUser);
//doesn't yet exist
// router.post("/login", controllers.userLogin)

module.exports = router;