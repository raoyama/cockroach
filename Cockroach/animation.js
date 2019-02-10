'use strict';

function mainloop(){
	cockroaches.forEach(function(cockroach) {
		cockroach.run();
	});

	draw_proc();
	window.requestAnimationFrame(mainloop);
};
