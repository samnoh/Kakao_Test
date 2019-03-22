let set = [1, 2, 3]; // subsets [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]] => 2^set.length

for (let i = 1; i < 1 << set.length; i ++) { // from 1 to 7
	let key = '';
	for (let j = 0; j < set.length; j ++)  // from 0 to 2
		if (i & (1 << j)) key += set[j];
	console.log(key);
}

/*
1   001 {1}
2   010 {2}
3   011 {1,2}
4   100 {3}
5   101 {1,3}
6   110 {2,3}
7   111 {1,2,3}
*/