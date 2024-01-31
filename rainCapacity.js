var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");
var limitedCanvas = document.getElementById("limitedCanvas");
var inputButton = document.getElementById("inputButton");
var inputField = document.getElementById("inputField");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;
inputButton.onclick = readInput;

var inputStorage = "";
var array0 = [0, 1, 0, 1, 0];
var array1 = [0, 1, 0, 2, 0, 2, 3, 0, 19, 2, 1, 2, 3, 0, 1, 0, 2, 0, 19, 3, 0, 3, 2, 1, 2, 3, 0];
var array2 = [9, 0, 0, 0, 9, 5, 0, 0, 0, 0, 0, 5, 3, 0, 0, 0, 3, 5, 0, 0, 0, 4, 0, 0, 0, 5];
var array3 = [1, 0, 2, 0, 2, 7, 0, 1, 0, 2, 0, 2, 7, 0, 5, 2, 1, 2, 3, 0, 1, 0, 2, 0, 5, 3, 0, 3, 5, 1, 2, 3, 6, 7, 0, 1, 0, 2];
var testArray = array3;

document.getElementById("input").style.visibility = "hidden";

function clearCanvas() {
	canvas.style.justifyContent = "center";
	canvas.style.alignItems = "center";
	limitedCanvas.style.justifyContent = "center";
	limitedCanvas.style.alignItems = "center";
	limitedCanvas.innerHTML = "";
}

function runScript() {
	canvas.style.justifyContent = "flex-start";
	canvas.style.alignItems = "stretch";
	limitedCanvas.style.justifyContent = "flex-start";
	limitedCanvas.style.alignItems = "stretch";
	limitedCanvas.style.display = "block";

	let result = "";
	result = solution(testArray);
	limitedCanvas.innerHTML = result;
}

function readInput() {
	inputStorage = "" + inputField.value;
	inputField.value = "";
}

function solution(intArray) {
	let leftSideSupport = calcLeftSideSupport(intArray);
	let rightSideSupport = calcRightSideSupport(intArray);
	let rainData = calcRainCapacity(intArray, leftSideSupport, rightSideSupport);
	let rainCapacity = rainData[0];
	let rainArray = rainData[1];
	let result = "";

	if (calcMaxHeight(intArray) <= 20 && intArray.length <= 40) {
		limitedCanvas.style.height = calcMaxHeight(intArray) * 25 + 100 + "px";
		limitedCanvas.style.width = Math.max(400, intArray.length * 15) + "px";
		result += "</br>" + drawGraph(intArray, rainArray);
	} else {
		result = "The input array is too large, so it won't be displayed.";
	}

	result += "</br><span class=\"textResult\">The rain capacity is: " + rainCapacity + "</span>";

	return result;

	//return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";
}

function calcMaxHeight(numberArray) {
	let tempArray = numberArray.slice();
	let maxHeight = tempArray.sort(function (a, b) { return b - a; })[0];
	return maxHeight;
}

function drawGraph(sourceArray, rainArray) {
	let gResult = "";
	let maxHeight = calcMaxHeight(sourceArray);
	let graphMatrix = new Array(maxHeight);
	for (let i = 0; i < maxHeight; i++) {
		graphMatrix[i] = [];
	};

	for (let i = 0; i < maxHeight; i++) {
		for (let j = 0; j < sourceArray.length; j++) {
			if (sourceArray[j] > i) {
				graphMatrix[i][j] = "<span class=\"terrain\">X</span>";
			} else if ((rainArray[j] + sourceArray[j]) > i) {
				graphMatrix[i][j] = "<span class=\"rain\">O</span>";
			} else {
				graphMatrix[i][j] = "<span class=\"air\">O</span>";
			}

		}
	}
	gResult += "<div style=\"width:" + sourceArray.length * 15 + "px; height:" + maxHeight * 24 + "px\">";
	for (let i = maxHeight - 1; i >= 0; i--) {
		for (let j = 0; j < sourceArray.length; j++) {
			gResult += graphMatrix[i][j];
		}
		gResult += "</br>";
	}

	gResult += "</div>";

	return gResult;
}

function calcRainCapacity(originalArray, leftArray, rightArray) {
	let rainCapacity = 0;
	let rainArray = [];
	for (let i = 0; i < originalArray.length; i++) {
		rainArray[i] = Math.min(leftArray[i], rightArray[i]) - originalArray[i];
		rainCapacity += rainArray[i];
	}
	return [rainCapacity, rainArray];
}

function calcLeftSideSupport(inputArray) {
	let resultArray = [];
	let tempMax = 0;

	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i] >= tempMax) {
			tempMax = inputArray[i];
		}
		resultArray[i] = tempMax;
	}
	return resultArray;
}
function calcRightSideSupport(inputArray) {
	let resultArray = [];
	let tempMax = 0;

	for (let i = inputArray.length - 1; i >= 0; i--) {
		if (inputArray[i] >= tempMax) {
			tempMax = inputArray[i];
		}
		resultArray[i] = tempMax;
	}
	return resultArray;
}