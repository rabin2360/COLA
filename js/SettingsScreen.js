var Settings = (function() {
    //settings screen variables
    var frequency;
    var totalObservation;
    var latestTime;

    //default values
    const DEFAULT_FREQUENCY = 15;
    const DEFAULT_TOTAL_TIME = 15;
	const SETTINGS_BUTTON_OPACITY = 0.6;
	const SETTINGS_BUTTON_VISIBILITY = 1;
	const CONVERT_TO_SECONDS = 60;
	const CONVERT_TO_MILLI_SECS = 100;

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

	//function helps to read the selected values in the drop down menu
    function getSelectedValue(elementId) {
        var temp;
        var selectedValue;
        temp = document.getElementById(elementId);
        selectedValue = temp.options[temp.selectedIndex].value;
        return selectedValue;
    }

	//resetting the settings 
    Settings.prototype.reset = function() {

        if (document.getElementById("frequency").disabled == false) {
            frequency = DEFAULT_FREQUENCY;
            document.getElementById("frequency").value = frequency;
        }

        if (document.getElementById("totalTime").options[0].disabled == false) {
            totalObservation = DEFAULT_TOTAL_TIME;
            document.getElementById("totalTime").value = totalObservation;
        }

    }

	//Settings is set but not yet saved
    Settings.prototype.cancel = function() {
        document.getElementById("frequency").value = frequency;
        document.getElementById("totalTime").value = totalObservation;
    }

	//Saving the settings
    Settings.prototype.save = function() {
        frequency = getSelectedValue("frequency");
        totalObservation = getSelectedValue("totalTime");

        document.getElementById("frequency").value = frequency;
        document.getElementById("totalTime").value = totalObservation;

    }

	//changing the display of Settings button when Start/Pause button is pressed
    Settings.prototype.startPauseSettingsDisplay = function() {
        if (document.getElementById("startButton").value == "Start") {
            settingsButtonDisplay(true, SETTINGS_BUTTON_OPACITY);
            frequencyDisplay(false, SETTINGS_BUTTON_VISIBILITY);
        } else {
            settingsButtonDisplay(false, SETTINGS_BUTTON_VISIBILITY);
            frequencyDisplay(true, SETTINGS_BUTTON_OPACITY);
        }
    }

	//changing the display of Settings button when the Stop button is pressed
    Settings.prototype.stopSettingsDisplay = function() {
        settingsButtonDisplay(false, SETTINGS_BUTTON_VISIBILITY);
        frequencyDisplay(false, SETTINGS_BUTTON_VISIBILITY);
    }

	//generic function controlling the Settings button display
    function settingsButtonDisplay(settingsButtonDisabled, settingsButtonOpacity) {
        document.getElementById("settingsButton").disabled = settingsButtonDisabled;
        document.querySelector(".settingsButton").style.opacity = settingsButtonOpacity;
    }

	//generic function controlling the ability to select the options listed in the frequency drop down
    function frequencyDisplay(frequencyDisabled, frequencyOpacity) {
        document.getElementById("frequency").disabled = frequencyDisabled;
        document.querySelector(".modal-body-frequency").style.opacity = frequencyOpacity;
    }

	//disable the drop down menu options after the current time has passed it i.e. after 15 mins, the option
	//to select the 15 mins from the total observation time drop down menu
    Settings.prototype.disableDropDownMenuItems = function(latestTime) {
        var temp = document.getElementById("totalTime");
		
		for (var i = 0; i < temp.options.length; i++) {
            if ((latestTime > ((temp.options[i].value) * CONVERT_TO_MILLI_SECS* CONVERT_TO_SECONDS))) {
                temp.options[i].disabled = true
            } else {
                break;
            }
        }
    }

	//this function re-enables the drop down menu functions
    Settings.prototype.enableDropDownMenuItems = function() {
        var temp = document.getElementById("totalTime");

        for (var i = 0; i < temp.options.length; i++) {
            temp.options[i].disabled = false;
        }

    }


    return Settings;
}());