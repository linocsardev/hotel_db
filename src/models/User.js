
let bcrypt = require('bcryptjs')
let query = require('./db-connection');
let model ={};

model.data = async (iduser) => {
    let sql="", vector= []
    sql = `
        SELECT * FROM user WHERE iduser = ?
    `;
    vector = [
        iduser
    ]
    let result = await query(sql, vector)
    return result;
}

model.searchUser = async (username) => {
    let sql = '', vector= []
    sql = `
        SELECT * FROM user WHERE username = ?; 
    `;
    vector = [
        username,
    ]
    let result = await query(sql, vector);

    return result
}

model.save = async (iduser, username, email, password, rol) => {
    let sql= '', vector = [];
    sql = `
        set @codigo = '0';
        call hotel_db.guardar_user(?, ?, ?, ?, ?, @codigo);
        select @codigo as codigo;
    `
    vector= [
        iduser,
        username,
        email,
        password,
        rol
    ]
    let result = await query(sql, vector);
    let indexcodigo = result.length -1;
    let codigo;
    if(typeof result[indexcodigo] != "undefined")
        if(typeof result[indexcodigo][0] != "undefined")
            codigo = result[indexcodigo][0].codigo
    
    let data = 0;
    if(typeof result[1] != "undefined")
        if(typeof result[1][0] != "undefined")
            data = result[1][0]
    return {codigo, data}
}
model.list = async (params) => {
    let sql = ''
    sql = `
        SELECT * FROM user
    `

    let result = await query(sql)
    return result;
}


model.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(3);
    return await bcrypt.hash(password, salt)
}
model.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model;