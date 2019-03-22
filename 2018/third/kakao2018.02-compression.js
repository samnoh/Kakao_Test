// http://tech.kakao.com/2017/11/14/kakao-blind-recruitment-round-3/
// #2 압축
// 정답률: 96%

require('fs').readFileSync(__dirname+'/resource/02-message.txt', 'utf8').split('\n').forEach( e => { 
	console.log(solution(e));
});

function solution(msg) {
	let answer = [], english_index = []; // english_index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
	// create basic A-Z index
	for(let i = 0; i < 26; i ++) {
		english_index.push({
			letter: String.fromCharCode(65 + i), // 65 -> 'A'
			index: i + 1,
		}); 
	}

	let i = 0;
	while(i < msg.length){
		Loop1:
		for (let a = msg.length; a > 0; a --) {
			for (let j = 0; j < english_index.length; j ++) {
				if (english_index[j].letter == msg.slice(i,a)) { // what is the most longest word
					answer.push(english_index[j].index);
					english_index.push({
						letter: msg.slice(i, a) + msg.slice(a, a + 1), // current + next word
						index: english_index.length + 1,
					});
					i += a - i; // i increases
					break Loop1;
				}
			}
		}
	}

	return answer;
}