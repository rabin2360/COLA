var QuestionnaireController = (function(){

var formElementId;
var observerResponses;

var saveResponsesElementId;
var characterCounterQuestion1;

var text1DisplayButton;
var text2DisplayButton;


var modalSaveButtonElementId;
var dbController;

function QuestionnaireController()
{
	observerResponses = [];
	
	formElementId = document.getElementById("questions");
	
	//listener for the save button on the Questionnaire view page
	saveResponsesElementId = document.getElementById("saveResponsesButton");
	saveResponsesElementId.addEventListener("click", save);
	
	characterCounterQuestion1 = document.getElementById("question1");
	characterCounterQuestion1.addEventListener("keydown", function(){characterCounter(characterCounterQuestion1)});
	
	characterCounterQuestion2 = document.getElementById("question2");
	characterCounterQuestion2.addEventListener("keydown", function(){characterCounter(characterCounterQuestion2)});
	
	text1DisplayButton = document.getElementById("question1Button");
	text1DisplayButton.addEventListener("click", displayTextField1);
	
	text2DisplayButton = document.getElementById("question2Button");
	text2DisplayButton.addEventListener("click", displayTextField2);
	
	nominalTSBehavior = document.getElementById("nominalTSBehavior");
	tsProductivity = document.getElementById("tsProductivity");

	//if any text is written, dump it in the text fields
	convertStringToArray("observerResponses");
	
	writeTextValues();
	retrieveAnswers();
	
	document.getElementById(characterCounterQuestion1.id+"Chars").innerHTML = characterCounter(characterCounterQuestion1);
	document.getElementById(characterCounterQuestion2.id+"Chars").innerHTML = characterCounter(characterCounterQuestion2);
	
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
	dbController.saveStudentInfo();
	dbController.saveSession();
	dbController.saveQuestionnaire();
}

function save()
{
	//save the text inputs from the field. They are optional
	var userDecision = confirm("Save information to the database?");
	
	if(userDecision)
	{	
		saveToDB();
	    window.location = "index.html";	
	}
	
}

//Before navigating to the previous page, the typed and selected values are loaded to localStorage
//Then navigation happens
QuestionnaireController.prototype.previousPage =function()
{
	retrieveAnswers();
	window.location = "SummaryScreen.html";
}

//the stringified observerResponses are written to the textarea fields. This makes it such that the user 
//doesn't loose the semi-responses typed
function writeTextValues()
{
	if(observerResponses[1])
	{
		characterCounterQuestion1.value = observerResponses[1];
	}
	
	if(observerResponses[3])
	{
		characterCounterQuestion2.value = observerResponses[3];
	}
	
	if(observerResponses[5])
	{
		tsProductivity.value = observerResponses[5];
	
	}

	if(observerResponses[4])
	{
		nominalTSBehavior.value = observerResponses[4];
	}
	
}


 //REMOVE THIS.
QuestionnaireController.prototype.showArray = function()
{
	return observerResponses;
}

//read the question, answers and the drop down menu selections from the questionnaire screen page
//loads them to the localStorage
function retrieveAnswers()
{
	var totalInputBoxes = formElementId.elements.length;
	
	for(var i = 0; i<totalInputBoxes; i++)
	{
		observerResponses[i] = formElementId.elements[i].value;
	
		/*if(observerResponses[i] =="")
		{
			observerResponses[i] = formElementId.elements[i].textContent;
		}*/
		
	}
		//reading the questions 
		observerResponses[0] = formElementId.elements[0].textContent;
		observerResponses[2] = formElementId.elements[2].textContent;
	
	localStorage.setItem("observerResponses", observerResponses);
}

//convert the observerResponses to an array if not null
function convertStringToArray(key)
{
	var responsesString = localStorage.getItem(key);
	if(responsesString !=null){
	observerResponses = responsesString.split(',');
	}
}

//counts the number of character in each text field
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
