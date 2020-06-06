"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const Users = require("../helpers/users");
const secret = process.env.JWT_SECRET || "secret";
const router = express.Router();
// Register Endpoint
router.post("/register", (req, res) => {
    const { email, password } = req.body.user;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newUser = Users.add({
        email,
        password: bcrypt.hashSync(password),
        createdAt
    });
    if (newUser) {
        res.status(201).json(newUser);
    }
    else {
        res.status(500).json({ message: "Error registering user" });
    }
});
// Login Endpoint
router.post("/login", (req, res) => {
    const { email, password } = req.body.user;
    function callback(user) {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.email}`,
                name: user.email,
                token
            });
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    Users.findByEmail(email)
        .then(callback)
        .catch((error) => {
        res.status(500).json({
            message: `Something went wrong finding user ${email} ${error}`
        });
    });
});
// Fetch all user emails and first names
router.get("/all", (req, res) => {
    return Users.find();
});
function generateToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, secret, options);
}
module.exports = router;
//# sourceMappingURL=authenticationRouter.js.map