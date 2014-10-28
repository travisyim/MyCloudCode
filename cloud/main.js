// The following code uses jquery-2.1.1.js, to process (i.e. parse) the JSON data

Parse.Cloud.job("UpdateActivities", function (request, status) {
    // Constant declaration for all things JSON related (i.e. attribues listed in Mountaineers' JSON feed)
    var JSON_CONST = {
        // Audience
        KEY_AUDIENCE_ADULTS: "Adults",
        KEY_AUDIENCE_FAMILIES: "Families",
        KEY_AUDIENCE_RETIRED_ROVERS: "Retired Rovers",
        KEY_AUDIENCE_SINGLES: "Singles",
        KEY_AUDIENCE_20_30_SOMETHINGS: "20-30 Somethings",
        KEY_AUDIENCE_YOUTH: "Youth",
        // Branch
        KEY_BRANCH_THE_MOUNTAINEERS: "The Mountaineers",
        KEY_BRANCH_BELLINGHAM: "Bellingham",
        KEY_BRANCH_EVERETT: "Everett",
        KEY_BRANCH_FOOTHILLS: "Foothills",
        KEY_BRANCH_KITSAP: "Kitsap",
        KEY_BRANCH_OLYMPIA: "Olympia",
        KEY_BRANCH_OUTDOOR_CENTERS: "Outdoor Centers",
        KEY_BRANCH_SEATTLE: "Seattle",
        KEY_BRANCH_TACOMA: "Tacoma",
        // Climbing
        KEY_CLIMBING_BASIC_ALPINE: "Basic Alpine",
        KEY_CLIMBING_INTERMEDIATE_ALPINE: "Intermediate Alpine",
        KEY_CLIMBING_AID_CLIMB: "Aid Climb",
        KEY_CLIMBING_ROCK_CLIMB: "Rock Climb",
        // Rating
        KEY_RATING_FOR_BEGINNERS: "For Beginners (Getting Started Series)",
        KEY_RATING_EASY: "Easy",
        KEY_RATING_MODERATE: "Moderate",
        KEY_RATING_CHALLENGING: "Challenging",
        // Skiing
        KEY_SKIING_CROSS_COUNTRY: "Cross-country",
        KEY_SKIING_BACKCOUNTRY: "Backcountry",
        KEY_SKIING_GLACIER: "Glacier",
        // Snowshoeing
        KEY_SNOWSHOEING_BEGINNER: "Beginner",
        KEY_SNOWSHOEING_BASIC: "Basic",
        KEY_SNOWSHOEING_INTERMEDIATE: "Intermediate",
        // Type
        KEY_TYPE_ADVENTURE_CLUB: "Adventure Club",
        KEY_TYPE_BACKPACKING: "Backpacking",
        KEY_TYPE_CLIMBING: "Climbing",
        KEY_TYPE_DAY_HIKING: "Day Hiking",
        KEY_TYPE_EXPLORERS: "Explorers",
        KEY_TYPE_EXPLORING_NATURE: "Exploring Nature",
        KEY_TYPE_GLOBAL_ADVENTURES: "Global Adventures",
        KEY_TYPE_MOUNTAIN_WORKSHOP: "Mountain Workshop",
        KEY_TYPE_NAVIGATION: "Navigation",
        KEY_TYPE_PHOTOGRAPHY: "Photography",
        KEY_TYPE_SAILING: "Sailing",
        KEY_TYPE_SCRAMBLING: "Scrambling",
        KEY_TYPE_SEA_KAYAKING: "Sea Kayaking",
        KEY_TYPE_SKIING_SNOWBOARDING: "Skiing/Snowboarding",
        KEY_TYPE_SNOWSHOEING: "Snowshoeing",
        KEY_TYPE_STEWARDSHIP: "Stewardship",
        KEY_TYPE_TRAIL_RUNNING: "Trail Running",
        KEY_TYPE_URBAN_ADVENTURE: "Urban Adventure",
        KEY_TYPE_YOUTH: "Youth"
    };

    // Constant declaration for all things Parse related (i.e. Parse database field names)
    var PARSE_CONST = {
        // Classes
        CLASS_ACTIVITY: "Test",

        // Trip Information
        KEY_ACTIVITY_ID: "activityId",
        KEY_ACTIVITY_TITLE: "title",
        KEY_ACTIVITY_TITLE_HEADER: "titleHeader",
        KEY_ACTIVITY_TYPE: "type",
        KEY_ACTIVITY_END_DATE: "activityEndDate",
        KEY_ACTIVITY_START_DATE: "activityStartDate",
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
        KEY_START_LATITUDE: "startLat",
        KEY_START_LONGITUDE: "startLong",
        KEY_STATUS: "status",

        // Filter Categories
        // Audience
        KEY_AUDIENCE_ADULTS: "isAudienceAdults",
        KEY_AUDIENCE_FAMILIES: "isAudienceFamilies",
        KEY_AUDIENCE_RETIRED_ROVERS: "isAudienceRetiredRovers",
        KEY_AUDIENCE_SINGLES: "isAudienceSingles",
        KEY_AUDIENCE_20_30_SOMETHINGS: "isAudience2030Somethings",
        KEY_AUDIENCE_YOUTH: "isAudienceYouth",
        // Branch
        KEY_BRANCH_THE_MOUNTAINEERS: "isBranchTheMountaineers",
        KEY_BRANCH_BELLINGHAM: "isBranchBellingham",
        KEY_BRANCH_EVERETT: "isBranchEverett",
        KEY_BRANCH_FOOTHILLS: "isBranchFoothills",
        KEY_BRANCH_KITSAP: "isBranchKitsap",
        KEY_BRANCH_OLYMPIA: "isBranchOlympia",
        KEY_BRANCH_OUTDOOR_CENTERS: "isBranchOutdoorCenters",
        KEY_BRANCH_SEATTLE: "isBranchSeattle",
        KEY_BRANCH_TACOMA: "isBranchTacoma",
        // Climbing
        KEY_CLIMBING_BASIC_ALPINE: "isClimbingBasicAlpine",
        KEY_CLIMBING_INTERMEDIATE_ALPINE: "isClimbingIntermediateAlpine",
        KEY_CLIMBING_AID_CLIMB: "isClimbingAidClimb",
        KEY_CLIMBING_ROCK_CLIMB: "isClimbingRockClimb",
        // Leader Rating
        KEY_RATING_FOR_BEGINNERS: "isRatingForBeginners",
        KEY_RATING_EASY: "isRatingEasy",
        KEY_RATING_MODERATE: "isRatingModerate",
        KEY_RATING_CHALLENGING: "isRatingChallenging",
        // Skiing
        KEY_SKIING_CROSS_COUNTRY: "isSkiingCrossCountry",
        KEY_SKIING_BACKCOUNTRY: "isSkiingBackcountry",
        KEY_SKIING_GLACIER: "isSkiingGlacier",
        // Snowshoeing
        KEY_SNOWSHOEING_BEGINNER: "isSnowshoeingBeginner",
        KEY_SNOWSHOEING_BASIC: "isSnowshoeingBasic",
        KEY_SNOWSHOEING_INTERMEDIATE: "isSnowshoeingIntermediate",
        // Type
        KEY_TYPE_ADVENTURE_CLUB: "isTypeAdventureClub",
        KEY_TYPE_BACKPACKING: "isTypeBackpacking",
        KEY_TYPE_CLIMBING: "isTypeClimbing",
        KEY_TYPE_DAY_HIKING: "isTypeDayHiking",
        KEY_TYPE_EXPLORERS: "isTypeExplorers",
        KEY_TYPE_EXPLORING_NATURE: "isTypeExploringNature",
        KEY_TYPE_GLOBAL_ADVENTURES: "isTypeGlobalAdventures",
        KEY_TYPE_MOUNTAIN_WORKSHOP: "isTypeMountainWorkshop",
        KEY_TYPE_NAVIGATION: "isTypeNavigation",
        KEY_TYPE_PHOTOGRAPHY: "isTypePhotography",
        KEY_TYPE_SAILING: "isTypeSailing",
        KEY_TYPE_SCRAMBLING: "isTypeScrambling",
        KEY_TYPE_SEA_KAYAKING: "isTypeSeaKayaking",
        KEY_TYPE_SKIING_SNOWBOARDING: "isTypeSkiingSnowboarding",
        KEY_TYPE_SNOWSHOEING: "isTypeSnowshoeing",
        KEY_TYPE_STEWARDSHIP: "isTypeStewardship",
        KEY_TYPE_TRAIL_RUNNING: "isTypeTrailRunning",
        KEY_TYPE_URBAN_ADVENTURE: "isTypeUrbanAdventure",
        KEY_TYPE_YOUTH: "isTypeYouth"
    };

    function ActivityObject(){
        this.id = null;
        this.title = null;
        this.titleHeader = null;
        this.type = [];
        this.created = null;
        this.modified = null;
        this.start = null;
        this.end = null;
        this.url = null;
        this.audience = null;
        this.leaderAvail = null;
        this.leaderWaitlist = null;
        this.participantAvail = null;
        this.participantWaitlist = null;
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
        this.isTypeAdventureClub = false;
        this.isTypeBackpacking = false;
        this.isTypeClimbing = false;
        this.isTypeDayHiking = false;
        this.isTypeExplorers = false;
        this.isTypeExploringNature = false;
        this.isTypeGlobalAdventures = false;
        this.isTypeMountainWorkshop = false;
        this.isTypeNavigation = false;
        this.isTypePhotography = false;
        this.isTypeSailing = false;
        this.isTypeScrambling = false;
        this.isTypeSeaKayaking = false;
        this.isTypeSkiingSnowboarding = false;
        this.isTypeSnowshoeing = false;
        this.isTypeStewardship = false;
        this.isTypeTrailRunning = false;
        this.isTypeUrbanAdventure = false;
        this.isTypeYouth = false;
        this.isRatingForBeginners = false;
        this.isRatingEasy = false;
        this.isRatingModerate = false;
        this.isRatingChallenging = false;
        this.isAudienceAdults = false;
        this.isAudienceFamilies = false;
        this.isAudienceRetiredRovers = false;
        this.isAudienceSingles = false;
        this.isAudience2030Somethings = false;
        this.isAudienceYouth = false;
        this.isBranchTheMountaineers = false;
        this.isBranchBellingham = false;
        this.isBranchEverett = false;
        this.isBranchFoothills = false;
        this.isBranchKitsap = false;
        this.isBranchOlympia = false;
        this.isBranchOutdoorCenters = false;
        this.isBranchSeattle = false;
        this.isBranchTacoma = false;
        this.isClimbingBasicAlpine = false;
        this.isClimbingIntermediateAlpine = false;
        this.isClimbingAidClimb = false;
        this.isClimbingRockClimb = false;
        this.isSkiingCrossCountry = false;
        this.isSkiingBackcountry = false;
        this.isSkiingGlacier = false;
        this.isSnowshoeingBeginner = false;
        this.isSnowshoeingBasic = false;
        this.isSnowshoeingIntermediate = false;
    }

    var ActivityClass = Parse.Object.extend(PARSE_CONST.CLASS_ACTIVITY);  // Make connection to Activity class
    var promises = [];  // This variable will hold all of the activity scraping promises
    var newActivities = 0;  // Counter for new activities added
    var updatedActivities = 0;  // Counter for updated existing activities
    var totalActivities = 0;  // Keeps track of all activities reviewed for changed content (excluded filter criteria)
    var startTime = new Date();
    var numComplete = 0;

    // Define listener to handle completion event
    var onCompletionListener = new Parse.Promise();  // Create a trivial resolved promise as a base case
    onCompletionListener.then(function() {  // Overall job was successful
        status.success("A total of " + totalActivities + " activities were reviewed: " + newActivities +
                " activities added and " + updatedActivities + " activities updated.  Scraping took " +
            (new Date().getTime() - startTime.getTime()) / 1000 + " seconds.");
    }, function(error) {  // Overall job failed
        status.error(error.toString());
    });

    // Custom code for the .equals method of the Array's prototype (allows comparison of one array to another)
    Array.prototype.equals = function (array) {
        // Check to see if the other array is a falsy value (i.e. undefined)
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

    // Custom code for the .equals method of the Date's prototype (allows comparison of one date to another)
    Date.prototype.equals = function (value) {
        // Check to see if the other value is a falsy value (i.e. undefined)
        if (!value) {
            return false;
        }
        else if (this.getTime() !== value.getTime()) {  // Dates are not equal
            return false;
        }

        return true;
    };

    // This function assigns the activity keywords based on the provided field
    function getKeywords(field) {
        var _ = require("underscore");  // Require underscore.js

        var toLowerCase = function(w) {
            return w.toLowerCase();
        };

        var ignoreWords = ["the", "in", "and", "to", "of", "at", "for", "from", "a", "an", "s"];  // Words to ignore
        var keywords = field.split(/\b/);  // Split word by borders

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
    function areKeywordsEqual(curKeywords, prevKeywords) {
        var _ = require("underscore");  // Require underscore.js

        // Filter which current keywords are contained within the previous keywords
        var commonKeywords = _.filter(curKeywords, function(w) {
            return _.contains(prevKeywords, w);
        });

        // Check if all keywords are common
        if (commonKeywords.length !== curKeywords.length) {
            return false;
        }

        return true;  // Return number of common keywords
    }

    /* This function accepts the JSON-formatted activity list (in the form of a JSON object), searches for updates or
     * additions and saves them in the backend */
    function scrapeActivity(jsObject) {
        var scrapeActivityPromise = new Parse.Promise();
        var activityObj = new ActivityClass();
        var activity = new ActivityObject();
        var query;
        var keywords = [];
        var leaderRoleTypes = [0,0,0,0,0,0];
        var leaderPosition = 0;
        var exists = false;
        var i;

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
        activity.leaderWaitlist = jsObject.leader_waitlist_length;
        activity.participantAvail = jsObject.participant_availability;
        activity.participantWaitlist = jsObject.participant_waitlist_length;
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
            return Parse.Promise.error("Not able to check activity id " + activity.id);
        }).then(function () {  // No error encountered while running query
            // Activity ID
            if (activity.id !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_ID)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_ID, activity.id);
            }

            // Title Information
            // Check if this is a cross-country trip
            if (activity.title.indexOf("Cross-country") === 0) {  // Yes
                // Assign title header
                activity.titleHeader = activity.title.substr(0, activity.title.indexOf("-", "Cross-country".length)).trim();
                // Remove the initial chunk that has the hyphen
                activity.title = activity.title.replace("Cross-country", "");
            }
            else {
                // Assign title header
                activity.titleHeader = activity.title.substr(0, activity.title.indexOf("-")).trim();
            }

            // Only keep the actual activity title
            activity.title = activity.title.substr(activity.title.indexOf("-") + 1).trim();

            // Activity Title
            if (activity.title !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_TITLE)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_TITLE, activity.title);
            }

            // Activity Title Header
            if (activity.titleHeader !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_TITLE_HEADER)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_TITLE_HEADER, activity.titleHeader);
            }

            // Activity Type Category
            if (activity.type) {  // Ignore null types
                for (i = 0; i < activity.type.length; i++) {
                    // Determine which categories are listed
                    if (activity.type[i] === JSON_CONST.KEY_TYPE_ADVENTURE_CLUB) {
                        activity.isTypeAdventureClub = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_BACKPACKING) {
                        activity.isTypeBackpacking = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_CLIMBING) {
                        activity.isTypeClimbing = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_DAY_HIKING) {
                        activity.isTypeDayHiking = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_EXPLORERS) {
                        activity.isTypeExplorers = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_EXPLORING_NATURE) {
                        activity.isTypeExploringNature = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_GLOBAL_ADVENTURES) {
                        activity.isTypeGlobalAdventures = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_MOUNTAIN_WORKSHOP) {
                        activity.isTypeMountainWorkshop = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_NAVIGATION) {
                        activity.isTypeNavigation = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_PHOTOGRAPHY) {
                        activity.isTypePhotography = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_SAILING) {
                        activity.isTypeSailing = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_SCRAMBLING) {
                        activity.isTypeScrambling = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_SEA_KAYAKING) {
                        activity.isTypeSeaKayaking = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_SKIING_SNOWBOARDING) {
                        activity.isTypeSkiingSnowboarding = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_SNOWSHOEING) {
                        activity.isTypeSnowshoeing = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_STEWARDSHIP) {
                        activity.isTypeStewardship = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_TRAIL_RUNNING) {
                        activity.isTypeTrailRunning = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_URBAN_ADVENTURE) {
                        activity.isTypeUrbanAdventure = true;
                    }
                    else if (activity.type[i] === JSON_CONST.KEY_TYPE_YOUTH) {
                        activity.isTypeYouth = true;
                    }
                    else {  // New activity type that is not currently accounted for
                        console.log("New activity type: " + activity.type[i]);
                    }
                }
            }

            // Save entire type array to Parse if it has changed
            if (activity.type !== null && !activity.type.equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_TYPE))
                || (activity.type === null && activityObj.get(PARSE_CONST.KEY_ACTIVITY_TYPE) !== null)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_TYPE, activity.type);
            }

            // Now assign the values for the activity type categories
            if (activity.isTypeAdventureClub !== activityObj.get(PARSE_CONST.KEY_TYPE_ADVENTURE_CLUB)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_ADVENTURE_CLUB, activity.isTypeAdventureClub);
            }
            if (activity.isTypeBackpacking !== activityObj.get(PARSE_CONST.KEY_TYPE_BACKPACKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_BACKPACKING, activity.isTypeBackpacking);
            }
            if (activity.isTypeClimbing !== activityObj.get(PARSE_CONST.KEY_TYPE_CLIMBING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_CLIMBING, activity.isTypeClimbing);
            }
            if (activity.isTypeDayHiking !== activityObj.get(PARSE_CONST.KEY_TYPE_DAY_HIKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_DAY_HIKING, activity.isTypeDayHiking);
            }
            if (activity.isTypeExplorers !== activityObj.get(PARSE_CONST.KEY_TYPE_EXPLORERS)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_EXPLORERS, activity.isTypeExplorers);
            }
            if (activity.isTypeExploringNature !== activityObj.get(PARSE_CONST.KEY_TYPE_EXPLORING_NATURE)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_EXPLORING_NATURE, activity.isTypeExploringNature);
            }
            if (activity.isTypeGlobalAdventures !== activityObj.get(PARSE_CONST.KEY_TYPE_GLOBAL_ADVENTURES)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_GLOBAL_ADVENTURES, activity.isTypeGlobalAdventures);
            }
            if (activity.isTypeMountainWorkshop !== activityObj.get(PARSE_CONST.KEY_TYPE_MOUNTAIN_WORKSHOP)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_MOUNTAIN_WORKSHOP, activity.isTypeMountainWorkshop);
            }
            if (activity.isTypeNavigation !== activityObj.get(PARSE_CONST.KEY_TYPE_NAVIGATION)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_NAVIGATION, activity.isTypeNavigation);
            }
            if (activity.isTypePhotography !== activityObj.get(PARSE_CONST.KEY_TYPE_PHOTOGRAPHY)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_PHOTOGRAPHY, activity.isTypePhotography);
            }
            if (activity.isTypeSailing !== activityObj.get(PARSE_CONST.KEY_TYPE_SAILING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SAILING, activity.isTypeSailing);
            }
            if (activity.isTypeScrambling !== activityObj.get(PARSE_CONST.KEY_TYPE_SCRAMBLING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SCRAMBLING, activity.isTypeScrambling);
            }
            if (activity.isTypeSeaKayaking !== activityObj.get(PARSE_CONST.KEY_TYPE_SEA_KAYAKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SEA_KAYAKING, activity.isTypeSeaKayaking);
            }
            if (activity.isTypeSkiingSnowboarding !== activityObj.get(PARSE_CONST.KEY_TYPE_SKIING_SNOWBOARDING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SKIING_SNOWBOARDING, activity.isTypeSkiingSnowboarding);
            }
            if (activity.isTypeSnowshoeing !== activityObj.get(PARSE_CONST.KEY_TYPE_SNOWSHOEING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SNOWSHOEING, activity.isTypeSnowshoeing);
            }
            if (activity.isTypeStewardship !== activityObj.get(PARSE_CONST.KEY_TYPE_STEWARDSHIP)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_STEWARDSHIP, activity.isTypeStewardship);
            }
            if (activity.isTypeTrailRunning !== activityObj.get(PARSE_CONST.KEY_TYPE_TRAIL_RUNNING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_TRAIL_RUNNING, activity.isTypeTrailRunning);
            }
            if (activity.isTypeUrbanAdventure !== activityObj.get(PARSE_CONST.KEY_TYPE_URBAN_ADVENTURE)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_URBAN_ADVENTURE, activity.isTypeUrbanAdventure);
            }
            if (activity.isTypeYouth !== activityObj.get(PARSE_CONST.KEY_TYPE_YOUTH)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_YOUTH, activity.isTypeYouth);
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
            if (!new Date(activity.start).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_START_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_START_DATE, new Date(activity.start));
            }

            // Activity End Date
            if (!new Date(activity.end).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_END_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_END_DATE, new Date(activity.end));
            }

            // Activity URL
            if (activity.url !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_URL)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_URL, activity.url);
            }

            // Audience - "For" Category
            for (i = 0; i < activity.audience.length; i++) {
                // Determine which categories are listed
                if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_ADULTS) {
                    activity.isAudienceAdults = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_FAMILIES) {
                    activity.isAudienceFamilies = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_RETIRED_ROVERS) {
                    activity.isAudienceRetiredRovers = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_SINGLES) {
                    activity.isAudienceSingles = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_20_30_SOMETHINGS) {
                    activity.isAudience2030Somethings = true;
                }
                else if (activity.audience[i] === JSON_CONST.KEY_AUDIENCE_YOUTH) {
                    activity.isAudienceYouth = true;
                }
                else {  // New audience category that is not currently accounted for
                    console.log("New audience category: " + activity.audience[i]);
                }
            }

            // Now assign the values for the audience categories
            if (activity.isAudienceAdults !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_ADULTS)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_ADULTS, activity.isAudienceAdults);
            }
            if (activity.isAudienceFamilies !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_FAMILIES)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_FAMILIES, activity.isAudienceFamilies);
            }
            if (activity.isAudienceRetiredRovers !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_RETIRED_ROVERS)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_RETIRED_ROVERS, activity.isAudienceRetiredRovers);
            }
            if (activity.isAudienceSingles !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_SINGLES)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_SINGLES, activity.isAudienceSingles);
            }
            if (activity.isAudience2030Somethings !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_20_30_SOMETHINGS)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_20_30_SOMETHINGS, activity.isAudience2030Somethings);
            }
            if (activity.isAudienceYouth !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_YOUTH)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_YOUTH, activity.isAudienceYouth);
            }

            // Availability - Leader
            if (activity.leaderAvail === 0) {  // No leader space available on the trip
                if (-activity.leaderWaitlist !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_LEADER)) {
                    activityObj.set(PARSE_CONST.KEY_AVAILABILITY_LEADER, -activity.leaderWaitlist);
                }
            }
            else {  // Still leader room on trip
                if (activity.leaderAvail !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_LEADER)) {
                    activityObj.set(PARSE_CONST.KEY_AVAILABILITY_LEADER, activity.leaderAvail);
                }
            }


            // Availability - Participant
            if (activity.participantAvail === 0) {  // No participant space available on the trip
                if (-activity.participantWaitlist !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT)) {
                    activityObj.set(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT, -activity.participantWaitlist);
                }
            }
            else {  // Still participant room on trip
                if (activity.participantAvail !== activityObj.get(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT)) {
                    activityObj.set(PARSE_CONST.KEY_AVAILABILITY_PARTICIPANT, activity.participantAvail);
                }
            }

            // Branch Category
            // Determine which category is listed (only one branch category can be assigned)
            if (activity.branch === JSON_CONST.KEY_BRANCH_THE_MOUNTAINEERS) {
                activity.isBranchTheMountaineers = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_BELLINGHAM) {
                activity.isBranchBellingham = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_EVERETT) {
                activity.isBranchEverett = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_FOOTHILLS) {
                activity.isBranchFoothills = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_KITSAP) {
                activity.isBranchKitsap = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_OLYMPIA) {
                activity.isBranchOlympia = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_OUTDOOR_CENTERS) {
                activity.isBranchOutdoorCenters = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_SEATTLE) {
                activity.isBranchSeattle = true;
            }
            else if (activity.branch === JSON_CONST.KEY_BRANCH_TACOMA) {
                activity.isBranchTacoma = true;
            }
            else if (activity.branch) {  // New branch that is not currently accounted for
                console.log("New branch: " + activity.branch);
            }

            // Now assign the values for the audience categories
            if (activity.isBranchTheMountaineers !== activityObj.get(PARSE_CONST.KEY_BRANCH_THE_MOUNTAINEERS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_THE_MOUNTAINEERS, activity.isBranchTheMountaineers);
            }
            if (activity.isBranchBellingham !== activityObj.get(PARSE_CONST.KEY_BRANCH_BELLINGHAM)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_BELLINGHAM, activity.isBranchBellingham);
            }
            if (activity.isBranchEverett !== activityObj.get(PARSE_CONST.KEY_BRANCH_EVERETT)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_EVERETT, activity.isBranchEverett);
            }
            if (activity.isBranchFoothills !== activityObj.get(PARSE_CONST.KEY_BRANCH_FOOTHILLS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_FOOTHILLS, activity.isBranchFoothills);
            }
            if (activity.isBranchKitsap !== activityObj.get(PARSE_CONST.KEY_BRANCH_KITSAP)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_KITSAP, activity.isBranchKitsap);
            }
            if (activity.isBranchOlympia !== activityObj.get(PARSE_CONST.KEY_BRANCH_OLYMPIA)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_OLYMPIA, activity.isBranchOlympia);
            }
            if (activity.isBranchOutdoorCenters !== activityObj.get(PARSE_CONST.KEY_BRANCH_OUTDOOR_CENTERS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_OUTDOOR_CENTERS, activity.isBranchOutdoorCenters);
            }
            if (activity.isBranchSeattle !== activityObj.get(PARSE_CONST.KEY_BRANCH_SEATTLE)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_SEATTLE, activity.isBranchSeattle);
            }
            if (activity.isBranchTacoma !== activityObj.get(PARSE_CONST.KEY_BRANCH_TACOMA)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_TACOMA, activity.isBranchTacoma);
            }

            // Climbing Category
            // Determine which category is listed (only one climbing category can be assigned)
            if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_BASIC_ALPINE) {
                activity.isClimbingBasicAlpine = true;
            }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE) {
                activity.isClimbingIntermediateAlpine = true;
            }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_AID_CLIMB) {
                activity.isClimbingAidClimb = true;
            }
            else if (activity.climbingCat === JSON_CONST.KEY_CLIMBING_ROCK_CLIMB) {
                activity.isClimbingRockClimb = true;
            }
            else if (activity.climbingCat !== null) {  // New climbing category that is not currently accounted for
                console.log("New climbing category: " + activity.climbingCat);
            }

            // Now assign the values for the climbing categories
            if (activity.isClimbingBasicAlpine !== activityObj.get(PARSE_CONST.KEY_CLIMBING_BASIC_ALPINE)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_BASIC_ALPINE, activity.isClimbingBasicAlpine);
            }
            if (activity.isClimbingIntermediateAlpine !== activityObj.get(PARSE_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE, activity.isClimbingIntermediateAlpine);
            }
            if (activity.isClimbingAidClimb !== activityObj.get(PARSE_CONST.KEY_CLIMBING_AID_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_AID_CLIMB, activity.isClimbingAidClimb);
            }
            if (activity.isClimbingRockClimb !== activityObj.get(PARSE_CONST.KEY_CLIMBING_ROCK_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_ROCK_CLIMB, activity.isClimbingRockClimb);
            }

            // Skiing Category
            // Determine which category is listed (only one skiing category can be assigned)
            if (activity.skiingCat === JSON_CONST.KEY_SKIING_CROSS_COUNTRY) {
                activity.isSkiingCrossCountry = true;
            }
            else if (activity.skiingCat === JSON_CONST.KEY_SKIING_BACKCOUNTRY) {
                activity.isSkiingBackcountry = true;
            }
            else if (activity.skiingCat === JSON_CONST.KEY_SKIING_GLACIER) {
                activity.isSkiingGlacier = true;
            }
            else if (activity.skiingCat !== null) {  // New skiing category that is not currently accounted for
                console.log("New skiing category: " + activity.skiingCat);
            }

            // Now assign the values for the skiing categories
            if (activity.isSkiingCrossCountry !== activityObj.get(PARSE_CONST.KEY_SKIING_CROSS_COUNTRY)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_CROSS_COUNTRY, activity.isSkiingCrossCountry);
            }
            if (activity.isSkiingBackcountry !== activityObj.get(PARSE_CONST.KEY_SKIING_BACKCOUNTRY)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_BACKCOUNTRY, activity.isSkiingBackcountry);
            }
            if (activity.isSkiingGlacier !== activityObj.get(PARSE_CONST.KEY_SKIING_GLACIER)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_GLACIER, activity.isSkiingGlacier);
            }

            // Snowshoeing Category
            // Determine which category is listed (only one snowshoeing category can be assigned)
            if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_BEGINNER) {
                activity.isSnowshoeingBeginner = true;
            }
            else if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_BASIC) {
                activity.isSnowshoeingBasic = true;
            }
            else if (activity.snowshoeingCat === JSON_CONST.KEY_SNOWSHOEING_INTERMEDIATE) {
                activity.isSnowshoeingIntermediate = true;
            }
            else if (activity.snowshoeingCat !== null) {  // New snowshoeing category that is not currently accounted for
                console.log("New snowshoeing category: " + activity.snowshoeingCat);
            }

            // Now assign the values for the snowshoeing categories
            if (activity.isSnowshoeingBeginner !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING_BEGINNER)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING_BEGINNER, activity.isSnowshoeingBeginner);
            }
            if (activity.isSnowshoeingBasic !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING_BASIC)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING_BASIC, activity.isSnowshoeingBasic);
            }
            if (activity.isSnowshoeingIntermediate !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING_INTERMEDIATE)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING_INTERMEDIATE, activity.isSnowshoeingIntermediate);
            }

            // Difficulty
            if ((activity.difficulty !== null && !activity.difficulty.equals(activityObj.get(PARSE_CONST.KEY_DIFFICULTY)))
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
            if (parseFloat(activity.guestFee) !== activityObj.get(PARSE_CONST.KEY_FEE_GUEST)) {
                activityObj.set(PARSE_CONST.KEY_FEE_GUEST, parseFloat(activity.guestFee));
            }

            // Member Fee
            if (parseFloat(activity.memberFee) !== activityObj.get(PARSE_CONST.KEY_FEE_MEMBER)) {
                activityObj.set(PARSE_CONST.KEY_FEE_MEMBER, parseFloat(activity.memberFee));
            }

            // Image URL
            if (activity.imageUrl !== activityObj.get(PARSE_CONST.KEY_IMAGE_URL)) {
                activityObj.set(PARSE_CONST.KEY_IMAGE_URL, activity.imageUrl);
            }

            // Leader Rating Category
            // Determine which category is listed (only one leader rating category can be assigned)
            if (activity.leaderRating === JSON_CONST.KEY_RATING_FOR_BEGINNERS) {
                activity.isRatingForBeginners = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_RATING_EASY) {
                activity.isRatingEasy = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_RATING_MODERATE) {
                activity.isRatingModerate = true;
            }
            else if (activity.leaderRating === JSON_CONST.KEY_RATING_CHALLENGING) {
                activity.isRatingChallenging = true;
            }
            else if (activity.leaderRating !== null) {  // New leader rating category that is not currently accounted for
                console.log("New leader rating category: " + activity.leaderRating);
            }

            // Now assign the values for the leader rating categories
            if (activity.isRatingForBeginners !== activityObj.get(PARSE_CONST.KEY_RATING_FOR_BEGINNERS)) {
                activityObj.set(PARSE_CONST.KEY_RATING_FOR_BEGINNERS, activity.isRatingForBeginners);
            }
            if (activity.isRatingEasy !== activityObj.get(PARSE_CONST.KEY_RATING_EASY)) {
                activityObj.set(PARSE_CONST.KEY_RATING_EASY, activity.isRatingEasy);
            }
            if (activity.isRatingModerate !== activityObj.get(PARSE_CONST.KEY_RATING_MODERATE)) {
                activityObj.set(PARSE_CONST.KEY_RATING_MODERATE, activity.isRatingModerate);
            }
            if (activity.isRatingChallenging !== activityObj.get(PARSE_CONST.KEY_RATING_CHALLENGING)) {
                activityObj.set(PARSE_CONST.KEY_RATING_CHALLENGING, activity.isRatingChallenging);
            }

            // Prerequisites
            if (!activity.prerequisites.equals(activityObj.get(PARSE_CONST.KEY_PREREQUISITES))) {
                activityObj.set(PARSE_CONST.KEY_PREREQUISITES, activity.prerequisites);
            }

            // Registration Open Time
            if (!new Date(activity.registrationStart).equals(activityObj.get(PARSE_CONST.KEY_REGISTRATION_OPEN_TIME))) {
                activityObj.set(PARSE_CONST.KEY_REGISTRATION_OPEN_TIME, new Date(activity.registrationStart));
            }

            // Registration Close Time
            if (!new Date(activity.registrationEnd).equals(activityObj.get(PARSE_CONST.KEY_REGISTRATION_CLOSE_TIME))) {
                activityObj.set(PARSE_CONST.KEY_REGISTRATION_CLOSE_TIME, new Date(activity.registrationEnd));
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
                // Check leader role type
                if (activity.leaders[i].role.indexOf("Instructor") != -1) {  // Instructor
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0];
                    leaderRoleTypes[0]++;  // Increment number of instructors
                }
                else if (activity.leaders[i].role.indexOf("Primary") != -1) {  // Primary Leader
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0] + leaderRoleTypes[1];
                    leaderRoleTypes[1]++;  // Increment number of primary leaders
                }
                else if (activity.leaders[i].role.indexOf("Co") != -1) {  // Co-Leader
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0] + leaderRoleTypes[1] + leaderRoleTypes[2];
                    leaderRoleTypes[2]++;  // Increment number of co-leaders
                }
                else if (activity.leaders[i].role.indexOf("Assistant") != -1) {  // Assistant Leader
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0] + leaderRoleTypes[1] + leaderRoleTypes[2] + leaderRoleTypes[3];
                    leaderRoleTypes[3]++;  // Increment number of assistant leaders
                }
                else if (activity.leaders[i].role.indexOf("Mentored") != -1) {  // Mentored Leader
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0] + leaderRoleTypes[1] + leaderRoleTypes[2] + leaderRoleTypes[3]
                        + leaderRoleTypes[4];
                    leaderRoleTypes[4]++;  // Increment number of mentored leaders
                }
                else {  // Unknown leader type
                    // Determine location in arrays to add information
                    leaderPosition = leaderRoleTypes[0] + leaderRoleTypes[1] + leaderRoleTypes[2] + leaderRoleTypes[3]
                        + leaderRoleTypes[4] + leaderRoleTypes[5];
                    leaderRoleTypes[5]++;  // Increment number of unknown leader types

                    console.log("New leader role type: " + activity.leaders[i].role);
                }

                // Add leader information to the arrays
                activity.leaderName.splice(leaderPosition, 0, activity.leaders[i].name);
                activity.leaderRole.splice(leaderPosition, 0, activity.leaders[i].role);
                activity.leaderQYL.splice(leaderPosition, 0, activity.leaders[i].qualified_youth_leader);
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

            // Keywords
            // Process unique keywords based on title, title header and leader names
            keywords = getKeywords((activity.title + "," + activity.titleHeader + "," + activity.leaderName.join())
                .toLowerCase());

            if (!areKeywordsEqual(keywords, activityObj.get(PARSE_CONST.KEY_KEYWORDS))) {
                activityObj.set(PARSE_CONST.KEY_KEYWORDS, keywords);
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
                        scrapeActivityPromise.resolve("Failed to save activity id = " + activity.id + ".  Error code "
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
            scrapeActivityPromise.resolve(error);
        });

        return scrapeActivityPromise;
    }

    function recursive(jsObject) {
        var increment = 1;

        // Load the activity object
        for (var i = numComplete; i < numComplete + increment && i < jsObject.length; i++) {
            promises.push(scrapeActivity(jsObject[i]));
        }

        // Wait until all promises return resolved (or there is a rejection)
        Parse.Promise.when(promises).then(function () {
            numComplete = numComplete + increment;  // Increment the counter

            // Check whether another recursive run is required to get all of the activities
            if (numComplete < jsObject.length) {
                recursive(jsObject);
            }
            else {
                onCompletionListener.resolve();  // Tell the listener all promises were resolved
            }
        }, function (error) {
            onCompletionListener.reject(error);  // Send error through to listener
        });
    }

    // The code below is what drives this Cloud Background Job.

    // Request the activity data in JSON format
    Parse.Cloud.httpRequest({
        url: "https://www.mountaineers.org/upcoming-trips.json",
        headers: {
            'User-Agent' : "Mountaineers App Back-End"
        }
    }).then(function(httpResponse) {
        // Hello object literal!
        var jsObject = JSON.parse(httpResponse.text);
        totalActivities = jsObject.length;

        // Recursive batch activity scrapings
        recursive(jsObject);
    }, function (error) {
        onCompletionListener.reject(error);  // Send error through to listener
    });
});