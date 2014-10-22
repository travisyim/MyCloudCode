// The following code uses jquery-2.1.1.js, to process (i.e. parse) the JSON data

Parse.Cloud.job("UpdateActivities", function (request, status) {
    // Constant declaration for all things JSON related (i.e. attribues listed in Mountaineers' JSON feed)
    var JSON_CONST = {
        KEY_ACTIVITY_ID: "id",
        KEY_ACTIVITY_TITLE: "title",
        KEY_ACTIVITY_TYPE: "activity_type",
        KEY_TYPE_ADVENTURE_CLUB: "Adventure Club",
        //KEY_TYPE_AVALANCHE_SAFETY: "Avalanche Safety",
        KEY_TYPE_BACKPACKING: "Backpacking",
        KEY_TYPE_CLIMBING: "Climbing",
        KEY_TYPE_DAY_HIKING: "Day Hiking",
        KEY_TYPE_EXPLORERS: "Explorers",
        KEY_TYPE_EXPLORING_NATURE: "Exploring Nature",
        //KEY_TYPE_FIRST_AID: "FirstAid",
        KEY_TYPE_GLOBAL_ADVENTURES: "Global Adventures",
        KEY_TYPE_MOUNTAIN_WORKSHOP: "Mountain Workshop",
        KEY_TYPE_NAVIGATION: "Navigation",
        //KEY_TYPE_OUTDOOR_LEADERSHIP: "Outdoor Leadership",
        KEY_TYPE_PHOTOGRAPHY: "Photography",
        KEY_TYPE_SAILING: "Sailing",
        KEY_TYPE_SCRAMBLING: "Scrambling",
        KEY_TYPE_SEA_KAYAKING: "Sea Kayaking",
        KEY_TYPE_SKIING_SNOWBOARDING: "Skiing/Snowboarding",
        KEY_TYPE_SNOWSHOEING: "Snowshoeing",
        //KEY_TYPE_STAND_UP_PADDLING: "Stand Up Paddling",
        KEY_TYPE_STEWARDSHIP: "Stewardship",
        KEY_TYPE_TRAIL_RUNNING: "Trail Running",
        KEY_TYPE_URBAN_ADVENTURE: "Urban Adventure",
        KEY_TYPE_YOUTH: "Youth",
        KEY_ACTIVITY_CREATION_DATE: "created",
        KEY_ACTIVITY_MODIFICATION_DATE: "modified",
        KEY_ACTIVITY_START_DATE: "start",
        KEY_ACTIVITY_END_DATE: "end",
        KEY_ACTIVITY_URL: "url",
        KEY_AUDIENCE: "audience",
        KEY_AUDIENCE_ADULTS: "Adults",
        KEY_AUDIENCE_FAMILIES: "Families",
        KEY_AUDIENCE_RETIRED_ROVERS: "Retired Rovers",
        KEY_AUDIENCE_SINGLES: "Singles",
        KEY_AUDIENCE_20_30_SOMETHINGS: "20-30 Somethings",
        KEY_AUDIENCE_YOUTH: "Youth",
        KEY_AVAILABILITY_LEADER: "leader_availability",
        KEY_AVAILABILITY_PARTICIPANT: "participant_availability",
        KEY_BRANCH: "branch",
        KEY_BRANCH_THE_MOUNTAINEERS: "The Mountaineers",
        KEY_BRANCH_BELLINGHAM: "Bellingham",
        KEY_BRANCH_EVERETT: "Everett",
        KEY_BRANCH_FOOTHILLS: "Foothills",
        KEY_BRANCH_KITSAP: "Kitsap",
        KEY_BRANCH_OLYMPIA: "Olympia",
        KEY_BRANCH_OUTDOOR_CENTERS: "Outdoor Centers",
        KEY_BRANCH_SEATTLE: "Seattle",
        KEY_BRANCH_TACOMA: "Tacoma",
        KEY_CATEGORY_CLIMBING: "climbing_category",
        KEY_CLIMBING_BASIC_ALPINE: "Basic Alpine",
        KEY_CLIMBING_INTERMEDIATE_ALPINE: "Intermediate Alpine",
        //KEY_CLIMBING_BOULDER: "Boulder",
        KEY_CLIMBING_AID_CLIMB: "Aid Climb",
        KEY_CLIMBING_ROCK_CLIMB: "Rock Climb",
        //KEY_CLIMBING_WATER_ICE: "Water Ice",
        KEY_CATEGORY_SKIING: "skiing_category",
        KEY_SKIING_CROSS_COUNTRY: "Cross-country",
        KEY_SKIING_BACKCOUNTRY: "Backcountry",
        KEY_SKIING_GLACIER: "Glacier",
        KEY_CATEGORY_SNOWSHOEING: "snowshoeing_category",
        KEY_SNOWSHOEING_BEGINNER: "Beginner",
        KEY_SNOWSHOEING_BASIC: "Basic",
        KEY_SNOWSHOEING_INTERMEDIATE: "Intermediate",
        KEY_DIFFICULTY: "difficulty",
        KEY_END_LOCATION: "geo_end",
        KEY_FEE_GUEST: "member_fee",
        KEY_FEE_MEMBER: "guest_fee",
        KEY_IMAGE_URL: "image",
        KEY_LEADERS: "leaders",
        KEY_LEADER_RATING: "leader_rating",
        KEY_LEADER_FOR_BEGINNERS: "For Beginners (Getting Started Series)",
        KEY_LEADER_EASY: "Easy",
        KEY_LEADER_MODERATE: "Moderate",
        KEY_LEADER_CHALLENGING: "Challenging",
        KEY_NAME: "name",
        KEY_PREREQUISITES: "prerequisites",
        KEY_QUALIFIED_YOUTH_LEAD: "qualified_youth_leader",
        KEY_REGISTRATION_OPEN_DATE: "registration_start",
        KEY_REGISTRATION_CLOSE_DATE: "registration_end",
        KEY_REGISTRATION_CANCELED: "status",
        KEY_ROLE: "role",
        KEY_START_LOCATION: "geo_start"
    };

    // Constant declaration for all things Parse related (i.e. Parse database field names)
    var PARSE_CONST = {
        // Classes
        CLASS_ACTIVITY: "Test",

        // Trip Information
        KEY_ACTIVITY_ID: "activityId",
        KEY_ACTIVITY_TITLE: "title",
        KEY_ACTIVITY_TYPE: "type",
        KEY_ACTIVITY_START_DATE: "activityStartDate",
        KEY_ACTIVITY_END_DATE: "activityEndDate",
        KEY_ACTIVITY_URL: "activityUrl",
        KEY_AVAILABILITY_LEADER: "availabilityLeader",
        KEY_AVAILABILITY_PARTICIPANT: "availabilityParticipant",
        KEY_BRANCH: "branch",
        KEY_DIFFICULTY: "difficulty",
        KEY_END_LATITUDE: "endLat",
        KEY_END_LONGITUDE: "endLong",
        KEY_FEE_GUEST: "feeGuest",
        KEY_FEE_MEMBER: "feeMember",
        KEY_IMAGE_URL: "imgUrl",
        KEY_KEYWORDS: "keywords",
        KEY_LEADER_NAME: "leaderName",
        KEY_LEADER_ROLE: "leaderRole",
        KEY_PREREQUISITES: "prereq",
        KEY_QUALIFIED_YOUTH_LEAD: "isQYL",
        KEY_REGISTRATION_OPEN_TIME: "registrationOpenDate",
        KEY_REGISTRATION_CLOSE_TIME: "registrationCloseDate",
        KEY_REGISTRATION_CANCELED: "isCanceled",
        KEY_START_LATITUDE: "startLat",
        KEY_START_LONGITUDE: "startLong",
        KEY_STATUS: "status",

        // Filter Categories
        KEY_ADVENTURE_CLUB: "isAdventureClub",
        //KEY_AVALANCHE_SAFETY: "isAvalancheSafety",
        KEY_BACKPACKING: "isBackpacking",
        KEY_CLIMBING: "isClimbing",
        KEY_DAY_HIKING: "isDayHiking",
        KEY_EXPLORERS: "isExplorers",
        KEY_EXPLORING_NATURE: "isExploringNature",
        //KEY_FIRST_AID: "isFirstAid",
        KEY_GLOBAL_ADVENTURES: "isGlobalAdventures",
        KEY_MOUNTAIN_WORKSHOP: "isMountainWorkshop",
        KEY_NAVIGATION: "isNavigation",
        //KEY_OUTDOOR_LEADERSHIP: "isOutdoorLeadership",
        KEY_PHOTOGRAPHY: "isPhotography",
        KEY_SAILING: "isSailing",
        KEY_SCRAMBLING: "isScrambling",
        KEY_SEA_KAYAKING: "isSeaKayaking",
        KEY_SKIING_SNOWBOARDING: "isSkiingSnowboarding",
        KEY_SNOWSHOEING: "isSnowshoeing",
        //KEY_STAND_UP_PADDLING: "isStandUpPaddling",
        KEY_STEWARDSHIP: "isStewardship",
        KEY_TRAIL_RUNNING: "isTrailRunning",
        KEY_URBAN_ADVENTURE: "isUrbanAdventure",
        KEY_YOUTH_TYPE: "isYouthType",
        KEY_FOR_BEGINNERS: "isForBeginners",
        KEY_EASY: "isEasy",
        KEY_MODERATE: "isModerate",
        KEY_CHALLENGING: "isChallenging",
        KEY_ADULTS: "isAdults",
        KEY_FAMILIES: "isFamilies",
        KEY_RETIRED_ROVERS: "isRetiredRovers",
        KEY_SINGLES: "isSingles",
        KEY_20_30_SOMETHINGS: "is2030Somethings",
        KEY_YOUTH: "isYouth",
        KEY_THE_MOUNTAINEERS: "isTheMountaineers",
        KEY_BELLINGHAM: "isBellingham",
        KEY_EVERETT: "isEverett",
        KEY_FOOTHILLS: "isFoothills",
        KEY_KITSAP: "isKitsap",
        KEY_OLYMPIA: "isOlympia",
        KEY_OUTDOOR_CENTERS: "isOutdoorCenters",
        KEY_SEATTLE: "isSeattle",
        KEY_TACOMA: "isTacoma",
        KEY_BASIC_ALPINE: "isBasicAlpine",
        KEY_INTERMEDIATE_ALPINE: "isIntermediateAlpine",
        //KEY_BOULDER: "isBoulder",
        KEY_AID_CLIMB: "isAidClimb",
        KEY_ROCK_CLIMB: "isRockClimb",
        //KEY_WATER_ICE: "isWaterIce",
        KEY_CROSS_COUNTRY: "isCrosscountry",
        KEY_BACKCOUNTRY: "isBackcountry",
        KEY_GLACIER: "isGlacier",
        KEY_BEGINNER: "isBeginner",
        KEY_BASIC: "isBasic",
        KEY_INTERMEDIATE: "isIntermediate"
    };

    function activityObject(){
        this.id = null;
        this.title = null;
        this.type = null;
        this.created = null;
        this.modified = null;
        this.start = null;
        this.end = null;
        this.url = null;
        this.audience = null;
        this.leaderAvail = null;
        this.participantAvail = null;
        this.branch = null;
        this.climbingCat = null;
        this.skiingCat = null;
        this.snowshoeingCat = null;
        this.difficulty = null;
        this.endLocation = null;
        this.guestFee = null;
        this.memberFee = null;
        this.imageUrl = null;
        this.leaders = null;
        this.leaderRating = null;
        this.leaderName = [];
        this.prerequisites = null;
        this.leaderQYL = [];
        this.registrationStart = null;
        this.registrationEnd = null;
        this.status = null;
        this.leaderRole = [];
        this.startLocation = null;
        this.isAdventureClub = false;
        //this.isAvalancheSafety = false;
        this.isBackpacking = false;
        this.isClimbing = false;
        this.isDayHiking = false;
        this.isExplorers = false;
        this.isExploringNature = false;
        //this.isFirstAid = false;
        this.isGlobalAdventures = false;
        this.isMountainWorkshop = false;
        this.isNavigation = false;
        //this.isOutdoorLeadership = false;
        this.isPhotography = false;
        this.isSailing = false;
        this.isScrambling = false;
        this.isSeaKayaking = false;
        this.isSkiingSnowboarding = false;
        this.isSnowshoeing = false;
        //this.isStandUpPaddling = false;
        this.isStewardship = false;
        this.isTrailRunning = false;
        this.isUrbanAdventure = false;
        this.isYouthType = false;
        this.isForBeginners = false;
        this.isEasy = false;
        this.isModerate = false;
        this.isChallenging = false;
        this.isAdults = false;
        this.isFamilies = false;
        this.isRetiredRovers = false;
        this.isSingles = false;
        this.is2030Somethings = false;
        this.isYouth = false;
        this.isTheMountaineers = false;
        this.isBellingham = false;
        this.isEverett = false;
        this.isFoothills = false;
        this.isKitsap = false;
        this.isOlympia = false;
        this.isOutdoorCenters = false;
        this.isSeattle = false;
        this.isTacoma = false;
        this.isBasicAlpine = false;
        this.isIntermediateAlpine = false;
        //this.isBoulder = false;
        this.isAidClimb = false;
        this.isRockClimb = false;
        //this.isWaterIce = false;
        this.isCrosscountry = false;
        this.isBackcountry = false;
        this.isGlacier = false;
        this.isBeginner = false;
        this.isBasic = false;
        this.isIntermediate = false;
    }

    var ActivityClass = Parse.Object.extend(PARSE_CONST.CLASS_ACTIVITY);  // Make connection to Activity class

    var promises = [];  // This variable will hold all of the activity scraping promises

    var orphanedActivities = 0;  // This will keep track of how many activities have lost their way (i.e. webpage)
    var newActivities = 0;  // Counter for new activities added
    var updatedActivities = 0;  // Counter for updated existing activities
    var totalActivities = 0;  // Keeps track of all activities reviewed for changed content (excluded filter criteria)

    // Define listener to handle completion event
    var onCompletionListener = new Parse.Promise();  // Create a trivial resolved promise as a base case
    onCompletionListener.then(function() {  // Overall job was successful
        status.success("A total of " + totalActivities + " activities were reviewed: " + newActivities +
                " activities added and " + updatedActivities + " activities updated.  " +
                orphanedActivities + " activities have been orphaned (i.e. no longer have working web pages).");
    }, function(error) {  // Overall job failed
        status.error(error.toString());
    });

    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array) {
            return false;
        }

        // compare lengths - can save a lot of time
        if (this.length != array.length) {
            return false;
        }

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }

        return true;
    };

