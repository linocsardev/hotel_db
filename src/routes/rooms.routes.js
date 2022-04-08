const  express = require('express')
const router  = express.Router()

const roomsCtrl = require('../controllers/rooms.controller')
const {verifyToken, isAdmin, isUser} = require('../middlewares/authJwt')

router.post('/', [verifyToken, isAdmin],  roomsCtrl.createRoom);
router.get('/', roomsCtrl.getRooms);
router.get('/:roomId', roomsCtrl.getRoomById);
// router.put('/:roomId', roomsCtrl.updateRoomById);
router.delete('/:roomId', [verifyToken, isAdmin], roomsCtrl.deleteRoomById);

module.exports = router