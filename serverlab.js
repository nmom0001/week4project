let express = require("express");
let app = express();
// bodyParser is used to parse the payload of the incoming POST requests. 
let bodyParser = require("body-parser");
//List of Tasks
let db = [];
// viewPath is required for the response.sendFile function
//__dirname is the  directory name of the current module (i.e file/project).
let viewsPath = __dirname + "/views/";
/* Task details
    Task name
    Task due date (a string)
    Task Description
 */
//allow Express to understand the urlencoded format
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Express should be able to render ejs templates
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// we have some static assets such as images in this project
app.use(express.static('images'));
app.use(express.static('css'));
/* 
          GET Requests
  */
//if a request to the home page (i.e. '/') arrives
app.get("/", function (req, res) {
  console.log("Homepage request");
  // generate the relative path
  let fileName = viewsPath + "index.html";
  // send index.html back to the client
  res.sendFile(fileName);
});
// a request to add a new tasks
app.get("/addnewtask", function (req, res) {
  console.log("Add New Tasks request");
  //Generate the relative path
  let fileName = viewsPath + "addnewtask.html";
  //send addcusotmer.html page back to the client
  res.sendFile(fileName);
});
//a request to get all tasks
app.get("/getalltasks", function (req, res) {
  console.log("Homepage request");
  // the content of the page should be generated dynamically. 
  // a copy of the array (db) will be send to the rendering engine. 
  res.render("alltasks", {
    tasks: db
  });
});
// POST Requests
// when the user clicks on the submit button
app.post("/newtask", function (req, res) {
  console.log(req.body);
  //bodyParser is responsible for generating the body object 
  db.push(req.body);
  // after pushing the new task to the database, redirect the client to alltask.html 
  res.render("alltasks", {
    tasks: db
  });
});
app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');