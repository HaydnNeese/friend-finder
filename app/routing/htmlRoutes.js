//Dependencies
var path = require("path");


module.exports = function (app) {
    
    //a default catch-all route that will return the user to the homepage
    app.get("/", function (req, res) {
        //map to "home.html"
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })


    //get route to display the survey page
    app.get("/survey", function (req, res) {
        //map to survery.html
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });


    //a default catch-all route that will return the user to the homepage
    app.get("*", function (req, res) {
        //map to "home.html"
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })
};

