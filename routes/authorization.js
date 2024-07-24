const express = require('express')

const app = express()

app.use(express.json());
const db = require("../db")

app.use(express.json());


const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "oh-so-secret";
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour

  module.exports = router;