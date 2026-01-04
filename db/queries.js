const pool = require("./pool");

async function addUser(firstname, lastname, email, password) {
    await pool.query("INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4)", [firstname, lastname, email, password])
}

async function getUser(username) {
    const {rows} = await pool.query("SELECT users.id, users.username, users.password, users.firstname, users.lastname, users.role_id, roles.name as role  FROM users JOIN roles ON (users.role_id=roles.id) WHERE users.username = $1", [username])
    console.log(rows[0])
    return rows[0];
}

async function getUserById(id) {
    const {rows} = await pool.query("SELECT users.id, users.username, users.password, users.firstname, users.lastname, users.role_id, roles.name as role FROM users JOIN roles ON (users.role_id=roles.id) WHERE users.id = $1", [id])
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
//messages

async function getAllMessages() {
    const { rows } = await pool.query("SELECT messages.title, messages.text, users.firstname, users.lastname, messages.created FROM messages JOIN users ON users.id = messages.user_id");
    return rows;
}

async function postNewMessage(title, text, user_id){
    await pool.query("INSERT INTO messages (title, text, user_id) VALUES($1, $2, $3)", [title, text, user_id])
}


module.exports = {
    addUser,
    getUser, 
    getUserById,
    makeMember,
    makeAdmin,
    makeSiteManager, 
    getAllMessages,
    postNewMessage
}