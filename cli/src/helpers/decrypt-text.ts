const aes = require('aes-js');
const fs = require('fs');

// grab the key from the local file if one is given (TODO: make optional to pass in a key)

const encoder = new TextEncoder();
const str = fs.readFileSync('key.txt')
const key = new Uint8Array(encoder.encode(str));


export default function(encryptedHex: string) {
    
    // convert hex back to bytes before decrypting
    const hexToBytes = aes.utils.hex.toBytes(encryptedHex);

    // // then decrypt
    const aesCtr2 = new aes.ModeOfOperation.ctr(key, new aes.Counter());
    const decryptedBytes = aesCtr2.decrypt(hexToBytes);

    // convert decrypted bytes to text
    const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}


