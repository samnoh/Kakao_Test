// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #1 비밀지도 (난이도: 하) 
// 정답률: 82%

'use strict';

let fs = require('fs');
let input_text = fs.readFileSync(__dirname+'/resource/secret_map.txt', 'utf8').split('\n');

for(let i = 0; i < input_text.length; i += 3) {
	calcBits(input_text[i], input_text[i+1].replace(/[^\d\s]/g, '').split(' '), input_text[i+2].replace(/[^\d\s]/g, '').split(' '));
}

function calcBits(n, arr1, arr2) {
	for(let i = 0; i < n; i ++) { 
		printAns(n, (arr1[i] | arr2[i]).toString(2)); // bitwise operation
	}
	console.log();
}

function printAns (n, row_bits) {
	let ans = '';
	if (row_bits.length < n) {
		for(let i = 0; i < n - row_bits.length; i ++){
			ans += ' ';
		}
	}
	for(let i = 0; i < n; i ++) {
		if (row_bits.charAt(i) == '1') ans += '#';
		else ans += ' ';
	}
	
	console.log(ans);
}