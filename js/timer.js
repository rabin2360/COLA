var time;
var clocktimer;
//var startTime;
var elapsedTime;

function Timer()
{
	this.rana = 0;
	startTime = 0;
	elapsedTime = 0;
}
		
getStartValue = function ()
{
	
	return startTime = startTime ? startTime : (new Date()).getTime();
}
		
/*function getStartValue()
		{

			startTime = startTime ? startTime : (new Date()).getTime();
		}
*/

currentTime = function()
{
	return elapsedTime + (startTime ? (new Date()).getTime() - startTime: 0);
		
}

/*function currentTime()
		{
			return elapsedTime + (startTime ? (new Date()).getTime() - startTime: 0);
		}
*/
	
update = function()
{
	//when startTime is not zero meaning that start has been pressed once in a row
	if(startTime !=0)
			{
				
				document.getElementById("timer").innerHTML = formatTime(currentTime());
				console.log("elapsedTime "+formatTime(currentTime()));
			}

}
	
/*function update()
		{
			//when startTime is not zero meaning that start has been pressed once in a row
		 	if(startTime !=0)
			{
				document.getElementById("timer").innerHTML = formatTime(currentTime());
				console.log("elapsedTime "+formatTime(currentTime()));
			}
			
			//startTime has been pressed mutliple times
			
		}
*/

Timer.prototype.start = function()
{
			console.log("color: "+document.getElementById("startButton").style.background);
			
			if(document.getElementById("startButton").value == "Start")
			{
				console.log("Start button pressed");
				getStartValue();
				clocktimer = setInterval("update()", 0.9);
				document.getElementById("startButton").value = "Pause";
				document.getElementById("startButton").style.background = '#D5D5B2';
			}
			else
			{
				console.log("Paused button pressed");
				elapsedTime = startTime ? elapsedTime + (new Date()).getTime() - startTime : 0;
				startTime = 0;
				clearInterval(clocktimer);
				document.getElementById("startButton").value = "Start";
				document.getElementById("startButton").style.background = '#00CC33';
			}
	
}

/*
function start() 
		{
			console.log("color: "+document.getElementById("startButton").style.background);
			
			if(document.getElementById("startButton").value == "Start")
			{
				console.log("Start button pressed");
				getStartValue();
				clocktimer = setInterval("update()", 0.9);
				document.getElementById("startButton").value = "Pause";
				document.getElementById("startButton").style.background = '#D5D5B2';
			}
			else
			{
				console.log("Paused button pressed");
				elapsedTime = startTime ? elapsedTime + (new Date()).getTime() - startTime : 0;
				startTime = 0;
				clearInterval(clocktimer);
				document.getElementById("startButton").value = "Start";
				document.getElementById("startButton").style.background = '#00CC33';
			}

		}
*/

Timer.prototype.stop = function()
{
			startTime = 0;
			elapsedTime = 0;
			clearInterval(clocktimer);
			document.getElementById("timer").innerHTML = "00:00:00";
			document.getElementById("startButton").value = "Start";
			document.getElementById("startButton").style.background = '#00CC33';
			console.log("stopping timer");
}		

/*
function stop()
		{
			startTime = 0;
			elapsedTime = 0;
			document.getElementById("timer").innerHTML = "00:00:00";
			document.getElementById("startButton").value = "Start";
		}
		
*/


pad = function(num, size)
{
			var s = "0000" + num;
			return s.substr(s.length - size);	
}

/*function pad(num, size) 
		{
			var s = "0000" + num;
			return s.substr(s.length - size);
		}
*/
	
formatTime = function (time)
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

/*
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
		}*/
		
		
var observationTimer = new Timer();