var Crypto = require('crypto');
var secret_key ='fd85b494-aaaa';
var secret_iv = 'smslt';
var encryptionMethod = 'AES.256.CBC' ;
var key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
var iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);


// var encryptedMessage = (encryptionMethod, key, iv);
// console. log (encryptedMessage);


module.exports.encrypt = (plain_text, encryptionMethod, key, iv) => {
    var encryptor = Crypto.createCipheriv(encryptionMethod, key, iv);
    var aes_encrypted = encryptor.update(plain_text,'utf8', 'base64') + encryptor.final( 'base64'); 
    return Buffer. from(aes_encrypted).toString('base64') ;
}

// var decryptedMessage = decrypt("", encryptionMethod, key, iv);
// console. log (decryptedMessage) ;

module.exports.decrypt = (encryptedMessage, encryptionMethod, key, iv) => {
    const buff = Buffer. from(encryptedMessage, 'base64');
    encryptedMessage = buff.toString('utf-8'); // convert to string
    var decryptor = Crypto.createDecipheriv(encryptionMethod, key, iv) ;
    decryptor.update(encryptedMessage,'base64','utf8') + decryptor.final('utf8');
}

