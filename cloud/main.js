/* The following code uses xmlreader.js, which in turn uses sax.js, to make a connection to the Moutaineers website and
 * obtains the all activity webpages (or just the activities occuring in the future) */

Parse.Cloud.job("UpdateActivities", function (request, status) {
    /* xmlreader is the code used to parse HTML (code can parse both HTML and XML but strict must be set to false in
     * xmlreader.js for HTML) */
    var xmlreader = require("cloud/xmlreader.js");

    // Make connection to 'Activity' class
    var ActivityClass = Parse.Object.extend("ActivityAll");
    var promises = [];  // This variable will hold all of the webpage scraping activity promises
    var orphanedActivities = 0;  // This will keep track of how many activities have lost their way (i.e. webpage)

    // Define listener to handle completion event
    var onCompletionListener = new Parse.Promise();  // Create a trivial resolved promise as a base case
    onCompletionListener.then(function(result) {  // Overall job was successful
        status.success("Activities successfully updated!  " + orphanedActivities
            + " activities have been orphaned (i.e. no longer have working web pages).");
    }, function(error) {  // Overall job failed
        status.error(error.toString());
    });

    /* This function scrapes each individual activity webpage for its GPS coordinates
     * Data is presented in the following format:
     * <span class="latitude">46.8528857</span>
     * <span class="longitude">-121.7603744</span> */
    function scrapeGPSCoord(activityUrl) {
        var html;
        var GPSCoord = [];  // Array that holds GPS coordinates for each activity
        var reStart = /<span class="l/;  // Represents lines with either latitude or longitude
        var reEnd = /<\/span>/;  // Represents end of GPS data
        var reCoord = /(-|\d)/;  // Represents the start of GPS data (i.e. either a "-" or a number)
        var startPosition;
        var endPosition;

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

            // Return GPS coordinates
            return Parse.Promise.as(GPSCoord);
        }, function (httpResponse) {
            // Return Parse error if error is encountered along with the error message
            return Parse.Promise.error(httpResponse.status);
        });
    }

    /* This function assigns the activity keywords based on the provided field.  The second parameter is used to signal
     * that the field is the activity name (special handling required to remove activity type in the name) */
    function getKeywords(field, isActivityName) {
        var _ = require("underscore");  // Require underscore.js

        var toLowerCase = function(w) {
            return w.toLowerCase();
        };

        var keywords = field;
        var ignoreWords = ["the", "in", "and", "to", "of", "at", "for", "from", "a", "an", "s"];  // Words to ignore

        // If this is the activity name field then drop the activity type that's always printed at the beginning
        if (isActivityName) {
            // Special condition would be for cross-country ski trips
            keywords = keywords.replace(/^cross-country/gi, "");  // Remove the initial chunk that has the hyphen
            keywords = keywords.substr(keywords.indexOf("-") + 1);  // Only keep the actual activity name
        }

        keywords = keywords.split(/\b/);  // Split word by borders

        // Filter out only lowercase words that do not match the ignoreWords
        keywords = _.map(keywords, toLowerCase);
        keywords = _.filter(keywords, function(w) {
            return w.match(/^\w+$/) && ! _.contains(ignoreWords, w);
        });

        keywords = _.uniq(keywords);  // Do not allow duplicate keywords

        return keywords;  // Return array of unique qualified keywords
    }

    // This function scrapes each activity webpage and extracts its activities
    function scrapeActivityList(pageNumber) {
        /* This promise is monitored by overallScrapePromise and is added to the promises array.  There is an
         * activityListScrapePromise promise for each of the webpages to be scraped. */
        var activityListScrapePromise = new Parse.Promise();

        // Send request to get the activity webpage
        Parse.Cloud.httpRequest({
            // URL below points to all activities in the future
//            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" +
//                    (pageNumber - 1) * 50
            // All activities in past, present and future
            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" +
                    (pageNumber - 1) * 50 + "&c6:list=1970-01-01&c6:list=9999-12-31"
            // Test range
//            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" +
//                    (pageNumber - 1) * 50 + "&c6:list=2014-03-02&c6:list=9999-12-31"
        }).then(function(httpResponse) {
            var html = httpResponse.text;

            // Use xmlreader to parse HTML code for the first entry and put into the 'Activity' class
            xmlreader.read(html, function (err, doc) {
                var name;
                var activityUrl;
                var regDate;
                var availabilityParticipant;
                var availabilityLeader;
                var desc;
                var difficulty;
                var activityDate;
                var startDate;
                var endDate;
                var leader;
                var keywords = [];
                var gpsPromise;
                var i = -1;

                // There are 50 items on each webpage (except for the last page).  All items start at 0.
                var scrapeNextActivity = function () {
                    i++;

                    if (i < 50) {
                        // Represents the activity that will be saved/updated to/in the backend
                        var activityObj = new ActivityClass();

                        // Clear the name and leader fields (these have to be cleared)
                        name = null;
                        activityUrl = null;
                        regDate = null;
                        availabilityParticipant = null;
                        availabilityLeader = null;
                        desc = null;
                        difficulty = null;
                        activityDate = null;
                        startDate = null;
                        endDate = null;
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
                            regDate = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).DIV.at(0).text().replace("\n", "").trim();

                            // Check to make sure activity has not been canceled
                            if (regDate.toLowerCase() != "canceled") {
                                regDate = regDate.substring(regDate.indexOf(" ", regDate.length - 7) + 1);

                                // Check to see if this is an opening or closing registration date
                                if (regDate.indexOf("open") !== -1) {  // Opening
                                    activityObj.set("registrationStartDate", new Date(regDate));
                                } else {  // Closing
                                    activityObj.set("registrationEndDate", new Date(regDate));
                                }
                            }
                            else {  // Activity has been canceled
                                activityObj.set("isCanceled", true);
                            }

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
                             * corresponds to the availability for participants.  This is not correct, so we first need
                             * to check if the value returned applies to "participant" or "leader". */
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
                                activityDate = doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(2).text();

                                // Prerequisites: /html/body/div[i]/div[2]/div[4]
                                activityObj.set("prereq", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(3).text());
                            }
                            /* Difficulty rating is missing, so Activity Date(s) and Prerequisites are off in position
                             * (shifted one DIV up at last level) */
                            else {
                                activityObj.set("difficulty", "");

                                // Activity date(s): /html/body/div[i]/div[2]/div[2]
                                activityDate = difficulty;  // Use the expected Difficulty value

                                // Prerequisites: /html/body/div[i]/div[2]/div[3]
                                activityObj.set("prereq", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(2).text());
                            }

                            // Extract the dates from the Activity Date String
                            if (activityDate.indexOf("-") > 0) {  // Represents actual date range
                                startDate = activityDate.substring(0, activityDate.indexOf("-") - 1).trim();
                                endDate = activityDate.substring(activityDate.indexOf("-") + 1).trim();
                            }
                            else {  // Single day activity
                                startDate = activityDate;
                                endDate = activityDate;
                            }

                            // Activity start and end dates
                            activityObj.set("activityStartDate", new Date(startDate));
                            activityObj.set("activityEndDate", new Date(endDate));

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
                            if (name === null) {
                                /* Reached the end of activities for this page.  There are less than 50 activities on
                                 * this page (should only occur for last page) */
                                console.log("End of data @ " + ((pageNumber - 1) * 50 + i + 1));

                                // Resolve this promise (end of this promise thread)
                                activityListScrapePromise.resolve("Page " + pageNumber + " complete!");
                            }
                            else {
                            /* Error while scraping data for real activity.  Display the message but continue to finish
                             * the process for this activity.  This is an error on the activity level and not an
                             * overall process error so just continue. */
                                console.error("Error scraping data fields @ " +
                                        ((pageNumber - 1) * 50 + i + 1) + ": " + err.message);
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
                            gpsPromise = Parse.Promise.as();  // Create a trivial resolved promise as a base case
                            gpsPromise = gpsPromise.then(function() {
                                return scrapeGPSCoord(activityUrl);
                            }).then(function(GPSCoord) {
                                // Assign GPS coordinates
                                activityObj.set("startLat", GPSCoord[0] === "" ? undefined : Number(GPSCoord[0]));
                                activityObj.set("startLong", GPSCoord[1] === "" ? undefined : Number(GPSCoord[1]));
                                activityObj.set("endLat", GPSCoord[2] === "" ? undefined : Number(GPSCoord[2]));
                                activityObj.set("endLong", GPSCoord[3] === "" ? undefined : Number(GPSCoord[3]));

                                // Save activity object
                                activityObj.save(null, {
                                    success: function(activityObjSave) {
                                        // Move on to the next activity on this page
                                        if (i < 49) {
                                            scrapeNextActivity();
                                        }
                                        // Save represents the 50th activity on this page
                                        else {  // Scraping of this page complete
                                            // Resolve this promise (end of this promise thread)
                                            activityListScrapePromise.resolve("Page " + pageNumber + " complete!");
                                        }
                                    },
                                    error: function(activityObjSave, error) {  // Error saving activity to Parse class
                                        // Reject this promise and send error
                                        activityListScrapePromise.reject("Failed to create new object.  Error code "
                                                    + error.code + ": " + error.message);
                                    }
                                });
                            }, function (error) {
                                /* If the activity had been removed but still points to a non-existent link, we'll get
                                 * an error.  This information is still saved.  This is an error on the activity
                                 * level and not an overall process error so just continue scraping activities. */
                                console.error("Error code " + error + " for \"" + name + "\": " + activityUrl);
                                orphanedActivities++;

                                // Save activity object
                                activityObj.save(null, {
                                    success: function (activityObjSave) {
                                        // Move on to the next activity on this page
                                        if (i < 49) {
                                            scrapeNextActivity();
                                        }
                                        // Save represents the 50th activity on this page
                                        else {  // Scraping of this page complete
                                            // Resolve this promise (end of this promise thread)
                                            activityListScrapePromise.resolve("Page " + pageNumber + " complete!");
                                        }
                                    },
                                    error: function (activityObjSave, error) {  // Error saving activity to Parse class
                                        // Reject this promise and send error
                                        activityListScrapePromise.reject("Failed to create new object.  Error code "
                                                    + error.code + ": " + error.message);
                                    }
                                });
                            });
                        }
                    }
                };

                scrapeNextActivity();  // This starts off the scraping activity task (i.e. scrapeNextActivity function)
            });
        /* Error handler if webpage does not exist.  This technically should never be encountered because there is
         * always a webpage generated no matter the search starting ID number */
        }, function (error) {
            activityListScrapePromise.reject("Web page request failed with response code " + error.message);
        });

        return activityListScrapePromise;  // Return promise so it can be added to the promises array
    }


    /* The code below is what drives this Cloud Background Job.  The order of events is as follows:
     * 1. Download the first page of results for future events
     * 2. Extract from the webpage response the total number of webpages that make up the entirety of the activities list
     * 3. Add all pages to be scraped into a grouped promise and run scraping tasks for all pages
     * 4. Once all promises have been completed, begin the filter options scraping
     * n. ...
     * n. Send resolve or reject notification to completion handler to report final status and exit
     */

    // Request the first page of results
    Parse.Cloud.httpRequest({
        // All activities in the future
//            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=0"
        // All activities in past, present and future
        url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=0" +
                "&c6:list=1970-01-01&c6:list=9999-12-31"
        // Test range
//            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=0" +
//                    "&c6:list=2014-03-02&c6:list=9999-12-31"
    }).then(function(httpResponse) {
        var html = httpResponse.text;

        // Figure out how many webpages need to be scraped
        // Extract number of webpages that need to be scraped
        var endPosition = html.lastIndexOf("</a>");
        var startPosition = html.lastIndexOf(">", endPosition);
        var totalPages = parseInt(html.substring(startPosition + 1, endPosition));

        // Kick-off tasks to scrape all other activity webpages
        for (i = 1; i <= totalPages; i++) {
            promises.push(scrapeActivityList(i));
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }, function (error) {  // Could not retrieve initial website
        onCompletionListener.reject("Initial web page request failed with response code " + error.message);
    }).then(function() {
        onCompletionListener.resolve();  // Tell the listener all promises were resolved
    }, function (error) {
        onCompletionListener.reject(error);  // Send error through to listener
    });
});