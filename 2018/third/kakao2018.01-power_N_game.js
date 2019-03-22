//http://tech.kakao.com/2017/11/14/kakao-blind-recruitment-round-3/
// #1 N진수 게임
// 정답률: 92%

require('fs').readFileSync(__dirname+'/resource/01-power_N.txt', 'utf8').split('\n').forEach( e => { 
	e = e.split(' ');
	console.log(solution(e[0], e[1], e[2], e[3]));
});

function solution(n, t, m, p) { // n = power, t = number of answers, m = number of ppl, p = my turn (from 1)
	let answer = '';
    
	let total_str = '';
	for (let i = 0; i < m * t; i ++) 
		total_str += i.toString(n); // every possible string
    
	for(let i = 0; i < t; i++) { // t times
		let temp = i * m + (p - 1);
		answer += total_str.charAt(temp).toUpperCase();
	}

	return answer;
}