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

document.getElementById("input").style.visibility="hidden";

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
	result = solution();
	limitedCanvas.innerHTML = result;
}

function readInput() {
	inputStorage = ""+inputField.value;
	inputField.value = "";
}

function solution(){
	
	return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";
}
