'use strict';

class BallView extends MaterialView {
	_drawShape(ctx) {
		ctx.beginPath();
		ctx.arc(0, 0, rect_size / g_camera_z, 0, Math.PI * 2, false);
		ctx.fill();
	}
}
