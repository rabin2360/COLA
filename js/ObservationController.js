var ObservationController = (function() {
    var numberOfPauses;

    var currentStage;
    var startButtonElementId;
    var stopButtonElementId;

    var timerWatch;
    var observationSettings;
    var systemClockSettings;

	var saveSettingsButtonElementId;
	var resetSettingsButtonElementId;
	var cancelSettingsButtonElementId;
	
    const SECONDS = 60;

	var observationButtonsId;
	var observationButtonsOpacity;
	
	var typeOfActivityButtonId;
	var typeOfActivityButtonOpacity;
	
	var stopButtonId;
	var stopButtonOpacity;
	
	var dataArray;
	
    function ObservationController() {
        currentStage = 1;
        numberOfPauses = 0;

        //listeners for the button presses on the observation screen
        startButtonElementId = document.getElementById("startButton");
        startButtonElementId.addEventListener("click", startButtonPressed);

        stopButtonElementId = document.getElementById("stopButton");
        stopButtonElementId.addEventListener("click", this.stopButtonPressed);

        saveSettingsButtonElementId = document.getElementById("saveSettings");
        saveSettingsButtonElementId.addEventListener("click", saveTotalObservationTime);

        resetSettingsButtonElementId = document.getElementById("resetSettings");
        resetSettingsButtonElementId.addEventListener("click", resetFrequencyAndTotalTime);

		cancelSettingsButtonElementId = document.getElementById("cancelSettings");
        cancelSettingsButtonElementId.addEventListener("click", cancelObservationSettings);
		
        timerWatch = new Timer();
        observationSettings = new Settings();
        systemClockSettings = new SystemSettings();
		
		observationButtonsId = document.getElementById("observationButtons");
		disableObservationButtons(true);
		
		typeOfActivityButtonId = document.getElementById("typeOfActivity");
		disableTypeOfActivity(true);
		
		stopButtonId = document.getElementById("stopButton");
		disableStopButton(true);
		
		observationButtonsOpacity = document.querySelectorAll(".traitButton label");
		opacityObservationButtons(0.6);
		
		typeOfActivityButtonOpacity = document.querySelector(".typeOfActivity");
		opacityTypeOfActivity(0.6);
		
		stopButtonOpacity = document.querySelector(".stopButton");
		opacityStopButton(0.6);
		
		dataArray = [];
		
    }
	
	
    ObservationController.prototype.getCurrentStage = function() {
        document.getElementById("settingsInfoNumer").innerHTML = currentStage;
        return currentStage;
    }

	function cancelObservationSettings()
	{
		observationSettings.cancel();
	}
	
    function saveTotalObservationTime() {
		observationSettings.save();
		var stages = (observationSettings.getTotalObservationTime() * SECONDS) / observationSettings.getFrequency();
        document.getElementById("settingsInfoDeno").innerHTML = stages;
    }
	
	function resetFrequencyAndTotalTime()
	{
		observationSettings.reset();
		var stages = (observationSettings.getTotalObservationTime() * SECONDS) / observationSettings.getFrequency();
        document.getElementById("settingsInfoDeno").innerHTML = stages;
	}
	
	function disableStopButton(isDisabled)
	{
		stopButtonId.disabled = isDisabled;
	}
	
	function opacityStopButton(opacityIndex)
	{
		stopButtonOpacity.style.opacity = opacityIndex;
	}
	
	function disableTypeOfActivity(isDisabled)
	{
		typeOfActivityButtonId.disabled = isDisabled;
	}
	
	function opacityTypeOfActivity(opacityIndex)
	{
		typeOfActivityButtonOpacity.style.opacity = opacityIndex;
	}
	
	function opacityObservationButtons(opacityIndex)
	{
		for(var i = 0; i<observationButtonsOpacity.length; i++)
		{
			observationButtonsOpacity[i].style.opacity = opacityIndex;
		}
	}

	function disableObservationButtons(isDisabled) 
	{
		for(var i = 1; i<observationButtonsId.childNodes.length; i++)
		{
			if(i%2 !=0)
			{
				for(var j = 1; j<observationButtonsId.childNodes[i].childNodes.length; j++)
				{
					if(j%2 !=0)
					{
						observationButtonsId.childNodes[i].childNodes[j].childNodes[1].disabled = isDisabled;	
					}
				}

			}
		}
	}
	
    ObservationController.prototype.initialize = function() {
        saveTotalObservationTime();
        this.getCurrentStage();
    }

    ObservationController.prototype.incrementCurrentStage = function() {
        currentStage++;
        //console.log("Current stage: " + currentStage);
        observationScreen.getCurrentStage();
    }

    function resetCurrentStage() {
        currentStage = 1;
        document.getElementById("settingsInfoNumer").innerHTML = currentStage;
    }

    function startButtonPressed() {
        observationSettings.startPauseSettingsDisplay();
        if (document.getElementById("startButton").value == "Start") 
		{	
           startProcess();
        } 
		else 
		{	
			pauseProcess();   
        }
    }

	function startProcess()
	{
	    timerWatch.start(observationSettings.getTotalObservationTime(), observationSettings.getFrequency());
        systemClockSettings.recordObservationStartOrPauseTime();
		disableObservationButtons(false);
		disableTypeOfActivity(false);
		disableStopButton(true);
		opacityStopButton(0.6);
		opacityObservationButtons(1);
		opacityTypeOfActivity(1);
        changeStartButtonUI("Pause", "#FFFF00");	
	}
	
	function pauseProcess()
	{
		numberOfPauses++;
        timerWatch.pause();
        observationSettings.disableDropDownMenuItems(timerWatch.getElapsedTime());
        changeStartButtonUI("Start", '#00CC33');
	    disableObservationButtons(true);
		disableTypeOfActivity(true);
		disableStopButton(false);
		opacityStopButton(1);
		opacityObservationButtons(0.6);
		opacityTypeOfActivity(0.6);
	}
	
    function changeStartButtonUI(buttonText, buttonColor) {
        document.getElementById("startButton").value = buttonText;
        document.getElementById("startButton").style.background = buttonColor;
    }

    ObservationController.prototype.stopButtonPressed = function() {
		if(timerWatch.getElapsedTime()>(observationSettings.getTotalObservationTime()*1000*60))
		{	
			saveCurrentStageData();
			stopProcess();
			setLocalStorage();
			window.location = "SummaryScreen.html";
		}
		else
		{
			popUpWindow();
		}

    }
	
	function stopProcess()
	{
		timerWatch.stop();
        systemClockSettings.getObservationStopTime();
        resetCurrentStage();
		
        observationSettings.stopSettingsDisplay();
        observationSettings.enableDropDownMenuItems();
        changeStartButtonUI("Start", "#00CC33");
		disableObservationButtons(true);
		disableTypeOfActivity(true);
		opacityObservationButtons(0.6);
		opacityTypeOfActivity(0.6);
			
	}
	
	function popUpWindow()
	{	var userDecision = confirm("Are you sure you want to stop the observation?");
	
		if(userDecision)
		{   
			stopProcess();
			setLocalStorage();
			window.location = "SummaryScreen.html";
		}
		
	}
	
	function setLocalStorage()
	{
		localStorage.setItem("observationData", dataArray);
		localStorage.setItem("observationStartTime", systemClockSettings.getObservationStartTime());
		localStorage.setItem("observationEndTime", systemClockSettings.getObservationStopTime());
		localStorage.setItem("observationDuration", observationSettings.getTotalObservationTime()* SECONDS);
		localStorage.setItem("observationIntervalFreq", observationSettings.getFrequency());
	}
	
	ObservationController.prototype.traitButtonSelector = function(inputValue)
	{
		var buttonElements;
		var receivedInputValue = inputValue;
		
		//target student buttons
		if(inputValue.substring(0,1) == "t")
		{
			buttonElements = document.getElementById("traitButtonsTS");
			unselectOtherButtons(buttonElements, receivedInputValue);
		}
		//comparison peer buttons
		else
		{
			buttonElements = document.getElementById("traitButtonsCP");
			unselectOtherButtons(buttonElements, receivedInputValue);
		}
	}
	
	function unselectOtherButtons(buttonElements, inputValue)
	{
		for(var i =0; i<(buttonElements.children.length-2); i++)
			{
				if(buttonElements.children[i].children[0].value !=inputValue)
				{
					buttonElements.children[i].children[0].checked = false;
				}
		}
	}
	
	ObservationController.prototype.updateObservation = function()
	{
		saveCurrentStageData();
		resetObservationButtons();
	}
	
	function resetObservationButtons() 
	{
		for(var i = 1; i<observationButtonsId.childNodes.length; i++)
		{
			if(i%2 !=0)
			{
				for(var j = 1; j<observationButtonsId.childNodes[i].childNodes.length; j++)
				{
					if(j%2 !=0)
					{
						observationButtonsId.childNodes[i].childNodes[j].childNodes[1].checked = false;	
					}
				}

			}
		}
	}

	ObservationController.prototype.printArray = function()
	{
		return dataArray;
	}
	
    function saveCurrentStageData() {
        for(var i = 1; i<observationButtonsId.childNodes.length; i++)
		{
			if(i%2 !=0)
			{
				for(var j = 1; j<observationButtonsId.childNodes[i].childNodes.length; j++)
				{
					if(j%2 !=0)
					{
						dataArray.push(observationButtonsId.childNodes[i].childNodes[j].childNodes[1].value);
						
						if(observationButtonsId.childNodes[i].childNodes[j].childNodes[1].checked)
						{
						 dataArray.push(1);	
						}
						else
						{
						 dataArray.push(0);
						}
												
					}
				}

			}
		}
		
		dataArray.push(typeOfActivityButtonId.options[typeOfActivityButtonId.selectedIndex].text);
    }

    return ObservationController;
}());