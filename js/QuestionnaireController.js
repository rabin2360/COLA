var QuestionnaireController = (function(){

var formElementId;
var observerResponses;

var saveResponsesElementId;

function QuestionnaireController()
{
	observerResponses = [];
	formElementId = document.getElementById("questions");
	
	//listener for the save button on the Questionnaire view page
	saveResponsesElementId = document.getElementById("saveResponsesButton");
	saveResponsesElementId.addEventListener("click", save);
	
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

return QuestionnaireController;
}());
