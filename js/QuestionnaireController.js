var QuestionnaireController = (function(){

var formElementId;
var observerResponses;

var saveResponsesElementId;
var characterCounterQuestion1;
var nominalTSBehavior;
var tsProductivity;

var modalSaveButtonElementId;
var dbController;
var saveToDB;

function QuestionnaireController()
{
	observerResponses = [];
	
	formElementId = document.getElementById("questions");
	
	//listener for the save button on the Questionnaire view page
	saveResponsesElementId = document.getElementById("saveResponsesButton");
	saveResponsesElementId.addEventListener("click", save);
	
	saveToDBElementId = document.getElementById("saveToDB");
	saveToDBElementId.addEventListener("click", saveToDB);
	
	characterCounterQuestion1 = document.getElementById("question1");
	characterCounterQuestion1.addEventListener("keydown", function(){characterCounter(characterCounterQuestion1)});
	
	
	characterCounterQuestion2 = document.getElementById("question2");
	characterCounterQuestion2.addEventListener("keydown", function(){characterCounter(characterCounterQuestion2)});
	
	textDisplayButton = document.getElementById("question1Button");
	textDisplayButton.addEventListener("click", displayTextField1);
	
	textDisplayButton = document.getElementById("question2Button");
	textDisplayButton.addEventListener("click", displayTextField2);
	
	nominalTSBehavior = document.getElementById("nominalTSBehavior");
	tsProductivity = document.getElementById("tsProductivity");
	
	/*characterCounterQuestion3 = document.getElementById("question3");
	characterCounterQuestion3.addEventListener("keydown", function(){characterCounter(characterCounterQuestion3)});
	
	characterCounterQuestion4 = document.getElementById("question4");
	characterCounterQuestion4.addEventListener("keydown", function(){characterCounter(characterCounterQuestion4)});
	*/
	//if any text is written, dump it in the text fields
	convertStringToArray("observerResponses");
	
	writeTextValues();
	retrieveAnswers();
	
	document.getElementById(characterCounterQuestion1.id+"Chars").innerHTML = characterCounter(characterCounterQuestion1);
	document.getElementById(characterCounterQuestion2.id+"Chars").innerHTML = characterCounter(characterCounterQuestion2);
	//document.getElementById(characterCounterQuestion3.id+"Chars").innerHTML = characterCounter(characterCounterQuestion3);
	//document.getElementById(characterCounterQuestion4.id+"Chars").innerHTML = characterCounter(characterCounterQuestion4);
	
	dbController = new DatabaseController();
}

function displayTextField2()
{
	document.querySelector(".textarea2").style.display ="inline";
	document.querySelector(".remainingChars2").style.display ="inline";
	document.querySelector(".questionButton2").style.display ="none";
}

function displayTextField1 ()
{
	document.querySelector(".textarea1").style.display ="inline";
	document.querySelector(".remainingChars1").style.display ="inline";
	document.querySelector(".questionButton1").style.display ="none";
	
	//textDisplayButton.style.display = "";
}

function displayQuestions()
{
	document.querySelector(".textarea1").style.display ="none";
	document.querySelector(".textarea2").style.display ="none";
	document.querySelector(".remainingChars1").style.display ="none";
	document.querySelector(".remainingChars2").style.display ="none";
	document.querySelector(".questionButton1").style.display ="inline";
	document.querySelector(".questionButton2").style.display ="inline";
}

function saveToDB()
{
	dbController.saveSession();
	dbController.saveQuestionnnaire();
}

function save()
{
	//save the text inputs from the field. They are optional
	retrieveAnswers();
	getNominalTSBehavior();
	getTSProductivity();
	displayQuestions();
	//initiate the connection to the database and transfer the following info to the database
	//-Student Info
	//-Observation Info
	//-Observer's Info
	//-Observation Context
	//-Optional Questionnaire inputs
}

function getNominalTSBehavior()
{
	var selectedNominalBehavior = nominalTSBehavior.options[nominalTSBehavior.selectedIndex].text;
	localStorage.setItem("nominalTSBehavior", selectedNominalBehavior);
	
	return selectedNominalBehavior;
}

function getTSProductivity()
{
	var selectedProductivityScale = tsProductivity.options[tsProductivity.selectedIndex].text;
	localStorage.setItem("tsProductivity", selectedProductivityScale);
	
	return selectedProductivityScale;
}

QuestionnaireController.prototype.previousPage =function()
{
	//save info before going to summary screen
	saveTextValues();
	retrieveAnswers();
	window.location = "SummaryScreen.html";
}

function writeTextValues()
{
  characterCounterQuestion1.value = observerResponses[1];//localStorage.getItem("question1");
  characterCounterQuestion2.value = observerResponses[3];//localStorage.getItem("question2");  
  //characterCounterQuestion3.value = localStorage.getItem("question3");
}

function saveTextValues()
{
	//localStorage.setItem("question1",characterCounterQuestion1.value);
	//localStorage.setItem("question2",characterCounterQuestion2.value);
	//localStorage.setItem("question3",characterCounterQuestion3.value);
	
}

 //REMOVE THIS.
QuestionnaireController.prototype.showArray = function()
{
	return observerResponses;
}

function retrieveAnswers()
{
	var totalInputBoxes = formElementId.elements.length;
	
	for(var i = 0; i<totalInputBoxes; i++)
	{
		observerResponses[i] = formElementId.elements[i].value;
	
		if(observerResponses[i] =="")
		{
			console.log("here");
			observerResponses[i] = formElementId.elements[i].textContent;
		}
		
	}
	
	localStorage.setItem("observerResponses", observerResponses);
}

function convertStringToArray(key)
{
	var responsesString = localStorage.getItem(key);
	if(responsesString !=null){
	observerResponses = responsesString.split(',');
	}
}

function characterCounter(elementId)
{
	id = elementId.id;	
	var max = elementId.maxLength;
	var currentLength = elementId.value.length;
	document.getElementById(id+"Chars").innerHTML = max - currentLength;
	
	return (max - currentLength);
}

return QuestionnaireController;
}());
