var Settings = (function()
{
	var frequency ;
	var tempFrequency;
	var totalObservation;
	var tempTotal;
	
	function Settings()
	{
		frequency = 15;
		totalObservation = 15;
	}
	
	Settings.prototype.getFrequency = function()
	{
		getSelectedValue("frequency");
		return frequency;
	}
	
	Settings.prototype.getTotalObservationTime = function()
	{
		getSelectedValue("totalTime");
		return totalObservation;
	}
	
	Settings.prototype.show = function()
	{	
		console.log("Selected frequency is :"+frequency);
		console.log("Selected total time is :"+totalObservation);
		
		document.getElementById("rabin").innerHTML = "The frequency is: "+frequency+", the total time is: "+totalObservation;
		
	}
	
	function getSelectedValue(elementId)
	{
		var temp;
		var selectedValue;
		temp = document.getElementById(elementId);
		selectedValue = temp.options[temp.selectedIndex].value;
		
		if(elementId =="frequency")
		{
			tempFrequency = selectedValue;
		}
		else
		{
			tempTotal = selectedValue;
		}
	}
	
	Settings.prototype.reset = function()
	{
		totalObservation = 15;
		if(document.getElementById("frequency").disabled == false)
		{
			frequency = 15;
			document.getElementById("frequency").value = frequency;
		}

		
		document.getElementById("totalTime").value = totalObservation;
	}
	
	Settings.prototype.cancel = function()
	{
		//restore the values of save and total Observation
		//do this by not changing the values
		document.getElementById("frequency").value = frequency;
		document.getElementById("totalTime").value = totalObservation;
	}
	
	Settings.prototype.save = function()
	{
		//save the info to frequency and totalObservation
		this.getFrequency();
		this.getTotalObservationTime();
		
		frequency = tempFrequency;
		totalObservation = tempTotal;
		
		document.getElementById("frequency").value = frequency;
		document.getElementById("totalTime").value = totalObservation;
		
	}
	
	return Settings;
}());

var modalSettings = new Settings();