//    /* This function assigns the activity keywords based on the provided field.  The second parameter is used to signal
//     * that the field is the activity name (special handling required to remove activity type in the name) */
//    function getKeywords(field, isActivityName) {
//        var _ = require("underscore");  // Require underscore.js
//
//        var toLowerCase = function(w) {
//            return w.toLowerCase();
//        };
//
//        var keywords = field;
//        var ignoreWords = ["the", "in", "and", "to", "of", "at", "for", "from", "a", "an", "s"];  // Words to ignore
//
//        // If this is the activity name field then drop the activity type that's always printed at the beginning
//        if (isActivityName) {
//            // Special condition would be for cross-country ski trips
//            keywords = keywords.replace(/^cross-country/gi, "");  // Remove the initial chunk that has the hyphen
//            keywords = keywords.substr(keywords.indexOf("-") + 1);  // Only keep the actual activity name
//        }
//
//        keywords = keywords.split(/\b/);  // Split word by borders
//
//        // Filter out only lowercase words that do not match the ignoreWords
//        keywords = _.map(keywords, toLowerCase);
//        keywords = _.filter(keywords, function(w) {
//            return w.match(/^\w+$/) && ! _.contains(ignoreWords, w);
//        });
//
//        keywords = _.uniq(keywords);  // Do not allow duplicate keywords
//        return keywords;  // Return array of unique qualified keywords
//    }
//
//    /* This function compares two sets of keywords and determines if the first set is contained within the second.  Both
//     * sets of keywords are in lower case. The number of keywords matched is returned. */
//    function compareKeywords(curKeywords, prevKeywords) {
//        var _ = require("underscore");  // Require underscore.js
//
//        // Filter which current keywords are contained within the previous keywords
//        var commonKeywords = _.filter(curKeywords, function(w) {
//            return _.contains(prevKeywords, w);
//        });
//
//        return commonKeywords.length;  // Return number of common keywords
//    }
//
    /* This function accepts the JSON-formatted activity list (in the form of a JSON object), searches for updates or
     * additions and saves them in the backend */
    function scrapeActivity(jsObject) {
        var scrapeActivityPromise = new Parse.Promise();
        var activityObj = new ActivityClass();
        var activity = new activityObject();
        var query;
        var exists = false;
        var i;

//        // Clear the activity object
//        activity.reset();

        // Assign all values to activity object
        activity.id = jsObject.id;
        activity.title = jsObject.title;
        activity.type = jsObject.activity_type;
        activity.created = jsObject.created;
        activity.modified = jsObject.modified;
        activity.start = jsObject.start;
        activity.end = jsObject.end;
        activity.url = jsObject.url;
        activity.audience = jsObject.audience;
        activity.leaderAvail = jsObject.leader_availability;
        activity.participantAvail = jsObject.participant_availability;
        activity.branch = jsObject.branch;
        activity.climbingCat = jsObject.climbing_category;
        activity.skiingCat = jsObject.skiing_category;
        activity.snowshoeingCat = jsObject.snowshoeing_category;
        activity.difficulty = jsObject.difficulty;
        activity.endLocation = jsObject.geo_end;
        activity.guestFee = jsObject.guest_fee;
        activity.memberFee = jsObject.member_fee;
        activity.imageUrl = jsObject.image;
        activity.leaders = jsObject.leaders;
        activity.leaderRating = jsObject.leader_rating;
        activity.prerequisites = jsObject.prerequisites;
        activity.registrationStart = jsObject.registration_start;
        activity.registrationEnd = jsObject.registration_end;
        activity.status = jsObject.status;
        activity.startLocation = jsObject.geo_start;

        // Get list of Parse objects that correspond to the activity URLs
        query = new Parse.Query(PARSE_CONST.CLASS_ACTIVITY);  // Create new query
        // ... where the object corresponds to the Activity ID
        query.equalTo(PARSE_CONST.KEY_ACTIVITY_ID, activity.id);

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
            return Parse.Promise.error("Not able to check if activity id " + activity.id + " is a duplicate");
        }).then(function () {  // No error encountered while running query
            // Activity ID
            if (activity.id !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_ID)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_ID, activity.id);
            }

            // Activity Title
            if (activity.title !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_TITLE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_TITLE, activity.title);
            }

            // Activity Type Category
            for (i = 0; i < activity.type.length; i++) {
                // Determine which categories are listed
                if (activity.type[i] === JSON_CONST.KEY_TYPE_ADVENTURE_CLUB) {
                    activity.isAdventureClub = true;
                }
//                        else if (activity.type[i] === JSON_CONST.KEY_TYPE_AVALANCHE_SAFETY) {
//                            activity.isAvalancheSafety = true;
//                        }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_BACKPACKING) {
                    activity.isBackpacking = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_CLIMBING) {
                    activity.isClimbing = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_DAY_HIKING) {
                    activity.isDayHiking = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_EXPLORERS) {
                    activity.isExplorers = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_EXPLORING_NATURE) {
                    activity.isExploringNature = true;
                }
