// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #7 추석 트래픽 (난이도: 상) 
// 정답률: 18%

'use strict';

const moment = require('/usr/local/lib/node_modules/moment');

require('fs').readFileSync(__dirname+'/resource/traffic_logs.txt', 'utf8').split('\n').forEach( e => { 
	console.log(calcProcessPerSec(e.split(','))); 
});

function calcProcessPerSec (logs) {
	let start_time = [], end_time = [], max_process = 0;

	logs.forEach( log => { 
		let a = log.split(' ');
		end_time.push(moment(a[1] + a[2], '"YYYY-MM-DD HH:mm:ss.SSS')); // from txt file
		start_time.push(moment(end_time[end_time.length - 1]).subtract(moment.duration(parseFloat(/\d{1,}\.?\d?\d?\d?/.exec(a[3])[0]), 'seconds'))); // subtract duration
	});
  
	for (let i = 0; i < start_time.length; i ++) {
		let a = 1; // initial number of processes
		for (let j = i + 1; j < start_time.length; j++) 
			if(start_time[i].isBetween(moment(start_time[j]).subtract(999, 'milliseconds'), moment(end_time[j]).add(999, 'milliseconds'))) a ++; 
			else if (end_time[i].isBetween(moment(start_time[j]).subtract(999, 'milliseconds'), moment(end_time[j]).add(999, 'milliseconds'))) a ++;
		if (a > max_process) max_process = a;
	}
	return max_process;
}