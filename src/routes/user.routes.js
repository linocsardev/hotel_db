const  {Router} = require('express')
const router  = Router()

const userCtrl = require('../controllers/user.controller')

router.post('/', userCtrl.save);
router.get('/', userCtrl.list);
router.get('/:userId', userCtrl.data);
// // router.put('/:userId', userCtrl.updateUserById);
// router.delete('/:userId', userCtrl.deleteUserById);

module.exports = router