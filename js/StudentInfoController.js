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
    
    var dbController;

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
        setLocalStorageFields();
        dbController.saveStudentInfo();
    }
    
    StudentInfoController.prototype.next = function() {
        setLocalStorageFields();
        dbController.saveStudentInfoAndNavigate(); 
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
    }
    
    function setLocalStorageFields() {
        studentID = ((document.getElementById('siID').value != '') ? document.getElementById('siID').value : null);
        studentName = ((document.getElementById('siStudentName').value != '') ? document.getElementById('siStudentName').value : null);
        dateOfBirth = ((document.getElementById('siDOB').value != '') ? document.getElementById('siDOB').value : null);
        consentDate = ((document.getElementById('siConsentDate').value != '') ? document.getElementById('siConsentDate').value : null);
        ethnicity = ((document.getElementById('siEthnicity').value != '') ? document.getElementById('siEthnicity').value : null);
        primaryLanguage = ((document.getElementById('siPrimaryLanguage').value != '') ? document.getElementById('siPrimaryLanguage').value : null);
        gradeLevel = ((document.getElementById('siGradeLevel').value != '') ? document.getElementById('siGradeLevel').value : null);
        teacherName = ((document.getElementById('siTeacherName').value != '') ? document.getElementById('siTeacherName').value : null);
        currClass = ((document.getElementById('siClass').value != '') ? document.getElementById('siClass').value : null);
        observerName = ((document.getElementById('siObserverName').value != '') ? document.getElementById('siObserverName').value : null);
        observerTitle = ((document.getElementById('siObserverTitle').value != '') ? document.getElementById('siObserverTitle').value : null);
        
        localStorage.setItem("studentID", studentID);
        localStorage.setItem("studentName", studentName);
        localStorage.setItem("dateOfBirth", dateOfBirth);
        localStorage.setItem("consentDate", consentDate);
        localStorage.setItem("ethnicity", ethnicity);
        localStorage.setItem("primaryLanguage", primaryLanguage);
        localStorage.setItem("gradeLevel", gradeLevel);
        localStorage.setItem("teacherName", teacherName);
        localStorage.setItem("currClass", currClass);
        localStorage.setItem("observerName", observerName);
        localStorage.setItem("observerTitle", observerTitle);
        
        localStorage.setItem("studentID", document.getElementById('siID').value);
        localStorage.setItem("studentName", document.getElementById('siStudentName').value);
        localStorage.setItem("dateOfBirth", document.getElementById('siDOB').value);
        localStorage.setItem("consentDate", document.getElementById('siConsentDate').value);
        localStorage.setItem("ethnicity", document.getElementById('siEthnicity').value);
        localStorage.setItem("primaryLanguage", document.getElementById('siPrimaryLanguage').value);
        localStorage.setItem("gradeLevel", document.getElementById('siGradeLevel').value);
        localStorage.setItem("teacherName", document.getElementById('siTeacherName').value);
        localStorage.setItem("currClass", document.getElementById('siClass').value);
        localStorage.setItem("observerName", document.getElementById('siObserverName').value);
        localStorage.setItem("observerTitle", document.getElementById('siObserverTitle').value);
    }

    return StudentInfoController;

}());

