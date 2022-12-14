const Job = require('../models/Job')
const User = require('../models/User')

exports.getJobsService = async (filters, queries) => {
    const jobs = await Job
        .find(filters)
        .select(queries.fields)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)

    const total = await Job.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, jobs };
}

exports.getJobsByManagerService = async (id) => {
    const user = await User.find({ _id: id }).populate('jobs');

    return user;
}

exports.getAJobService = async (id, adminId) => {
    const job = await Job.findById({ _id: id }).populate('candidates');

    if (adminId !== job?.hiringManager?.id.toString()) {
        return error;
    }
    return job;
}

exports.getACandidateJobService = async (id, adminId) => {
    const job = await Job.findById({ _id: id }).populate('hiringManager.id');
    return job;
}

exports.createJobService = async (data) => {
    const job = await Job.create(data);

    const { _id: jobId, hiringManager } = job;
    //update user
    const res = await User.updateOne(
        { _id: hiringManager.id },
        { $push: { jobs: jobId } }
    )
    return job;
}

exports.updateJobByIdService = async (jobId, data, adminId) => {
    const result = await Job.updateOne({ _id: jobId }, { $set: data }, { runValidators: true }); //to validate 
    const job = await Job.findById(jobId);

    if (adminId !== job?.hiringManager?.id.toString()) {
        return error;
    }
    return result;
}

exports.deleteJobByIdService = async (id) => {
    const result = await Job.deleteOne({ _id: id })
    return result;
}


exports.applyJobById = async (jobId, data, userId) => {

    const job = await Job.findById({ _id: jobId });
    const { candidates } = job
    const present = candidates.indexOf(userId);

    if (present == -1) {
        const res = await Job.updateOne(
            { _id: jobId },
            { $push: { candidates: userId } }
        )
        return res
    }

    return error;
}
