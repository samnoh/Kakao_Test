// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #4 셔틀버스 (난이도: 중) 
// 정답률: 27%

'use strict';

let fs = require('fs');
let input_text = fs.readFileSync(__dirname+'/resource/timetable.txt', 'utf8').split('\n');

for (let i = 0; i < input_text.length; i ++) {
	let temp = /(\d{1,})\s(\d{1,})\s(\d{1,})\s\[(.*)\]/.exec(input_text[i]);
	let time = calcArrivalTime(parseInt(temp[1]), parseInt(temp[2]), parseInt(temp[3]), temp[4]);
	console.log(createTimeFormat(time.toString()));
}

function createTimeFormat(time) {
	while(time.length < 4) time = '0' + time;
	return '"' + time.charAt(0) + time.charAt(1) + ':' + time.charAt(2) + time.charAt(3) + '"';
}

function calcArrivalTime(n, t, m, timetable) { // n times, at t minutes intervals, m passengers, the times crews arrived.
	let start_time = 900, last_time, bus_timetable = [], passengers = 0;
    
	let calcTime = (time, minus) => {
		if (minus < 60) {
			if (time % 100 == 0) return time - 40 - minus;
			return time - minus;
		}	
	};
    
	bus_timetable.push(start_time);
	timetable = timetable.match(/(\d{2}:\d{2})/g);

	for (let i = 0; i < timetable.length; i ++) 
		timetable[i] = timetable[i].replace(':', '');
        
	timetable.sort();

	if (t >= 60) t = (t / 60) * 100 + t % 60; // minutes to hours
	last_time = start_time + (n * t) - t;
    
	for (let i = 1; i < n; i ++) // calculate bus timetable
		bus_timetable.push(start_time += t); 
    
	for (let i = bus_timetable.length -1; i > - 1; i --) {
		let second_last_time = bus_timetable[i] - t;
		if (second_last_time < 900) second_last_time = 0; // 00:00
        
		for (let j = 0; j < timetable.length; j ++) 
			if(second_last_time < timetable[j] && timetable[j] <= bus_timetable[i]) passengers ++;
		
		if (passengers == m) return calcTime(timetable[timetable.length - 1], 1);// become the last second one
		else if(passengers > m) return calcTime(timetable[timetable.length - passengers + m - 1], 1); // get hurry; more people than capacity (see the second input)
	}
	return last_time;
}