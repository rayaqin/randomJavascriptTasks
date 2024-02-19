function findLongestSequence(nums) {
	let numSet = new Set(nums);
	let longestSequence = [];

	for (let num of numSet) {
		if (!numSet.has(num - 1)) {
			let currentNum = num;
			let currentSequence = [currentNum];

			while (numSet.has(currentNum + 1)) {
				currentNum += 1;
				currentSequence.push(currentNum);
			}

			if (currentSequence.length > longestSequence.length) {
				longestSequence = currentSequence;
			}
		}
	}

	return longestSequence;
}