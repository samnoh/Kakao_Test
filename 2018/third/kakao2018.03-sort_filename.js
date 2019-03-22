// http://tech.kakao.com/2017/11/14/kakao-blind-recruitment-round-3/
// #3 파일명 정렬
// 정답률: 67%

require('fs').readFileSync(__dirname+'/resource/03-file_list.txt', 'utf8').split('\n').forEach( e => { 
	console.log(solution(JSON.parse(e)));
});

function mergeSort (arr) {
	if (arr.length === 0) return [];
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
		let temp_left = /^([a-zA-Z\-\s]{1,})(\d{1,5}).*$/g.exec(left[indexLeft]);
		let temp_right = /^([a-zA-Z\-\s]{1,})(\d{1,5}).*$/g.exec(right[indexRight]);
    
		if (temp_left[1].toUpperCase() < temp_right[1].toUpperCase()) { // push left if left is greater than right one
			result.push(left[indexLeft]);
			indexLeft++;
		} 
		else if (temp_left[1].toUpperCase() > temp_right[1].toUpperCase()){ // push right
			result.push(right[indexRight]);
			indexRight++;
		}
		else { // temp_left[1].toUpperCase() == temp_right[1].toUpperCase()
			if(parseInt(temp_left[2]) <= parseInt(temp_right[2])) { // compare numbers
				result.push(left[indexLeft]);
				indexLeft++;
			}
			else {
				result.push(right[indexRight]);
				indexRight++;
			}
		}
	}
    
	return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function solution(files) {
	return mergeSort(files);
}
