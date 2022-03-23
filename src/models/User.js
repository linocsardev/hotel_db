
let bcrypt = require('bcryptjs')
let query = require('./db-connection');
let model ={};

model.save = async (params) => {
    let sql= '', vector = [];
    sql = `
        INSERT INTO user
        VALUES (?, ?, ? , ?, ?)
    `
    vector= [
        params.iduser,
        params.username,
        params.email,
        params.password,
        params.rol
    ]
    let result = await query(sql, vector);
    return result
}
model.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}
model.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model;