//                        else if (activity.type[i] === JSON_CONST.KEY_TYPE_FIRST_AID) {
//                            activity.isFirstAid = true;
//                        }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_GLOBAL_ADVENTURES) {
                    activity.isGlobalAdventures = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_MOUNTAIN_WORKSHOP) {
                    activity.isMountainWorkshop = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_NAVIGATION) {
                    activity.isNavigation = true;
                }
//                        else if (activity.type[i] === JSON_CONST.KEY_TYPE_OUTDOOR_LEADERSHIP) {
//                            activity.isOutdoorLeadership = true;
//                        }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_PHOTOGRAPHY) {
                    activity.isPhotography = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_SAILING) {
                    activity.isSailing = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_SCRAMBLING) {
                    activity.isScrambling = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_SEA_KAYAKING) {
                    activity.isSeaKayaking = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_SKIING_SNOWBOARDING) {
                    activity.isSkiingSnowboarding = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_SNOWSHOEING) {
                    activity.isSnowshoeing = true;
                }
//                        else if (activity.type[i] === JSON_CONST.KEY_TYPE_STAND_UP_PADDLING) {
//                            activity.isStandUpPaddling = true;
//                        }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_STEWARDSHIP) {
                    activity.isStewardship = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_TRAIL_RUNNING) {
                    activity.isTrailRunning = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_URBAN_ADVENTURE) {
                    activity.isUrbanAdventure = true;
                }
                else if (activity.type[i] === JSON_CONST.KEY_TYPE_YOUTH) {
                    activity.isYouthType = true;
                }
                else {  // New activity type that is not currently accounted for
                    console.log("New activity type: " + activity.type[i]);
                }
            }

            // Now assign the values for the activity type categories
            if (activity.isAdventureClub !== activityObj.get(PARSE_CONST.KEY_ADVENTURE_CLUB)) {
                activityObj.set(PARSE_CONST.KEY_ADVENTURE_CLUB, activity.isAdventureClub);
            }
