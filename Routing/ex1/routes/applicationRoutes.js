const express = require('express');
const router = require('express').Router({ mergeParams: true });
const submitApplication = require('../controllers/jobController');
router.post('/', submitApplication.submitApplication);
module.exports = router;