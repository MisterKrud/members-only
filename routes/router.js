const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/controllers");

router.get("/", (req, res) => res.render("index"))

router.post("/signed-up", controllers.addUser)

module.exports = router;