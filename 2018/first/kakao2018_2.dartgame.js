// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #2 다트게임 (난이도: 하) 
// 정답률: 73%

'use strict';

let fs = require('fs');
let input_text = fs.readFileSync(__dirname+'/resource/dartResult.txt', 'utf8').split('\n');

let regex = /(\d{1,2})(\w[\*#]?)(\d{1,2})(\w[\*#]?)(\d{1,2})(\w[\*#]?)/;

input_text.forEach( (e, i, arr) => {
	console.log(calcScore(regex.exec(e)));
});

function calcScore (dart_result) {
	let ans = 0, last_ans = 0;
	for(let i = 2; i < dart_result.length; i += 2) { // starts from 2 ([0] is whole one)
		let temp_ans = 0;
        
		if (dart_result[i].charAt(0) == 'S') {
			temp_ans += parseInt(dart_result[i - 1]); 
		}
		else if (dart_result[i].charAt(0) == 'D') {
			temp_ans += Math.pow(parseInt(dart_result[i - 1]), 2); 
		}
		else { // if 'T'
			temp_ans += Math.pow(parseInt(dart_result[i - 1]), 3); 
		}

		if (dart_result[i].length == 2) { // includes '*' or '#'
			if (dart_result[i].charAt(1) == '*') {
				if (i != 2) ans += last_ans; // if not the first score, the last one is also double
				temp_ans = temp_ans * 2; // double the current score
			}
			else temp_ans = temp_ans * -1;  // if '#'
		}

		last_ans = temp_ans;
		ans += temp_ans;
	}
    
	return ans;
}