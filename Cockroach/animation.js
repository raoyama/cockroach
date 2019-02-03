function mainloop(){

	for (i = 0; i < obj.length; i ++) {
		obj[i].move();
	}

	draw_proc();
	window.requestAnimationFrame(mainloop);
}
