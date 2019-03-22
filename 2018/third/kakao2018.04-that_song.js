// http://tech.kakao.com/2017/11/14/kakao-blind-recruitment-round-3/
// #4 방금그곡
// 정답률: 48%

require('fs').readFileSync(__dirname+'/resource/04-music_info.txt', 'utf8').split('\n').forEach( e => { 
	e = /\"(.+)\"\s(.*)/g.exec(e);
	console.log(solution(e[1], JSON.parse(e[2])));
});

function solution(m, musicinfos) {
	let calcDuration = (start, end) => {
		start = start.split(':'), end = end.split(':');
		start[0] *= 60, end[0] *= 60;
        
		return (parseInt(end[0]) + parseInt(end[1])) - (parseInt(start[0]) + parseInt(start[1])); // in minutes
	};
    
	let subsitutionMelody = (melody) => {
		let temp = '';

		for (let j = 0; j < melody.length; j ++)
			if (j != 0 && melody[j] === '#') { 
				temp = temp.slice(0, temp.length - 1);
				temp += melody.charAt(j - 1).toLowerCase();
			}
			else temp += melody.charAt(j);

		return temp; // e.g. C# -> c
	};

	m = subsitutionMelody(m);
	let answer = [];

	for (let i = 0; i < musicinfos.length; i ++) {
		let music_arr = /(\d{2}\:\d{2})\,(\d{2}\:\d{2})\,([^,]+)\,([CDEFGAB#]+)/g.exec(musicinfos[i]);
		let melody = subsitutionMelody(music_arr[4]), duration = calcDuration(music_arr[1], music_arr[2]);
		let play_times = Math.floor(duration / melody.length), left_times = duration % melody.length, total_melody = '';
		
		for (let j = 0; j < play_times; j ++) total_melody += melody; 
		for (let j = 0; j < left_times; j ++) total_melody += melody.charAt(j);
		if (total_melody.indexOf(m) > -1) answer.push({ // core
			title: music_arr[3], // song title
			duration: duration,
		});
	}
    
	if (answer.length === 0) return '(None)'; // no match
    
	return answer.sort( (a, b) => { // descending order 
		return b.duration - a.duration; // longer duration goes first
	})[0].title;
}