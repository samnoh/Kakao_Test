// http://tech.kakao.com/2018/09/21/kakao-blind-recruitment-for2019-round-1/
// #3 후보키
// 정답률: 16%

require('fs').readFileSync(__dirname+'/resource/03-relation.txt', 'utf8').split('\n').forEach( e => { 
	console.log(solution(JSON.parse(e)));
});

function solution(relation) {
	const sk = new Set();

	for (let i = 1; i < 1 << relation[0].length; i ++) { // 1 << relation[0].length is 2^4 = 16
		const temp = new Set();
		for (let row = 0; row < relation.length; row ++) {
			let key = '';
			for (let col = 0; col < relation[0].length; col ++) 
				if (i & (1 << col)) key = String(key) + String(relation[row][col]);
			temp.add(key);
		}
		if (temp.size === relation.length) sk.add(i); // only if they are all unique, (e.g. 6 relations, 6 temp sizes)
	}

	console.log(sk);
	for (let i of sk) 
		for (let j of sk) {
			if (i >= j) continue; // skip when i is j or greater
			if ((i & j) === i) sk.delete(j);
		}

	// console.log(Array.from(sk).map(e => e.toString(2)));
	
	return sk.size;
}