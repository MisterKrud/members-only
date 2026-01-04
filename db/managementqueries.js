const pool = require("./pool");

async function getUsersTable() {
   const { rows } = await pool.query("SELECT * FROM users")
   return rows;
}

async function getMessagesTable() {
    const { rows } = await pool.query("SELECT * FROM messages")
    return rows;
}

async function getRolesTable() {
    const { rows } = await pool.query("SELECT * FROM roles")
    return rows;
}

async function getUserInformationTable() {
    const { rows } = await pool.query("SELECT users.id as id, users.username as email, users.firstname as firstname, users.lastname as lastname, roles.name as role  FROM users JOIN roles ON (users.role_id=roles.id)")
    return rows;
}

async function getMessageInformationTable() {
    const { rows } = await pool.query("SELECT messages.id as id, messages.title as title, messages.text as text, users.username as email, CONCAT(users.firstname,' ', users.lastname) as name FROM messages JOIN users ON (messages.user_id = users.id)")
    return rows;
}

async function getUsersByRole(role_id) {
    const {rows} = await pool.query("SELECT users.id, users.username, users.firstname, users.lastname, roles.name as role FROM users JOIN roles on(users.role_id = roles.id) WHERE roles.id = $1", [role_id])
    return rows;
}

async function getMessagesFromUser(user_id) {
    const { rows } = await pool.query("SELECT messages.id, messages.title, messages.text, users.username FROM users JOIN messages ON (messages.user_id = users.id) WHERE users.id = $1", [user_id])
    return rows;
}


async function removeMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id])
}

async function removeAllMessagesFromUser(user_id) {
    await pool.query("DELETE FROM messages WHERE user_id = $1", [user_id])
}


async function removeUser(id) {
    console.log(id)
    await pool.query("DELETE FROM users WHERE users.id = $1", [id])
}

module.exports = {
    getUsersTable,
    getMessagesTable,
    getRolesTable,
    getUserInformationTable,
    getMessageInformationTable,
    getUsersByRole,
    getMessagesFromUser,
    removeMessage,
    removeAllMessagesFromUser,
    removeUser
}
