var Timer = (function() {
    //variables to run the timer
    var time;
    var clocktimer;
    var startTime;
    var elapsedTime;

    //variables keeping track of stop watch usage
    var numberOfPauses;
	
	var testListener;

    function Timer() {
        startTime = 0;
        elapsedTime = 0;
        observationEndTime = 0;
        observationStartTime = 0;
        numberOfPauses = 0;
		pausedTimeStamps = [];

    }

	Timer.prototype.initialize = function()
	{
		testListener = document.getElementById("testButton").addEventListener("click", test);
		console.log("testListener:"+testListener);
	}

	function test()
	{
		console.log("EVENT LISTENER SON!");
	}
	
    //get the start time for timer
    function getStartValue() {
        startTime = new Date();
		startTime = startTime.getTime();

        return startTime;
    }

    //get the current time 
    function currentTime() {
        return elapsedTime + (startTime ? (new Date()).getTime() - startTime : 0);

    }
	
    function update() {
        //when startTime is not zero meaning that start has been pressed once in a row
        if (startTime != 0) {

            document.getElementById("timer").innerHTML = formatTime(currentTime());
            console.log("elapsedTime " + formatTime(currentTime()));
        }

    }

    Timer.prototype.start = function(limit) {
        //this code needs to be changed at some point
        var temp = limit * 1000;
        console.log("limit: " + temp);

        //toggle between start and pause
        if (document.getElementById("startButton").value == "Start") {
            getStartValue();
			
            clocktimer = setInterval(function() {
                if (startTime != 0 && currentTime() < temp) {
					
                    document.getElementById("timer").innerHTML = formatTime(currentTime());
                    console.log("elapsedTime " + formatTime(currentTime()));
                } else {
                    observationTimer.stop();
                }

            }, 0.9);

			changeStartButtonUI("Pause", "#FFFF00");
            console.log("Start button pressed");

        } else {
            pause();
			disableDropDownMenuItems(elapsedTime);
        }

    }

	//this should be in the settings screen
	function disableDropDownMenuItems(latestTime)
	{
		var temp = document.getElementById("totalTime");
		
		for(var i = 0; i<temp.options.length; i++)
		{
			if((latestTime > ((temp.options[i].value)*1000)))
			{
				temp.options[i].disabled = true
				console.log("holla!");
		
			}
			else
			{
				console.log("latest time: "+latestTime+" element in drop down menu: "+(temp.options[i].value)*1000);
				break;
			}
		}
	}

	//this should be in the settings screen
	function enableDropDownMenuItems()
	{
		var temp = document.getElementById("totalTime");
		
		for(var i = 0; i<temp.options.length; i++)
		{
			temp.options[i].disabled = false;
		}
		
	}

    function pause() {
        numberOfPauses++;

        elapsedTime = startTime ? elapsedTime + (new Date()).getTime() - startTime : 0;
        startTime = 0;

        clearInterval(clocktimer);

        changeStartButtonUI("Start", '#00CC33');
        console.log("Paused button pressed" + numberOfPauses);
    }


    Timer.prototype.stop = function() {
        startTime = 0;
        elapsedTime = 0;
        numberOfPauses = 0;

        clearInterval(clocktimer);

        document.getElementById("timer").innerHTML = "00:00:00";

        changeStartButtonUI("Start", "#00CC33");
		enableDropDownMenuItems();
        console.log("stopping timer");
    }

    function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }

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


    function changeStartButtonUI(buttonText, buttonColor) {
        document.getElementById("startButton").value = buttonText;
        document.getElementById("startButton").style.background = buttonColor;
}

    return Timer;
}());

var observationTimer = new Timer();