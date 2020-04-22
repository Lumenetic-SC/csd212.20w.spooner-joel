"use strict" 
var formValidity = true 

function validateRequired() { 
	var inputElements = document.querySelectorAll("#contactinfo input")  
	var errorDiv = document.getElementById("errorText")  
	var elementCount = inputElements.length  
	var requiredValidity = true  
	var currentElement  

	try {
		for (var i = 0; i < elementCount;  i++) { 
			currentElement = inputElements[i]  
			if (currentElement.value === "") {
				currentElement.style.background = "rgb(255,233,233)" 
				requiredValidity = false 
			} else {
				currentElement.style.background = "white" 
			}
		}
		if (requiredValidity === false) { 
			throw "Please complete all fields." 
		} 
		errorDiv.style.display = "none" 
		errorDiv.innerHTML = "" 
	}
	catch(msg){
		errorDiv.style.display = "block" 
		errorDiv.innerHTML = msg  
		formValidity = false 
	}
}
	function advanceSsn(){
		var ssnFields = document.getElementsByClassName("ssn")
		var currentField = document.activeElement
		if (currentField.value.length === currentField.maxLength){
			if (currentField === ssnFields[0]){
				ssnFields[1].focus()
			}
			if (currentField === ssnFields[1]){
				ssnFields[2].focus()
			}
			if (currentField === ssnFields[2]){
				document.getElementById("submitBtn").focus()
			}
		}
	}

	function createEventListeners() { 
		var form = document.getElementsByTagName("form")[0]  
		if (form.addEventListener) {
			form.addEventListener("submit", validateForm, false)  
		} else if (form.attachEvent) {
			form.attachEvent("onsubmit", validateForm) 
		}
		var ssnFields = document.getElementsByClassName("ssn")
		for (var i = 0; i < ssnFields.length; i++){
			ssnFields[i].addEventListener("input", advanceSsn, false)
		}
	}

	function validateForm(evt) { 
		if (evt.preventDefault) {
		evt.preventDefault() 
		evt.returnValue = false 
		}	
	
	formValidity = true 
	validateRequired()  
	validateNumbers() 	
	if (formValidity === true) { 	
		document.getElementsByTagName("form")[0].submit() 
		}
	}

	function validateNumbers() { 
		var numberInputs = document.querySelectorAll("#contactinfo input[type=number]")  
		var elementCount = numberInputs.length  
		var numErrorDiv = document.getElementById("numErrorText")  
		var numbersValidity = true  
		var currentElement  
		
		try {
			for (var i = 0;  i < elementCount; i++) {
				currentElement = numberInputs[i] 
				if (isNaN(currentElement.value) || (currentElement.value === "")) {
					currentElement.style.background = "rgb(255,233,233)"  
					numbersValidity = false 
				} else { 
					currentElement.style.background = "white" 
				} 
			} 
			if (numbersValidity === false) {
				throw "Zip and Social Security values must be numbers." 
			}
			
			numErrorDiv.style.display = "none" 
			numErrorDiv.innerHTML = "" 
		}
		 catch(msg) {
			numErrorDiv.style.display = "block" 
			numErrorDiv.innerHTML = msg
			formValidity = false
		}
	}

	function zeroPlaceholder() {
		var addressBox = document.getElementById("addrinput")
		addressBox.style.color = "black"
		if (addressBox.value === addressBox.placeholder){
			addressBox.value = ""
		}
	}

	function checkPlaceholder(){
		var addressBox = document.getElementById("addrinput")
		if (addressBox.value === ""){
			style.color = "rgb(178,184,183)"
			addressBox.value = addressBox.placeholder
		}
	}

	function generatePlaceholder(){
		if(!Modernizr.input.placeholder){
			var addressBox = document.getElementById("addrinput")
			addressBox.value = addressBox.placeholder
			addressBox.style.color = "rgb(178,184,183)"
			if (addressBox.addEventListener){
				addressBox.addEventListener("focus", zeroPlaceholder, false)
				addressBox.addEventListener("blur", checkPlaceholder, false)
			} 
			else if (addressBox.attachEvent){
				addressBox.attachEvent("onfocus", zeroPlaceholder)
				addressBox.attachEvent("onblur", checkPlaceholder)
			}
		}
	}

	function setUpPage(){
		createEventListeners()
		generatePlaceholder()
	}
	
	if (window.addEventListener) { 
		window.addEventListener("load", setUpPage, false) 
	} else if (window.attachEvent) { 
		window.attachEvent("onload", setUpPage) 
	}
