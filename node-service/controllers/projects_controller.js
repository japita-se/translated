
const db      = require('../config/db.js');
const Project = require('../models/project.js');
const Job     = require('../models/job.js');
const _       = require('../routes/projects.js');

function findAll(req=null, res=null) {

}
function findOne(req=null, res=null) {

}
 
/**
 * Create a project with some jobs (at least one)
 * @param {*} req Express Request object. It must contain the jobs details
 *                {  'title':''
 *                   'jobs': [{'creationDate':'','status':'','price':''}]
 *                }
 * @param {*} res Express Response object
 */
function create(req=null, res=null, next) {
    const result = {'msg':''};
    const body = req.body;
    
    
    if (!('jobs' in body)) 
        throw new Error('At least one job is needed');
    // Validate request
    if (!req.body) {
        throw new Error('Body empty');
    } 
    newProject = new Project({
        title: req.body.title || ""
    });
    Project.create(newProject, (err, data) => {
        if (err) {
            msg = "projects_controller:: error creating new project";
            console.log(msg, err);
            return next(msg);
        }
        // Create the jobs    
        let jobs = [];
        project_id = data.id || "";
        body.jobs.forEach(function(v,i){
            let _ = [v.creationDate,v.price,v.status,project_id];
            jobs.push(_);
        });
        
        const jobRes = Job.create(jobs, (err, data)=> {
            if (err)
                return next(err);   
            console.log(data);
            res.send(data);
        });
        
    }); 
}
/**
 * Update a project
 * @param {*} req Express Request object
 * @param {*} res Express Response object
 */
function update(req=null, res=null) {

}
exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
