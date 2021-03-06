/* The following code uses xmlreader.js, which in turn uses sax.js, to make a connection to the Moutaineers website and
 * obtains the all activity webpages (or just the activities occuring in the future) */

Parse.Cloud.job("UpdateActivities", function (request, status) {
    /* xmlreader is the code used to parse HTML (code can parse both HTML and XML but strict must be set to false in
     * xmlreader.js for HTML) */
    var xmlreader = require("cloud/xmlreader.js");

    var ActivityClass = Parse.Object.extend("Activity");  // Make connection to 'Activity' class
    var promises = [];  // This variable will hold all of the webpage scraping activity promises
    var orphanedActivities = 0;  // This will keep track of how many activities have lost their way (i.e. webpage)
    var newActivities = 0;  // Counter for new activities added
    var updatedActivities = 0;  // Counter for updated existing activities
    var trueCounter = 0;  // Keeps track of the number of filter criteria set to true
    var falseCounter = 0;  // Keeps track of the number of filter criteria set to false
    var totalActivities = 0;  // Keeps track of all activities reviewed for changed content (excluded filter criteria)
    var totalFilteredActivities = 0;  // Keeps track of all activities reviewed for changed filter criteria

    /* Tells the date used in the Parse query if all activities should be considered (must correspond to the dateRange
     * variable below) */
//    var dateAll = true;
//    var dateRange = "&c6:list=1970-01-01&c6:list=9999-12-31";  // All activities
    var dateAll = false;
    var dateRange = "&c6:list=" + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" +
            new Date().getDate() +"&c6:list=9999-12-31";  // All activities in the future (including today in UTC)
//    var dateRange = "&c6:list=2014-06-01&c6:list=2014-08-01";  // Custom range

    // Filter category variables
    var filterCriteria = [
        "isAdventureClub",
        "isAvalancheSafety",
        "isBackpacking",
        "isClimbing",
        "isDayHiking",
        "isExplorers",
        "isExploringNature",
        "isFirstAid",
        "isGlobalAdventures",
        "isMountainWorkshop",
        "isNavigation",
        "isOutdoorLeadership",
        "isPhotography",
        "isSailing",
        "isScrambling",
        "isSeaKayaking",
        "isSkiingSnowboarding",
        "isSnowshoeing",
        "isStandUpPaddling",
        "isStewardship",
        "isTrailRunning",
        "isUrbanAdventure",
        "isYouthType",
        "isForBeginners",
        "isEasy",
        "isModerate",
        "isChallenging",
        "isAdults",
        "isFamilies",
        "isRetiredRovers",
        "isSingles",
        "is2030Somethings",
        "isYouth",
        "isTheMountaineers",
        "isBellingham",
        "isEverett",
        "isFoothills",
        "isKitsap",
        "isOlympia",
        "isOutdoorCenters",
        "isSeattle",
        "isTacoma",
        "isBasicAlpine",
        "isIntermediateAlpine",
        "isBoulder",
        "isAidClimb",
        "isRockClimb",
        "isWaterIce",
        "isCrosscountry",
        "isBackcountry",
        "isGlacier",
        "isBeginner",
        "isBasic",
        "isIntermediate"
    ];

    var filterBaseUrl = [
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Adventure+Club&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Avalanche+Safety&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Backpacking&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Climbing&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Day+Hiking&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Explorers&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Exploring+Nature&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=First+Aid&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Global+Adventures&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Mountain+Workshop&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Navigation&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Outdoor+Leadership&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Photography&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Sailing&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Scrambling&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Sea+Kayaking&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Skiing/Snowboarding&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Snowshoeing&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Stand+Up+Paddling&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Stewardship&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Trail+Running&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Urban+Adventure&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c4=Youth&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c15=For+Beginners+(Getting+Started+Series)&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c15=Easy&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c15=Moderate&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c15=Challenging&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=Adults&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=Families&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=Retired+Rovers&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=Singles&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=20-30+Somethings&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c5=Youth&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=The+Mountaineers&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Bellingham&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Everett&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Foothills&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Kitsap&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Olympia&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Outdoor+Centers&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Seattle&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c8=Tacoma&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Basic+Alpine&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Intermediate+Alpine&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Boulder&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Aid+Climb&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Rock+Climb&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c7=Water+Ice&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c9=Cross-country&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c9=Backcountry&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c9=Glacier&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c10=Beginner&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c10=Basic&b_start=",
        "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?c10=Intermediate&b_start="
    ];

    var filterTotalPages = new Array(filterCriteria.length);
    var filteredURLs = [];

    // Define listener to handle completion event
    var onCompletionListener = new Parse.Promise();  // Create a trivial resolved promise as a base case
    onCompletionListener.then(function() {  // Overall job was successful
        status.success("A total of " + totalActivities + " activities were reviewed: " + newActivities +
                " activities added and " + updatedActivities + " activities updated.  A total of " +
                totalFilteredActivities + " filter criteria were reviewed: " + trueCounter +
                " filter criteria set to true and " + falseCounter + " filter criteria set to false.  " +
                orphanedActivities + " activities have been orphaned (i.e. no longer have working web pages).");
    }, function(error) {  // Overall job failed
        status.error(error.toString());
    });

    /* This function scrapes each individual activity webpage for its GPS coordinates
     * Data is presented in the following format:
     * <span class="latitude">46.8528857</span>
     * <span class="longitude">-121.7603744</span> */
    function scrapeAdditionalInfo(activityUrl) {
        var html;
        var additionalInfo = [];  // Array that holds GPS coordinates for each activity
        // Represents the next HTML line after the leader name
        var leaderApproxPosition = "Primary Leader";
        var leaderStart = "<div>";  // Represents the end of the leader name
        var leaderEnd = "</div>";  // Represents the end of the leader name
        var gpsStart = /<span class="l/;  // Represents lines with either latitude or longitude
        var gpsEnd = /<\/span>/;  // Represents end of GPS data
        var gpsCoord = /(-|\d)/;  // Represents the start of GPS data (i.e. either a "-" or a number)
        var startPosition;
        var endPosition;
        var approxPosition;
        var tempStr;

        // Send request to get the first activity webpage
        return Parse.Cloud.httpRequest({
            // URL below points to all activities (not just the ones open for registration) and starts at the item 1
            url: activityUrl,
            headers: {
                'User-Agent' : "Mountaineers App Back-End"
            }
        }).then(function(httpResponse) {
            html = httpResponse.text;  // Make a copy of the webpage HTML text

            // Leader information
            approxPosition = html.search(leaderApproxPosition);  // Find approximate location of the leader data
            endPosition = html.lastIndexOf(leaderEnd, approxPosition);
            startPosition = html.lastIndexOf(leaderStart, endPosition) + 5;
            additionalInfo.push(html.substring(startPosition, endPosition));  // Leader name

            // Qualified Youth Leader
            tempStr = html.substr(approxPosition, 120);  // Examine the line after the "Primary Leader" designation
            if (tempStr.search("Qualified Youth Leader") !== -1) {  // Look for Qualified Youth Leader designation
                additionalInfo.push(true);  // Found
            }
            else {  // Not found
                additionalInfo.push(false);
            }

            // GPS coordinates
            for (var i = 0; i < 4; i++) {
                // Scrape 2 sets of latitude and longitude data
                startPosition = html.search(gpsStart);  // Find start of GPS coordinate data
                // Truncate string to the beginning of our data of interest (i.e. <span class="l)
                html = html.substr(startPosition);
                html = html.substr(html.search(gpsCoord));  // Truncate to start of numbers
                endPosition = html.search(gpsEnd);  // Find position marking the end of numbers (i.e. </span>)
                additionalInfo.push(html.substr(0, endPosition));  // Add data to GPS coordinate array
            }

            // Return GPS coordinates
            return Parse.Promise.as(additionalInfo);
        }, function(httpResponse) {
            // Return Parse error if error is encountered
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

    /* This function compares two sets of keywords and determines if the first set is contained within the second.  Both
     * sets of keywords are in lower case. The number of keywords matched is returned. */
    function compareKeywords(curKeywords, prevKeywords) {
        var _ = require("underscore");  // Require underscore.js

        // Filter which current keywords are contained within the previous keywords
        var commonKeywords = _.filter(curKeywords, function(w) {
            return _.contains(prevKeywords, w);
        });

        return commonKeywords.length;  // Return number of common keywords
    }

    // This function scrapes each activity webpage and extracts its activities
    function scrapeActivityList(pageNumber) {
        /* This promise is monitored by overallScrapePromise and is added to the promises array.  There is an
         * activityListScrapePromise promise for each of the webpages to be scraped. */
        var activityListScrapePromise = new Parse.Promise();

        // Send request to get the activity webpage
        Parse.Cloud.httpRequest({
            url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=" +
                    (pageNumber - 1) * 50 + dateRange,
            headers: {
                'User-Agent' : "Mountaineers App Back-End"
            }
        }).then(function(httpResponse) {
            var html = httpResponse.text;

            // Use xmlreader to parse HTML code for the first entry and put into the 'Activity' class
            xmlreader.read(html, function (err, doc) {
                var activityUrl;
                var name;
                var type;
                var imageURL;
                var branch;
                var regInfo;
                var regDate;
                var availabilityParticipant;
                var availabilityLeader;
                var desc;
                var difficulty;
                var activityDate;
                var prereq;
                var startDate;
                var endDate;
                var leader;
                var isQYL;
                var keywords = [];
                var previousKeywords = [];
                var additionalInfoPromise;
                var exists;
                var keywordMatch;
                var i = -1;

                // There are 50 items on each webpage (except for the last page).  All items start at 0.
                var scrapeNextActivity = function () {
                    i++;

                    if (i < 50) {
                        // Represents the activity that will be saved/updated to/in the backend
                        var activityObj = new ActivityClass();
                        var query;

                        // Clear the fields so that the information is not used incorrectly for the next activity
                        activityUrl = null;
                        name = null;
                        type = null;
                        imageURL = null;
                        branch = null;
                        regInfo = null;
                        regDate = null;
                        availabilityParticipant = null;
                        availabilityLeader = null;
                        desc = null;
                        difficulty = null;
                        activityDate = null;
                        prereq = null;
                        startDate = null;
                        endDate = null;
                        leader = null;
                        keywords.length = 0;
                        previousKeywords.length = 0;
                        exists = false;
                        keywordMatch = false;

                        try {
                            // Webpage Address: HREF at /html/body/div[i]/div[2]/h3/a
                            activityUrl = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).H3.at(0).A.at(0).attributes().HREF;
                        }
                        catch (err) {
                            /* Reached the end of activities for this page.  There are less than 50 activities on
                             * this page (should only occur for last page) */
                            totalActivities = (pageNumber - 1) * 50 + i;

                            // Resolve this promise (end of this promise thread)
                            activityListScrapePromise.resolve("Page " + pageNumber + " complete!");

                            i = 50;  // Force out of the "loop" early
                        }

                        // If not at the end of the results
                        if (activityUrl !== null) {
                            // Check to see if this activity URL already exists
                            query = new Parse.Query(ActivityClass);  // Create new query
                            // ... where the object corresponds to one of the filtered activity URLs
                            query.equalTo("activityUrl", activityUrl);

                            // Launch query and retrieve object matching the specified query
                            query.first().then(function (object) {  // Previous activity found
                                // Check if a duplicate activity was found
                                if (typeof object !== "undefined") {  // Duplicate found so use this existing object
                                    // Use the existing activity object
                                    activityObj = object;
                                    exists = true;
                                }

                                return Parse.Promise.as();
                            }, function (error) {  // Query was not able to run
                                console.log("Not able to check if activity is duplicate");
                                return Parse.Promise.error("Not able to check if activity is duplicate");
                            }).then(function () {
                                try {
                                    if (activityUrl !== activityObj.get("activityUrl")) {
                                        activityObj.set("activityUrl", activityUrl);
                                    }

                                    // Name: /html/body/div[i]/div[2]/h3/a
                                    name = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).H3.at(0).A.at(0).text();
                                    if (name !== activityObj.get("name")) {
                                        activityObj.set("name", name);
                                    }

                                    // Type: /html/body/div[i]/div[2]/div[1]
                                    type = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).DIV.at(0).text();
                                    if (type !== activityObj.get("type")) {
                                        activityObj.set("type", type);
                                    }

                                    // Picture: /html/body/div[i]/a/img
                                    imageURL = doc.HTML.BODY.DIV.at(i + 1).A.at(0).IMG.at(0).attributes().SRC;
                                    if (imageURL !== activityObj.get("imgUrl")) {
                                        activityObj.set("imgUrl", imageURL);
                                    }

                                    // Branch: /html/body/div[i]/div[1]/div[2]
                                    branch = doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(1).text();
                                    if (branch !== activityObj.get("branch")) {
                                        activityObj.set("branch", branch);
                                    }

                                    /* Availability - Participant: /html/body/div[i]/div[1]/div[1]/span/strong or
                                     /html/body/div[i]/div[1]/div[1]/span[1]/strong */
                                    availabilityParticipant = Number(doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(0)
                                            .SPAN.at(0).STRONG.at(0).text());

                                    // Get the description text that comes after this number
                                    desc = doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(0).SPAN.at(0).text();

                                    // Check to see if this number represents the waitlist
                                    if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                        // Make the waitlist number negative
                                        availabilityParticipant = -1 * availabilityParticipant;
                                    }

                                    if (availabilityParticipant !== activityObj.get("availabilityParticipant")) {
                                        activityObj.set("availabilityParticipant", availabilityParticipant);
                                    }

                                    /* Availability - Leader: /html/body/div[i]/div[1]/div[1]/span[2]/strong
                                     * The leader availability may not apply and therefore not exist, but due to the code in
                                     * sax.js, no error is produced.  Instead, the value at the root SPAN is taken, which
                                     * corresponds to the availability for participants.  This is not correct, so we first need
                                     * to check if the value returned applies to "participant" or "leader". */
                                    // Get the description text that comes after the expected leader availability
                                    desc = doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(0).SPAN.at(1).text();

                                    // Check to see if this number represents the leader availability
                                    if (desc.toLowerCase().indexOf("leader") !== -1) {
                                        // This does represent leader availability, so retrieve the number
                                        availabilityLeader = Number(doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(0).SPAN
                                                    .at(1).STRONG.at(0).text());

                                        // Check to see if this number represents the waitlist
                                        if (desc.toLowerCase().indexOf("waitlist") !== -1) {
                                            // Make the waitlist number negative
                                            availabilityLeader = -1 * availabilityLeader;
                                        }


                                        if (availabilityLeader !== activityObj.get("availabilityLeader")) {
                                            activityObj.set("availabilityLeader", availabilityLeader);
                                        }
                                    }

                                    // Difficulty: /html/body/div[i]/div[2]/div[2]
                                    difficulty = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).DIV.at(1).text();

                                    // Find out if the difficulty rating for this activity is missing
                                    if (difficulty.toLowerCase().indexOf("difficulty") !== -1) {
                                        if (difficulty !== activityObj.get("difficulty")) {
                                            activityObj.set("difficulty", difficulty);
                                        }

                                        // Activity date(s): /html/body/div[i]/div[2]/div[3]
                                        activityDate = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).DIV.at(2).text();

                                        // Prerequisites: /html/body/div[i]/div[2]/div[4]
                                        prereq = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).DIV.at(3).text();
                                        if (prereq !== activityObj.get("prereq")) {
                                            activityObj.set("prereq", prereq);
                                        }

                                    }
                                    /* Difficulty rating is missing, so Activity Date(s) and Prerequisites are off in position
                                     * (shifted one DIV up at last level) */
                                    else {
                                        if (activityObj.get("difficulty") !== "") {
                                            activityObj.set("difficulty", "");
                                        }

                                        // Activity date(s): /html/body/div[i]/div[2]/div[2]
                                        activityDate = difficulty;  // Use the expected Difficulty value

                                        // Prerequisites: /html/body/div[i]/div[2]/div[3]
                                        prereq = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).DIV.at(2).text();
                                        if (prereq !== activityObj.get("prereq")) {
                                            activityObj.set("prereq", prereq);
                                        }
                                    }

                                    // Extract the dates from the Activity Date String
                                    if (activityDate.indexOf("-") > 0) {  // Represents actual date range
                                        startDate = new Date(activityDate.substring(0, activityDate.indexOf("-") - 1)
                                                    .trim());
                                        endDate = new Date(activityDate.substring(activityDate.indexOf("-") + 1).trim());
                                    }
                                    else {  // Single day activity
                                        startDate = new Date(activityDate);
                                        endDate = new Date(activityDate);
                                    }

                                    // Activity start and end dates
                                    // Check if the backend has a date set
                                    if (typeof activityObj.get("activityStartDate") !== "undefined") {  // No date
                                        // Check if the dates match - if not, save the new date
                                        if (startDate.getTime() !== activityObj.get("activityStartDate").getTime()) {
                                            activityObj.set("activityStartDate", startDate);
                                        }
                                    }
                                    else {  // No date in backend - save the new date
                                        activityObj.set("activityStartDate", startDate);
                                    }

                                    // Check if the backend has a date set
                                    if (typeof activityObj.get("activityEndDate") !== "undefined") {  // No date
                                        // Check if the dates match - if not, save the new date
                                        if (endDate.getTime() !== activityObj.get("activityEndDate").getTime()) {
                                            activityObj.set("activityEndDate", endDate);
                                        }
                                    }
                                    else {  // No date in backend - save the new date
                                        activityObj.set("activityEndDate", endDate);
                                    }

                                    // Registration information: /html/body/div[i]/div[1]/div[1]/div
                                    regInfo = doc.HTML.BODY.DIV.at(i + 1).DIV.at(0).DIV.at(0).DIV.at(0).text()
                                                .replace("\n", "").trim();

                                    // Check to make sure activity has not been canceled
                                    if (regInfo.toLowerCase() != "canceled") {
                                        // Get the date portion of the registration info string
                                        regDate = regInfo.substring(regInfo.indexOf(" ", regInfo.length - 7) + 1);

                                        // Get the registration date as a Date object
                                        regDate = new Date(regDate);

                                        // Assign year to regDate since none is provided
                                        if (regDate.getMonth() > startDate.getMonth()) {  // Happened in the previous year
                                            // Set as previous year relative to startDate
                                            regDate.setFullYear(startDate.getFullYear() - 1);
                                        }
                                        else {  // Happened earlier in the year or in the same month - assume same year
                                            regDate.setFullYear(startDate.getFullYear());  // Set as startDate's year
                                        }

                                        // Check to see if this is an opening or closing registration date
                                        if (regInfo.toLowerCase().indexOf("open") !== -1) {  // Opening
                                            // Check if the backend has a date set
                                            if (typeof activityObj.get("registrationOpenDate") !== "undefined") {  // No date
                                                // Check if the dates match - if not, save the new date
                                                if (regDate.getTime() !== activityObj.get("registrationOpenDate")
                                                        .getTime()) {
                                                    activityObj.set("registrationOpenDate", regDate);
                                                }
                                            }
                                            else {  // No date in backend - save the new date
                                                activityObj.set("registrationOpenDate", regDate);
                                            }
                                        }
                                        else {  // Closing
                                            // Check if the backend has a date set
                                            if (typeof activityObj.get("registrationCloseDate") !== "undefined") {  // No date
                                                // Check if the dates match - if not, save the new date
                                                if (regDate.getTime() !== activityObj.get("registrationCloseDate")
                                                        .getTime()) {
                                                    activityObj.set("registrationCloseDate", regDate);
                                                }
                                            }
                                            else {  // No date in backend - save the new date
                                                activityObj.set("registrationCloseDate", regDate);
                                            }
                                        }

                                        if (activityObj.get("isCanceled") === true) {
                                            activityObj.set("isCanceled", false);
                                        }
                                    }
                                    else {  // Activity has been canceled
                                        if (activityObj.get("isCanceled") !== true) {
                                            activityObj.set("isCanceled", true);
                                        }
                                    }
                                }
                                catch (err) {
                                    /* Error while scraping data for real activity.  Display the message but continue to
                                     * finish the process for this activity.  This is an error on the activity level and not
                                     * an overall process error so just continue. */
                                    console.error("Error scraping data fields @ " +
                                        ((pageNumber - 1) * 50 + i + 1) + ": " + err.message);
                                }

                                /* Scrape GPS coords and save activity only if it is valid (invalid entry would be the first
                                 * null entry on last page of results) */
                                // Get keywords from activity name field
                                keywords = getKeywords(name, true);

                                // GPS Coordinates
                                // Create a trivial resolved promise as a base case
                                additionalInfoPromise = Parse.Promise.as();
                                additionalInfoPromise = additionalInfoPromise.then(function () {
                                    return scrapeAdditionalInfo(activityUrl);
                                }).then(function (additionalInfo) {
                                    // Leader information
                                    leader = additionalInfo[0];
                                    if (leader !== activityObj.get("leader")) {
                                        activityObj.set("leader", leader);
                                    }
                                    if (additionalInfo[1] !== activityObj.get("isQYL")) {
                                        activityObj.set("isQYL", additionalInfo[1]);
                                    }

                                    // Assign GPS coordinates
                                    if (activityObj.get("startLat") !== (additionalInfo[2] === "" ? undefined :
                                        Number(additionalInfo[2]))) {
                                        activityObj.set("startLat", additionalInfo[2] === "" ? undefined :
                                            Number(additionalInfo[2]));
                                    }
                                    if (activityObj.get("startLong") !== (additionalInfo[3] === "" ? undefined :
                                        Number(additionalInfo[3]))) {
                                        activityObj.set("startLong", additionalInfo[3] === "" ? undefined :
                                            Number(additionalInfo[3]));
                                    }
                                    if (activityObj.get("endLat") !== (additionalInfo[4] === "" ? undefined :
                                        Number(additionalInfo[4]))) {
                                        activityObj.set("endLat", additionalInfo[4] === "" ? undefined :
                                            Number(additionalInfo[4]));
                                    }
                                    if (activityObj.get("endLong") !== (additionalInfo[5] === "" ? undefined :
                                        Number(additionalInfo[5]))) {
                                        activityObj.set("endLong", additionalInfo[5] === "" ? undefined :
                                            Number(additionalInfo[5]));
                                    }

                                    // Get keywords from leader field only if there is a leader value
                                    if (leader !== null) {
                                        keywords = keywords.concat(getKeywords(leader, false));
                                    }

                                    // Check if the keywords were previously defined
                                    if (typeof activityObj.get("keywords") !== "undefined") {  // Previously defined
                                        // Get the previous keywords
                                        previousKeywords = activityObj.get("keywords");

                                        // Compare the string array lengths
                                        if (keywords.length === previousKeywords.length) {  // Same length
                                            /* Go through the words and make compare the two sets (will be in the same
                                             * order if they're the same) */
                                            for (var j = 0; j < keywords.length; j++) {
                                                if (keywords[j] !== previousKeywords[j]) {
                                                    activityObj.set("keywords", keywords);  // Keywords for search
                                                    break;
                                                }
                                            }
                                        }
                                        else {  // Different length
                                            activityObj.set("keywords", keywords);  // Keywords for search
                                        }
                                    }
                                    else {  // Not previously defined
                                        activityObj.set("keywords", keywords);  // Keywords for search
                                    }

                                    // Check if any field have changed if it is an existing entry
                                    if (activityObj.dirtyKeys().length !== 0) {  // Fields have changed
                                        // Save activity object
                                        activityObj.save(null, {
                                            success: function (activityObjSave) {
                                                // Update activity counters
                                                if (!exists) {
                                                    newActivities++;
                                                }
                                                else {
                                                    updatedActivities++;
                                                }

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
                                            // Error saving activity to Parse class
                                            error: function (activityObjSave, error) {
                                                // Reject this promise and send error
                                                activityListScrapePromise.reject("Failed to create new object.  Error code "
                                                    + error.code + ": " + error.message);
                                            }
                                        });
                                    }
                                    else {  // No fields have changed so don't save it to the backend
                                        // Move on to the next activity on this page
                                        if (i < 49) {
                                            scrapeNextActivity();
                                        }
                                        // Save represents the 50th activity on this page
                                        else {  // Scraping of this page complete
                                            // Resolve this promise (end of this promise thread)
                                            activityListScrapePromise.resolve("Page " + pageNumber + " complete!");
                                        }
                                    }
                                }, function (error) {
                                    /* If the activity had been removed but still points to a non-existent link, we'll
                                     * get an error.  This information is still saved.  This is an error on the activity
                                     * level and not an overall process error so just continue scraping activities. */
                                    console.error("Error code " + error + " for \"" + name + "\": " + activityUrl);
                                    orphanedActivities++;

                                    // Check if the keywords were previously defined
                                    if (typeof activityObj.get("keywords") !== "undefined") {  // Previously defined
                                        // Get the previous keywords
                                        previousKeywords = activityObj.get("keywords");

                                        // Determine if all keywords are contained within previous keywords
                                        if (keywords.length !== compareKeywords(keywords, previousKeywords)) {
                                            // Keywords are not all contained
                                            activityObj.set("keywords", keywords);  // Assign new keywords
                                        }
                                    }
                                    else {  // Not previously defined
                                        activityObj.set("keywords", keywords);  // Keywords for search
                                    }

                                    // Check if any field have changed if it is an existing entry
                                    if (activityObj.dirtyKeys().length !== 0) {  // Fields have changed
                                        // Save activity object
                                        activityObj.save(null, {
                                            success: function (activityObjSave) {
                                                // Update activity counters
                                                if (!exists) {
                                                    newActivities++;
                                                }
                                                else {
                                                    updatedActivities++;
                                                }

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
                                            // Error saving activity to Parse class
                                            error: function (activityObjSave, error) {
                                                // Reject this promise and send error
                                                activityListScrapePromise.reject("Failed to create new object.  Error code "
                                                    + error.code + ": " + error.message);
                                            }
                                        });
                                    }
                                    else {  // No fields have changed so don't save it to the backend
                                        // Move on to the next activity on this page
                                        if (i < 49) {
                                            scrapeNextActivity();
                                        }
                                        // Save represents the 50th activity on this page
                                        else {  // Scraping of this page complete
                                            // Resolve this promise (end of this promise thread)
                                            activityListScrapePromise.resolve("Page " + pageNumber + " complete!");
                                        }
                                    }
                                });
                            }, function(error) {
                                // Resolve this promise (end of this promise thread)
                                activityListScrapePromise.reject(error.toString());

                                i = 50;  // Force out of the "loop" early
                            });
                        }
                    }
                };

                // This starts off the scraping activity task and then calls the next one once complete
                scrapeNextActivity();
            });
        // Error handler if webpage does not exist
        }, function(httpResponse) {
            activityListScrapePromise.reject("Web page request failed with response code " + httpResponse.status);
        });

        return activityListScrapePromise;  // Return promise so it can be added to the promises array
    }

    // This function retrieves the total number of pages in a given search (used by filters)
    function getTotalPages(criteria, baseURL, position) {
        // Request the first page of results to determine total number of pages (based on links at bottom of page)
        return Parse.Cloud.httpRequest({
            url: baseURL + "0" + dateRange,
            headers: {
                'User-Agent' : "Mountaineers App Back-End"
            }
        }).then(function (httpResponse) {
            var html = httpResponse.text;

            // Figure out how many webpages need to be scraped
            // Extract number of webpages that need to be scraped and assign to array
            var endPosition = html.lastIndexOf("</a>");
            var startPosition = html.lastIndexOf(">", endPosition);
            var totalPages = parseInt(html.substring(startPosition + 1, endPosition));

            // Check to see if there was an error getting the total pages
            if (isNaN(totalPages)) {  // If there is only one page, totalPages is a null number (a.k.a. Not a Number)
                totalPages = 1;
            }

            filterTotalPages[position] = totalPages;

            return Parse.Promise.as("Completed determining the total number of web pages for " + criteria + "!");
        }, function (httpResponse) {  // Could not retrieve initial website
            // Return Parse error if error is encountered
            return Parse.Promise.error("Error code: " + httpResponse.status
                        + ".  Could not retrieve initial web page for " + criteria + ": " + baseURL + "0");
        });

        return getTotalPagesPromise;
    }

    // This function sets the filter criteria for all activities
    function getFilteredURLs(filterCriteriaIndex, baseURL, pageNumber) {
        // Send request to get the activity webpage
        return Parse.Cloud.httpRequest({
            url: baseURL + (pageNumber - 1) * 50 + dateRange,
            headers: {
                'User-Agent' : "Mountaineers App Back-End"
            }
        }).then(function(httpResponse) {
            var html = httpResponse.text;
            var url;
            var pageListing;
            var multiplePages = true;

            // Use xmlreader to parse HTML code for all entries and put activity URL into array
            xmlreader.read(html, function (err, doc) {
                // There are 50 items on each webpage (except for the last page).  All items start at 0.
                for (var i = 0; i < 50; i++) {
                    // See if there is a page listing at the top of the page
                    try {
                        pageListing = doc.HTML.BODY.DIV.at(0).attributes().CLASS;

                        // If the above value is listingBar then there are multiple pages
                        if (pageListing.toLowerCase().trim() === "listingbar") {
                            multiplePages = true;
                        }
                        else {
                            multiplePages = false;
                        }
                    }
                    catch (err) {  // If there is an error assume it is a single page
                        multiplePages = false;
                    }

                    try {
                        /* There is a special condition where xmlreader.js and sax.js do not function correctly.  For
                         * the case where there is one result on the webpage, the xmlreader command for i > 1 returns
                         * the same value as i = 1.  This results in us having 50 URLs that are all the same.  Since
                         * URLs must be unique, catch this bug by comparing the URL to the previously scraped URL and
                         * see if it is the same. */
                        // Webpage Address: HREF at /html/body/div[i]/div[2]/h3/a
                        if (multiplePages) {
                            url = doc.HTML.BODY.DIV.at(i + 1).DIV.at(1).H3.at(0).A.at(0).attributes().HREF;
                        }
                        else {
                            url = doc.HTML.BODY.DIV.at(i).DIV.at(1).H3.at(0).A.at(0).attributes().HREF;
                        }

                        // Check for special condition as described above
                        if (i === 1 && url === filteredURLs[filterCriteriaIndex][0]) {
                            return Parse.Promise.as(filterCriteria[filterCriteriaIndex] + " (Page " + pageNumber +
                                ") URLs have been extracted!");
                        }
                        else {  // Not the special condition
                            totalFilteredActivities = totalFilteredActivities + 1;  // Increment counter
                            filteredURLs[filterCriteriaIndex].push(url);
                        }
                    }
                    catch (err) {
                        /* Reached the end of activities for this page.  There are less than 50 activities on
                         * this page (should only occur for last page) */
                        return Parse.Promise.as(filterCriteria[filterCriteriaIndex] + " (Page " + pageNumber +
                                    ") URLs have been extracted!");
                    }
                }
            });
        // Error handler if webpage does not exist
        }, function(httpResponse) {
            return Parse.Promise.error("Could not retrieve " + filterCriteria[filterCriteriaIndex] + " web page #" +
                        pageNumber + ".  Error code: " + httpResponse.status);
        });
    }

    // This function sets the filter criteria for all activities
    function filterAssignment(filterCriteriaIndex) {
        /* This promise is monitored by overallScrapePromise and is added to the promises array.  There is a
         * filterAssignmentPromise promise for each filter criteria. */
        var filterAssignmentPromise = new Parse.Promise();
        var query;
        var filter = filterCriteria[filterCriteriaIndex];

        // Get list of Parse objects that correspond to the activity URLs
        query = new Parse.Query(ActivityClass);  // Create new query
        // ... where the object corresponds to one of the filtered activity URLs
        query.containedIn("activityUrl", filteredURLs[filterCriteriaIndex]);

        // ... where the activity start date occurs sometime in the future (includes current day)
        /* Note that the time below is adjusting a day back since an activity date is saved at the beginning of
         * its day (i.e. at midnight).  All time is in UTC. */
        if (!dateAll) {  // Only set this restriction if looking at future activities
            query.greaterThan("activityStartDate", new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        }

        // ... where the filter criteria value is currently not true (i.e. false or undefined)
        query.notEqualTo(filter, true);
        /* ... give us only this filter criteria field of interest (do not send other fields to minimize resource
         * usage) */
        query.select(filter);
        query.limit(1000);  // Set query results to the max of 1000

        // Launch query and retrieve objects matching the specified query
        query.find().then(function (results) {
            // If any activities are returned matching our criteria then update and save
            if (results.length !== 0) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set(filter, true);  // Set this filter criteria value to true
                }

                trueCounter = trueCounter + results.length;
                return Parse.Object.saveAll(results);  // Save all results
            }
            else {  // No activities found so no updates needed
                return Parse.Promise.as("No updates needed");  // Return resolved promise to move onto next step
            }
        }).then(function (results) {
            /* Update any activities that did not show up on this filtered activity list to set its filter criteria
             * value to false (if it was set to true previously) */

            // Get list of Parse objects that do not correspond to the activity URLs
            query = new Parse.Query(ActivityClass);  // Create new query
            // ... where the object does not correspond to one of the filtered activity URLs
            query.notContainedIn("activityUrl", filteredURLs[filterCriteriaIndex]);

            // ... where the activity start date occurs sometime in the future (includes current day)
            /* Note that the time below is adjusting a day back since an activity date is saved at the beginning of
             * its day (i.e. at midnight).  All time is in UTC. */
            if (!dateAll) {  // Only set this restriction if looking at future activities
                query.greaterThan("activityStartDate", new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
            }

            // ... where the filter criteria value is currently true
            query.equalTo(filter, true);
            /* ... give us only this filter criteria field of interest (do not send other fields to minimize resource
             * usage) */
            query.select(filter);
            query.limit(1000);  // Set query results to the max of 1000

            // Launch query and retrieve objects matching the specified query
            return query.find();
        }).then(function (results) {
            // If any activities are returned matching our criteria then update and save
            if (results.length !== 0) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set(filter, false);  // Set this filter criteria value to false
                }

                falseCounter = falseCounter + results.length;
                return Parse.Object.saveAll(results);  // Save all results
            }
            else {  // No activities found so no updates needed
                return Parse.Promise.as("No updates needed");  // Return resolved promise to move onto next step
            }
        }).then(function (results) {
            filterAssignmentPromise.resolve(filter + " has been updated!");
        }, function (error) {  // Error encountered
            console.log("Could not update " + filter + ".  " + error.message);

            // No big deal - the filters will be updated on the next scraping (run every x minutes on Parse)
            filterAssignmentPromise.resolve("Error encountered with " + filter);
        });

        return filterAssignmentPromise;  // Return promise so it can be added to the promises array
    }


    /* The code below is what drives this Cloud Background Job.  The order of events is as follows:
     * 1. Download the first page of results for future events
     * 2. Extract from the webpage response the total number of webpages that make up the entirety of the activities list
     * 3. Add all pages to be scraped into a grouped promise and run scraping tasks for all pages
     * 4. Once all promises have been completed, begin the individual activity URL scraping (using same promise array approach)
     * 5. Once all URLs have been extracted, start the filter assignment process (using same promise array approach)
     *      - this task involves looking up activity based on the URL
     *      - check if the filter value has changed - if so, set the new value and save
     * 6. Send resolve or reject notification to completion handler to report final status and exit
     */

    // Request the first page of results to determine total number of pages (based on links at bottom of page)
    Parse.Cloud.httpRequest({
        url: "https://www.mountaineers.org/explore/activities/find-activities/@@faceted_query?b_start=0" + dateRange,
        headers: {
            'User-Agent' : "Mountaineers App Back-End"
        }
    }).then(function(httpResponse) {
        var html = httpResponse.text;

        // Figure out how many webpages need to be scraped
        // Extract number of webpages that need to be scraped
        var endPosition = html.lastIndexOf("</a>");
        var startPosition = html.lastIndexOf(">", endPosition);
        var totalPages = parseInt(html.substring(startPosition + 1, endPosition));

        // Check to see if there was an error getting the total pages
        if (isNaN(totalPages)) {  // If there is only one page, totalPages is a null number (a.k.a. Not a Number)
            totalPages = 1;
        }

        // Kick-off tasks to scrape all other activity webpages
        for (var i = 1; i <= totalPages; i++) {
            promises.push(scrapeActivityList(i));
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }, function (httpResponse) {  // Could not retrieve initial website
        return Parse.Promise.error("Initial web page request failed with response code " + httpResponse.status);
    }).then(function() {
        promises.length = 0;  // Clear the promises array

        // Get the total pages for each category
        for (var i = 0; i < filterCriteria.length; i++) {
            promises.push(getTotalPages(filterCriteria[i], filterBaseUrl[i], i));
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }).then(function() {
        promises.length = 0;  // Clear the promises array

        // Initialize filteredURLs array
        for (var i = 0; i < filterCriteria.length; i++) {
            filteredURLs[i] = [];
        }

        // Start the filter assignment task for each category (iterate over the total number of pages
        for (i = 0; i < filterCriteria.length; i++) {
            for (var j = 1; j <= filterTotalPages[i]; j++) {
                promises.push(getFilteredURLs(i, filterBaseUrl[i], j));
            }
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }).then(function() {
        promises.length = 0;  // Clear the promises array

        // Start the filter assignment task for each category (iterate over the total number of pages
        for (var i = 0; i < filterCriteria.length; i++) {
            promises.push(filterAssignment(i));
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }).then(function() {
        onCompletionListener.resolve();  // Tell the listener all promises were resolved
    }, function (error) {
        onCompletionListener.reject(error);  // Send error through to listener
    });
});