//load DATA from the data file "friends.js"

var friendsData = require("../data/friends");


module.exports = function(app) {
    //delivers all of the data to the page
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
    //writes a new JSON object to the friendsArray on friends.js
    app.post("/api/friends", function(req, res) {
        //arrange variables
        //10 is lowest possible score and highest score is 50
        //the difference is 40 so that means that is the largest difference between surveys possible
        //therefore it is set to 41 by default
        var bestMatch = 41;
        var bestMatchIndex = 0;
        //loop through friendsData
        for(var i = 0; i < friendsData.length; i++) {
            //make empty array to hold the differences
            var diffArray = [];
            //loop through the scores of each user in the friendsData
            for(var j=0; j < 10; j++) {
                //take each individual score of the user's scores and subtract from it he individual scores of every user stored in friendsdata
                var diff = Math.abs((parseInt(req.body.scores[j])) - (parseInt(friendsData[i].scores[j])));
                diffArray.push(diff);
                //when the loop reaches the last item in the score array
                if(j === 9) {
                    //create a reducer function
                    var reducer = (accumulator, currentValue) => accumulator + currentValue;
                    //combine the total differences from the array
                    var totalDiff = diffArray.reduce(reducer);
                    //if totalDiff is less than bestMatch then reset the value of bestMatch to the new totalDiff
                    //and continue comparing until you are left with the lowest total
                    //set the bestMatchIndex to match the value of i for the lowest difference
                    if (totalDiff < bestMatch) {
                        bestMatch = totalDiff;
                        bestMatchIndex = i;
                    };
                };
            };
            // Once last friend is checked, send best match to survey for modal population
            if(i === (friendsData.length - 1)) {
                //send the best match (lowest diff) to the html file
                res.json(friendsData[bestMatchIndex]);
            };
        };

        friendsData.push(req.body);
    });
};



//loop through the array of friends
//then on each friend you loop through loop throught the scores
//while looping through compare the differences of the scr and store in an array
//