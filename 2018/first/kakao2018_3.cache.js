// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #3 캐시 (난이도: 하) 
// 정답률: 45%

'use strict';

let fs = require('fs');
let input_text = fs.readFileSync(__dirname+'/resource/cache.txt', 'utf8').split('\n');

for(let i = 0; i < input_text.length; i ++) {
	calcCache(input_text[i].charAt(0), input_text[i].slice(3));
}

function calcCache(cache_size, string) {
	const CACHE_HIT = 1, CACHE_MISS = 5;
	let cache = [], process_time = 0;
	
	string = string.toUpperCase().replace(/[^\w,]/g, '').split(',');
    
	for (let i = 0; i < string.length; i ++) {
		if(cache.length == cache_size) {
			if(!cache.includes(string[i])){ // does not exsit in cache
				cache = cache.splice(1, cache.length); // deletes the first array element
				cache.push(string[i]);
				process_time += CACHE_MISS;
			}
			else process_time += CACHE_HIT;
		}
		else { // less than cache_size
			cache.push(string[i]);
			process_time += CACHE_MISS;
		}
	}
	console.log(process_time); // prints result
}