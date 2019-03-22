// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #5 뉴스 클러스터링 (난이도: 중) 
// 정답률: 42%

'use strict';

let fs = require('fs');

fs.readFileSync(__dirname+'/resource/news_keywords.txt', 'utf8').split('\n').forEach( (e) => {
	e = e.toUpperCase().split(', ');
	console.log(parseInt(calcJaccardSimilarity(e[0], e[1]))); // integers only
});

function calcJaccardSimilarity(str1, str2) { // 자카드 유사도
	const MULTIPLY_INDEX = 65536;
	
	let makeTuple = (str) => {
		let a  = [];
        
		for (let i = 1; i < str.length; i ++) 
			if(/^[a-zA-Z]+$/.test(str[i - 1]) &&/^[a-zA-Z]+$/.test(str[i]))  // only english letters allowed
				a.push(str[i-1] + str[i]);
		return a;
	};
    
	let calcIntersection = (str1, str2) => {
		let a = 0;
        
		if (str1.length == 0 && str2.length == 0) return 1; // empty set
		for (let i = 0; i < str1.length; i ++) 
			if (str2.includes(str1[i])) 
				a ++;
		return a;
	};
    
	let calcUnion = (str1, str2, num_intersection) => {
		if (str1.length == 0 && str2.length == 0) return 1; // empty set
		return str1.length + str2.length - num_intersection;
	};
    
	str1 = makeTuple(str1);
	str2 = makeTuple(str2);
	let num_intersection = calcIntersection(str1, str2);

	return num_intersection / calcUnion(str1, str2, num_intersection) * MULTIPLY_INDEX;	
}