//                    if (activity.isAvalancheSafety !== activityObj.get(PARSE_CONST.KEY_AVALANCHE_SAFETY)) {
//                        activityObj.set(PARSE_CONST.KEY_AVALANCHE_SAFETY, activity.isAvalancheSafety);
//                    }
            if (activity.isBackpacking !== activityObj.get(PARSE_CONST.KEY_BACKPACKING)) {
                activityObj.set(PARSE_CONST.KEY_BACKPACKING, activity.isBackpacking);
            }
            if (activity.isClimbing !== activityObj.get(PARSE_CONST.KEY_CLIMBING)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING, activity.isClimbing);
            }
            if (activity.isDayHiking !== activityObj.get(PARSE_CONST.KEY_DAY_HIKING)) {
                activityObj.set(PARSE_CONST.KEY_DAY_HIKING, activity.isDayHiking);
            }
            if (activity.isExplorers !== activityObj.get(PARSE_CONST.KEY_EXPLORERS)) {
                activityObj.set(PARSE_CONST.KEY_EXPLORERS, activity.isExplorers);
            }
            if (activity.isExploringNature !== activityObj.get(PARSE_CONST.KEY_EXPLORING_NATURE)) {
                activityObj.set(PARSE_CONST.KEY_EXPLORING_NATURE, activity.isExploringNature);
            }
