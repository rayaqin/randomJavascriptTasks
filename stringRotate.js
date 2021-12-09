var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;

var exampleArray = ["~>~","~a~","~b~","~c~","~d~","~e~","~f~","~g~","~h~","~i~","~j~",];

function clearCanvas() {
  canvas.style.justifyContent = "center";
  canvas.style.alignItems = "center";
  canvas.innerHTML = "Cleared...";
}

function runScript() {
  canvas.style.justifyContent = "flex-start";
  canvas.style.alignItems = "stretch";
  let result = solution();

  //Task implementation

  canvas.innerHTML = result;
}

function solution(){
	var entireStart = performance.now();
	
	var result = "";

	this.exampleArray = rotate(this.exampleArray,24522);
	canvas.style.fontSize = "25px";
	
	var entireFinish = performance.now();
	console.log("Completion time: " + (entireFinish - entireStart));
	exampleArray.forEach((element)=>{result+=element});
	return result;
	//return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";
}

function rotate(inputArray, displacement){
	if(isValidString(inputArray) == false){
		return "wrong input array";
	};
	if(isNaN(displacement)){
		return "wrong displacement number";
	}
	var inputSize = Object.keys(inputArray).length
	
	displacement = simplifyBigDisplacement(displacement, inputSize);
	
	var resultArray = inputArray.slice();
	inputArray.forEach((element, index) => {
		resultArray[getTargetIndex(index, inputSize, displacement)] = element;
	});
	return resultArray;
}

function getTargetIndex(currentIndex, size, displacement){
	if(currentIndex + displacement < size){
		return currentIndex + displacement;
	} else {
		return Math.abs(size-(currentIndex+displacement));
	}
}

function simplifyBigDisplacement(displacement, size){
	return displacement%size;
}

function isValidString(inputArray){
	if(inputArray!= undefined && inputArray!= null && typeof(inputArray)==="object" && typeof(inputArray[0]) === "string"){
		return true;
	} else {
		return false;
	}
}
