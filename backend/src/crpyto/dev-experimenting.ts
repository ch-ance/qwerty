import aes from 'aes-js';

// example 128 bit key
// const key128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const key = new Uint8Array(key128);
const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255]
console.log(key);


// Convert text to bytes
const text = "hello!!!"
const textBytes = aes.utils.utf8.toBytes(text);

// encrypt the bytes
const aesCtr1 = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
const encryptedBytes = aesCtr1.encrypt(textBytes);

// convert to hex to store
const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

// convert hex back to bytes before decrypting
const hexToBytes = aes.utils.hex.toBytes(encryptedHex);

// then decrypt
const aesCtr2 = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
const decryptedBytes = aesCtr2.decrypt(hexToBytes);

// convert decrypted bytes to text
const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);

