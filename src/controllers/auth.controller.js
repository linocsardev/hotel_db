const jwt = require('jsonwebtoken')
const userMdl = require('../models/User');
const config = require('../configs/config');
const model = {};

model.signUp = async (req, res) => {
    try {
        let { iduser, username, email, password, rol } = req.body;
        let password_encript = await userMdl.encryptPassword(password)
        let result = await userMdl.save(iduser, username, email, password_encript, rol)

        const token = jwt.sign({ id: result.data.iduser }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.json({
            msg: 'Success',
            data: result,
            token
        })
    } catch (error) {
        res.json({
            state: 'failure',
            msg: error.message, error
        })
    }
}
model.signIn = async (req, res) => {
    let { username, password } = req.body;

    const userFound = await userMdl.searchUser(username);
    console.log(userFound)
    if (!userFound) {
        return res.status(401).json({ msg: 'User not found' });
    }
    const matchPassword = await userMdl.comparePassword(password, userFound[0].userpass);

    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid passord" })

     const token = jwt.sign({iduser: userFound[0].iduser}, config.SECRET,{
         expiresIn: 86400
     })
    {
        return res.json({
            state: 'success',
            token

        });
    }


}

module.exports = model;