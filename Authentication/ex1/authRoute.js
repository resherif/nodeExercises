const express = require('express');
const router = express.Router();
const AuthCont = require('./AuthController');
const { Middle } = require('./middleware');
router.get('/', Middle,AuthCont.handleGetUser);