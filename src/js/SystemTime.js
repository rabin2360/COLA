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

	 //recording the observation time start and pause times
    SystemSettings.prototype.recordObservationStartOrPauseTime = function() {

        if (!observationStartTime) {
            observationStartTime = new Date();
            console.log("START TIME: " + observationStartTime);
        }

        pausedTimeStamps.push(new Date());

    }

	//this code is for debugging purposes
    SystemSettings.prototype.printTimeStamps = function() {
        for (var i = 0; i < pausedTimeStamps.length; i++) {
            console.log("index: " + i + ": " + pausedTimeStamps[i]);
        }
    }
	
	//code for debugging for a future feature
	SystemSettings.prototype.getPausedTimeStamps = function(){
		return pausedTimeStamps;
	}

	//returns observation start time 
    SystemSettings.prototype.getObservationStartTime = function() {
        return observationStartTime;
    }

	//records observation stop time
    function recordObservationStopTime() {
        if (!observationEndTime) {
            observationEndTime = new Date();
            console.log("STOP TIME: " + observationEndTime);
        }
    }

	//get observation stop time
    SystemSettings.prototype.getObservationStopTime = function() {
        recordObservationStopTime();
		return observationEndTime;
    }
	
    return SystemSettings;
	
})();