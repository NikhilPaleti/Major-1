const { sendMessage, getMessages } = require("../controller/messageControl");
const router = require("express").Router();

router.post("/sendmsg/", sendMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
