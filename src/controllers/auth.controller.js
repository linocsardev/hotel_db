const userMdl = require('../models/User');
const model = {};

model.signUp = async (req, res) => {
try {
    const {username, usermail, password, rol} = req.body;
    
    const result = await userMdl.save(req.body)
    res.json({
        msg: 'SignUp',
        data: result
    })
} catch (error) {
    res.json({
        state: 'failure',
        msg: error.msg, error
    })
}
}
model.signIn = async (req, res) => {
res.json({
    msg: 'signIn'
})
}

module.exports = model;