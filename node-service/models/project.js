const sql = require('../config/db.js');

const Project = function(project) {
    this.title = project.title || "-";
  }; 
  
Project.create = (newProject, result) => {
    if (!newProject)
        throw Error("No data in Project!");    
    sql.query("INSERT INTO projects SET ?", newProject, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
    });
  };

module.exports = Project;