//                    if (activity.isFirstAid !== activityObj.get(PARSE_CONST.KEY_FIRST_AID)) {
//                        activityObj.set(PARSE_CONST.KEY_FIRST_AID, activity.isFirstAid);
//                    }
            if (activity.isGlobalAdventures !== activityObj.get(PARSE_CONST.KEY_GLOBAL_ADVENTURES)) {
                activityObj.set(PARSE_CONST.KEY_GLOBAL_ADVENTURES, activity.isGlobalAdventures);
            }
            if (activity.isMountainWorkshop !== activityObj.get(PARSE_CONST.KEY_MOUNTAIN_WORKSHOP)) {
                activityObj.set(PARSE_CONST.KEY_MOUNTAIN_WORKSHOP, activity.isMountainWorkshop);
            }
            if (activity.isNavigation !== activityObj.get(PARSE_CONST.KEY_NAVIGATION)) {
                activityObj.set(PARSE_CONST.KEY_NAVIGATION, activity.isNavigation);
            }
//                    if (activity.isOutdoorLeadership !== activityObj.get(PARSE_CONST.KEY_OUTDOOR_LEADERSHIP)) {
//                        activityObj.set(PARSE_CONST.KEY_OUTDOOR_LEADERSHIP, activity.isOutdoorLeadership);
//                    }
            if (activity.isPhotography !== activityObj.get(PARSE_CONST.KEY_PHOTOGRAPHY)) {
                activityObj.set(PARSE_CONST.KEY_PHOTOGRAPHY, activity.isPhotography);
            }
            if (activity.isSailing !== activityObj.get(PARSE_CONST.KEY_SAILING)) {
                activityObj.set(PARSE_CONST.KEY_SAILING, activity.isSailing);
            }
            if (activity.isScrambling !== activityObj.get(PARSE_CONST.KEY_SCRAMBLING)) {
                activityObj.set(PARSE_CONST.KEY_SCRAMBLING, activity.isScrambling);
            }
            if (activity.isSeaKayaking !== activityObj.get(PARSE_CONST.KEY_SEA_KAYAKING)) {
                activityObj.set(PARSE_CONST.KEY_SEA_KAYAKING, activity.isSeaKayaking);
            }
            if (activity.isSkiingSnowboarding !== activityObj.get(PARSE_CONST.KEY_SKIING_SNOWBOARDING)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_SNOWBOARDING, activity.isSkiingSnowboarding);
            }
            if (activity.isSnowshoeing !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING, activity.isSnowshoeing);
            }
