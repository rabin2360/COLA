var ObservationController = (function() {
    var numberOfPauses;

    var currentStage;
    var startButtonElementId;
    var stopButtonElementId;

    var timerWatch;
    var observationSettings;
    var systemClockSettings;

    const SECONDS = 60;

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
        console.log("Current stage: " + currentStage);
        observationScreen.getCurrentStage();
    }

    function resetCurrentStage() {
        currentStage = 1;
        document.getElementById("settingsInfoNumer").innerHTML = currentStage;
    }

    function startButtonPressed() {
        observationSettings.startPauseSettingsDisplay();
        if (document.getElementById("startButton").value == "Start") {
            console.log("ObservationController start button pressed");
            timerWatch.start(observationSettings.getTotalObservationTime(), observationSettings.getFrequency());
            systemClockSettings.recordObservationStartOrPauseTime();
            changeStartButtonUI("Pause", "#FFFF00");
        } else {
            numberOfPauses++;
            timerWatch.pause();
            observationSettings.disableDropDownMenuItems(timerWatch.getElapsedTime());
            changeStartButtonUI("Start", '#00CC33');


        }
    }

    function changeStartButtonUI(buttonText, buttonColor) {
        document.getElementById("startButton").value = buttonText;
        document.getElementById("startButton").style.background = buttonColor;
    }

    function stopButtonPressed() {
        timerWatch.stop();
        systemClockSettings.getObservationStopTime();
        resetCurrentStage();
        observationSettings.stopSettingsDisplay();
        observationSettings.enableDropDownMenuItems();
        changeStartButtonUI("Start", "#00CC33");

    }

    function saveCurrentStageDate() {
        //need datastructures to save the info for TS and CP
        // put that info in the datastructure
        //most likely called by refresh() or incrementCurrentStage
        //will check for if buttons are pressed - 1 is pressed and 0 otherwise
        //will check for if checkboxes are marked
    }

    function typeOfActivity() {
        //need an array to save the information 
        //put info into the datastructure
        //most likely called by refresh() or incrementCurrentStage
    }

    function updateObservation() {
        //refresh the pressed buttons
        //refresh controlled by the timer - if paused, nothing happens to the screen
        //called at the beginning of the new stage - likely to be called by incrementCurrentStage
    }

    return ObservationController;
})();

var observationScreen = new ObservationController();