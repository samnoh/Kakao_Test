// http://tech.kakao.com/2018/09/21/kakao-blind-recruitment-for2019-round-1/
// #1 오픈채팅방
// 정답률: 60%

'use strict';

require('fs').readFileSync(__dirname+'/resource/01-chat_log.txt', 'utf8').split('\n').forEach( e => { 
	printLogs(e.replace(/[^a-zA-Z0-9\s,]/g, '').split(',')); // spaces, english letters and numbers only
});

function printLogs (logs_arr) {
	let makeUserList = () => {
		let uid_nickname = [];
        
		logs_arr.forEach( log => {
			log = log.split(' ');
			events.push({
				event: log[0], 
				uid: log[1], 
				nickname: log[2] 
			});
            
			if (log[0] == 'Enter') {
				let isInObj = false;
                
				uid_nickname.forEach( e => {
					if (e.uid == log[1]) { // change nickname (e.g Enter 1 Muzi and Leave 1 and Enter 1 Prodo)
						isInObj = true;
						e.nickname = log[2];
					}
				});
				if (!isInObj) uid_nickname.push({ // not in the uid_nickname list
					uid: log[1],
					nickname: log[2]
				});
			}
			else if(log[0] == 'Change') uid_nickname.forEach( e => { // change nickname while online
				if (e.uid == log[1]) e.nickname = log[2];
			});
		});
		return uid_nickname;
	};
    
	let events = [], users_list = makeUserList();
	
	events.forEach ( i => {
		users_list.forEach ( e => {
			if (i.event == 'Enter' && e.uid == i.uid) console.log(`${e.nickname} has entered`);
			else if (i.event == 'Leave' && e.uid == i.uid) console.log(`${e.nickname} has left`); // no need to worry about Change here
		});
	});
}