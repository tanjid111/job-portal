const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const uploader = require('../middlewares/uploader');
const verifyToken = require('../middlewares/verifyToken');
const authorization = require('../middlewares/authorization')

// router.use(verifyToken) //to verify token for all the routes below.

//single file
router.post('/jobs/:id/apply', uploader.single('doc'), jobController.fileUpload);

router.route('/jobs/')
    .get(jobController.getJobs)
    .post(verifyToken, jobController.createJob)

router.route('/manager/jobs/')
    .get(verifyToken, authorization('admin', 'hiring-manager'), jobController.getJobsByManager)

router.route('/manager/jobs/:id')
    .get(verifyToken, authorization('admin', 'hiring-manager'), jobController.getJobById)

router.route('/jobs/:id')
    .patch(verifyToken, authorization('admin', 'hiring-manager'), jobController.updateJobById)
    .delete(verifyToken, authorization('admin', 'hiring-manager'), jobController.deleteJobById)
    .get(jobController.getCandidateJobById)

router.post("/jobs/:id/", verifyToken, jobController.applyJob);

module.exports = router;