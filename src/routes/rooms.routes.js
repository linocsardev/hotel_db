const  express = require('express')
const router  = express.Router()

const roomsCtrl = require('../controllers/rooms.controller')

router.post('/', roomsCtrl.createRoom);
router.get('/', roomsCtrl.getRooms);
router.get('/:roomId', roomsCtrl.getRoomById);
// router.put('/:roomId', roomsCtrl.updateRoomById);
router.delete('/:roomId', roomsCtrl.deleteRoomById);

module.exports = router