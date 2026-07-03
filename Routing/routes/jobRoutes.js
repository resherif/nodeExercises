const router =require('express').Router();
const jobController = require('../controllers/jobController');
const applicationRoute = require('../routes/applicationRoutes');
router.get('/', jobController.GetAlljobs);
router.get('/:jobId', jobController.jobDisplay);
router.use('/:jobId/apply', applicationRoute);
module.exports = router;