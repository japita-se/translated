#!/usr/bin/env node
const dotenv = require('dotenv').config({ path:__dirname +  '/config/.env' });
const app    = require('express')();
const bodyParser = require("body-parser");
const mysql      = require('mysql2'); 
console.log(dotenv);
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/********************************************************************** */
/*                                  Routing                             */
/********************************************************************** */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the awesome Translated APIs!." });
});
// Other routes
require("./routes/projects.js")(app);
require("./routes/jobs.js")(app);

/********************************************************************** */

app.use(function(err, req, res, next) {    
    console.log(err);
    res.status(500).send({message:err.message,status:err.status});
    next();
  });
// Start server
const port = process.env.PORT || 3000;
server = app.listen(port, () => {
  console.log("Server is running on port 3000.");
  console.log(dotenv);
});
 
