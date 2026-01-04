const db = require("../db/managementqueries");

const displayMainTables = async(req, res) => {
    const mainUserTable = await db.getUserInformationTable();
     const messagesTable = await db.getMessageInformationTable();

    res.render("site-manager", {
        mainUserTable: mainUserTable,
        messagesTable: messagesTable
    })
}



const deleteUser = async(req, res) => {
   const userId = req.params.id
    await db.removeUser(userId)
    res.redirect("/site-manager")
}

const deleteMessage = async(req, res) => {
await db.removeMessage(req.params.id)
res.redirect("/site-manager")
}


module.exports= {
    displayMainTables,
    deleteUser,
    deleteMessage
}