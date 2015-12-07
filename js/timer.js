var Timer = (function() {
    //variables to run the timer
    var time;
    var clocktimer;
    var startTime;
    var elapsedTime;
    var stages;

    //variable(s) controlling the stop watch
    var frequencyLimit;

	//constants for the function 
    const CONVERT_TO_MILLI_SECS = 1000
	const CONVERT_TO_SECS = 60;
	const FUNCTION_CALL_FREQ = 500;

    function Timer() {
        startTime = 0;
        elapsedTime = 0;
        numberOfPauses = 0;
        stages = 0;
        frequencyLimit = 0;
    }

    //get the start time for timer
    function getStartValue() {
        startTime = new Date();
        startTime = startTime.getTime();

        return startTime;
    }

    //get the current time 
    function timeDelta() {
        return elapsedTime + (startTime ? (new Date()).getTime() - startTime : 0);
    }

	Timer.prototype.getElapsedTime = function()
	{
			return timeDelta();
	}
	
	//starting the timer
    Timer.prototype.start = function(limit, frequency) {
        //this code needs to be changed at some point
        var timerLimit = limit * CONVERT_TO_MILLI_SECS *CONVERT_TO_SECS;

        getStartValue();

        clocktimer = setInterval(function() {
			if (startTime != 0 && timeDelta() <= timerLimit) {
                incrementObservationStage(timeDelta(), frequency);
                document.getElementById("timer").innerHTML = formatTime(timeDelta());
            } else {
                observationScreen.stopButtonPressed();
            }

        }, FUNCTION_CALL_FREQ);

        console.log("Start button pressed");

    }

	//call the controller and update the stage of observation as required by the set frequency
    function incrementObservationStage(latestTime, frequency) {
        frequencyLimit = frequencyLimit ? frequencyLimit : parseInt(frequencyLimit) + parseInt(frequency);

        if (Math.floor(latestTime / CONVERT_TO_MILLI_SECS) == frequencyLimit) {
            observationScreen.incrementCurrentStage();
			observationScreen.updateObservation();
            frequencyLimit = parseInt(frequencyLimit) + parseInt(frequency);

        }
    }

	//pausing the timer
    Timer.prototype.pause = function() {
        elapsedTime = startTime ? elapsedTime + (new Date()).getTime() - startTime : 0;
        startTime = 0;

        clearInterval(clocktimer);
        console.log("Paused button pressed ");
    }

	//stopping the timer
    Timer.prototype.stop = function() {
        startTime = 0;
        elapsedTime = 0;
        numberOfPauses = 0;
		frequencyLimit = 0;

        clearInterval(clocktimer);
        document.getElementById("timer").innerHTML = "00:00:00";
        console.log("Stop button pressed");
    }

	//formatting the time 
    function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }

	//formatting the time
    function formatTime(time) {
        var h = m = s = ms = 0;
        var newTime = '';

        h = Math.floor(time / (60 * 60 * 1000));
        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;


        newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
        return newTime;
    }
	
    return Timer;
}());