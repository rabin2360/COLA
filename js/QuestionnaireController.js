var QuestionnaireController = (function(){

var formElementId;
var observerResponses;

var saveResponsesElementId;
var characterCounterQuestion1;

function QuestionnaireController()
{
	observerResponses = [];
	formElementId = document.getElementById("questions");
	
	//listener for the save button on the Questionnaire view page
	saveResponsesElementId = document.getElementById("saveResponsesButton");
	saveResponsesElementId.addEventListener("click", save);
	
	
	characterCounterQuestion1 = document.getElementById("question1");
	characterCounterQuestion1.addEventListener("keyup", function(){characterCounter(characterCounterQuestion1)});
	document.getElementById(characterCounterQuestion1.id+"Chars").innerHTML = 500;
	
	characterCounterQuestion2 = document.getElementById("question2");
	characterCounterQuestion2.addEventListener("keyup", function(){characterCounter(characterCounterQuestion2)});
	document.getElementById(characterCounterQuestion2.id+"Chars").innerHTML = 500;
	
	characterCounterQuestion3 = document.getElementById("question3");
	characterCounterQuestion3.addEventListener("keyup", function(){characterCounter(characterCounterQuestion3)});
	document.getElementById(characterCounterQuestion3.id+"Chars").innerHTML = 500;
}

function save()
{
	//save the text inputs from the field. They are optional
	retrieveAnswers();
	
	//initiate the connection to the database and transfer the following info to the database
	//-Student Info
	//-Observation Info
	//-Observer's Info
	//-Observation Context
	//-Optional Questionnaire inputs
}

//return to the previous page for now - REMOVE THIS. 
QuestionnaireController.prototype.previousPage =function()
{
	window.location = "test.html";
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
	}
}

function characterCounter(elementId)
{
	id = elementId.id;	
	var max = elementId.maxLength;
	var currentLength = elementId.value.length;
	document.getElementById(id+"Chars").innerHTML = max - currentLength;
}

return QuestionnaireController;
}());
