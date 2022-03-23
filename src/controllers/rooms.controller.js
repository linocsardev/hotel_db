const roomMdl = require('../models/Rooms')
const model = {}

model.createRoom = async (req, res) => {
    try {
        let params = req.body;
        let result = await roomMdl.create(params);
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
model.getRooms = async (req, res) => {
    try {
        let params = req.query;
        let result = await roomMdl.list(params)
        res.json({
            state: 'succes',
            data: result
        })
    } catch (error) {
        res.json({
            state: 'failure',
            msg: error.message, error
        })
    }
}
model.getRoomById = async (req, res) => {
    try {
        let params = req.params
        let result = await roomMdl.data(params);
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
// model.updateRoomById = (req, res) => {

// }
model.deleteRoomById = async (req, res) => {
    try {
        let params = req.params;
        let result = await roomMdl.delete(params);
        res.json({
            state: 'success',
            ...result
        })
    } catch (error) {
        res.json({
            state: 'failure',
            msg: error.message, error
        })
    }
}


module.exports = model;