//                    if (activity.isStandUpPaddling !== activityObj.get(PARSE_CONST.KEY_STAND_UP_PADDLING)) {
//                        activityObj.set(PARSE_CONST.KEY_STAND_UP_PADDLING, activity.isStandUpPaddling);
//                    }
            if (activity.isStewardship !== activityObj.get(PARSE_CONST.KEY_STEWARDSHIP)) {
                activityObj.set(PARSE_CONST.KEY_STEWARDSHIP, activity.isStewardship);
            }
            if (activity.isTrailRunning !== activityObj.get(PARSE_CONST.KEY_TRAIL_RUNNING)) {
                activityObj.set(PARSE_CONST.KEY_TRAIL_RUNNING, activity.isTrailRunning);
            }
            if (activity.isUrbanAdventure !== activityObj.get(PARSE_CONST.KEY_URBAN_ADVENTURE)) {
                activityObj.set(PARSE_CONST.KEY_URBAN_ADVENTURE, activity.isUrbanAdventure);
            }
            if (activity.isYouthType !== activityObj.get(PARSE_CONST.KEY_YOUTH_TYPE)) {
                activityObj.set(PARSE_CONST.KEY_YOUTH_TYPE, activity.isYouthType);
            }

            // Activity Creation Date
            if (activity.created !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_CREATION_DATE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_CREATION_DATE, activity.created);
            }

            // Activity Modification Date
            if (activity.modified !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_MODIFICATION_DATE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_MODIFICATION_DATE, activity.modified);
            }

            // Activity Start Date
            if (activity.start !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_START_DATE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_START_DATE, activity.start);
            }

            // Activity End Date
            if (activity.end !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_END_DATE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_END_DATE, activity.end);
            }

            // Activity URL
            if (activity.url !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_URL)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_URL, activity.url);
            }

            // Audience - "For" Category
            for (i = 0; i < activity.audience.length; i++) {
                // Determine which categories are listed
                if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_ADULTS) {
                    activity.isAdults = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_FAMILIES) {
                    activity.isFamilies = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_RETIRED_ROVERS) {
                    activity.isRetiredRovers = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_SINGLES) {
                    activity.isSingles = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_20_30_SOMETHINGS) {
                    activity.is2030Somethings = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_YOUTH) {
                    activity.isYouth = true;
                }
                else {  // New audience category that is not currently accounted for
                    console.log("New audience category: " + activity.audience[i]);
                }
            }

            // Now assign the values for the audience categories
            if (activity.isAdults !== activityObj.get(PARSE_CONST.KEY_ADULTS)) {
                activityObj.set(PARSE_CONST.KEY_ADULTS, activity.isAdults);
            }
            if (activity.isFamilies !== activityObj.get(PARSE_CONST.KEY_FAMILIES)) {
                activityObj.set(PARSE_CONST.KEY_FAMILIES, activity.isFamilies);
            }
            if (activity.isRetiredRovers !== activityObj.get(PARSE_CONST.KEY_RETIRED_ROVERS)) {
                activityObj.set(PARSE_CONST.KEY_RETIRED_ROVERS, activity.isRetiredRovers);
            }
            if (activity.isSingles !== activityObj.get(PARSE_CONST.KEY_SINGLES)) {
                activityObj.set(PARSE_CONST.KEY_SINGLES, activity.isSingles);
            }
            if (activity.is2030Somethings !== activityObj.get(PARSE_CONST.KEY_20_30_SOMETHINGS)) {
                activityObj.set(PARSE_CONST.KEY_20_30_SOMETHINGS, activity.is2030Somethings);
            }
            if (activity.isYouth !== activityObj.get(PARSE_CONST.KEY_YOUTH)) {
                activityObj.set(PARSE_CONST.KEY_YOUTH, activity.isYouth);
            }

            // Availability - Leader
            if (activity.leaderAvail !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_LEADER)) {
                activityObj.set(PARSE_CONST.KEY_AVAILABILITY_LEADER, activity.leaderAvail);
            }

            // Availability - Participant
            if (activity.participantAvail !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT)) {
                activityObj.set(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT, activity.participantAvail);
            }

            // Branch Category
            // Determine which category is listed (only one branch category can be assigned)
            if (activity.branch === JSON_CONST.KEY_BRANCH_THE_MOUNTAINEERS) {
                activity.isTheMountaineers = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_BELLINGHAM) {
                activity.isBellingham = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_EVERETT) {
                activity.isEverett = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_FOOTHILLS) {
                activity.isFoothills = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_KITSAP) {
                activity.isKitsap = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_OLYMPIA) {
                activity.isOlympia = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_OUTDOOR_CENTERS) {
                activity.isOutdoorCenters = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_SEATTLE) {
                activity.isSeattle = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_TACOMA) {
                activity.isTacoma = true;
            }
            else {  // New branch that is not currently accounted for
                console.log("New branch: " + activity.branch);
            }

            // Now assign the values for the audience categories
            if (activity.isTheMountaineers !== activityObj.get(PARSE_CONST.KEY_THE_MOUNTAINEERS)) {
                activityObj.set(PARSE_CONST.KEY_THE_MOUNTAINEERS, activity.isTheMountaineers);
            }
            if (activity.isBellingham !== activityObj.get(PARSE_CONST.KEY_BELLINGHAM)) {
                activityObj.set(PARSE_CONST.KEY_BELLINGHAM, activity.isBellingham);
            }
            if (activity.isEverett !== activityObj.get(PARSE_CONST.KEY_EVERETT)) {
                activityObj.set(PARSE_CONST.KEY_EVERETT, activity.isEverett);
            }
            if (activity.isFoothills !== activityObj.get(PARSE_CONST.KEY_FOOTHILLS)) {
                activityObj.set(PARSE_CONST.KEY_FOOTHILLS, activity.isFoothills);
            }
            if (activity.isKitsap !== activityObj.get(PARSE_CONST.KEY_KITSAP)) {
                activityObj.set(PARSE_CONST.KEY_KITSAP, activity.isKitsap);
            }
            if (activity.isOlympia !== activityObj.get(PARSE_CONST.KEY_OLYMPIA)) {
                activityObj.set(PARSE_CONST.KEY_OLYMPIA, activity.isOlympia);
            }
            if (activity.isOutdoorCenters !== activityObj.get(PARSE_CONST.KEY_OUTDOOR_CENTERS)) {
                activityObj.set(PARSE_CONST.KEY_OUTDOOR_CENTERS, activity.isOutdoorCenters);
            }
            if (activity.isSeattle !== activityObj.get(PARSE_CONST.KEY_SEATTLE)) {
                activityObj.set(PARSE_CONST.KEY_SEATTLE, activity.isSeattle);
            }
            if (activity.isTacoma !== activityObj.get(PARSE_CONST.KEY_TACOMA)) {
                activityObj.set(PARSE_CONST.KEY_TACOMA, activity.isTacoma);
            }

            // Climbing Category
            // Determine which category is listed (only one climbing category can be assigned)
            if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_BASIC_ALPINE) {
                activity.isBasicAlpine = true;
            }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE) {
                activity.isIntermediateAlpine = true;
            }
//                    else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_BOULDER) {
//                        activity.isBoulder = true;
//                    }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_AID_CLIMB) {
                activity.isAidClimb = true;
            }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_ROCK_CLIMB) {
                activity.isRockClimb = true;
            }
//                    else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_WATER_ICE) {
//                        activity.isWaterIce = true;
//                    }
            else if (activity.climbingCat !== null) {  // New climbing category that is not currently accounted for
                console.log("New climbing category: " + activity.climbingCat);
            }

            // Now assign the values for the climbing categories
            if (activity.isBasicAlpine !== activityObj.get(PARSE_CONST.KEY_BASIC_ALPINE)) {
                activityObj.set(PARSE_CONST.KEY_BASIC_ALPINE, activity.isBasicAlpine);
            }
            if (activity.isIntermediateAlpine !== activityObj.get(PARSE_CONST.KEY_INTERMEDIATE_ALPINE)) {
                activityObj.set(PARSE_CONST.KEY_INTERMEDIATE_ALPINE, activity.isIntermediateAlpine);
            }
//                    if (activity.isBoulder !== activityObj.get(PARSE_CONST.KEY_BOULDER)) {
//                        activityObj.set(PARSE_CONST.KEY_BOULDER, activity.isBoulder);
//                    }
            if (activity.isAidClimb !== activityObj.get(PARSE_CONST.KEY_AID_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_AID_CLIMB, activity.isAidClimb);
            }
            if (activity.isRockClimb !== activityObj.get(PARSE_CONST.KEY_ROCK_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_ROCK_CLIMB, activity.isRockClimb);
            }
