// http://tech.kakao.com/2017/11/14/kakao-blind-recruitment-round-3/
// #5 자동완성
// 정답률: 34%

require('fs').readFileSync(__dirname+'/resource/05-words.txt', 'utf8').split('\n').forEach( e => { 
	console.log(solution(JSON.parse(e)));
});

function solution(words) {
	let answer = 0;
	words.sort(); // a -> z
    
	for (let i = 0; i < words.length; i ++) {
		let word1 = '', word2 = '';
   
		for (let j = 1; j <= words[i].length; j ++) {
			let word = words[i].slice(0, j), arr_before = '', arr_after = '', a = false, b = false;

			if (i != 0) arr_before = words[i - 1].slice(0, j);
			if (i != words.length - 1) arr_after = words[i + 1].slice(0, j);

			if (word !== arr_before) {
				word1 = word;
				a = true;
			}
			if (word !== arr_after) {
				word2 = word;
				b = true;
			}
            
			if (a && b) break;
		}

		(word1.length > word2.length) ? answer += word1.length : answer += word2.length;
	}
    
	return answer;
}