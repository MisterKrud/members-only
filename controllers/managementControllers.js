const db = require("../db/managementqueries");

const displayMainUserTable = async(req, res) => {
    const mainUserTable = await db.getUserInformationTable();
    res.render("site-manager", {
        mainUserTable: mainUserTable
    })
}



const deleteUser = async(req, res) => {
   const userId = req.params.id
    await db.removeUser(userId)
    res.redirect("/site-manager")
}


module.exports= {
    displayMainUserTable,
    deleteUser
}