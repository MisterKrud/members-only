const bcrypt = require("bcryptjs")
const db = require("../db/queries");
const pool = require("../db/pool")
const { body, validationResult, matchedData } = require("express-validator");

const getAllMessages = async(req, res) => {
    const  messages  = await db.getAllMessages();
    console.log(req.user)
    // console.log(req.user.role_id)
    res.render("index", {
        user: req.user,
        // role_id: req.user.role_id,
        messages: messages
    })
}

const validateNewMessage = [
    body("title").trim()
    .isLength({min: 1, max: 75}).withMessage('Title must be fewer than 75 characters'),
    body("text").trim()
   .isLength({min: 1, max: 1000}).withMessage('Message too long')
]

const postNewMessage = 
[validateNewMessage, async(req, res, next) => {
    console.log("Total Clients:", pool.totalCount, "Idle Clients:", pool.idleCount, "Waiting:", pool.waitingCount);
    try{
        console.log('validationresult ',validationResult(req) )
    const errors = validationResult(req);
   console.log(errors.array())
    if(!errors.isEmpty()){
        return res.status(400).render("index", {
            errors: errors.array()
        })
    }
   
    const {title, text} = matchedData(req)
    console.log("DB Input:", { title, text, userId: req.user.id });
     
     console.log(req.user.id)
     
    await db.postNewMessage(title, text, req.user.id);
    res.redirect("/");
    } catch(err) {
        console.error('DB error:', err.message)
    }
}
]




module.exports = {
    getAllMessages,
    postNewMessage,
}
