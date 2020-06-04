const aes = require('aes-js');
const fs = require('fs');

// grab the key from the local file if one is given (TODO: make optional to pass in a key)

const encoder = new TextEncoder();
const str = fs.readFileSync('key.txt')
const key = new Uint8Array(encoder.encode(str));

// const key = new TextEncoder().encode("asdfasdfasdf")

// Convert text to bytes

export default function(text: string) {
    // convert text to bytes
    const textBytes = aes.utils.utf8.toBytes(text)


    // encrypt the bytes
    const aesCounter = new aes.ModeOfOperation.ctr(key, new aes.Counter());
    const encryptedBytes = aesCounter.encrypt(textBytes);

    // convert to hexadecimal
    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}
