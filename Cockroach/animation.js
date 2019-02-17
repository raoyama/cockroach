'use strict';

function mainloop(){
	world.materials.forEach(function(material) {
		material.run();
	});

	draw_proc();
	window.requestAnimationFrame(mainloop);
};
