const Data = require('../model/jobs.json');
const express = require('express');
const GetAlljobs = (req, res) => { 
    res.json({Data });
}
const jobDisplay = (req, res) => { 
    const { jobId } = req.params;
    const job = Data.filter((job) => job.id == jobId);
    console.log(job);
    console.log(jobId);
    if (job.length > 0) {
        res.json({
            "message": "Here's the job!",
            success: true,
            job
        });
    } else { 
        res.status(404).json({
            "message": "job not found!",
            success: false
        })
    }
}
const submitApplication = (req, res) => { 
    const { jobId } = req.params;
    const { candidateName, resumeUrl } = req.body;
    res.status(201).json({
        "message": `application submitted for job with id ${jobId}`,
        success: true
    })
}
module.exports = { GetAlljobs,jobDisplay,  submitApplication };