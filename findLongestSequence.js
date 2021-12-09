var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;

function clearCanvas() {
  canvas.style.justifyContent = "center";
  canvas.style.alignItems = "center";
  canvas.innerHTML = "Cleared...";
}

function runScript() {
  canvas.style.justifyContent = "flex-start";
  canvas.style.alignItems = "stretch";
  let result = new Map();
  let nums = expandIntArray(30000); //<-------
  result = solution(nums);

	canvas.innerHTML = "Steps to find the longest sequence:<br/>";

	let count = 0;
	convertFromCodedMap(result).forEach((value, key)=>{
		if(key!=="solution"){
			count++;
			canvas.innerHTML += "<br/>" +
								count + ". sequence: " + value[0] +
								"<br/>" +
								"Length: " + value[1];
		}
		
	});
	
	canvas.innerHTML +=	"<br/><br/>" +
						"The length longest sequence of numbers in the provided array is: " + result.get("solution");
}



function solution(nums){	
	var entireStart = performance.now();
	
	let numSet = new Set();
	let upper;
	let lower;
	let countDown;
	let countUp;
	let result = 0;
	let sequenceMap = new Map();
	
	nums.forEach((element)=>numSet.add(element));
	
	numSet.forEach((element)=>{
		countDown = 0;
		countUp = 0;
		
		lower = element-1;
		while(numSet.has(lower)){
			countDown++;
			lower--;
		}
		
		upper = element+1;
		while(numSet.has(upper)){
			countUp++;
			upper++;
		}
		if(countDown+countUp > result){
			sequenceMap.set(element, [countDown,countUp]);
			result = countDown+countUp;
		}
	})
	sequenceMap.set("solution", result);
	
	var entireFinish = performance.now();
	console.log("Completion time: " + (entireFinish - entireStart));
	
	return sequenceMap;

	//return "╭━┳━╭━╭━╮╮<br/>┃┈┈┈┣▅╋▅┫┃<br/>┃┈┃┈╰━╰━━━━━━╮<br/>╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣<br/>╲┃┈┈┈┈┈┈┈┈┈▉▉▉<br/>╲┃┈┈┈┈┈┈┈┈┈◥▉◤<br/>╲┃┈┈┈┈╭━┳━━━━╯<br/>╲┣━━━━━━┫﻿";
}

function expandIntArray(max){
	let intArray = [];
	for(let i=0;i<max;i++){
		intArray.push(Math.floor(Math.random() * Math.floor(max)))
	}
	return intArray;
}

function convertFromCodedMap(codedMap){
	let decodedMap = new Map();
	codedMap.forEach((value, key)=>{
		let temp = "";
		for(let i=value[0];i>0;i--){
			temp+= (key - i) + " ";
		}
		for(let i=0;i<value[1];i++){
			temp+= key + i + " ";
		}
		decodedMap.set(key, [temp, value[0] + value[1]]);
	})
	return decodedMap;
}