//                    if (activity.isWaterIce !== activityObj.get(PARSE_CONST.KEY_WATER_ICE)) {
//                        activityObj.set(PARSE_CONST.KEY_WATER_ICE, activity.isWaterIce);
//                    }

            // Skiing Category
            // Determine which category is listed (only one skiing category can be assigned)
            if (activity.skiingCat === JSON_CONST.KEY_SKIING_CROSS_COUNTRY) {
                activity.isCrosscountry = true;
            }
            else if (activity.skiingCat === JSON_CONST.KEY_SKIING_BACKCOUNTRY) {
                activity.isBackcountry = true;
            }
            else if (activity.skiingCat === JSON_CONST.KEY_SKIING_GLACIER) {
                activity.isGlacier = true;
            }
            else if (activity.skiingCat !== null) {  // New skiing category that is not currently accounted for
                console.log("New skiing category: " + activity.skiingCat);
            }

            // Now assign the values for the skiing categories
            if (activity.isCrosscountry !== activityObj.get(PARSE_CONST.KEY_CROSS_COUNTRY)) {
                activityObj.set(PARSE_CONST.KEY_CROSS_COUNTRY, activity.isCrosscountry);
            }
            if (activity.isBackcountry !== activityObj.get(PARSE_CONST.KEY_BACKCOUNTRY)) {
                activityObj.set(PARSE_CONST.KEY_BACKCOUNTRY, activity.isBackcountry);
            }
            if (activity.isGlacier !== activityObj.get(PARSE_CONST.KEY_GLACIER)) {
                activityObj.set(PARSE_CONST.KEY_GLACIER, activity.isGlacier);
            }

            // Snowshoeing Category
            // Determine which category is listed (only one snowshoeing category can be assigned)
            if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_BEGINNER) {
                activity.isBeginner = true;
            }
            else if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_BASIC) {
                activity.isBasic = true;
            }
            else if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_INTERMEDIATE) {
                activity.isIntermediate = true;
            }
            else if (activity.snowshoeingCat !== null) {  // New snowshoeing category that is not currently accounted for
                console.log("New snowshoeing category: " + activity.snowshoeingCat);
            }

            // Now assign the values for the snowshoeing categories
            if (activity.isBeginner !== activityObj.get(PARSE_CONST.KEY_BEGINNER)) {
                activityObj.set(PARSE_CONST.KEY_BEGINNER, activity.isBeginner);
            }
            if (activity.isBasic !== activityObj.get(PARSE_CONST.KEY_BASIC)) {
                activityObj.set(PARSE_CONST.KEY_BASIC, activity.isBasic);
            }
            if (activity.isIntermediate !== activityObj.get(PARSE_CONST.KEY_INTERMEDIATE)) {
                activityObj.set(PARSE_CONST.KEY_INTERMEDIATE, activity.isIntermediate);
            }

            // Difficulty
            if ((activity.difficulty !== null && activity.difficulty.equals(activityObj.get(PARSE_CONST.KEY_DIFFICULTY)))
                || (activity.difficulty === null && activityObj.get(PARSE_CONST.KEY_DIFFICULTY) !== null)) {
                activityObj.set(PARSE_CONST.KEY_DIFFICULTY, activity.difficulty);
            }

            // End Location
            if (activity.endLocation !== null && activity.endLocation.length === 2) {  // GPS coordinates defined
                if (activity.endLocation[0] !== activityObj.get(PARSE_CONST.KEY_END_LATITUDE)) {
                    activityObj.set(PARSE_CONST.KEY_END_LATITUDE, activity.endLocation[0]);
                }
                if (activity.endLocation[1] !== activityObj.get(PARSE_CONST.KEY_END_LONGITUDE)) {
                    activityObj.set(PARSE_CONST.KEY_END_LONGITUDE, activity.endLocation[1]);
                }
            }
            else { // No coordinates defined
                if (activityObj.get(PARSE_CONST.KEY_END_LATITUDE) !== null) {
                    activityObj.set(PARSE_CONST.KEY_END_LATITUDE, null);
                }
                if (activityObj.get(PARSE_CONST.KEY_END_LONGITUDE) !== null) {
                    activityObj.set(PARSE_CONST.KEY_END_LONGITUDE, null);
                }
            }

            // Guest Fee
            if (activity.guestFee !== activityObj.get(PARSE_CONST.KEY_FEE_GUEST)) {
                activityObj.set(PARSE_CONST.KEY_FEE_GUEST, activity.guestFee);
            }

            // Member Fee
            if (activity.memberFee !== activityObj.get(PARSE_CONST.KEY_FEE_MEMBER)) {
                activityObj.set(PARSE_CONST.KEY_FEE_MEMBER, activity.memberFee);
            }

            // Image URL
            if (activity.imageUrl !== activityObj.get(PARSE_CONST.KEY_IMAGE_URL)) {
                activityObj.set(PARSE_CONST.KEY_IMAGE_URL, activity.imageUrl);
            }

            // Leader Rating Category
            // Determine which category is listed (only one leader rating category can be assigned)
            if (activity.leaderRating === JSON_CONST.KEY_LEADER_FOR_BEGINNERS) {
                activity.isForBeginners = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_LEADER_EASY) {
                activity.isEasy = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_LEADER_MODERATE) {
                activity.isModerate = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_LEADER_CHALLENGING) {
                activity.isChallenging = true;
            }
            else if (activity.leaderRating !== null) {  // New leader rating category that is not currently accounted for
                console.log("New leader rating category: " + activity.leaderRating);
            }

            // Now assign the values for the leader rating categories
            if (activity.isForBeginners !== activityObj.get(PARSE_CONST.KEY_FOR_BEGINNERS)) {
                activityObj.set(PARSE_CONST.KEY_FOR_BEGINNERS, activity.isForBeginners);
            }
            if (activity.isEasy !== activityObj.get(PARSE_CONST.KEY_EASY)) {
                activityObj.set(PARSE_CONST.KEY_EASY, activity.isEasy);
            }
            if (activity.isModerate !== activityObj.get(PARSE_CONST.KEY_MODERATE)) {
                activityObj.set(PARSE_CONST.KEY_MODERATE, activity.isModerate);
            }
            if (activity.isChallenging !== activityObj.get(PARSE_CONST.KEY_CHALLENGING)) {
                activityObj.set(PARSE_CONST.KEY_CHALLENGING, activity.isChallenging);
            }

            // Prerequisites
            if (!activity.prerequisites.equals(activityObj.get(PARSE_CONST.KEY_PREREQUISITES))) {
                activityObj.set(PARSE_CONST.KEY_PREREQUISITES, activity.prerequisites);
            }

            // Registration Open Time
            if (activity.registrationStart !== activityObj.get(PARSE_CONST.KEY_REGISTRATION_OPEN_TIME)) {
                activityObj.set(PARSE_CONST.KEY_REGISTRATION_OPEN_TIME, activity.registrationStart);
            }

            // Registration Close Time
            if (activity.registrationEnd !== activityObj.get(PARSE_CONST.KEY_REGISTRATION_CLOSE_TIME)) {
                activityObj.set(PARSE_CONST.KEY_REGISTRATION_CLOSE_TIME, activity.registrationEnd);
            }

            // Activity Status
            if (activity.status !== activityObj.get(PARSE_CONST.KEY_STATUS)) {
                activityObj.set(PARSE_CONST.KEY_STATUS, activity.status);
            }

            // Start Location
            if (activity.startLocation !== null && activity.startLocation.length === 2) {  // GPS coordinates defined
                if (activity.startLocation[0] !== activityObj.get(PARSE_CONST.KEY_START_LATITUDE)) {
                    activityObj.set(PARSE_CONST.KEY_START_LATITUDE, activity.startLocation[0]);
                }
                if (activity.startLocation[1] !== activityObj.get(PARSE_CONST.KEY_START_LONGITUDE)) {
                    activityObj.set(PARSE_CONST.KEY_START_LONGITUDE, activity.startLocation[1]);
                }
            }
            else { // No coordinates defined
                if (activityObj.get(PARSE_CONST.KEY_START_LATITUDE) !== null) {
                    activityObj.set(PARSE_CONST.KEY_START_LATITUDE, null);
                }
                if (activityObj.get(PARSE_CONST.KEY_START_LONGITUDE) !== null) {
                    activityObj.set(PARSE_CONST.KEY_START_LONGITUDE, null);
                }
            }

            // Leader Information
            for (i = 0; i < activity.leaders.length; i++) {
                // Add leader names, roles and QYL statuses to list
                activity.leaderName.push(activity.leaders[i].name);
                activity.leaderRole.push(activity.leaders[i].role);
                activity.leaderQYL.push(activity.leaders[i].qualified_youth_leader);
            }

            // Now assign the values for the audience categories
            if (!activity.leaderName.equals(activityObj.get(PARSE_CONST.KEY_LEADER_NAME))) {
                activityObj.set(PARSE_CONST.KEY_LEADER_NAME, activity.leaderName);
            }
            if (!activity.leaderRole.equals(activityObj.get(PARSE_CONST.KEY_LEADER_ROLE))) {
                activityObj.set(PARSE_CONST.KEY_LEADER_ROLE, activity.leaderRole);
            }
            if (!activity.leaderQYL.equals(activityObj.get(PARSE_CONST.KEY_QUALIFIED_YOUTH_LEAD))) {
                activityObj.set(PARSE_CONST.KEY_QUALIFIED_YOUTH_LEAD, activity.leaderQYL);
            }

            // Check if any field has been added or changed
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

                        scrapeActivityPromise.resolve();
                    },
                    // Error saving activity to Parse class
                    error: function (activityObjSave, error) {
                        // Show error message
                        console.log("Failed to save activity id = " + activity.id + ".  Error code "
                            + error.code + ": " + error.message);

                        // No big deal - the filters will be updated on the next scraping (run every x minutes on Parse)
                        scrapeActivityPromise.reject("Failed to save activity id = " + activity.id + ".  Error code "
                            + error.code + ": " + error.message);
                    }
                });
            }
            else {  // No need to update the object
                scrapeActivityPromise.resolve();
            }
        }, function (error) {  // Query was not able to run
            console.log(error);  // Show error message

            // No big deal - the filters will be updated on the next scraping (run every x minutes on Parse)
            scrapeActivityPromise.reject(error);
        });

        return scrapeActivityPromise;
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
        url: "https://www.mountaineers.org/upcoming-trips.json",
        headers: {
            'User-Agent' : "Mountaineers App Back-End"
        }
    }).then(function(httpResponse) {
        var jsObject = JSON.parse(httpResponse.text);
        totalActivities = jsObject.length;

        // Load the activity object
        for (var i = 0; i < jsObject.length; i++) {
            promises.push(scrapeActivity(jsObject[i]));
        }

        return Parse.Promise.when(promises);  // Wait until all promises return resolved (or there is a rejection)
    }).then(function() {
        onCompletionListener.resolve();  // Tell the listener all promises were resolved
    }, function (error) {
        onCompletionListener.reject(error);  // Send error through to listener
    });
});