const pool = require("./pool");

async function addUser(firstname, lastname, email, password) {
    await pool.query("INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4)", [firstname, lastname, email, password])
}

module.exports = {
    addUser
}