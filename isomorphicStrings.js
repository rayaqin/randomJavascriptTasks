const clearButton = document.getElementById("clearButton");
const runButton = document.getElementById("runButton");
const canvas = document.getElementById("canvas");

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
	let result = solution();

	canvas.innerHTML = result;
}

function solution() {
	const word1 = "abcaaaaaaa";
	const word2 = "kcskkkkkka";

	const entireStart = performance.now();
	let isIsomorphic = getCodedWord(word1) === getCodedWord(word2);
	const entireFinish = performance.now();

	console.log("Completion time: " + (entireFinish - entireStart));
	return (isIsomorphic ? "Yes" : "No") + ", " + word1 + " and " + word2 + " are " + (isIsomorphic ? "" : "not ") + "isomorphic.";
}

function getCodedWord(word) {
	let codedWord = word;
	for (let i = 0; i < word.length; i++) {
		if (isNaN(word[i])) {
			codedWord = codedWord.replaceAll(word[i], i);
		}
	}
	return codedWord;
}