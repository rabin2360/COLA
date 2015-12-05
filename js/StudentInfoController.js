var StudentInfoController = (function() {

    var studentID;
    var studentName;
    var dateOfBirth;
    var consentDate;
    var ethnicity;
    var primaryLanguage;
    var gradeLevel;

    var teacherName;
    var currClass;

    var observerName;
    var observerTitle;

    function StudentInfoController() {
    }

    StudentInfoController.prototype.initialize = function() {
        saveButtonElementId = document.getElementById("siSaveButton");
        saveButtonElementId.addEventListener("click", this.save);
        
        clearButtonElementId = document.getElementById("siClearButton");
        clearButtonElementId.addEventListener("click", this.clear);
        
        nextButtonElementId = document.getElementById("siNextButton");
        nextButtonElementId.addEventListener("click", this.next);
        
        retrieveButtonElementId = document.getElementById("siRetrieveButton");
        retrieveButtonElementId.addEventListener("click", this.retrieveStudentInfo);

        dbController = new DatabaseController();
    }
    
    StudentInfoController.prototype.retrieveStudentInfo = function() {
        studentID = ((document.getElementById('siID') != null) ? document.getElementById('siID').value : null);
        dbController.retrieveStudentInfo(studentID);
        console.log("retrieve student info from: " + studentID);
    }

    StudentInfoController.prototype.save = function() {
        studentID = ((document.getElementById('siID') != null) ? document.getElementById('siID').value : null);
        studentName = ((document.getElementById('siStudentName') != null) ? document.getElementById('siStudentName').value : null);
        dateOfBirth = ((document.getElementById('siDOB') != null) ? document.getElementById('siDOB').value : null);
        consentDate = ((document.getElementById('siConsentDate') != null) ? document.getElementById('siConsentDate').value : null);
        ethnicity = ((document.getElementById('siEthnicity') != null) ? document.getElementById('siEthnicity').value : null);
        primaryLanguage = ((document.getElementById('siPrimaryLanguage') != null) ? document.getElementById('siPrimaryLanguage').value : null);
        gradeLevel = ((document.getElementById('siGradeLevel') != null) ? document.getElementById('siGradeLevel').value : null);
        teacherName = ((document.getElementById('siTeacherName') != null) ? document.getElementById('siTeacherName').value : null);
        currClass = ((document.getElementById('siClass') != null) ? document.getElementById('siClass').value : null);
        observerName = ((document.getElementById('siObserverName') != null) ? document.getElementById('siObserverName').value : null);
        observerTile = ((document.getElementById('siObserverTitle') != null) ? document.getElementById('siObserverTitle').value : null);
        
        dbController.saveStudentInfo(studentID, studentName, dateOfBirth, consentDate, ethnicity, primaryLanguage, gradeLevel,
                                     teacherName, currClass, observerName, observerTile);
        
        console.log("SI save button pressed: " + studentID + "  " + studentName);
    }
    
    StudentInfoController.prototype.clear = function() {
        document.getElementById('siID').value = ""; 
        document.getElementById('siStudentName').value = "";     
        document.getElementById('siDOB').value = "";             
        document.getElementById('siConsentDate').value = "";     
        document.getElementById('siEthnicity').value = "";       
        document.getElementById('siPrimaryLanguage').value = ""; 
        document.getElementById('siGradeLevel').value = "";      
        document.getElementById('siTeacherName').value = "";     
        document.getElementById('siClass').value = "";           
        document.getElementById('siObserverName').value = "";    
        document.getElementById('siObserverTitle').value = "";   

        studentID = null;
        studentName = null;     
        dateOfBirth = null;     
        consentDate = null;     
        ethnicity = null;       
        primaryLanguage = null; 
        gradeLevel = null;      
        teacherName = null;     
        currClass = null;       
        observerName = null;    
        observerTile = null;    
        
        console.log("clear pressed: " + document.getElementById('siID').value);
    }
    
    StudentInfoController.prototype.next = function() {
        studentInfoScreen.save();
        console.log("NEXT");
		window.location = "observation.html";
    }
    
    return StudentInfoController;

}());

//var studentInfoScreen = new StudentInfoController();
