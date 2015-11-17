var Settings = (function()
{
	//settings screen variables
	var frequency ;
	var totalObservation;
	
	//default values
	const DEFAULT_FREQUENCY = 15;
	const DEFAULT_TOTAL_TIME = 15;
	
	function Settings()
	{
		frequency = DEFAULT_FREQUENCY;
		totalObservation = DEFAULT_TOTAL_TIME;
	}
	
	Settings.prototype.getFrequency = function()
	{
		return frequency;
	}
	
	Settings.prototype.getTotalObservationTime = function()
	{
		return totalObservation;
	}
	
	//using this method for debugging purposes
	Settings.prototype.show = function()
	{	
		console.log("Selected frequency is :"+frequency);
		console.log("Selected total time is :"+totalObservation);
	}
	
	function getSelectedValue(elementId)
	{
		var temp;
		var selectedValue;
		temp = document.getElementById(elementId);
		selectedValue = temp.options[temp.selectedIndex].value;
		
		return selectedValue;
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
		document.getElementById("frequency").value = frequency;
		document.getElementById("totalTime").value = totalObservation;
	}
	
	Settings.prototype.save = function()
	{	
		frequency = getSelectedValue("frequency");
		totalObservation = getSelectedValue("totalTime");
		
		document.getElementById("frequency").value = frequency;
		document.getElementById("totalTime").value = totalObservation;
		
	}
	
	return Settings;
}());

var modalSettings = new Settings();