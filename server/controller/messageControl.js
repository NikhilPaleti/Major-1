var Crypto = require('crypto');
const CryptoJS = require('crypto-js'); 
const Messages = require("../modules/message");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      var bytes  = CryptoJS.AES.decrypt(msg.message, 'Secret Passphrase');
      var rmsg = bytes.toString(CryptoJS.enc.Utf8);

      return {
        fromSelf: msg.sender.toString() === from,
        message: rmsg,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;;

    var emessage = CryptoJS.AES.encrypt(message, "Secret Passphrase").toString();

    const data = await Messages.create({
      message: emessage,
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message Sent!" });
    else return res.json({ msg: "Failed. Just like you. But just in sending." });
  } catch (ex) {
    next(ex);
  }
};
