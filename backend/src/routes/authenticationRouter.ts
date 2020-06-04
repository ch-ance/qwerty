import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../types";

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
  } else {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Endpoint

router.post("/login", (req, res) => {
  const { email, password } = req.body.user;

  function callback(user: User) {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.email}`,
        name: user.email,
        token
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  Users.findByEmail(email)
    .then(callback)
    .catch((error: Express.Response) => {
      res.status(500).json({
        message: `Something went wrong finding user ${email} ${error}`
      });
    });
});

// Fetch all user emails and first names

router.get("/all", (req, res) => {
  return Users.find();
});

function generateToken(user: User) {
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
