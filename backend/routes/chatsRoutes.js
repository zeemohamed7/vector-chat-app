const express = require("express");
const router = express.Router();


const chatsControllers = require('../controllers/chatControllers'); 
const { protect } = require("../middleware/authMiddleware");

router.post('/chat', protect, chatsControllers.accessChat)
router.get('/chats', protect, chatsControllers.fetchChats)
// router.post('/group', protect, chatsControllers.createGroup)
// router.put('/group-rename', protect, chatsControllers.renameGroup)
// router.put('/group-add', protect, chatsControllers.addToGroup)
// router.put('/group-remove', protect, chatsControllers.removeFromGroup)

module.exports = router;