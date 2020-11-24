module.exports = app => {
  const jobs = require("../controllers/jobs_controller.js");
  // Find by jobId

  app.get("/jobs", jobs.find);
  // Filter by status
  app.get("/jobs/:status", jobs.filterByStatus);
  
  app.get("/jobs/", jobs.sortByKey);
  // Update a Job with jobId
  app.put("/jobs/:jobId", jobs.update);
  // Delete job: to do
  app.delete("/jobs/:jobId", jobs.delete);
};