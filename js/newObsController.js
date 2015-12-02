var ObservationController = (function() {
    var numberOfPauses;

    var currentStage;
    var startButtonElementId;
    var stopButtonElementId;

    var timerWatch;
    var observationSettings;
    var systemClockSettings;

    const SECONDS = 60;

	var observationButtonsId;
	var observationButtonsOpacity;
	
	var typeOfActivityButtonId;
	var typeOfActivityButtonOpacity;
	
	var dataArray;
	
    function ObservationController() {
        currentStage = 1;
        numberOfPauses = 0;

        //listeners for the button presses on the observation screen
        startButtonElementId = document.getElementById("startButton");
        startButtonElementId.addEventListener("click", startButtonPressed);

        stopButtonElementId = document.getElementById("stopButton");
        stopButtonElementId.addEventListener("click", stopButtonPressed);

        saveSettingsButtonElementId = document.getElementById("saveSettings");
        saveSettingsButtonElementId.addEventListener("click", this.getTotalStages);

        saveSettingsButtonElementId = document.getElementById("resetSettings");
        saveSettingsButtonElementId.addEventListener("click", this.getTotalStages);

        timerWatch = new Timer();
        observationSettings = new Settings();
        systemClockSettings = new SystemSettings();
		
		observationButtonsId = document.getElementById("observationButtons");
		disableObservationButtons(true);
		
		typeOfActivityButtonId = document.getElementById("typeOfActivity");
		disableTypeOfActivity(true);
		
		observationButtonsOpacity = document.querySelectorAll(".traitButton label");
		opacityObservationButtons(0.6);
		
		typeOfActivityButtonOpacity = document.querySelector(".typeOfActivity");
		opacityTypeOfActivity(0.6);
		
		dataArray = [];
		
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
        this.getTotalStages();
        this.getCurrentStage();
    }

    ObservationController.prototype.getCurrentStage = function() {
        document.getElementById("settingsInfoNumer").innerHTML = currentStage;
        return currentStage;
    }

    ObservationController.prototype.getTotalStages = function() {
        var stages = (observationSettings.getTotalObservationTime() * SECONDS) / observationSettings.getFrequency();
        document.getElementById("settingsInfoDeno").innerHTML = stages;
        return stages;
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
        if (document.getElementById("startButton").value == "Start") {
            timerWatch.start(observationSettings.getTotalObservationTime(), observationSettings.getFrequency());
            systemClockSettings.recordObservationStartOrPauseTime();
			disableObservationButtons(false);
			disableTypeOfActivity(false);
			opacityObservationButtons(1);
			opacityTypeOfActivity(1);
            changeStartButtonUI("Pause", "#FFFF00");
        } else {
            numberOfPauses++;
            timerWatch.pause();
            observationSettings.disableDropDownMenuItems(timerWatch.getElapsedTime());
            changeStartButtonUI("Start", '#00CC33');
			disableObservationButtons(true);
			disableTypeOfActivity(true);
			opacityObservationButtons(0.6);
			opacityTypeOfActivity(0.6);

        }
    }

    function changeStartButtonUI(buttonText, buttonColor) {
        document.getElementById("startButton").value = buttonText;
        document.getElementById("startButton").style.background = buttonColor;
    }

    function stopButtonPressed() {
        timerWatch.pause();
            observationSettings.disableDropDownMenuItems(timerWatch.getElapsedTime());
            changeStartButtonUI("Start", '#00CC33');
			disableObservationButtons(true);
			disableTypeOfActivity(true);
			opacityObservationButtons(0.6);
			opacityTypeOfActivity(0.6);
			
		popUpWindow();

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
		{   stopProcess();
			navigateToAnotherPage();
			window.location = "test.html";
		}
		
	}
	
	function navigateToAnotherPage()
	{
		localStorage.setItem("observationData", dataArray);
		localStorage.setItem("observationStartTime", systemClockSettings.getObservationStartTime());
		localStorage.setItem("observationEndTime", systemClockSettings.getObservationStopTime());
	}
	
	ObservationController.prototype.traitButtonSelector = function(inputValue)
	{
		//console.log("inputValue"+inputValue);
	}
	
	ObservationController.prototype.updateObservation = function()
	{
		//console.log("update observation");
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
		//console.log("save");
    }

    return ObservationController;
}());

//var observationScreen = new ObservationController();