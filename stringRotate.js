var clearButton = document.getElementById("clearButton");
var runButton = document.getElementById("runButton");
var canvas = document.getElementById("canvas");

clearButton.onclick = clearCanvas;
runButton.onclick = runScript;
canvas.style.alignItems = "stretch";
canvas.style.justifyContent = "flex-start";
canvas.style.fontSize = "25px";


const exampleArray = ["~>~", "~a~", "~b~", "~c~", "~d~", "~e~", "~f~", "~g~", "~h~", "~i~", "~j~",];
let resultArray = [...exampleArray];
canvas.innerHTML = exampleArray.join('');

function clearCanvas() {
	canvas.style.justifyContent = "center";
	canvas.style.alignItems = "center";
	canvas.innerHTML = "Cleared...";
}

function runScript() {
	let result = solution();
	canvas.innerHTML = result;
}

function solution() {
	const start = performance.now();

	resultArray = rotate(resultArray, 25511);

	const finish = performance.now();
	console.log("Completion time: " + (finish - start).toFixed(2) + " ms");

	return resultArray.join('');
}

function rotate(inputArray, displacement) {
	if (isValidStringArray(inputArray) == false) {
		return "wrong input";
	};
	if (isNaN(displacement)) {
		return "wrong displacement value";
	}

	let simplifedDisplacement = displacement % inputArray.length;

	const rotatedArray = [];
	inputArray.forEach((element, index) => {
		rotatedArray[getTargetIndex(index, inputArray.length, simplifedDisplacement)] = element;
	});
	return rotatedArray;
}

function getTargetIndex(currentIndex, size, displacement) {
	if (currentIndex + displacement < size) {
		return currentIndex + displacement;
	} else {
		return Math.abs(size - (currentIndex + displacement));
	}
}

function isValidStringArray(inputArray) {
	return Array.isArray(inputArray) && inputArray.every(element => typeof element === "string");
}
