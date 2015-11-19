var ObservationController = (function() {

    var currentStage;
    var callIncrement;
    var startButtonElementId;
    var stopButtonElementId;
    var frequencyRate;

    function ObservationController() {
        currentStage = 1;
        frequencyRate = 0;
    }

    ObservationController.prototype.initialize = function() {
        // startButtonElementId = document.getElementById("startButton");
        // startButtonElementId.addEventListener("click", updateStages);

        // stopButtonElementId = document.getElementById("stopButton");
        // stopButtonElementId.addEventListener("click", stopUpdates);
    }

    ObservationController.prototype.getCurrentStage = function() {
        document.getElementById("settingsInfoNumer").innerHTML = currentStage;
        return currentStage;
    }

    ObservationController.prototype.incrementCurrentStage = function() {
        currentStage++;
        console.log("Current stage: " + currentStage);
        observationScreen.getCurrentStage();
        return currentStage;
    }

    //ObservationController.prototype.updateStages = function()
    function updateStages() {
        if (document.getElementById("startButton").value == "Pause") {
            frequencyRate = (document.getElementById("frequency").value) * 1000;
            callIncrement = setInterval(incrementCurrentStage, frequencyRate);
            console.log("callIncrement: " + callIncrement);
        } else {
            clearInterval(callIncrement);
        }
    }

    //ObservationController.prototype.stopUpdates = function()
    function stopUpdates() {
        console.log("stopping updates");
        clearInterval(callIncrement);
    }

    return ObservationController;
})();

var observationScreen = new ObservationController();