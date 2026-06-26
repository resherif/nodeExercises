const AddNewProduct = require('../controllers/productControllers');
const ProductControllers = require('../controllers/productControllers');
const express = require('express');
const router = express.Router()
router.post('/api/products', AddNewProduct);