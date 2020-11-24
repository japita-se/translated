const sql = require('../config/db.js');
const statuses = ["pending","in preparation","in progress", "delivered","cancelled"];

const Job = function(job) {
    this.id           = job.id || "-";
    this.creationDate = new Date(job.creationDate) || "";
    this.price  = job.price || "";
    this.status = job.status || "";
    this.project_id = job.project_id || "";
  };
  /**
   * Create a new job
   * @param {*} newJob 
   * @param {*} result 
   */
  Job.create = (newJob=[], result=()=>{}) => {
    
    // validation: TO DO
    const q = sql.query("INSERT INTO jobs (creationDate,price,status,project_id) VALUES ?", [newJob], (err, res, fields) => {
      if (err) {
        console.log("error: ", err);
        console.log(res);
        result(err, null);
        return;
      } 
      console.log("created job: ", { id: res.insertId, ...newJob });
      result(null, { id: res.insertId, ...newJob });
    });    
  };
/**
 * Find job by status
 * @param {*} status 
 * @param {*} result 
 */
Job.findByStatus = (status, result) => {
    if (!statuses.includes(status)) {
        result("Status not admitted", null);
        return;
    } 
    sql.query(`SELECT * FROM jobs WHERE status = ?`, status, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found job: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        
    });
};
Job.find = (jobId, result) => {
  sql.query(`SELECT * FROM jobs WHERE id = ?`, jobId, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      if (res.length) {
          console.log("found job: ", res[0]);
          result(null, res[0]);
          return;
      }
      // not found 
      result({ kind: "not_found_" }, null);
  });
};
Job.sortByKey = (key="price", limit=10, result=()=>{}) => {
  const admittedKeys = ["price","creationDate"];
  if (!admittedKeys.includes(key)) {
      result(null, {});
      return;
  }
  escapedKey = sql.escapeId(key,true);
  
  const q = `SELECT * FROM jobs order by ${escapedKey} limit ${limit}`;
  sql.query(q,  (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if (res.length) {      
          result(null, res);
          return;
      }
  });
};
Job.updateById = (id, job, result) => {
  // validation of job: to do
  sql.query(
    "UPDATE jobs SET creationDate = ?, status = ?, price = ? WHERE id = ?",
    // "UPDATE jobs SET ? WHERE id = ?",
    [
      job.creationDate|| now,
      job.status || "",
      job.price,
      id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found job with the id
        result({ msg: "not_found" }, null);
        return;
      }

      console.log("updated job: ", { id: id, ...job });
      result(null, { id: id, ...job });
    }
  );
};
module.exports = Job;