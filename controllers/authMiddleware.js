
const db = require("../db/queries")

const isUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.send("user login failure")
    }
}

const isMember = (req, res, next)=> {
 req.user.role_id >= 2 ? next() : res.send("Sorry - Members only")

}

const isAdmin = (req, res, next)=> {
    req.user.role_id >= 3 ? next() : res.send("You are not an admin") 
}

const isSiteManager = (req, res, next) => {
    req.user.role_id === 4 ? next() : res.send("Only the site manager can access this page")
}

module.exports = {
    isUser,
    isMember,
    isAdmin,
    isSiteManager
}