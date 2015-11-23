var Settings = (function() {
    //settings screen variables
    var frequency;
    var totalObservation;
	var latestTime;
	
	var startButtonElementId;
	var stopButtonElementId;
	var settingsButtonElementId;
	var saveSettingsButtonElementId;
	
    //default values
    const DEFAULT_FREQUENCY = 15;
    const DEFAULT_TOTAL_TIME = 15;
	
    function Settings() {
        frequency = DEFAULT_FREQUENCY;
        totalObservation = DEFAULT_TOTAL_TIME;
    }
	
    Settings.prototype.getFrequency = function() {
        return frequency;
    }

    Settings.prototype.getTotalObservationTime = function() {
        return totalObservation;
    }

    //using this method for debugging purposes
    Settings.prototype.show = function() {
        console.log("Selected frequency is :" + frequency);
        console.log("Selected total time is :" + totalObservation);
    }

    function getSelectedValue(elementId) {
        var temp;
        var selectedValue;
        temp = document.getElementById(elementId);
        selectedValue = temp.options[temp.selectedIndex].value;
        return selectedValue;
    }

    Settings.prototype.reset = function() {

        if (document.getElementById("frequency").disabled == false) {
            frequency = 15;
            document.getElementById("frequency").value = frequency;
        }
		
		if (document.getElementById("totalTime").options[0].disabled == false)
		{
			totalObservation = 15;
			document.getElementById("totalTime").value = totalObservation;
		}

    }

    Settings.prototype.cancel = function() {
        document.getElementById("frequency").value = frequency;
        document.getElementById("totalTime").value = totalObservation;
    }

    Settings.prototype.save = function() {
        frequency = getSelectedValue("frequency");
        totalObservation = getSelectedValue("totalTime");

        document.getElementById("frequency").value = frequency;
        document.getElementById("totalTime").value = totalObservation;

    }
	
	Settings.prototype.startPauseSettingsDisplay = function()
	{
		if (document.getElementById("startButton").value == "Start") {
			settingsButtonDisplay(true, 0.6);
			frequencyDisplay(false, 1);
		}
		else
		{
			settingsButtonDisplay(false, 1);
			frequencyDisplay(true, 0.6);
		}
	}
	
	Settings.prototype.stopSettingsDisplay = function()
	{
		settingsButtonDisplay(false, 1);
		frequencyDisplay(false, 1);
	}
	
	function settingsButtonDisplay(settingsButtonDisabled, settingsButtonOpacity)
	{
		document.getElementById("settingsButton").disabled = settingsButtonDisabled;
		document.querySelector(".settingsButton").style.opacity = settingsButtonOpacity;
	}
	
	function frequencyDisplay(frequencyDisabled, frequencyOpacity)
	{
		document.getElementById("frequency").disabled = frequencyDisabled;
        document.querySelector(".modal-body-frequency").style.opacity = frequencyOpacity;
	}
	
	Settings.prototype.disableDropDownMenuItems = function(latestTime)
	{
		var temp = document.getElementById("totalTime");
		for(var i = 0; i<temp.options.length; i++)
		{
			if((latestTime > ((temp.options[i].value)*1000)))
			{
				temp.options[i].disabled = true
			}
			else
			{
				break;
			}
		}
	}
	
	Settings.prototype.enableDropDownMenuItems = function()
	{
		var temp = document.getElementById("totalTime");
		
		for(var i = 0; i<temp.options.length; i++)
		{
			temp.options[i].disabled = false;
		}
		
	}


    return Settings;
}());

var modalSettings = new Settings();