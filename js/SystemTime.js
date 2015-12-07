var SystemSettings = (function() {

    //variables keeping track of stop watch usage
    var pausedTimeStamps;
    var observationStartTime;
    var observationEndTime;
	
    //initialize the variables 
    function SystemSettings() {
        observationStartTime = 0;
        observationEndTime = 0;
        pausedTimeStamps = [];
	 }

    SystemSettings.prototype.recordObservationStartOrPauseTime = function() {

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
	
	SystemSettings.prototype.getPausedTimeStamps = function(){
		return pausedTimeStamps;
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
        recordObservationStopTime();
		return observationEndTime;
    }
	
    return SystemSettings;
	
})();