var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");
var inputButton = document.getElementById("inputButton");
var inputField = document.getElementById("inputField");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;
inputButton.onclick = readInput;

var inputStorage = "";
var secretNumber = 1222;

document.getElementById("input").style.visibility="visible";
runButton.style.display="none";
inputField.maxLength = secretNumber.toString().length;

function clearCanvas() {
	canvas.style.justifyContent = "center";
	canvas.style.alignItems = "center";
	canvas.innerHTML = "";
}

function runScript() {
	canvas.style.justifyContent = "flex-start";
	canvas.style.alignItems = "stretch";
	let result = "";
	result = solution();
	canvas.innerHTML += "</br>Guess: " + inputStorage + "</br>" + result;
}

function readInput() {
	inputStorage = ""+inputField.value;
	inputField.value = "";
	runScript();
}

function solution(){
	let evaluation;
	if(inputStorage != ""){
		evaluation =  evaluateGuess(inputStorage, secretNumber);
		if(evaluation[0] == inputStorage.length){
			return "You win, the secret number is indeed " + secretNumber;
		}
		return "Bulls: " + evaluation[0] + " Cows: " + evaluation[1];
	} else {
		return "No guess given.";
	}
	
	//return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";

}



function evaluateGuess(guess, secretNumber){
	let bullsAndCows = [0,0];
	let guessMap = new Map();
	let secretMap = new Map();
	secretNumber = secretNumber.toString();
	
	for(let i=0;i<guess.length;i++){
		guessMap.set(guess[i],"");
		secretMap.set(secretNumber[i],"");
	}
	
	guessMap = createMapFromNumber(guess);
	secretMap = createMapFromNumber(secretNumber);
	
	guessMap = convertMapForProcess(guessMap, guess);
	secretMap = convertMapForProcess(secretMap, secretNumber);
	
	bullsAndCows = countBullsAndCows(guessMap, secretMap);	
	
	return bullsAndCows;
}

function createMapFromNumber(numberString){
	let map = new Map();
	for(let i=0;i<numberString.length;i++){
		map.set(numberString[i],"");
	}
	return map;
}

function convertMapForProcess(map, numberString){
	let convertedMap = new Map();
	
	for (let key of map.keys()) {
		let tempArray = [];
		for(let i=0; i<numberString.length; i++){
			if(numberString[i] == key){
				tempArray.push(i);
			}
		}
		convertedMap.set(key, tempArray);
	}
	
	return convertedMap;
}

function countBullsAndCows(mapOfGuess, mapOfSecret){
	let resultBulls = 0;
	let resultCows = 0;
	
	for(let key of mapOfSecret.keys()){
		let tempSecret = mapOfSecret.get(key);
		let tempGuess = mapOfGuess.get(key);
		let keyBulls = 0;
		let maxKeyCows;
		
		if(tempSecret && tempGuess){
			for(let i=0; i<tempSecret.length;i++){
				for(let j=0; j<tempGuess.length;j++){
					if(tempSecret[i]==tempGuess[j]){
						keyBulls++;
					}
				}
			}
			maxKeyCows = tempSecret.length - keyBulls;
			if((tempGuess.length - keyBulls)>maxKeyCows){
				resultCows += maxKeyCows;
			} else {
				resultCows += tempGuess.length - keyBulls;
			}
			resultBulls += keyBulls;
		}
	}
	return [resultBulls, resultCows];
}