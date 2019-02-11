'use strict';

var cockroaches = [
	//相対X座標、相対Y座標、向き
 //デバッグ用
/*
	new Cockroach(-10, 0,  180),
	new Cockroach(0, -10,  90),
	new Cockroach(0, 10,  90),
	new Cockroach(10,0,     30),
	new Cockroach(20,0,     60),
	new Cockroach(30,0,     90),
	new Cockroach(40,0,     180),
	new Cockroach(50,0,     270),
	new Cockroach(60,0,     0),
	new Cockroach(70,0,     0),
	new Cockroach(80,0,     0),
	new Cockroach(90,0,     0),
	new Cockroach(100,0   ,  0),
*/

	new Cockroach( 1, -10, -10,  30, 'ジョセフィーヌ'),
	new Cockroach( 2,   0, -10,  60, 'クララ'),
	new Cockroach( 3,  10, -10,  90, 'クロエ'),
	new Cockroach( 4, -10,   0, 120, 'ヴィクトリア'),
	new Cockroach( 5,   0,   0, 150, 'ソフィア'),
	new Cockroach( 6,  10,   0, 180, 'エリス'),
	new Cockroach( 7, -10,  10, 210, 'アリシア'),
	new Cockroach( 8,   0,  10, 240, 'スザンヌ'),
	new Cockroach( 9,  10,  10, 270, 'オリヴィア'),
	new Cockroach(10, -10,  20, 300, 'メリッサ'),
	new Cockroach(11,   0,  20, 330, 'ローズ'),
	new Cockroach(12,  10,  20, 360, 'ガブリエル'),
/* */
];
/*
//デバッグ用
for (let i in cockroaches) {
	cockroaches[i].measure();
}
*/