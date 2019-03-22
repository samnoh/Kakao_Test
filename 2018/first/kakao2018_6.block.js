// http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
// #6 프렌즈4블록 (난이도: 상) 
// 정답률: 48%

'use strict';

let fs = require('fs');

fs.readFileSync(__dirname+'/resource/board.txt', 'utf8').split('\n').forEach( e => {
	e = /(\d{1,2})\s(\d{1,2})\s(.*)/.exec(e); // number|number|others
	console.log(calcEmptyBlocks(e[1], e[2], e[3])); // e[0] is the whole string
});

function calcEmptyBlocks(m, n, board) { // m = height, n = width
	let createMap = (board) => {
		let board_map = [];
		board = board.match(/\w+/g); // English letters only
        
		for (let i = 0; i < m; i ++) {
			board_map[i] = [];
			for (let j = 0; j < n; j ++) board_map[i][j] = board[i].charAt(j);
		}
		return board_map;
	};

	let removeBlocks = (board_map) => {
		for (let i = 0; i < m; i ++) 
			for (let j = 0; j < n; j ++) 
				if (board_map[i][j].includes('!')) board_map[i][j] = ' ';
	};

	let lowerBlocks = (board_map) => {
		let a = true;
		while (a){
			a = false;
			for (let i = 0; i < m - 1; i ++) 
				for (let j = 0; j < n; j ++) 
					if (board_map[i + 1][j].includes(' ') && !board_map[i][j].includes(' ')) {
						board_map[i + 1][j] = board_map[i][j];
						board_map[i][j] = ' ';
						a = true;
					}
		}
	};

	let calc2T2Blocks = (board_map) => {
		for (let i = 0; i < m - 1; i ++) 
			for (let j = 0; j < n - 1; j ++) 
				if (board_map[i][j].includes(board_map[i][j + 1]) && board_map[i][j].includes(board_map[i + 1][j]) && board_map[i][j].includes(board_map[i + 1][j + 1])) {
					board_map[i][j] += '!';
					board_map[i][j + 1] += '!';
					board_map[i + 1][j] += '!';
					board_map[i + 1][j + 1] += '!';
				}
		removeBlocks(board_map);
		lowerBlocks(board_map);
		return board_map;
	};

	let temp_board = [[]];
	board = createMap(board);
	calc2T2Blocks(board);
	while (board != temp_board) {
		temp_board = board;
		board = calc2T2Blocks(board);
	}

	let sum = 0;
	board.forEach( block => block.forEach ( e => e.includes(' ') ? sum ++ : sum));
	return sum;
}