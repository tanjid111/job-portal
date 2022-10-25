const Job = require('../models/Job');
const { getJobsService, createJobService, updateJobByIdService, deleteJobByIdService, getAJobService, getJobsByManagerService, getACandidateJobService, applyJobById } = require('../services/job.service');

exports.getJobs = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit', 'fields']
        excludeFields.forEach(field => delete filters[field])

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)

        const queries = {}

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query

            const skip = (page - 1) * parseInt(limit)
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const jobs = await getJobsService(filters, queries); //get all jobs
        res.status(200).json({
            status: 'success',
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
            error: error.message
        })
    }
}

exports.getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: adminId } = req.user;
        const job = await getAJobService(id, adminId);
        res.status(200).json({
            status: 'success',
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
        })
    }
}

exports.getCandidateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await getACandidateJobService(id);
        res.status(200).json({
            status: 'success',
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
            error: error.message
        })
    }
}

exports.getJobsByManager = async (req, res, next) => {
    try {
        const { id } = req.user;
        const job = await getJobsByManagerService(id);
        res.status(200).json({
            status: 'success',
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
            error: error.message
        })
    }
}

exports.createJob = async (req, res, next) => {

    try {
        const result = await createJobService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
}

exports.updateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: adminId } = req.user;

        const result = await updateJobByIdService(id, req.body, adminId);
        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully!'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the Job",
            error: error.message
        })
    }
}

exports.deleteJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteJobByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not delete the Job"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data deleted successfully!'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't delete the product",
            error: error.message
        })
    }
}

exports.fileUpload = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json(req.file)
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't upload the file",
            error: error.message
        })
    }
}

exports.applyJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;

        const candidate = await applyJobById(id, req.body, userId);


        res.status(200).json({
            status: 'success',
            data: candidate,
            message: 'Data created successfully!'
        })

    } catch (error) {

        res.status(400).json({
            status: 'fail',
            message: "Already applied in this job",
        })
    }
}