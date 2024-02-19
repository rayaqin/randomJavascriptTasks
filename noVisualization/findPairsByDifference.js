function pairs(k, arr) {
  let numOfPairs = 0;
  const arrSet = new Set(arr);
  for (let num of arrSet) {
    if (arrSet.has(num - k)) {
      numOfPairs++;
    }
  }
  return numOfPairs;
}