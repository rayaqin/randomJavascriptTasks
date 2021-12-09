var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;

var word1 = "abcaaaaaaa";
var word2 = "kcskkkkkkk";

function clearCanvas() {
	canvas.style.justifyContent = "center";
	canvas.style.alignItems = "center";
	canvas.innerHTML = "Cleared...";
}

function runScript() {
	canvas.style.justifyContent = "flex-start";
	canvas.style.alignItems = "stretch";
	let result = solution();

	canvas.innerHTML = result;
}

function solution(){
	var entireStart = performance.now();
	var result = "";
	if(convertToCoded(word1) == convertToCoded(word2)){
		result=  "Yes, " + word1 + " and " + word2 + " are isomorphic.";
	} else {
		result= "No, " + word1 + " and " + word2 + " are not isomorphic.";
	};
	
	var entireFinish = performance.now();
	console.log("Completion time: " + (entireFinish - entireStart));
	return result;
	//return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";
}

function convertToCoded(word){
	console.dir("converting word");
	var re = new RegExp(word,"g");
    for(let i=0; i<word.length; i++){
		if(isNaN(word[i])){
			re = new RegExp(word[i],"g");
        	word = word.replace(re, i.toString());
        }	
	}
	return word;
}