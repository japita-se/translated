
const db = require('../config/db.js');
const Job = require('../models/job.js');
const _ = require('../routes/jobs.js');

 
function filterByStatus(req=null, res=null,next=()=>{}){

    if (!req.params)
        throw Error("Parameters are null");
    
    Job.findByStatus(req.params.status || "", (err, data)=> {
        if (err){
            console.log(err);       
            throw Error(err);
        }
        else res.send(data);
        });
}
/**
 * Sort by key
 * @param {} req  
 * @param {*} res 
 */
function sortByKey(req=null, res=null) {
    const key = req.query.key || "price";
    const limit = req.query.limit || 10;
    Job.sortByKey(key,limit, (err,data)=>{
        if (err){
            console.log(err);       
            throw Error(err);
        }
        else res.send(data);        
    });
}
function update(req=null, res=null){
    
}
 
/**
 * Update a project
 * @param {*} req Express Request object
 * @param {*} res Express Response object
 */
function update(req=null, res=null,next) {
    const body = req.body;
    Job.updateById(req.params.jobId, body, (err,data) => {
        if (err){
            console.log(err);
            throw Error(err);
            }
        else
            res.send(data);
    });
}
/**
 * Filter 
 * @param {*} req 
 * @param {*} res 
 */
function find(req=null, res=null,next) {
    Job.find(req.params.jobId || "", (err, data)=> {
        if (err) {            
            console.log(err);
            next(err);
        }
        else res.send(data);
    });
}
/**
 * Delete (to do)
 * @param {*} req 
 * @param {*} res 
 */
function deleteJob(req=null, res=null, next) {
}


exports.filterByStatus = filterByStatus;
exports.sortByKey     = sortByKey;
exports.update        = update;
exports.find          = find;
exports.delete          = deleteJob;