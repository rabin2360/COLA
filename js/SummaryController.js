var SummaryController = (function() 
{
	var previousPageName;
	var observationData;
	
	var tsObserving;
	var tsParticipating;
	var tsDisengaged;
	var tsVerbal;
	var tsMotor;
	var tsAggressive;
	var tsOutOfSeat;

	var cpObserving;
	var cpParticipating;
	var cpDisengaged;
	var cpVerbal;
	var cpMotor;
	var cpAggressive;
	var cpOutOfSeat;
	
	function SummaryController()
	{
		tsObserving = 0;
		tsParticipating = 0;
		tsDisengaged = 0;
		tsVerbal = 0;
		tsMotor = 0;
		tsAggressive = 0;
		tsOutOfSeat = 0;

		cpObserving = 0;
		cpParticipating = 0;
		cpDisengaged = 0;
		cpVerbal = 0;
		cpMotor = 0;
		cpAggressive = 0;
		cpOutOfSeat = 0;
	
		previousPageName = "index.html";
		
		observationData = localStorage.getItem("observationData");
		observationDataParser(observationData);
		determineTotalObservationValue();
		printValues();
		observationSummaryInfo();	
	}
	
	SummaryController.prototype.previousPage = function()
	{
		window.location = previousPageName;
	}
	
	function observationSummaryInfo()
	{
		document.getElementById("totalObservedIntervals").innerHTML = determineTotalObservationValue();
		document.getElementById("observationDate").innerHTML = dateParser(localStorage.getItem("observationStartTime"));
		document.getElementById("startTime").innerHTML = timeParser(localStorage.getItem("observationStartTime"));
		document.getElementById("endTime").innerHTML = timeParser(localStorage.getItem("observationEndTime"));
		
		//add more summary info here
	}
	
	
	function observationDataParser(data)
	{
		var dataArray = data.split(',');
		percentage(1);
		
		for(var i = 0; i<dataArray.length; i=i+2)
		{
			switch(dataArray[i])
			{
				case 'ts-observing':
					tsObserving = parseInt(tsObserving) + parseInt(dataArray[i+1]);
				break;

				case 'ts-participating':
					tsParticipating = parseInt(tsParticipating) + parseInt(dataArray[i+1]);
				break;
				
				case 'ts-disengaged':
					tsDisengaged = parseInt(tsDisengaged) + parseInt(dataArray[i+1]);
				break;
				
				case 'ts-verbal':
					tsVerbal = parseInt(tsVerbal) + parseInt(dataArray[i+1]);
				break;
				
				case 'ts-motor':
					tsMotor = parseInt(tsMotor) + parseInt(dataArray[i+1]);
				break;
				
				case 'ts-aggressive':
					tsAggressive = parseInt(tsAggressive) + parseInt(dataArray[i+1]);
				break;
				
				case 'ts-outOfSeat':
					tsOutOfSeat = parseInt(tsOutOfSeat) + parseInt(dataArray[i+1]);
				break;
				
				case 'cp-observing':
					cpObserving = parseInt(cpObserving) + parseInt(dataArray[i+1]);
				break;

				case 'cp-participating':
					cpParticipating = parseInt(cpParticipating) + parseInt(dataArray[i+1]);
				break;
				
				case 'cp-disengaged':
					cpDisengaged = parseInt(cpDisengaged) + parseInt(dataArray[i+1]);
				break;
				
				case 'cp-verbal':
					cpVerbal = parseInt(cpVerbal) + parseInt(dataArray[i+1]);
					
				break;
				
				case 'cp-motor':
					cpMotor = parseInt(cpMotor) + parseInt(dataArray[i+1]);
					
				break;
				
				case 'cp-aggressive':
					cpAggressive = parseInt(cpAggressive) + parseInt(dataArray[i+1]);
				break;
				
				case 'cp-outOfSeat':
					cpOutOfSeat = parseInt(cpOutOfSeat) + parseInt(dataArray[i+1]);
				break;
				
				default:
					i--;
				break;
			}
		}
		return dataArray;
	}
	
	SummaryController.prototype.printValues = function()
	{
		document.getElementById("tsObserving").innerHTML = tsObserving;
		console.log("ts-observing: "+tsObserving);
		console.log("ts-participating: "+tsParticipating);
		console.log("ts-disengaged: "+tsDisengaged);
		console.log("ts-verbal: "+tsVerbal);
		console.log("ts-motor: "+tsMotor);
		console.log("ts-aggressive: "+tsAggressive);
		console.log("ts-outOfSeat: "+tsOutOfSeat);
		
		console.log("cp-observing: "+cpObserving);
		console.log("cp-participating: "+cpParticipating);
		console.log("cp-disengaged: "+cpDisengaged);
		console.log("cp-verbal: "+cpVerbal);
		console.log("cp-motor: "+cpMotor);
		console.log("cp-aggressive: "+cpAggressive);
		console.log("cp-outOfSeat: "+cpOutOfSeat);
	}
	
	function printValues()
	{
		document.getElementById("tsObserving").innerHTML = percentage(tsObserving);
		document.getElementById("tsParticipating").innerHTML = percentage(tsParticipating);
		document.getElementById("tsDisengaged").innerHTML = percentage(tsDisengaged);
		document.getElementById("tsVerbal").innerHTML = percentage(tsVerbal);
		document.getElementById("tsMotor").innerHTML = percentage(tsMotor);
		document.getElementById("tsAggressive").innerHTML = percentage(tsAggressive);
		document.getElementById("tsOutOfSeat").innerHTML = percentage(tsOutOfSeat);
		
		document.getElementById("cpObserving").innerHTML = percentage(cpObserving);
		document.getElementById("cpParticipating").innerHTML = percentage(cpParticipating);
		document.getElementById("cpDisengaged").innerHTML = percentage(cpDisengaged);
		document.getElementById("cpVerbal").innerHTML = percentage(cpVerbal);
		document.getElementById("cpMotor").innerHTML = percentage(cpMotor);
		document.getElementById("cpAggressive").innerHTML = percentage(cpOutOfSeat);
		document.getElementById("cpOutOfSeat").innerHTML = percentage(cpOutOfSeat);
		
		document.getElementById("tsOnTaskBehavior").innerHTML = percentage(onTaskBehavior(tsObserving, tsParticipating));
		document.getElementById("cpOnTaskBehavior").innerHTML = percentage(onTaskBehavior(cpObserving, cpParticipating));
		
		document.getElementById("tsOffTaskBehavior").innerHTML = percentage(offTaskBehavior(tsDisengaged, tsVerbal, tsMotor));
		document.getElementById("cpOffTaskBehavior").innerHTML = percentage(offTaskBehavior(tsDisengaged, tsVerbal, tsMotor));
	}
	
	function percentage(inputValue)
	{
		var total = determineTotalObservationValue();
		var percentageValue;
		
		//calculate percentage
		if(total !=0)
		{
		percentageValue = (parseInt(inputValue)/parseInt(total))*100;
		percentageValue = percentageValue.toFixed(2);
		}
		else
		{
			percentageValue = 0;
		}
		return percentageValue+"%";
	}
	
	function determineTotalObservationValue()
	{
		var total;
		
		total = parseInt(onTaskBehavior(tsObserving, tsParticipating)) + parseInt(offTaskBehavior(tsDisengaged, tsVerbal, tsMotor));
		return total;
	}
	
	function onTaskBehavior(observing, participating)
	{
		var onTaskBehavior = parseInt(observing)+parseInt(participating);
		return onTaskBehavior;
	}
	
	function offTaskBehavior(disengaged, verbal, motor)
	{
		var offTaskBehavior = parseInt(disengaged)+parseInt(verbal)+parseInt(motor);
		return offTaskBehavior;
	}
	
	function dateParser(inputDate)
	{
		var date = "";
		var inputArray;
		inputArray = inputDate.split(" ");
		
		date = inputArray[0]+", ";
		
		for(var i=1; i<4; i++)
		{
			date += inputArray[i]+" ";
		}
		
		if(inputDate === '0')
		{
			date = "";
		}
		
		return date;
	}
	
	function timeParser(inputTime)
	{
		var time = "";
		var inputArray;
		inputArray = inputTime.split(" ");
		
		
		time = inputArray[4];
		
		if( inputTime === '0')
		{
			time = "";
		}
		
		return time;
	}
	
	
	return SummaryController;
})();