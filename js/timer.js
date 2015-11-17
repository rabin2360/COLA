var Timer = (function()
{
	//variables to run the timer
	var time;
	var clocktimer;
	var startTime;
	var elapsedTime;

	//variables keeping track of stop watch usage
	var numberOfPauses;
	var observationStartTime;
	var observationEndTime;

function Timer()
	{
		startTime = 0;
		elapsedTime = 0;
		observationEndTime = 0;
		observationStartTime = 0;
		numberOfPauses = 0;
	}
	
//get the start time for timer
function getStartValue()
	{
		startTime = new Date();
		
		//recording the observation start time. Happens only once in the observation screen.
		setObservationStartTime(startTime);

		startTime = startTime.getTime();
	
		return startTime;
	}

//get the current time 
function currentTime()
	{
		return elapsedTime + (startTime ? (new Date()).getTime() - startTime: 0);
		
	}
	
function setObservationStartTime(recordedStartTime)
	{
		if(!observationStartTime)
		{
			observationStartTime = recordedStartTime;
			console.log("START TIME: "+observationStartTime);
		}
	}

Timer.prototype.getObservationStartTime = function()
{
		document.getElementById("startTime").innerHTML = observationStartTime;
		return observationStartTime;
}
	
function update()
	{
	//when startTime is not zero meaning that start has been pressed once in a row
	if(startTime !=0)
			{
				
				document.getElementById("timer").innerHTML = formatTime(currentTime());
				console.log("elapsedTime "+formatTime(currentTime()));
			}

	}
	
Timer.prototype.start = function(limit)
	{
		//this code needs to be changed at some point
		var temp = limit *1000;
		console.log("limit: "+ temp);
		
			//toggle between start and pause
			if(document.getElementById("startButton").value == "Start")
			{
				getStartValue();
				
				clocktimer = setInterval(function()
				{
						if(startTime !=0 && currentTime()<temp)
						{
				
							document.getElementById("timer").innerHTML = formatTime(currentTime());
							console.log("elapsedTime "+formatTime(currentTime()));
						}
						else
						{
							observationTimer.stop();
						}
						
				}
				, 0.9);
				
				document.getElementById("startButton").value = "Pause";
				document.getElementById("startButton").style.background = '#FFFF00';
				document.getElementById("settingsButton").disabled = true;
				document.querySelector(".settingsButton").style.opacity = 0.6;
				
				console.log("Start button pressed");
				
			}
			else
			{	
				pause();
			}
	
	}


function pause()
{			
	numberOfPauses++;
				
	elapsedTime = startTime ? elapsedTime + (new Date()).getTime() - startTime : 0;
	startTime = 0;
				
	clearInterval(clocktimer);
				
	changeUI("Start", '#00CC33', true, 0.6, false, 1);
	console.log("Paused button pressed"+numberOfPauses);
}

function setObservationEndTime()
{
	if(!observationEndTime)
	{
		observationEndTime = new Date();
		console.log("STOP TIME: "+observationEndTime);
	}
}

Timer.prototype.getObservationEndTime = function()
{
	document.getElementById("endTime").innerHTML = observationEndTime;
	return observationEndTime;
}


Timer.prototype.stop = function()
	{
			startTime = 0;
			elapsedTime = 0;
			numberOfPauses = 0;
			
			//recording the observation end time. Happens only once in the observation screen.
			setObservationEndTime();
			
			clearInterval(clocktimer);
			
			document.getElementById("timer").innerHTML = "00:00:00";
			
			changeUI("Start", "#00CC33", false, 1, false, 1);
			console.log("stopping timer");
	}

function pad (num, size)
{
			var s = "0000" + num;
			return s.substr(s.length - size);	
}

function formatTime(time)
{
		var h = m = s = ms = 0;
		var newTime = '';
		
		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;

		
		newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
		return newTime;
		<!-- return time; -->
}


function changeUI(buttonText, buttonColor, frequencyEnabled, frequencyOpacity, settingsEnabled, settingsOpacity)
{
			document.getElementById("startButton").value = buttonText;
			document.getElementById("startButton").style.background = buttonColor;
			
			document.getElementById("frequency").disabled = frequencyEnabled;
			document.querySelector(".modal-body-frequency").style.opacity = frequencyOpacity;
			
			document.getElementById("settingsButton").disabled = settingsEnabled;
			document.querySelector(".settingsButton").style.opacity = settingsOpacity;
	
}

	return Timer;
}());

var observationTimer = new Timer();