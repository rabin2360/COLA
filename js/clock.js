function clockTime()
		{
		var clock;
		var clockHours;
		var clockMinutes;
		var clockSeconds;
		
			clock = new Date();
			clockHours = clock.getHours();
			clockMinutes = formatClockTime(clock.getMinutes());
			clockSeconds = formatClockTime(clock.getSeconds());
			document.getElementById("displayClock").innerHTML = clockHours+":"+clockMinutes+ ":"+clockSeconds;
			var t = setTimeout(clockTime, 400);
		}
		
function formatClockTime(i)
		{
			if(i < 10)
			{
				i = "0"+i;
			}
			return i;
		}