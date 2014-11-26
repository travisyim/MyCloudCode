// Global constant declaration for all things Parse related (i.e. Parse database field names)
var PARSE_CONST = {
    // Classes
    CLASS_ACTIVITY: "Activities",
    CLASS_SAVED_SEARCHES: "Searches",

    // Fields
    KEY_OBJECT_ID: "objectId",
    KEY_USERNAME: "username",
    KEY_PASSWORD: "password",
    KEY_PWD: "pwd",
    KEY_MEMBER_URL: "memberUrl",
    KEY_SAVE_NAME: "searchName",
    KEY_LAST_ACCESS: "lastAccess",
    KEY_UPDATE_COUNT: "updateCount",
    KEY_USER_ID: "userId",
    KEY_USER_OBJECT_ID: "userObjectId",


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
    KEY_TYPE_YOUTH: "isTypeYouth",

    // Activity creation and update dates
    KEY_ACTIVITY_CREATION_DATE: "activityCreatedAt",  // Provided in Mountaineers' JSON feed
    KEY_ACTIVITY_MODIFICATION_DATE: "activityModifiedAt",  // Provided in Mountaineers' JSON feed (does not reflect all data)
    KEY_ACTIVITY_ADDED_AT: "activityAddedAt",  // Used for evaluating save searches
    KEY_ACTIVITY_UPDATED_AT: "activityUpdatedAt"  // Used for evaluating save searches
};

