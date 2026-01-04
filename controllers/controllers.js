const bcrypt = require("bcryptjs")
require("dotenv").config()
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");


const userValidator =[
    body("firstname").trim(),
    body("lastname").trim(),
    body("username").trim(),
    body("password").trim()
    .isAlphanumeric().withMessage('Password must be alphanumeric'),
    body("confirmPassword").trim()
    .custom((value, {req}) => {
        return value === req.body.password;
    }).withMessage("Passwords do not match")
 ]

const addUser =  [  userValidator, async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).render("index", {
        errors: errors.array(),
       }
       )
    } else {
        try {
            const user = matchedData(req)
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await db.addUser(user.firstname, user.lastname, user.username, hashedPassword);
            res.redirect("/", {
                firstname: user.firstname
            })
        } catch(error) {
            console.error(error)
            return next(error)
        }

    } 
}
]

const memberUpgradeValidator = [
   
    body("memberPassword").trim()
    .custom(value => {
        return value === process.env.MEMBER_PASSWORD
    }).withMessage("Incorrect passcode")
]

const memberUpgrade = [
    memberUpgradeValidator,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render("failed", {
                errors: errors.array()
            }
            )
        } else {
            await db.makeMember(req.user.id);
            res.redirect("/")
        }
    }
]



module.exports = {
    addUser,
    memberUpgrade
}