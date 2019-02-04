"use strict";

function mainloop(){
	cockroaches.forEach(function(cockroach) {
		cockroach.mode = g_mode;
		cockroach.run();
	});

	draw_proc();
	window.requestAnimationFrame(mainloop);
};
