var DatabaseController = (function() {
    var db;

    function DatabaseController() {
        //initialize database
        db = window.openDatabase("colaDB", "1.0", "COLA database", 1000000);
    }

    DatabaseController.prototype.saveStudentInfo = function(studentID, studentName, dateOfBirth, consentDate, ethnicity, 
                                                            primaryLanguage, gradeLevel, teacherName, currClass, 
                                                            observerName, observerTile) { 
        db.transaction(saveStudentInfoFields, errorDB, successDB);
    }
    
    DatabaseController.prototype.retrieveStudentInfo = function(studentID) { 
        db.transaction(retrieveStudentInfoFields, errorDB, successDB);
    }
    
    function errorDB(err) {
        if (err.code == 6) {
            //TODO: add popup message stating the required fields need to be filled out
            console.log("Null field error");
        }
        console.log("Database error: " + err.message);
    }
    
    function successDB() {
        console.log("Database success");
    }

    function print_query(tx, results) {
        console.log("DEMO table: " + results.rows.length + " rows found.");
        for (var i = 0; i < results.rows.length; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).StudentId);
            console.log("ethnicity = " + results.rows.item(i).Ethnicity);
        }
    } 

    function saveStudentInfoFields(tx) {
        //so ugly, but the default PhoneGap database doesn't allow you to pass in parameters to the database
        //transaction so I have to re-retrieve all the field data. I still went through the motions of passing the
        //parameters in to the saveStudentInfo function because that is how this should work, but they're not actually 
        //doing anything
        var studentID = ((document.getElementById('siID').value != '') ? document.getElementById('siID').value : null);
        var studentName = ((document.getElementById('siStudentName').value != '') ? document.getElementById('siStudentName').value : null);
        var dateOfBirth = ((document.getElementById('siDOB').value != '') ? document.getElementById('siDOB').value : null);
        var consentDate = ((document.getElementById('siConsentDate').value != '') ? document.getElementById('siConsentDate').value : null);
        var ethnicity = ((document.getElementById('siEthnicity').value != '') ? document.getElementById('siEthnicity').value : null);
        var primaryLanguage = ((document.getElementById('siPrimaryLanguage').value != '') ? document.getElementById('siPrimaryLanguage').value : null);
        var gradeLevel = ((document.getElementById('siGradeLevel').value != '') ? document.getElementById('siGradeLevel').value : null);
        var teacherName = ((document.getElementById('siTeacherName').value != '') ? document.getElementById('siTeacherName').value : null);
        var currClass = ((document.getElementById('siClass').value != '') ? document.getElementById('siClass').value : null);
        var observerName = ((document.getElementById('siObserverName').value != '') ? document.getElementById('siObserverName').value : null);
        var observerTile = ((document.getElementById('siObserverTitle').value != '') ? document.getElementById('siObserverTitle').value : null);
        
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
        tx.executeSql('SELECT * FROM StudentInfo', [], print_query, errorDB);
    }

    function retrieveStudentInfoFields(tx) {
        //can't pass studentID as a parameter
        var studentID = document.getElementById('siID').value;
        tx.executeSql('SELECT * FROM StudentInfo WHERE StudentId=?', [studentID], setStudentInfoFields, errorDB);
    }

    function setStudentInfoFields(tx, results) {
        //again, super ugly because the PhoneGap database doesn't allow me to return parameters in a db transaction.
        //instead, I have to enter the data into the fields from here
        console.log('result rows = ' + results.rows.length);
        if (results.rows.length == 1) {
            document.getElementById('siID').value = results.rows.item(0).StudentId;
            document.getElementById('siStudentName').value = results.rows.item(0).StudentName; 
            document.getElementById('siDOB').value = results.rows.item(0).DOB;
            document.getElementById('siConsentDate').value = results.rows.item(0).ConsentDate; 
            ethnicityDropdown = document.getElementById('siEthnicity');
            setSelectedValue(ethnicityDropdown, results.rows.item(0).Ethnicity);
            primaryLanguageDropdown = document.getElementById('siPrimaryLanguage');
            setSelectedValue(primaryLanguageDropdown, results.rows.item(0).PrimaryLanguage);
            gradeLevelDropdown = document.getElementById('siGradeLevel');
            setSelectedValue(gradeLevelDropdown, results.rows.item(0).GradeLevel);
        } else {
            //clear all fields except studentID if student doesn't exist in DB
            document.getElementById('siStudentName').value = ''; 
            document.getElementById('siDOB').value = '';
            document.getElementById('siConsentDate').value = ''; 
            document.getElementById('siEthnicity').value = ''; 
            document.getElementById('siPrimaryLanguage').value = '';
            document.getElementById('siGradeLevel').value = '';
        }
    }

    function setSelectedValue(selectObj, valueToSet) {
        for (var i = 0; i < selectObj.options.length; i++) {
            if (selectObj.options[i].text == valueToSet) {
                //selectObj.options[i].selected = true;
                selectObj.selectedIndex = i;
                console.log('selecting index ' + i);
                return;
            }
        }
    }

    return DatabaseController;

}());

