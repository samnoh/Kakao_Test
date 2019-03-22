// http://tech.kakao.com/2018/09/21/kakao-blind-recruitment-for2019-round-1/
// #4 무지의 먹방 라이브
// 정답률: 42.08% (정확성) and 5.52% (효율성)

require('fs').readFileSync(__dirname+'/resource/04-food_times.txt', 'utf8').split('\n').forEach( e => { 
	e = /(\d{1,})\s(.*)/g.exec(e);
	console.log(solution(JSON.parse(e[2]), e[1]));
});

function solution(food_times, k) {
	let total_time = 0, obj_ft = [];

	// array to objects to label index
	for (let i = 0; i < food_times.length; i ++) {
		total_time += food_times[i];
		obj_ft.push({
			index: i + 1,
			time: food_times[i]
		});
	}

	// error handling
	if (total_time <= k) return -1;

	// make it in ascedning order by time (1, 2, 3)
	obj_ft.sort( (a, b) => { // 오름차순 by time
		if (a.time === b.time) return a.index - b.index;
		return a.time - b.time;  // b.time - a.time -> 내림차순
	});

	let last_dt = 0; // last deleted time
	for (let i = 0; i < obj_ft.length; i ++){
		let dt = (obj_ft[i].time - last_dt) * (obj_ft.length - i); // (obj_ft.length - i) is all of right elements
		if (k - dt >= 0) {
			last_dt += obj_ft[i].time - last_dt; 
			k -= dt;
		}
		else {
			let rest_time = Math.floor(k / (obj_ft.length - i)); // Math.floor(4.9 or 4.1) = 4
			k -= rest_time * (obj_ft.length - i);
			last_dt += rest_time;
			break;
		}
	}

	obj_ft = obj_ft.filter( e => e.time - last_dt > 0); // should be more than 0 (0 is not supposed to be included to skip 0)
	obj_ft.sort( (a, b) => { // 오름차순 by index
		return a.index - b.index;
	});
	
	return obj_ft[k].index;
}
