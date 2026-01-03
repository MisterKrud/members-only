const pool = require("./pool");

async function addUser(firstname, lastname, email, password) {
    await pool.query("INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4)", [firstname, lastname, email, password])
}

async function getUser(username) {
    const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    return rows[0];
}

async function getUserById(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows[0];
}

async function makeMember(id) {
    await pool.query("UPDATE users SET role_id =2 WHERE id = $1", [id])
}

async function makeAdmin(id) {
    await pool.query("UPDATE users SET role_id = 3 WHERE id = $1", [id])
}

async function makeSiteManager(id) {
    await pool.query("UPDATE users SET role_id = 4 WHERE id = $1", [id])
}


module.exports = {
    addUser,
    getUser, 
    getUserById,
    makeMember,
    makeAdmin,
    makeSiteManager
}