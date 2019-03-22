// https://hackernoon.com/programming-with-js-merge-sort-deb677b777c0

// Split the array into halves and merge them recursively 
function mergeSort (arr) {
	if (arr.length === 1) return arr; // return once we hit an array with a single item

	const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
	const left = arr.slice(0, middle); // items on the left side
	const right = arr.slice(middle); // items on the right side
  
	return merge(mergeSort(left),mergeSort(right));
}
  
// compare the arrays item by item and return the concatenated result
function merge (left, right) {
	let result = [], indexLeft = 0, indexRight = 0;

	while (indexLeft < left.length && indexRight < right.length) {
		if (left[indexLeft] < right[indexRight]) { // push left if left is greater than right one
			result.push(left[indexLeft]);
			indexLeft++;
		} 
		else { // push right
			result.push(right[indexRight]);
			indexRight++;
		}
	}
    
	return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}
  
const list = [4,2,1,3];
console.log(mergeSort(list)); // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]

