/* The following code uses xmlreader.js, which in turn uses sax.js, to make a connection to the Moutaineers website and
 * obtains the all activity webpages */

Parse.Cloud.job("UpdateActivities", function (request, status) {
    /* xmlreader is the code used to parse HTML (code can parse both HTML and XML but strict must be set to false in
     * xmlreader.js for HTML) */
    var xmlreader = require("cloud/xmlreader.js");

    // Make connection to 'Activity' class
    var ActivityClass = Parse.Object.extend("Activity");
    var activityObj;

    var counter = 0;  // Initialize activity county (blocks of 50 activities)
    var issue = false;  // Flag for issues arising

    var GPSCoord = [];

    // Start by defining a promise that will allow recursive scraping of all activity pages
    var promise = Parse.Promise.as();
    promise = promise.then(function() {
        return scrapeActivityList();
    }).then(function() {
//        // Return job status to Parse.com
//        if (!issue) {
//            status.success("All activities updated!");
//        }
//        else {
//            status.error("Error updating activities.");
//        }
    });

    // This function scrapes each activity webpage listing
    function scrapeActivityList() {
        // Send request to get the first activity webpage
        return Parse.Cloud.httpRequest({
            // URL below points to all activities (not just the ones open for registration) and starts at the item 1
            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" +
                    counter * 50 + "&c16=1"
        }).then(function(httpResponse) {
            // Use xmlreader to parse HTML code for the first entry and put into the 'Activity' class
            xmlreader.read(httpResponse.text, function (err, doc) {
                var name;
                var activityUrl;
                var availabilityParticipant;
                var availabilityLeader;
                var desc;
                var difficulty;
                var leader;
                var keywords = [];
                var newPromise;
                var i = -1;

                // There are 50 items on each webpage (except for the last page).  All items start at 0.
                var completionHandler = function () {
                    i++;

                    if (i < 50) {
                        // Create new entry in the 'Activity' class
                        activityObj = new ActivityClass();

                        // Clear the name and leader fields (these have to be cleared)
                        name = null;
                        leader = null;
                        keywords.length = 0;

                        try {
                            // Name: /html/body/div[i]/div[2]/h3/a
                            name = doc.HTML.BODY.DIV.at(i).DIV.at(1).H3.at(0).A.at(0).text();
                            activityObj.set("name", name);

                            // Webpage Address: HREF at /html/body/div[i]/div[2]/h3/a
                            activityUrl = doc.HTML.BODY.DIV.at(i).DIV.at(1).H3.at(0).A.at(0).attributes().HREF;
                            activityObj.set("activityUrl", activityUrl);

                            // Type: /html/body/div[i]/div[2]/div[1]
                            activityObj.set("type", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(0).text());

                            // Picture: /html/body/div[i]/a/img
                            activityObj.set("imgUrl", doc.HTML.BODY.DIV.at(i).A.at(0).IMG.at(0).attributes().SRC);

                            // Registration information: /html/body/div[i]/div[1]/div[1]/div
                            activityObj.set("regInfo", doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).DIV.at(0).text());

                            // Branch: /html/body/div[i]/div[1]/div[2]
                            activityObj.set("branch", doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(1).text());

                            /* Availability - Participant: /html/body/div[i]/div[1]/div[1]/span/strong or
                                                           /html/body/div[i]/div[1]/div[1]/span[1]/strong */
                            availabilityParticipant = Number(doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(0)
                                    .STRONG.at(0).text());

                            // Get the description text that comes after this number
                            desc = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(0).text();

                            // Check to see if this number represents the waitlist
                            if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                // Make the waitlist number negative
                                availabilityParticipant = -1 * availabilityParticipant;
                            }

                            activityObj.set("availabilityParticipant", availabilityParticipant);

                            /* Availability - Leader: /html/body/div[i]/div[1]/div[1]/span[2]/strong
                             * The leader availability may not apply and therefore not exist, but due to the code in
                             * sax.js, no error is produced.  Instead, the value at the root SPAN is taken, which
                             * corresponds to the availabilty for participants.  This is not correct, so we first need to
                             * check if the value returned applies to "participant" or "leader". */
                            // Get the description text that comes after the expected leader availability
                            desc = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(1).text();

                            // Check to see if this number represents the leader availability
                            if (desc.toLowerCase().indexOf("leader") !== -1) {
                                // This does represent leader availability, so retrieve the number
                                availabilityLeader = Number(doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(1)
                                        .STRONG.at(0).text());

                                // Check to see if this number represents the waitlist
                                if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                    // Make the waitlist number negative
                                    availabilityLeader = -1 * availabilityLeader;
                                }

                                activityObj.set("availabilityLeader", availabilityLeader);
                            }

                            // Difficulty: /html/body/div[i]/div[2]/div[2]
                            difficulty = doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(1).text();

                            // Find out if the difficulty rating for this activity is missing
                            if (difficulty.toLowerCase().indexOf("difficulty") !== -1) {
                                activityObj.set("difficulty", difficulty);

                                // Activity date(s): /html/body/div[i]/div[2]/div[3]
                                activityObj.set("activityDate", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(2).text());

                                // Prerequisites: /html/body/div[i]/div[2]/div[4]
                                activityObj.set("prereq", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(3).text());
                            }
                            /* Difficulty rating is missing, so Activity Date(s) and Prerequisites are off in position
                             * (shifted one DIV up at last level) */
                            else {
                                activityObj.set("difficulty", "");

                                // Activity date(s): /html/body/div[i]/div[2]/div[2]
                                activityObj.set("activityDate", difficulty);  // Use the expected Difficulty value

                                // Prerequisites: /html/body/div[i]/div[2]/div[3]
                                activityObj.set("prereq", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(2).text());
                            }

//                            /* Leader: /html/body/div[i]/div[1]/div[3]/a
//                             * The webpage often withholds the leader information so don't expect it */
//                            leader = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(2).A.at(0).text();
//                            activityObj.set("leader", leader);
//
//                            // Qualified Youth Leader: /html/body/div[i]/div[1]/div[3]/div/em
//                            activityObj.set("qualYouthLeader", doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(2).DIV.at(0).EM
//                                    .at(0).text());
                        }
                        /* This error handler catches any attempt to read an entry beyond those that exist on this page
                         * or any failed attempt at obtaining data that does not exist for the given activity */
                        catch (err) {
                            // Show the activity name where the error occurred
                            if (!activityObj.has("name")) {
                                console.log("End of data @ " + (counter * 50 + i + 1));
                            }
                            else {
                                console.error("Error scraping data @ " + (counter * 50 + i + 1) + ": " + err.message);
                            }
                        }

                        /* Scrape GPS coords and save activity only if it is valid (invalid entry would be the first
                         * null entry on last page of results) */
                        if (name !== null) {
                            // Get keywords from activity name field
                            keywords = getKeywords(name, true);

                            // Get keywords from leader field only if there is a leader value
                            if (leader !== null) {
                                keywords.concat(getKeywords(leader, false));
                            }

                            activityObj.set("keywords", keywords);  // Keywords for search

                            // GPS Coordinates
                            newPromise = Parse.Promise.as();
                            newPromise = newPromise.then(function() {
                                return scrapeGPSCoord(activityUrl);
                            }).then(function() {
                                activityObj.set("startLat", Number(GPSCoord[0]));
                                activityObj.set("startLong", Number(GPSCoord[1]));
                                activityObj.set("endLat", Number(GPSCoord[2]));
                                activityObj.set("endLong", Number(GPSCoord[3]));

                                // Save activity object
                                activityObj.save(null, {
                                    success: function (activityObj) {
                                        // Move on to the next activity on this page
                                        if (i < 49) {
                                            completionHandler();
                                        }
                                        // Save represents the 50th activity on this page - move on to the next page
                                        else {
                                            // Check for more pages
                                            if (!issue) {
                                                counter++;
                                                return scrapeActivityList();
                                            }
                                        }
                                    },
                                    error: function (activityObj, error) {  // Error saving activity to Parse class
                                        console.error("Failed to create new object, with error code: " + error.message);
                                        return Parse.Promise.error("Failed to create new object, with error code: " +
                                                error.message);
                                        issue = true;
                                    }
                                });
                            });
                        }
                    }
                }

                completionHandler();
            });
        /* Error handler if webpage does not exist.  This technically should never be encountered because there is
         * always a webpage generated no matter the search starting ID number */
        }, function (error) {
            issue = true;
            return Parse.Promise.error("Request failed with response code " + error.message);
        });
    }

    /* This function scrapes each individual activity webpage for GPS coordinates
     * Data is presented in the following format:
     * <span class="latitude">46.8528857</span>
     * <span class="longitude">-121.7603744</span> */
    function scrapeGPSCoord(activityUrl) {
        var html;
        var reStart = /<span class="l/;  // Represents lines with either latitude or longitude
        var reEnd = /<\/span>/;  // Represents end of GPS data
        var reCoord = /(-|\d)/;  // Represents the start of GPS data (i.e. either a "-" or a number)
        var startPosition = 0;
        var endPosition = 0;

        GPSCoord.length = 0;  // Clear GPS coord array

        // Send request to get the first activity webpage
        return Parse.Cloud.httpRequest({
            // URL below points to all activities (not just the ones open for registration) and starts at the item 1
            url: activityUrl
        }).then(function(httpResponse) {
            html = httpResponse.text;  // Make a copy of the webpage HTML text

            for (var i = 0; i < 4; i++) {
                // Scrape 2 sets of latitude and longitude data
                startPosition = html.search(reStart);  // Find start of GPS coordinate data
                // Truncate string to the beginning of our data of interest (i.e. <span class="l)
                html = html.substr(startPosition);
                html = html.substr(html.search(reCoord));  // Truncate to start of numbers
                endPosition = html.search(reEnd);  // Find position marking the end of numbers (i.e. </span>)
                GPSCoord.push(html.substr(0, endPosition));  // Add data to GPS coordinate array
            }
        }, function (error) {
            issue = true;
            console.error("Request failed with response code " + error.message);
            return Parse.Promise.error("Request failed with response code " + error.message);
        });
    }

    /* This function assigns the activity keywords based on the provided field.
     * The second parameter is used to signal that the field is the activity name (special handling required) */
    function getKeywords(field, isActivityName) {
        var _ = require("underscore");  // Require underscore.js

        var toLowerCase = function(w) {
            return w.toLowerCase();
        };

        var keywords = field;
        var ignoreWords = ["the", "in", "and", "to", "from", "a", "an"]  // Words to ignore

        // If this is the activity name field then drop the activity type that's always printed at the beginning
        if (isActivityName) {
            keywords = keywords.substr(keywords.indexOf("-") + 1);
        }

        keywords = keywords.split(/\b/);  // Split word by borders

        // Filter out only lowercase words that do not match the ignoreWords
        keywords = _.map(keywords, toLowerCase);
        keywords = _.filter(keywords, function(w) {
            return w.match(/^\w+$/) && ! _.contains(ignoreWords, w);
        });

        keywords = _.uniq(keywords);  // Do not allow duplicate keywords

        return keywords;
    };
});