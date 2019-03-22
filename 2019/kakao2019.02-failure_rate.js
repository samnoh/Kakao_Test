// http://tech.kakao.com/2018/09/21/kakao-blind-recruitment-for2019-round-1/
// #2 실패율
// 정답률: 56%

'use strict';

require('fs').readFileSync(__dirname+'/resource/02-stages_log.txt', 'utf8').split('\n').forEach( e => { 
	e = /(\d{1,3}),\s(.*)/g.exec(e);
	console.log(caclFailureRate(e[1], JSON.parse(e[2])));
});

function caclFailureRate(N, stages) {
	let rate = [];

	for (let i = 1; i <= parseInt(N); i ++) {
		let total = stages.reduce((acc, curStage) => acc + ((curStage >= i) ? 1 : 0), 0);
		let fail = stages.reduce((acc, curStage) => acc + ((curStage == i) ? 1 : 0), 0);
		if(total == 0) {
			rate.push({
				'stage': i,
				'rate': 0
			});
			continue;
		}
		rate.push({
			'stage': i,
			'rate': fail/total
		});
	}
    
	return rate.sort( (a,b) => { // 내림차순
		if (a.rate > b.rate) return -1; // a goes first (lower index) (높은게 먼저, 낮은게 나중에 옴)
		if (a.rate < b.rate) return 1; // b goes first (lower index) (높은게 먼저, 낮은게 나중에 옴)
		return a.stage - b.stage; // a.rate == b.rate, lower stage number goes first
	}).map(e => e.stage);
}

// the same as above
function solution(N, stages) {
	let rate = [];
    
	for (let i = 1; i < N + 1; i ++) {
		let fail = 0, total = 0;
		for (let j = 0; j < stages.length; j ++){
			if (i == stages[j]) fail ++;
			if (i <= stages[j]) total ++;
		}
		rate.push({
			stage: i,
			rate: fail/total
		});
	}
    
	return rate.sort( (a, b) => { // 내림차순
		if (a.rate > b.rate) return -1;
		if (a.rate < b.rate) return 1;
		return a.stage - b.stage;
	}).map(e => e.stage);
}