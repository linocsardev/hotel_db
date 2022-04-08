const userMdl = require('./../models/User')
const model = {};

model.data = async (req, res) => {
    try {
        let {iduser} = req.params;
        let result = userMdl.data(iduser);
        res.json({
            state: 'success',
            data: result
        })

    } catch (error) {
        res.json({
            state: 'failure',
            message: error.message, error
        })
    }
}

model.save = async (req, res) => {
    try {
        let params = req.body;
        let result = await userMdl.save(params)
        res.json({
            state: 'success',
            data: result
        })     
    } catch (error) {
        res.json({
            state: 'failure',
            msg: error.message, error
        })
    }
}
model.list = async (req, res) => {
    try {
        let params = req.body;
        let result = await userMdl.list(params)
        res.json({
            state: 'success',
            data: result
        })
    } catch (error) {
        res.json({
            state: 'failure',
            msg: error.message, error
        })
    }
}

module.exports = model;