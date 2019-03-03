// Dependencies
var express = require("express");

// Sets up the Express App
var app = express();
//port number
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//maps the route files to the server
require("./app//routing/apiRoutes")(app);
require("./app//routing/htmlRoutes")(app);

//Listener
//this starts the server
app.listen(PORT, function() {
    console.log(`App listening on: ${PORT}`);
});
