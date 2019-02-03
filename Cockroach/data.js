var nodes = [
	[-10,	-10],
	[0,		-10],
	[10,	-10],
	[-10,	0],
	[0,		0,],
	[10,	0],
	[-10,	10],
	[0,		10],
	[20,	10],
];

var edges = [
	[0, 1],
	[1, 2],
	[3, 4],
	[4, 5],
	[6, 7],
	[7, 8],

	[0, 3],
	[1, 4],
	[2, 5],
	[3, 6],
	[4, 7],
	[5, 8],
];

class Cockroach {
	constructor(a,b,c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
	
	move() {
		var dir = this.getRandomInt(10);
		console.log("dir", dir);
		
		this.c += dir;
		this.a += Math.cos(this.c * Math.PI / 180) * 0.1;
		this.b += Math.sin(this.c * Math.PI / 180) * 0.1;
	}
	
	getRandomInt(max) {
		var rand = Math.floor(Math.random() * Math.floor(max));
	
		if(Math.random() < 0.5) {
			rand *= -1;
		}
		return rand;
	}
}

var obj = [
	new Cockroach(-10, -10, 30),
	new Cockroach(0, -10, 60),
	new Cockroach(10, -10, 90),
	new Cockroach(-10, 0, 120),
	new Cockroach(0, 0, 150),
	new Cockroach(10, 0, 180),
	new Cockroach(-10, 10, 210),
	new Cockroach(0, 10, 240),
	new Cockroach(10, 10, 270)
];

