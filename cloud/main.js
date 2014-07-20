/* The following code uses xmlreader.js, which in turn uses sax.js, to make a connection to the Moutaineers website and
   obtains the all activity webpages */

Parse.Cloud.job("UpdateActivities", function (request, status) {
    /* xmlreader is the code used to parse HTML (code can parse both HTML and XML but strict must be set to false in
       xmlreader.js for HTML) */
    var xmlreader = require("cloud/xmlreader.js");

    var counter = 0;  // Initialize activity county (blocks of 50 activities)
    var issue = false;  // Flag for issues arising
    var EOA = false;  // Flag to mark reaching end of activities

    while (!EOA) {
        // Send request to get the first activity webpage
        console.log(counter + EOA);
        Parse.Cloud.httpRequest({
            // URL below points to all activities (not just the ones open for registration) and starts at the item 1
            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" + counter * 50 + "&c16=1",
            success: function (httpResponse) {
                // Make connection to 'Activity' class
                var ActivityClass = Parse.Object.extend("Activity");
                console.log(counter + EOA);

                // Use xmlreader to parse HTML code for the first entry and put into the 'Activity' class
                xmlreader.read(httpResponse.text, function (err, doc) {
                    var activityObj;
                    var difficulty;
                    var availabilityParticipant;
                    var availabilityLeader;
                    var desc;

                    // There are 50 items on each webpage (except for the last page)
                    for (var i = 0; i < 50; i++) {
                        // Create new entry in the 'Activity' class
                        activityObj = new ActivityClass();

                        try {
                            // Name: /html/body/div[i]/div[2]/h3/a
                            activityObj.set("name", doc.HTML.BODY.DIV.at(i).DIV.at(1).H3.at(0).A.at(0).text());

                            // Webpage Address: HREF at /html/body/div[i]/div[2]/h3/a
                            activityObj.set("address", doc.HTML.BODY.DIV.at(i).DIV.at(1).H3.at(0).A.at(0).attributes()
                                    .HREF);

                            // Type: /html/body/div[i]/div[2]/div[1]
                            activityObj.set("type", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(0).text());

                            // Picture: /html/body/div[i]/a/img

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
                            else {  // Difficulty rating is missing, so Activity Date(s) and Prerequisites are off
                                // Activity date(s): /html/body/div[i]/div[2]/div[2]
                                activityObj.set("activityDate", difficulty);  // Use the expected Difficulty value

                                // Prerequisites: /html/body/div[i]/div[2]/div[3]
                                activityObj.set("prereq", doc.HTML.BODY.DIV.at(i).DIV.at(1).DIV.at(2).text());
                            }

                            // Registration information: /html/body/div[i]/div[1]/div[1]/div
                            activityObj.set("regInfo", doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).DIV.at(0).text());

                            // Branch: /html/body/div[i]/div[1]/div[2]
                            activityObj.set("branch", doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(1).text());

                            /* Availability - Participant: /html/body/div[i]/div[1]/div[1]/span/strong or
                                                           /html/body/div[i]/div[1]/div[1]/span[1]/strong */
                            availabilityParticipant = Number(doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(0).STRONG
                                    .at(0).text());

                            // Get the description text that comes after this number
                            desc = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(0).text();

                            // Check to see if this number represents the waitlist
                            if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                // Make the waitlist number negative
                                availabilityParticipant = -1 * availabilityParticipant;
                            }

                            activityObj.set("availabilityParticipant", availabilityParticipant);

                            /* Availability - Leader: /html/body/div[i]/div[1]/div[1]/span[2]/strong
                               The leader availability may not apply and therefore not exist, but due to the code in sax.js,
                               no error is produced.  Instead, the value at the root SPAN is taken, which corresponds to the
                               availabilty for participants.  This is not correct, so we first need to check if the value
                               returned applies to "participant" or "leader".*/
                            // Get the description text that comes after the expected leader availability
                            desc = doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(1).text();

                            // Check to see if this number represents the leader availability
                            if (desc.toLowerCase().indexOf("leader") !== -1) {
                                // This does represent leader availability, so retrieve the number
                                availabilityLeader = Number(doc.HTML.BODY.DIV.at(i).DIV.at(0).DIV.at(0).SPAN.at(1).STRONG
                                        .at(0).text());

                                // Check to see if this number represents the waitlist
                                if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                    // Make the waitlist number negative
                                    availabilityLeader = -1 * availabilityLeader;
                                }

                                activityObj.set("availabilityLeader", availabilityLeader);
                            }

                            // GPS Coordinates???
                        }
                        catch (err) {
                            // Show the activity name where the error occurred
                            console.error("Error scraping data: " + err.message);
                            issue = true;
                            i = 50;
                        }

                        // Save activity only if it is valid (invalid entry would be the first null entry on last page)
                        if (activityObj.has("name")) {
                            // Save activity object
                            activityObj.save(null, {
                                success: function (activityObj) {},
                                error: function (activityObj, error) {
                                    console.error("Failed to create new object, with error code: " + error.message);
                                    issue = true;
                                }
                            });
                        }
                    }
                });
            },
            error: function (httpResponse) {
                console.error("Request failed with response code " + httpResponse.status);
                issue = true;
            }
        });

        counter++;

        if (counter == 8) {
            EOA = true;
        }
    }

//    // Return job status to Parse.com
//    if (!issue) {
//        Status.success("All activities updated!");
//    }
//    else {
//        Status.error("Error updating activities.");
//    }
});