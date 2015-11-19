var SystemSettings = (function() {

    //variables keeping track of stop watch usage
    var numberOfPauses;
    var pausedTimeStamps;
    var observationStartTime;
    var observationEndTime;

    //listener variables
    var startButtonElementId;
    var stopButtonElementId;

    //initialize the variables 
    function SystemSettings() {
        observationStartTime = 0;
        observationEndTime = 0;
        pausedTimeStamps = [];
    }

    //explicitly initialize the listeners
    SystemSettings.prototype.initialize = function() {
        startButtonElementId = document.getElementById("startButton");
        startButtonElementId.addEventListener("click", recordObservationStartOrPauseTime);

        stopButtonElementId = document.getElementById("stopButton");
        stopButtonElementId.addEventListener("click", recordObservationStopTime);
    }

    function recordObservationStartOrPauseTime() {

        if (!observationStartTime) {
            observationStartTime = new Date();
            console.log("START TIME: " + observationStartTime);
        }

        pausedTimeStamps.push(new Date());

    }

    SystemSettings.prototype.printTimeStamps = function() {
        for (var i = 0; i < pausedTimeStamps.length; i++) {
            console.log("index: " + i + ": " + pausedTimeStamps[i]);
        }
    }

    SystemSettings.prototype.getObservationStartTime = function() {
        return observationStartTime;
    }

    function recordObservationStopTime() {
        if (!observationEndTime) {
            observationEndTime = new Date();
            console.log("STOP TIME: " + observationEndTime);
        }
    }

    SystemSettings.prototype.getObservationStopTime = function() {
        return observationEndTime;
    }

    return SystemSettings;
})();

var systemClock = new SystemSettings();