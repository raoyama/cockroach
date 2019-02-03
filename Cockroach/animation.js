function mainloop(){

	for (i = 0; i < obj.length; i ++) {
		obj[i].move = function(){
		}
		
		obj[i].randomMove = function(){
			this[2] += getRandomInt(10);
			this[0] += Math.cos(this[2] * Math.PI / 180) * 0.1;
			this[1] += Math.sin(this[2] * Math.PI / 180) * 0.1;
		}
		
		//集まれモード
		if(g_mode == 1) {
			obj[i].move();
		}
		//デフォルトモード
		else {
			obj[i].randomMove();
		}
	}

	draw_proc();
	window.requestAnimationFrame(mainloop);
};

function getRandomInt(max) {
	rand = Math.floor(Math.random() * Math.floor(max));
	if(Math.random() < 0.5) {
		rand *= -1;
	}
	return rand;
}





