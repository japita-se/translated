module.exports = app => {
    const projects = require("../controllers/projects_controller.js");
  
    // Create a new Project
    app.post("/projects", projects.create);
  
    // Retrieve all projects
    app.get("/projects", projects.findAll);
  
    // Retrieve a single Project with projectId
    app.get("/projects/:projectId", projects.findOne);
    
  
  };