// The following cloud code scrapes the Mountaineers' JSON activity feed
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

    // Declaration for activity object
    function ActivityObject() {
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
        this.keywords = [];
        this.isTypeAdventureClub = false;
        this.isTypeBackpacking = false;
        this.isTypeClimbing = false;
        this.isTypeDayHiking = false;
        this.isTypeExplorers = false;
        this.isTypeExploringNature = false;
        this.isTypeGlobalAdventures = false;
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
    // Used for letting the scraper activity know when all saved searches update counter processes are complete for the given activity
    var savedSearchUpdatePromise;
    var newActivities = 0;  // Counter for new activities added
    var updatedActivities = 0;  // Counter for updated existing activities
    var totalActivities = 0;  // Keeps track of all activities reviewed for changed content (excluded filter criteria)
    var totalSavedSearches = 0;  // Keeps track of all saved searches
    var startTime = new Date();
    var jsObject;
    var savedSearches;
    var numActivityComplete = 0;
    var numSavedSearchComplete;
    var usersWithUpdates = [];  // Array that stores all users with updates to their saved searches
    var numPushNotificationSent = 0;


    // Define listener to handle completion event
    var onCompletionListener = new Parse.Promise();  // Create a trivial resolved promise as a base case
    onCompletionListener.then(function () {  // Overall job was successful
        status.success("A total of " + totalActivities + " activities were reviewed: " + newActivities +
            " activities added and " + updatedActivities + " activities updated.  Scraping took " +
            (new Date().getTime() - startTime.getTime()) / 1000 + " seconds.");
    }, function (error) {  // Overall job failed
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

        // Replace all "'s" with "s" (i.e. drop the apostrophe)
        field = field.replace("'s", "s");
        field = field.replace("’s", "s");
        field = field.replace("ê", "e");

        var toLowerCase = function (w) {
            return w.toLowerCase();
        };

        var ignoreWords = ["m", "t", "s", "re", "d", "ve", "ll", "the", "in", "and", "to", "of", "at", "for", "from",
            "a", "an"];  // Words to ignore
        var keywordsWordBorders = field.split(/\b/);  // Split word by borders
        var keywordsSpaces = field.split(/\s+/);  // Split word by spaces
        var keywords = keywordsWordBorders.concat(keywordsSpaces);  // Combine both keyword arrays

        // Filter out only lowercase words that do not match the ignoreWords
        keywords = _.map(keywords, toLowerCase);
        keywords = _.filter(keywords, function (w) {
//            return w.match(/^\w+$/) && !_.contains(ignoreWords, w);
            if (!w.trim()) {
                return false;
            }
            else if (w.length == 1 && w.match(/^.*[^a-zA-Z0-9 ].*$/)) {
                return false;
            }
            else if (_.contains(ignoreWords, w)) {
                return false;
            }

            return true;
        });

        keywords = _.uniq(keywords);  // Do not allow duplicate keywords
        return keywords;  // Return array of unique qualified keywords
    }

    /* This function compares two sets of keywords and determines if the first set is contained within the second.  Both
     * sets of keywords are in lower case. The number of keywords matched is returned. */
    function areKeywordsEqual(curKeywords, prevKeywords) {
        var _ = require("underscore");  // Require underscore.js

        // Filter which current keywords are contained within the previous keywords
        var commonKeywords = _.filter(curKeywords, function (w) {
            return _.contains(prevKeywords, w);
        });

        // Check if all keywords are common
        if (commonKeywords.length !== curKeywords.length) {
            return false;
        }

        return true;  // Return number of common keywords
    }

    // This function evaluates an unknown length of boolean variables and determines if the values are all equivalent
    function areAllEqual() {
        // Check to see if all values are the same
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] != arguments[0]) {
                return false;
            }
        }

        return true;
    }

    // This function accepts the currently saved activity object and updates any applicable saved search update counters
    function updateSavedSearchCounter(activity, index) {
        var updateCounterPromise = new Parse.Promise();
        var result = savedSearches[index];
        var filter = new ActivityObject();
        var match = false;

        // Loop structure implemented to allow allow quickly breaking out when activity and saved search do not match
        do {
            // Load filter object with the saved search filter's data
            filter.keywords = result.get(PARSE_CONST.KEY_KEYWORDS);

            // Check for a non-falsy values (i.e. undefined)
            if (!result.get(PARSE_CONST.KEY_ACTIVITY_START_DATE)) {
                filter.start = -Number.MAX_VALUE;
            }
            else {
                filter.start = result.get(PARSE_CONST.KEY_ACTIVITY_START_DATE).getTime();
            }

            if (!result.get(PARSE_CONST.KEY_ACTIVITY_END_DATE)) {
                filter.end = Number.MAX_VALUE;
            }
            else {
                filter.end = result.get(PARSE_CONST.KEY_ACTIVITY_END_DATE).getTime();
            }

            filter.isTypeAdventureClub = result.get(PARSE_CONST.KEY_TYPE_ADVENTURE_CLUB);
            filter.isTypeBackpacking = result.get(PARSE_CONST.KEY_TYPE_BACKPACKING);
            filter.isTypeClimbing = result.get(PARSE_CONST.KEY_TYPE_CLIMBING);
            filter.isTypeDayHiking = result.get(PARSE_CONST.KEY_TYPE_DAY_HIKING);
            filter.isTypeExplorers = result.get(PARSE_CONST.KEY_TYPE_EXPLORERS);
            filter.isTypeExploringNature = result.get(PARSE_CONST.KEY_TYPE_EXPLORING_NATURE);
            filter.isTypeGlobalAdventures = result.get(PARSE_CONST.KEY_TYPE_GLOBAL_ADVENTURES);
            filter.isTypeNavigation = result.get(PARSE_CONST.KEY_TYPE_NAVIGATION);
            filter.isTypePhotography = result.get(PARSE_CONST.KEY_TYPE_PHOTOGRAPHY);
            filter.isTypeSailing = result.get(PARSE_CONST.KEY_TYPE_SAILING);
            filter.isTypeScrambling = result.get(PARSE_CONST.KEY_TYPE_SCRAMBLING);
            filter.isTypeSeaKayaking = result.get(PARSE_CONST.KEY_TYPE_SEA_KAYAKING);
            filter.isTypeSkiingSnowboarding = result.get(PARSE_CONST.KEY_TYPE_SKIING_SNOWBOARDING);
            filter.isTypeSnowshoeing = result.get(PARSE_CONST.KEY_TYPE_SNOWSHOEING);
            filter.isTypeStewardship = result.get(PARSE_CONST.KEY_TYPE_STEWARDSHIP);
            filter.isTypeTrailRunning = result.get(PARSE_CONST.KEY_TYPE_TRAIL_RUNNING);
            filter.isTypeUrbanAdventure = result.get(PARSE_CONST.KEY_TYPE_URBAN_ADVENTURE);
            filter.isTypeYouth = result.get(PARSE_CONST.KEY_TYPE_YOUTH);
            filter.isRatingForBeginners = result.get(PARSE_CONST.KEY_RATING_FOR_BEGINNERS);
            filter.isRatingEasy = result.get(PARSE_CONST.KEY_RATING_EASY);
            filter.isRatingModerate = result.get(PARSE_CONST.KEY_RATING_MODERATE);
            filter.isRatingChallenging = result.get(PARSE_CONST.KEY_RATING_CHALLENGING);
            filter.isAudienceAdults = result.get(PARSE_CONST.KEY_AUDIENCE_ADULTS);
            filter.isAudienceFamilies = result.get(PARSE_CONST.KEY_AUDIENCE_FAMILIES);
            filter.isAudienceRetiredRovers = result.get(PARSE_CONST.KEY_AUDIENCE_RETIRED_ROVERS);
            filter.isAudienceSingles = result.get(PARSE_CONST.KEY_AUDIENCE_SINGLES);
            filter.isAudience2030Somethings = result.get(PARSE_CONST.KEY_AUDIENCE_20_30_SOMETHINGS);
            filter.isAudienceYouth = result.get(PARSE_CONST.KEY_AUDIENCE_YOUTH);
            filter.isBranchTheMountaineers = result.get(PARSE_CONST.KEY_BRANCH_THE_MOUNTAINEERS);
            filter.isBranchBellingham = result.get(PARSE_CONST.KEY_BRANCH_BELLINGHAM);
            filter.isBranchEverett = result.get(PARSE_CONST.KEY_BRANCH_EVERETT);
            filter.isBranchFoothills = result.get(PARSE_CONST.KEY_BRANCH_FOOTHILLS);
            filter.isBranchKitsap = result.get(PARSE_CONST.KEY_BRANCH_KITSAP);
            filter.isBranchOlympia = result.get(PARSE_CONST.KEY_BRANCH_OLYMPIA);
            filter.isBranchOutdoorCenters = result.get(PARSE_CONST.KEY_BRANCH_OUTDOOR_CENTERS);
            filter.isBranchSeattle = result.get(PARSE_CONST.KEY_BRANCH_SEATTLE);
            filter.isBranchTacoma = result.get(PARSE_CONST.KEY_BRANCH_TACOMA);
            filter.isClimbingBasicAlpine = result.get(PARSE_CONST.KEY_CLIMBING_BASIC_ALPINE);
            filter.isClimbingIntermediateAlpine = result.get(PARSE_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE);
            filter.isClimbingAidClimb = result.get(PARSE_CONST.KEY_CLIMBING_AID_CLIMB);
            filter.isClimbingRockClimb = result.get(PARSE_CONST.KEY_CLIMBING_ROCK_CLIMB);
            filter.isSkiingCrossCountry = result.get(PARSE_CONST.KEY_SKIING_CROSS_COUNTRY);
            filter.isSkiingBackcountry = result.get(PARSE_CONST.KEY_SKIING_BACKCOUNTRY);
            filter.isSkiingGlacier = result.get(PARSE_CONST.KEY_SKIING_GLACIER);
            filter.isSnowshoeingBeginner = result.get(PARSE_CONST.KEY_SNOWSHOEING_BEGINNER);
            filter.isSnowshoeingBasic = result.get(PARSE_CONST.KEY_SNOWSHOEING_BASIC);
            filter.isSnowshoeingIntermediate = result.get(PARSE_CONST.KEY_SNOWSHOEING_INTERMEDIATE);

            // Evaluate keywords
            // Check is keywords is undefined (falsy value check)
            if (!filter.keywords) {
                match = true
            }
            else {  // At least one keyword defined
                for (var j = 0; j < filter.keywords.length; j++) {
                    if (activity.keywords.indexOf(filter.keywords[j]) !== -1) {
                        match = true;
                        break;
                    }
                }
            }

            if (!match) {
                updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                break;
            }

            // Evaluate start and end dates
            if (filter.start > new Date(activity.start).getTime() || new Date(activity.start).getTime() > filter.end) {
                updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                break;
            }

            // Evaluate activity type options
            // Check if they're not all true or not all false
            if (!areAllEqual(filter.isTypeAdventureClub, filter.isTypeBackpacking, filter.isTypeClimbing,
                filter.isTypeDayHiking, filter.isTypeExplorers, filter.isTypeExploringNature,
                filter.isTypeGlobalAdventures, filter.isTypeNavigation, filter.isTypePhotography, filter.isTypeSailing,
                filter.isTypeScrambling, filter.isTypeSeaKayaking, filter.isTypeSkiingSnowboarding,
                filter.isTypeSnowshoeing, filter.isTypeStewardship, filter.isTypeTrailRunning,
                filter.isTypeUrbanAdventure, filter.isTypeYouth)) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isTypeAdventureClub && activity.isTypeAdventureClub) ||
                    (filter.isTypeBackpacking && activity.isTypeBackpacking) ||
                    (filter.isTypeClimbing && activity.isTypeClimbing) ||
                    (filter.isTypeDayHiking && activity.isTypeDayHiking) ||
                    (filter.isTypeExplorers && activity.isTypeExplorers) ||
                    (filter.isTypeExploringNature && activity.isTypeExploringNature) ||
                    (filter.isTypeGlobalAdventures && activity.isTypeGlobalAdventures) ||
                    (filter.isTypeNavigation && activity.isTypeNavigation) ||
                    (filter.isTypePhotography && activity.isTypePhotography) ||
                    (filter.isTypeSailing && activity.isTypeSailing) ||
                    (filter.isTypeScrambling && activity.isTypeScrambling) ||
                    (filter.isTypeSeaKayaking && activity.isTypeSeaKayaking) ||
                    (filter.isTypeSkiingSnowboarding && activity.isTypeSkiingSnowboarding) ||
                    (filter.isTypeSnowshoeing && activity.isTypeSnowshoeing) ||
                    (filter.isTypeStewardship && activity.isTypeStewardship) ||
                    (filter.isTypeTrailRunning && activity.isTypeTrailRunning) ||
                    (filter.isTypeUrbanAdventure && activity.isTypeUrbanAdventure) ||
                    (filter.isTypeYouth && activity.isTypeYouth))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate rating options
            // Check if they're not all true or not all false
            if (!areAllEqual(filter.isRatingForBeginners, filter.isRatingEasy, filter.isRatingModerate,
                filter.isRatingChallenging)) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isRatingForBeginners && activity.isRatingForBeginners) ||
                    (filter.isRatingEasy && activity.isRatingEasy) ||
                    (filter.isRatingModerate && activity.isRatingModerate) ||
                    (filter.isRatingChallenging && activity.isRatingChallenging))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate audience options
            if (!areAllEqual(filter.isAudienceAdults, filter.isAudienceFamilies, filter.isAudienceRetiredRovers,
                filter.isAudienceSingles, filter.isAudience2030Somethings, filter.isAudienceYouth)) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isAudienceAdults && activity.isAudienceAdults) ||
                    (filter.isAudienceFamilies && activity.isAudienceFamilies) ||
                    (filter.isAudienceRetiredRovers && activity.isAudienceRetiredRovers) ||
                    (filter.isAudienceSingles && activity.isAudienceSingles) ||
                    (filter.isAudience2030Somethings && activity.isAudience2030Somethings) ||
                    (filter.isAudienceYouth && activity.isAudienceYouth))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate branch options
            if (!areAllEqual(filter.isBranchTheMountaineers, filter.isBranchBellingham, filter.isBranchEverett,
                filter.isBranchFoothills, filter.isBranchKitsap, filter.isBranchOlympia,
                filter.isBranchOutdoorCenters, filter.isBranchSeattle, filter.isBranchTacoma)) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isBranchTheMountaineers && activity.isBranchTheMountaineers) ||
                    (filter.isBranchBellingham && activity.isBranchBellingham) ||
                    (filter.isBranchEverett && activity.isBranchEverett) ||
                    (filter.isBranchFoothills && activity.isBranchFoothills) ||
                    (filter.isBranchKitsap && activity.isBranchKitsap) ||
                    (filter.isBranchOlympia && activity.isBranchOlympia) ||
                    (filter.isBranchOutdoorCenters && activity.isBranchOutdoorCenters) ||
                    (filter.isBranchSeattle && activity.isBranchSeattle) ||
                    (filter.isBranchTacoma && activity.isBranchTacoma))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate climbing options
            if (filter.isClimbingBasicAlpine || filter.isClimbingIntermediateAlpine ||
                filter.isClimbingAidClimb || filter.isClimbingRockClimb) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isClimbingBasicAlpine && activity.isClimbingBasicAlpine) ||
                    (filter.isClimbingIntermediateAlpine && activity.isClimbingIntermediateAlpine) ||
                    (filter.isClimbingAidClimb && activity.isClimbingAidClimb) ||
                    (filter.isClimbingRockClimb && activity.isClimbingRockClimb))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate skiing/snowboarding options
            if (filter.isSkiingCrossCountry || filter.isSkiingBackcountry || filter.isSkiingGlacier) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isSkiingCrossCountry && activity.isSkiingCrossCountry) ||
                    (filter.isSkiingBackcountry && activity.isSkiingBackcountry) ||
                    (filter.isSkiingGlacier && activity.isSkiingGlacier))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // Evaluate snowshoeing options
            if (filter.isSnowshoeingBeginner || filter.isSnowshoeingBasic || filter.isSnowshoeingIntermediate) {
                /* The user has selected discrete filters for this category.  Check to see if the activity
                 * falls into one of the categories selected. */
                if (!((filter.isSnowshoeingBeginner && activity.isSnowshoeingBeginner) ||
                    (filter.isSnowshoeingBasic && activity.isSnowshoeingBasic) ||
                    (filter.isSnowshoeingIntermediate && activity.isSnowshoeingIntermediate))) {
                    updateCounterPromise.resolve();  // Failed - this saved search does not get updated by this activity
                    break;
                }
            }

            // MATCH!
            // Increment the saved search's update counter since this activity has satisfied all the requirements
            result.set(PARSE_CONST.KEY_UPDATE_COUNT, result.get(PARSE_CONST.KEY_UPDATE_COUNT) + 1);

            // Save the updated saved search (i.e.updated counter)
            result.save().then(function (result) {
                // Add user associated with this saved search to the updates array
                usersWithUpdates.push(result.get(PARSE_CONST.KEY_USER_ID));

                updateCounterPromise.resolve();
            }, function (result, error) {
                updateCounterPromise.reject("Error updating saved search results!");
            });
        }
        while(false);  // Never allow to run more than once

        return updateCounterPromise;
    }

    function recursiveSavedSearchUpdateLoader(activity) {
        var batchPromises = [];
        var increment = 1;

        // Load the saved search update
        for (var i = numSavedSearchComplete; i < numSavedSearchComplete + increment && i < totalSavedSearches; i++) {
            batchPromises.push(updateSavedSearchCounter(activity, i));
        }

        // Wait until all promises return resolved (or there is a rejection)
        Parse.Promise.when(batchPromises).then(function () {
            // Increment the counter
            numSavedSearchComplete = numSavedSearchComplete + increment;

            // Check whether another recursive run is required to get all of the updates
            if (numSavedSearchComplete < totalSavedSearches) {
                recursiveSavedSearchUpdateLoader(activity);
            }
            else {  // All saved searches counters have been updated
                savedSearchUpdatePromise.resolve();  // All updater promises were resolved
            }
        }, function (error) {  // Parse could not could not update the saved search counter
            recursiveSavedSearchUpdateLoader(activity);  // Re-run failed update loader
        });

        return savedSearchUpdatePromise;
    }

    /* This function accepts the JSON-formatted activity list (in the form of a JSON object), searches for updates or
     * additions and saves them in the backend */
    function scrapeActivity(jsObject) {
        var moment = require('cloud/moment-timezone-with-data');
        var scrapeActivityPromise = new Parse.Promise();
        var activityObj = new ActivityClass();
        var activity = new ActivityObject();
        var query;
        var leaderRoleTypes = [0,0,0,0,0,0];
        var leaderPosition = 0;
        var i;
        var isNew = false;
        var isMajorUpdate = false;

        // Reset the promise that is returned from the recursive saved search update counter loader
        savedSearchUpdatePromise = new Parse.Promise();

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
            }

            return Parse.Promise.as();
        }, function (error) {  // Query was not able to run
            return Parse.Promise.error("Not able to check activity id " + activity.id);
        }).then(function () {  // No error encountered while running query
            // Activity ID
            if (activity.id !== activityObj.get(PARSE_CONST.KEY_ACTIVITY_ID)) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_ID, activity.id);
                isNew = true;
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
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isTypeBackpacking !== activityObj.get(PARSE_CONST.KEY_TYPE_BACKPACKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_BACKPACKING, activity.isTypeBackpacking);
                isMajorUpdate = true;
            }
            if (activity.isTypeClimbing !== activityObj.get(PARSE_CONST.KEY_TYPE_CLIMBING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_CLIMBING, activity.isTypeClimbing);
                isMajorUpdate = true;
            }
            if (activity.isTypeDayHiking !== activityObj.get(PARSE_CONST.KEY_TYPE_DAY_HIKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_DAY_HIKING, activity.isTypeDayHiking);
                isMajorUpdate = true;
            }
            if (activity.isTypeExplorers !== activityObj.get(PARSE_CONST.KEY_TYPE_EXPLORERS)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_EXPLORERS, activity.isTypeExplorers);
                isMajorUpdate = true;
            }
            if (activity.isTypeExploringNature !== activityObj.get(PARSE_CONST.KEY_TYPE_EXPLORING_NATURE)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_EXPLORING_NATURE, activity.isTypeExploringNature);
                isMajorUpdate = true;
            }
            if (activity.isTypeGlobalAdventures !== activityObj.get(PARSE_CONST.KEY_TYPE_GLOBAL_ADVENTURES)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_GLOBAL_ADVENTURES, activity.isTypeGlobalAdventures);
                isMajorUpdate = true;
            }
            if (activity.isTypeNavigation !== activityObj.get(PARSE_CONST.KEY_TYPE_NAVIGATION)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_NAVIGATION, activity.isTypeNavigation);
                isMajorUpdate = true;
            }
            if (activity.isTypePhotography !== activityObj.get(PARSE_CONST.KEY_TYPE_PHOTOGRAPHY)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_PHOTOGRAPHY, activity.isTypePhotography);
                isMajorUpdate = true;
            }
            if (activity.isTypeSailing !== activityObj.get(PARSE_CONST.KEY_TYPE_SAILING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SAILING, activity.isTypeSailing);
                isMajorUpdate = true;
            }
            if (activity.isTypeScrambling !== activityObj.get(PARSE_CONST.KEY_TYPE_SCRAMBLING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SCRAMBLING, activity.isTypeScrambling);
                isMajorUpdate = true;
            }
            if (activity.isTypeSeaKayaking !== activityObj.get(PARSE_CONST.KEY_TYPE_SEA_KAYAKING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SEA_KAYAKING, activity.isTypeSeaKayaking);
                isMajorUpdate = true;
            }
            if (activity.isTypeSkiingSnowboarding !== activityObj.get(PARSE_CONST.KEY_TYPE_SKIING_SNOWBOARDING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SKIING_SNOWBOARDING, activity.isTypeSkiingSnowboarding);
                isMajorUpdate = true;
            }
            if (activity.isTypeSnowshoeing !== activityObj.get(PARSE_CONST.KEY_TYPE_SNOWSHOEING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_SNOWSHOEING, activity.isTypeSnowshoeing);
                isMajorUpdate = true;
            }
            if (activity.isTypeStewardship !== activityObj.get(PARSE_CONST.KEY_TYPE_STEWARDSHIP)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_STEWARDSHIP, activity.isTypeStewardship);
                isMajorUpdate = true;
            }
            if (activity.isTypeTrailRunning !== activityObj.get(PARSE_CONST.KEY_TYPE_TRAIL_RUNNING)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_TRAIL_RUNNING, activity.isTypeTrailRunning);
                isMajorUpdate = true;
            }
            if (activity.isTypeUrbanAdventure !== activityObj.get(PARSE_CONST.KEY_TYPE_URBAN_ADVENTURE)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_URBAN_ADVENTURE, activity.isTypeUrbanAdventure);
                isMajorUpdate = true;
            }
            if (activity.isTypeYouth !== activityObj.get(PARSE_CONST.KEY_TYPE_YOUTH)) {
                activityObj.set(PARSE_CONST.KEY_TYPE_YOUTH, activity.isTypeYouth);
                isMajorUpdate = true;
            }

            // Activity Creation Date
            if (!new Date(activity.created).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_CREATION_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_CREATION_DATE, new Date(activity.created));
            }

            // Activity Modification Date
            if (!new Date(activity.modified).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_MODIFICATION_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_MODIFICATION_DATE, new Date(activity.modified));
            }

            // Activity Start Date
            if (!new Date(activity.start).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_START_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_START_DATE, new Date(activity.start));
                isMajorUpdate = true;
            }

            // Activity End Date
            if (!new Date(activity.end).equals(activityObj.get(PARSE_CONST.KEY_ACTIVITY_END_DATE))) {
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_END_DATE, new Date(activity.end));
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isAudienceFamilies !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_FAMILIES)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_FAMILIES, activity.isAudienceFamilies);
                isMajorUpdate = true;
            }
            if (activity.isAudienceRetiredRovers !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_RETIRED_ROVERS)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_RETIRED_ROVERS, activity.isAudienceRetiredRovers);
                isMajorUpdate = true;
            }
            if (activity.isAudienceSingles !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_SINGLES)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_SINGLES, activity.isAudienceSingles);
                isMajorUpdate = true;
            }
            if (activity.isAudience2030Somethings !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_20_30_SOMETHINGS)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_20_30_SOMETHINGS, activity.isAudience2030Somethings);
                isMajorUpdate = true;
            }
            if (activity.isAudienceYouth !== activityObj.get(PARSE_CONST.KEY_AUDIENCE_YOUTH)) {
                activityObj.set(PARSE_CONST.KEY_AUDIENCE_YOUTH, activity.isAudienceYouth);
                isMajorUpdate = true;
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

            // Now assign the values for the branch categories
            if (activity.isBranchTheMountaineers !== activityObj.get(PARSE_CONST.KEY_BRANCH_THE_MOUNTAINEERS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_THE_MOUNTAINEERS, activity.isBranchTheMountaineers);
                isMajorUpdate = true;
            }
            if (activity.isBranchBellingham !== activityObj.get(PARSE_CONST.KEY_BRANCH_BELLINGHAM)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_BELLINGHAM, activity.isBranchBellingham);
                isMajorUpdate = true;
            }
            if (activity.isBranchEverett !== activityObj.get(PARSE_CONST.KEY_BRANCH_EVERETT)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_EVERETT, activity.isBranchEverett);
                isMajorUpdate = true;
            }
            if (activity.isBranchFoothills !== activityObj.get(PARSE_CONST.KEY_BRANCH_FOOTHILLS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_FOOTHILLS, activity.isBranchFoothills);
                isMajorUpdate = true;
            }
            if (activity.isBranchKitsap !== activityObj.get(PARSE_CONST.KEY_BRANCH_KITSAP)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_KITSAP, activity.isBranchKitsap);
                isMajorUpdate = true;
            }
            if (activity.isBranchOlympia !== activityObj.get(PARSE_CONST.KEY_BRANCH_OLYMPIA)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_OLYMPIA, activity.isBranchOlympia);
                isMajorUpdate = true;
            }
            if (activity.isBranchOutdoorCenters !== activityObj.get(PARSE_CONST.KEY_BRANCH_OUTDOOR_CENTERS)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_OUTDOOR_CENTERS, activity.isBranchOutdoorCenters);
                isMajorUpdate = true;
            }
            if (activity.isBranchSeattle !== activityObj.get(PARSE_CONST.KEY_BRANCH_SEATTLE)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_SEATTLE, activity.isBranchSeattle);
                isMajorUpdate = true;
            }
            if (activity.isBranchTacoma !== activityObj.get(PARSE_CONST.KEY_BRANCH_TACOMA)) {
                activityObj.set(PARSE_CONST.KEY_BRANCH_TACOMA, activity.isBranchTacoma);
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isClimbingIntermediateAlpine !== activityObj.get(PARSE_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_INTERMEDIATE_ALPINE, activity.isClimbingIntermediateAlpine);
                isMajorUpdate = true;
            }
            if (activity.isClimbingAidClimb !== activityObj.get(PARSE_CONST.KEY_CLIMBING_AID_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_AID_CLIMB, activity.isClimbingAidClimb);
                isMajorUpdate = true;
            }
            if (activity.isClimbingRockClimb !== activityObj.get(PARSE_CONST.KEY_CLIMBING_ROCK_CLIMB)) {
                activityObj.set(PARSE_CONST.KEY_CLIMBING_ROCK_CLIMB, activity.isClimbingRockClimb);
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isSkiingBackcountry !== activityObj.get(PARSE_CONST.KEY_SKIING_BACKCOUNTRY)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_BACKCOUNTRY, activity.isSkiingBackcountry);
                isMajorUpdate = true;
            }
            if (activity.isSkiingGlacier !== activityObj.get(PARSE_CONST.KEY_SKIING_GLACIER)) {
                activityObj.set(PARSE_CONST.KEY_SKIING_GLACIER, activity.isSkiingGlacier);
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isSnowshoeingBasic !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING_BASIC)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING_BASIC, activity.isSnowshoeingBasic);
                isMajorUpdate = true;
            }
            if (activity.isSnowshoeingIntermediate !== activityObj.get(PARSE_CONST.KEY_SNOWSHOEING_INTERMEDIATE)) {
                activityObj.set(PARSE_CONST.KEY_SNOWSHOEING_INTERMEDIATE, activity.isSnowshoeingIntermediate);
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (activity.isRatingEasy !== activityObj.get(PARSE_CONST.KEY_RATING_EASY)) {
                activityObj.set(PARSE_CONST.KEY_RATING_EASY, activity.isRatingEasy);
                isMajorUpdate = true;
            }
            if (activity.isRatingModerate !== activityObj.get(PARSE_CONST.KEY_RATING_MODERATE)) {
                activityObj.set(PARSE_CONST.KEY_RATING_MODERATE, activity.isRatingModerate);
                isMajorUpdate = true;
            }
            if (activity.isRatingChallenging !== activityObj.get(PARSE_CONST.KEY_RATING_CHALLENGING)) {
                activityObj.set(PARSE_CONST.KEY_RATING_CHALLENGING, activity.isRatingChallenging);
                isMajorUpdate = true;
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
                isMajorUpdate = true;
            }
            if (!activity.leaderRole.equals(activityObj.get(PARSE_CONST.KEY_LEADER_ROLE))) {
                activityObj.set(PARSE_CONST.KEY_LEADER_ROLE, activity.leaderRole);
            }
            if (!activity.leaderQYL.equals(activityObj.get(PARSE_CONST.KEY_QUALIFIED_YOUTH_LEAD))) {
                activityObj.set(PARSE_CONST.KEY_QUALIFIED_YOUTH_LEAD, activity.leaderQYL);
            }

            // Keywords
            // Process unique keywords based on title, title header, leader names, type and difficulty
            activity.keywords = getKeywords(activity.title + " " + activity.titleHeader + " "
                + (activity.leaderName !== null ? activity.leaderName.join(" ") : null) + " "
                + (activity.type !== null ? activity.type.join(" ") : null) + " "
                + (activity.difficulty !== null ? activity.difficulty.join(" ") : null));

            if (!areKeywordsEqual(activity.keywords, activityObj.get(PARSE_CONST.KEY_KEYWORDS))) {
                activityObj.set(PARSE_CONST.KEY_KEYWORDS, activity.keywords);
                isMajorUpdate = true;
            }

            // Check for a new activity or a major update (one that affects search results - keywords and filter options)
            // Add appropriate timestamp
            if (isNew) {  // Is a new activity
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_ADDED_AT, new Date());
            }
            else if (isMajorUpdate) {  // Is a major update for an existing activity
                activityObj.set(PARSE_CONST.KEY_ACTIVITY_UPDATED_AT, new Date());
            }

            // Check if any field has been added or changed
            if (activityObj.dirtyKeys().length !== 0) {  // Fields have changed
                // Save activity object
                activityObj.save().then(function (activityObjSave) {
                    // Update activity counters
                    if (isNew) {
                        newActivities++;
                    }
                    else {
                        updatedActivities++;
                    }

                    if ((isNew || isMajorUpdate)) {
                        /* Determine if the activity has occurred in the past; if so, ignore updating saved search.
                         * Activity start date is provided at the beginning of the day and 24 hours must be added to it.
                         * Moment's offset function provides the UTC to Seattle time in minutes. */
                         if ((activityObj.get(PARSE_CONST.KEY_ACTIVITY_START_DATE).getTime() + (24 * 60 * 60 * 1000)) >
                             (new Date().getTime() - (moment.tz.zone('America/Vancouver').offset(new Date()) * 60 * 1000))) {
                            // Reset the number of saved searches reviewed
                            numSavedSearchComplete = 0;

                            // Launch the saved search update loader for this activity
                            return recursiveSavedSearchUpdateLoader(activity);
                        }
                    }
                }).then(function() {
                    scrapeActivityPromise.resolve();
                }, function (error) {
                    // Show error message
                    console.log("Failed to save activity id = " + activity.id + ".  Error code "
                        + error.code + ": " + error.message);

                    // No big deal - the filters will be updated on the next scraping (run every x minutes on Parse)
                    scrapeActivityPromise.reject("Failed to save activity id = " + activity.id + ".  Error code "
                        + error.code + ": " + error.message);
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

    function pushNotificationSender(user) {
        var sendPromise = new Parse.Promise();
        var count = 0;

        // Get the installation object Ids associated with the given user
        var updateQuery = new Parse.Query(Parse.Installation);
        updateQuery.equalTo(PARSE_CONST.KEY_USER_OBJECT_ID, user);

        // Go through all saved searches and count how many have new updates and belong to the given user
        for (var i = 0; i < totalSavedSearches; i++) {
            if (user == savedSearches[i].get(PARSE_CONST.KEY_USER_ID) && savedSearches[i].get(PARSE_CONST.KEY_UPDATE_COUNT) > 0) {
                count++;
            }
        }

        // Send push notification
        Parse.Push.send({
            where: updateQuery, // Set our Installation query
            data: {count: count}
        }).then(function() {
            sendPromise.resolve("Push sent!");
        }, function(error) {
            sendPromise.reject("Error sending push notification!");
        });

        return sendPromise;
    }

    function recursivePushNotificationLoader(users) {
        var pushNotificationPromise = new Parse.Promise();
        var batchPromises = [];
        var increment = 1;

        // Load the push notification
        for (var i = numPushNotificationSent; i < numPushNotificationSent + increment; i++) {
            batchPromises.push(pushNotificationSender(users[i]));
        }

        // Wait until all promises return resolved (or there is a rejection)
        Parse.Promise.when(batchPromises).then(function () {
            // Increment the counter
            numPushNotificationSent = numPushNotificationSent + increment;

            // Check whether another recursive run is required to send all push notifications
            if (numPushNotificationSent < users.length) {
                recursivePushNotificationLoader(users);
            }
            else {  // All push notifications have been sent
                pushNotificationPromise.resolve();  // All push notification promises were resolved
            }
        }, function (error) {  // Parse could not could not send the push notification
            recursivePushNotificationLoader(users);  // Re-run failed push notification loader
        });

        return pushNotificationPromise;
    }

    function recursiveScrapeActivityLoader() {
        var increment = 1;

        // Load the activity object
        for (var i = numActivityComplete; i < numActivityComplete + increment && i < totalActivities; i++) {
            promises.push(scrapeActivity(jsObject[i]));
        }

        // Wait until all promises return resolved (or there is a rejection)
        Parse.Promise.when(promises).then(function () {
            numActivityComplete = numActivityComplete + increment;  // Increment the counter

            // Check whether another recursive run is required to get all of the activities
            if (numActivityComplete < totalActivities) {
                recursiveScrapeActivityLoader();
            }
            else {  // Finished scraping all activities
                // See if there were any saved search updates (i.e. any associated users in the array)
                if (usersWithUpdates.length > 0) {  // Yes
                    // Determine the unique list of users with updates
                    var _ = require("underscore");  // Require underscore.js
                    usersWithUpdates = _.uniq(usersWithUpdates);  // Do not allow duplicate users

                    // Launch the recursive push notification loader
                    recursivePushNotificationLoader(usersWithUpdates).then(function () {
                        onCompletionListener.resolve();  // Tell the listener all promises were resolved
                    });
                }
                else {  // No
                    onCompletionListener.resolve();  // Tell the listener all promises were resolved
                }
            }
        }, function (error) {  // Either Parse could not pull up the activity record or it could not save it
            recursiveScrapeActivityLoader();  // Re-run failed scrape
        });
    }

    /////////////////////////////////////////////////////////////
    // The code below is what drives this Cloud Background Job //
    /////////////////////////////////////////////////////////////

    Parse.Cloud.useMasterKey();  // Allow master key permissions for activity scraping tasks

    // Request the activity data in JSON format
    Parse.Cloud.httpRequest({
        url: "https://www.mountaineers.org/upcoming-trips.json",
        headers: {
            'User-Agent' : "Mountaineers App Back-End"
        }
    }).then(function(httpResponse) {
        // Hello object literal!
        jsObject = JSON.parse(httpResponse.text);
        totalActivities = jsObject.length;

        // Get list of all saved searches
        savedSearchQuery = new Parse.Query(PARSE_CONST.CLASS_SAVED_SEARCHES);
        savedSearchQuery.find().then(function (results) {
            savedSearches = results;  // Save list of saved searches for later usage
            totalSavedSearches = savedSearches.length;

            // Recursive activity scraping loader
            recursiveScrapeActivityLoader();
        }, function (error) {
            onCompletionListener.reject("Error retrieving saved search results!");  // Send error through to listener
        });
    }, function (error) {
        onCompletionListener.reject(error);  // Send error through to listener
    });
});


////////////////////////////////////////
// The code below are Cloud Functions //
////////////////////////////////////////

// The following Cloud function resets the update counter on a saved search and updates the time stamp for last viewed
Parse.Cloud.define("verifyUser", function(request, response) {
    Parse.Cloud.useMasterKey();  // Allow master key permissions for verifying user task

    var query = new Parse.Query(Parse.User);
    query.equalTo(PARSE_CONST.KEY_USERNAME, request.params.username);

    query.first({
        success: function(result) {
            if (!result) {  // Check for falsy value (i.e. undefined - user does not exist)
                response.success("new");
            }
            else {  // User exists (first security measure passed)
                // Second security measure - check member URL
                if (result.get(PARSE_CONST.KEY_MEMBER_URL) == request.params.memberUrl) { // Matches
                    // Check if member URL matches (second security measure)
                    response.success(result.id);  // Send back the user's ObjectId
                }
                else {  // Does not match
                    response.error("User verification failed");
                }
            }
        },
        error: function() {
            response.error("User verification failed");
        }
    });
});

// The following Cloud function resets the update counter on a saved search and updates the time stamp for last viewed
Parse.Cloud.define("resetUpdateCounter", function(request, response) {
    var query = new Parse.Query(PARSE_CONST.CLASS_SAVED_SEARCHES);
    query.equalTo(PARSE_CONST.KEY_OBJECT_ID, request.params.objectId);

    query.first({
        success: function(result) {
            result.set(PARSE_CONST.KEY_UPDATE_COUNT, 0);  // Reset counter to 0
            result.set(PARSE_CONST.KEY_LAST_ACCESS, new Date());  // Update last accessed timestamp to now

            // Save the changes
            result.save(null, {
                success: function() {
                    response.success("Saved search reset success");
                },
                error: function() {
                    response.error("Saved search reset failed");
                }
            });
        },
        error: function() {
            response.error("Saved search reset failed");
        }
    });
});

// The following Cloud function deletes a given saved search
Parse.Cloud.define("deleteSavedSearch", function(request, response) {
    Parse.Cloud.useMasterKey();  // Allow master key permissions for deleting saved searches

    var query = new Parse.Query(PARSE_CONST.CLASS_SAVED_SEARCHES);
    query.equalTo(PARSE_CONST.KEY_OBJECT_ID, request.params.objectId);

    query.first({
        success: function(result) {
            result.destroy({
                success: function(myObject) {
                    response.success("Saved search deletion success");
                },
                error: function(myObject, error) {
                    response.error("Saved search deletion failed");
                }
            });
        },
        error: function() {
            response.error("Saved search deletion failed");
        }
    });
});

// The following Cloud function renames a given saved search
Parse.Cloud.define("renameSavedSearch", function(request, response) {
    var query = new Parse.Query(PARSE_CONST.CLASS_SAVED_SEARCHES);
    query.equalTo(PARSE_CONST.KEY_OBJECT_ID, request.params.objectId);

    query.first({
        success: function(result) {
            result.set(PARSE_CONST.KEY_SAVE_NAME, request.params.searchName);  // Update saved search name

            result.save(null, {
                success: function(myObject) {
                    response.success("Saved search rename success");
                },
                error: function(myObject, error) {
                    response.error("Saved search rename failed");
                }
            });
        },
        error: function() {
            response.error("Saved search rename failed");
        }
    });
});

// The following Cloud job resets the update counter on all saved search and updates the time stamp for last viewed
Parse.Cloud.job("resetAllUpdateCounters", function(request, status) {
    var query = new Parse.Query(PARSE_CONST.CLASS_SAVED_SEARCHES);

    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set(PARSE_CONST.KEY_UPDATE_COUNT, 0);  // Reset counter to 0
                results[i].set(PARSE_CONST.KEY_LAST_ACCESS, new Date());  // Update last accessed timestamp to now
            }

            // Save the changes
            Parse.Object.saveAll(results, {
                success: function(list) {
                    status.success("Reset all saved searches!");
                },
                error: function() {
                    status.error("Failed to reset all saved searches!");
                }
            });
        },
        error: function() {
            status.error("Failed to query all saved searches!");
        }
    });
});

Parse.Cloud.job("PushTest", function (request, status) {
    // Get the current Config alert message
    Parse.Config.get().then(function(config) {
        // Get Config variables
        var alert = config.get("alert");
        var userId = config.get("userId");

        // Setup Installation query - default is sending it to all installation objects
        var query = new Parse.Query(Parse.Installation);

        // Check if userId has a 'falsy' value (i.e. null or empty)
        if (userId) {  // Not a 'falsy' value
            // Restrict the query to the specified user
            query.equalTo(PARSE_CONST.KEY_USER_OBJECT_ID, userId);
        }

        Parse.Push.send({
            where: query, // Set our Installation query
            data: {
                alert: alert
            }
        }, {
            success: function() {
                status.success("Push notification test sent! ");
            },
            error: function(error) {
                status.error("Push notification test failed!");
            }
        });
    }, function(error) {
        status.error("Failed to get alert from Config!");
    });
});