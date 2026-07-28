const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
app.use(express.json())
mongoose.connect(process.env.MONGO_URL);