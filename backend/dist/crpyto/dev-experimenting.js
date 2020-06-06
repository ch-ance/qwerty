"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aes_js_1 = __importDefault(require("aes-js"));
// example 128 bit key
// const key128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const key = new Uint8Array(key128);
const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255];
console.log(key);
// Convert text to bytes
const text = "hello!!!";
const textBytes = aes_js_1.default.utils.utf8.toBytes(text);
// encrypt the bytes
const aesCtr1 = new aes_js_1.default.ModeOfOperation.ctr(key, new aes_js_1.default.Counter(5));
const encryptedBytes = aesCtr1.encrypt(textBytes);
// convert to hex to store
const encryptedHex = aes_js_1.default.utils.hex.fromBytes(encryptedBytes);
// convert hex back to bytes before decrypting
const hexToBytes = aes_js_1.default.utils.hex.toBytes(encryptedHex);
// then decrypt
const aesCtr2 = new aes_js_1.default.ModeOfOperation.ctr(key, new aes_js_1.default.Counter(5));
const decryptedBytes = aesCtr2.decrypt(hexToBytes);
// convert decrypted bytes to text
const decryptedText = aes_js_1.default.utils.utf8.fromBytes(decryptedBytes);
//# sourceMappingURL=dev-experimenting.js.map