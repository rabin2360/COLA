function hello(){
	var elementText = document.getElementById("rabin");
	elementText = elementText.innerHTML;

	
	if (elementText == "rabin says hello!")
	{
		document.getElementById("rabin").innerHTML = "Rabin says goodbye!";
	}
	else if (elementText == "rabin says goodbye!")
	{
			document.getElementById("rabin").innerHTML = "Rabin says hello!";
	}
	else
	{
			document.getElementById("rabin").innerHTML = "rabin says hello!";	
	}
}