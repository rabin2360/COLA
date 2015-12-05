function summaryScreen() {
	studentInfoScreen.studentName = document.studentForm.userName.value;
	studentInfoScreen.consentDate = document.studentForm.obsDate.value;
	studentInfoScreen.currClass = document.studentForm.userClass.value;
	studentInfoScreen.teacherName = document.studentForm.userTeacher.value;	
	studentInfoScreen.observerName = document.studentForm.obsName.value;
	
	
}

function summaryScreenNext() {
		window.location = "QuestionnaireScreen.html";
}

function summaryScreenBack() {
		window.location = "index.html";
}
