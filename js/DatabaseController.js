var DatabaseController = (function() {
    var db;
    var sessionId;

    function DatabaseController() {
        //initialize database
        db = window.openDatabase("colaDB", "1.0", "COLA database", 10000000);
    }

    DatabaseController.prototype.saveStudentInfo = function() { 
        db.transaction(saveStudentInfoFields, errorDB, successDB);
    }
    
    DatabaseController.prototype.saveStudentInfoAndNavigate = function() { 
        db.transaction(saveStudentInfoFields, errorDB, successToObsPage);
    }
    
    DatabaseController.prototype.retrieveStudentInfo = function(sID) { 
        db.transaction(retrieveStudentInfoFields, errorDB, successDB);
    }
    
    DatabaseController.prototype.saveSession = function() { 
        db.transaction(createSession, errorDB, successDB);
        db.transaction(saveObservationData, errorDB, successDB);
    }
    
    DatabaseController.prototype.saveQuestionnaire = function() { 
        db.transaction(saveQuestions, errorDB, successDB);
    }
    
    function saveStudentInfoFields(tx) {
        var studentID = (localStorage.getItem('studentID') != '' ? localStorage.getItem('studentID') : null); 
        var studentName = (localStorage.getItem('studentName') != '' ? localStorage.getItem('studentName') : null);
        var dateOfBirth = (localStorage.getItem('dateOfBirth') != '' ? localStorage.getItem('dateOfBirth') : null);
        var consentDate = (localStorage.getItem('consentDate') != '' ? localStorage.getItem('consentDate') : null);
        var ethnicity = (localStorage.getItem('ethnicity') != '' ? localStorage.getItem('ethnicity') : null);
        var primaryLanguage = (localStorage.getItem('primaryLanguage') != '' ? localStorage.getItem('primaryLanguage') : null);
        var gradeLevel = (localStorage.getItem('gradeLevel') != '' ? localStorage.getItem('gradeLevel') : null);
        
        //create tables if they don't exist
        //TODO: MAKE STUDENTNAME, DOB, CONSENTDATE, AND ETHNICITY NOT NULL
        //TODO: update dates to date type
        tx.executeSql('CREATE TABLE IF NOT EXISTS StudentInfo (\n' +
                        'StudentId int NOT NULL,\n' +
                        'StudentName varchar(255),\n' +
                        'DOB varchar(255),\n' +
                        'ConsentDate varchar(255),\n' +
                        'Ethnicity varchar(255),\n' +
                        'PrimaryLanguage varchar(255),\n' +
                        'GradeLevel int,\n' +
                        'PRIMARY KEY (StudentId) )')

        //note: there are cleaner ways to do an 'update or insert', but deleting the row and re-inserting is easy enough
        tx.executeSql('DELETE FROM StudentInfo WHERE StudentId=?', [studentID])
        tx.executeSql('INSERT INTO StudentInfo VALUES (?, ?, ?, ?, ?, ?, ?)', 
                       [studentID, studentName, dateOfBirth, consentDate, ethnicity, primaryLanguage, gradeLevel]);

        //print table to console
        //tx.executeSql('SELECT * FROM StudentInfo', [], print_query, errorDB);
    }

    function createSession(tx) {
        //create tables if they don't exist
        //TODO: update dates to date type
        tx.executeSql('CREATE TABLE IF NOT EXISTS Sessions (\n' +
                        'SessionId varchar(255) NOT NULL,\n' +
                        'StudentId int NOT NULL,\n' +
                        'TeacherName varchar(255),\n' + 
                        'Class varchar(255),\n' + 
                        'ObserverName varchar(255),\n' + 
                        'ObserverTitle varchar(255),\n' + 
                        'Duration int NOT NULL,\n' +
                        'IntervalFreq int NOT NULL,\n' +
                        'StartDateTime varchar(255) NOT NULL,\n' +
                        'EndDateTime varchar(255) NOT NULL,\n' +
                        'PRIMARY KEY (SessionId) )')
        
        var sessionID = localStorage.getItem('sessionID');		
        var studentID = localStorage.getItem("studentID");
        var teacherName = localStorage.getItem("teacherName");
        var currClass = localStorage.getItem("currClass");
        var observerName = localStorage.getItem("observerName");
        var observerTitle = localStorage.getItem("observerTitle");
        var duration = localStorage.getItem("observationDuration");
        var intervalFreq = localStorage.getItem("observationIntervalFreq");
        var startDateTime = localStorage.getItem("observationStartTime");
		var endDateTime = localStorage.getItem("observationEndTime");

        tx.executeSql('DELETE FROM Sessions WHERE SessionId=?', [sessionID])
        tx.executeSql('INSERT INTO Sessions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                      [sessionID, studentID, teacherName, currClass, observerName, observerTitle, duration, intervalFreq, 
                       startDateTime, endDateTime]);
        
    }
	
    function saveObservationData(tx) {    
        var dataArrayStr = localStorage.getItem("observationData");
        console.log('dataArray = ' + dataArrayStr)
        sessionID = localStorage.getItem('sessionID')
        console.log('sessionId = ' + sessionID)
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS Observations (\n' +
                        'SessionId varchar(255) NOT NULL,\n' +
                        'Interval int NOT NULL,\n' +
                        'tsObserving int NOT NULL,\n' +
                        'tsParticipating int NOT NULL,\n' +
                        'tsDisengaged int NOT NULL,\n' +
                        'tsVerbal int NOT NULL,\n' +
                        'tsMotor int NOT NULL,\n' +
                        'tsAggressive int NOT NULL,\n' +
                        'tsOutOfSeat int NOT NULL,\n' +
                        'cpObserving int NOT NULL,\n' +
                        'cpParticipating int NOT NULL,\n' +
                        'cpDisengaged int NOT NULL,\n' +
                        'cpVerbal int NOT NULL,\n' +
                        'cpMotor int NOT NULL,\n' +
                        'cpAggressive int NOT NULL,\n' +
                        'cpOutOfSeat int NOT NULL,\n' +
                        'activityType varchar(255) NOT NULL)') 
        //ts-observing,1,ts-participating,0,ts-disengaged,0,ts-verbal,0,ts-motor,0,ts-aggressive,0,ts-outOfSeat,0,
        //cp-observing,0,cp-participating,1,cp-disengaged,0,cp-verbal,0,cp-motor,0,cp-aggressive,1,cp-outOfSeat,0,
        //Whole-Class Instruction
        dataArray = dataArrayStr.split(',');
        i = 0;
        interval = 1;
        while (i < dataArray.length) {
            tsObserving = dataArray[i+1];
            tsParticipating = dataArray[i+3];
            tsDisengaged = dataArray[i+5];
            tsVerbal = dataArray[i+7];
            tsMotor = dataArray[i+9];
            tsAggressive = dataArray[i+11];
            tsOutOfSeat = dataArray[i+13];
            cpObserving = dataArray[i+15];
            cpParticipating = dataArray[i+17];
            cpDisengaged = dataArray[i+19];
            cpVerbal = dataArray[i+21];
            cpMotor = dataArray[i+23];
            cpAggressive = dataArray[i+25];
            cpOutOfSeat = dataArray[i+27];
            activityType = dataArray[i+28];
            tx.executeSql('INSERT INTO Observations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                           [sessionID, interval, tsObserving, tsParticipating, tsDisengaged, tsVerbal, tsMotor, tsAggressive, tsOutOfSeat, 
                            cpObserving, cpParticipating, cpDisengaged, cpVerbal, cpMotor, cpAggressive, cpOutOfSeat, activityType]);
            i += 29;
            interval++;
        }
    }
    
    function saveQuestions(tx) {
        //create tables if they don't exist
        //TODO: update dates to date type
        tx.executeSql('CREATE TABLE IF NOT EXISTS Questions (\n' +
                        'SessionId varchar(255) NOT NULL,\n' +
                        'Question varchar(1000) NOT NULL,\n' + 
                        'Answer varchar(1000) NOT NULL)')
        
        var sessionID = localStorage.getItem("sessionID");
        var observerResponsesStr = localStorage.getItem("observerResponses");
        var observerResponses = observerResponsesStr.split(',');

        for (var i = 0; i < observerResponses.length; i += 2) {
            tx.executeSql('INSERT INTO Questions VALUES (?, ?, ?)', [sessionID, observerResponses[i], observerResponses[i+1]]);
        }
    }

    function retrieveStudentInfoFields(tx) {
        //can't pass studentID as a parameter
        studentID = localStorage.getItem('studentID')
        tx.executeSql('SELECT * FROM StudentInfo WHERE StudentId=?', [studentID], setStudentInfoFields, errorDB);
    }

    function setStudentInfoFields(tx, results) {
        console.log('result rows = ' + results.rows.length);
        if (results.rows.length == 1) {
            document.getElementById('siID').value = results.rows.item(0).StudentId;
            document.getElementById('siStudentName').value = results.rows.item(0).StudentName; 
            document.getElementById('siDOB').value = results.rows.item(0).DOB;
            document.getElementById('siConsentDate').value = results.rows.item(0).ConsentDate; 
            document.getElementById('siEthnicity').value = results.rows.item(0).Ethnicity;
            document.getElementById('siPrimaryLanguage').value = results.rows.item(0).PrimaryLanguage;
            document.getElementById('siGradeLevel').value = results.rows.item(0).GradeLevel;
            console.log('set fields')
        }
    }
    
    function errorDB(err) {
        if (err.code == 6) {
            alert('Please enter in all the required fields before continuing.');
            console.log("Null field error");
        }
        console.log("Database error: " + err.message);
    }
    
    function successDB() {
        console.log("Database success");
    }

    function successToObsPage() {
        console.log("Database success, navigating to obs page");
	    window.location = "observation.html";
    }

    function print_query(tx, results) {
        console.log("table: " + results.rows.length + " rows found.");
        for (var i = 0; i < results.rows.length; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).StudentId);
            console.log("Row = " + i + " session ID = " + results.rows.item(i).SessionId);
        }
    } 

    return DatabaseController;

}());

