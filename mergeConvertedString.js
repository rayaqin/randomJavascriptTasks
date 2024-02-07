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
	result = solution();
	limitedCanvas.innerHTML = result;
}

function readInput() {
	inputStorage = "" + inputField.value;
	inputField.value = "";
}

function solution() {
	const s1 = "my&friend&Paul has heavy hats! &";
	const s2 = "my friend John has many many friends &";
	const result = convertToFrequencyComparisonString(s1, s2);
	return `"${s1}"<br>"${s2}"<br>=><br>${result}`;
}

const convertToFrequencyComparisonString = (s1, s2) =>
	[s1, s2]
		.map((string, index) => {
			let frequencyMap = new Map();
			let cleanString = string.split('').filter(c => c.match(/[a-z]/)).join('');
			for (let i = 0; i < cleanString.length; i++) {
				const currentChar = cleanString[i];
				const currentValueInMap = frequencyMap.get(currentChar);
				frequencyMap.set(currentChar, currentValueInMap ? (currentValueInMap + currentChar) : currentChar);
			}
			return Array.from(frequencyMap.values())
				.filter(s => s.length > 1)
				.map(s => ({ id: index + 1, chars: s }));
		})
		.flat() // [{id: 1, chars: "nnn"}, {id: 1, chars: "aaaa"}, {id: 2, chars: "nnn"}, {id: 2, chars: "aaa"}]
		.reduce((acc, curr) => {
			for (let entry of acc) {
				if (entry.chars === curr.chars) {
					entry.id = '=';
					return acc;
				}
				if (entry.chars[0] === curr.chars[0]) {
					if (entry.chars.length < curr.chars.length) {
						entry.id = curr.id;
						entry.chars = curr.chars;
						return acc;
					}
					return acc;
				}
			}
			acc.push(curr);
			return acc;
		}, []) // [{id: =, chars: "nnn"}, {id: 1, chars: "aaaa"}]
		.map(obj => `${obj.id}:${obj.chars}`) // ["=:nnn", "1:aaaa"]
		.sort((a, b) => {
			if (a.length === b.length) {
				return [a, b].sort()[0] === a ? -1 : 1;
			}
			return b.length - a.length;
		}).join('/'); // "1:aaaa/=:nnn"


