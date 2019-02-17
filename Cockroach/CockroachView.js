'use strict';

class CockroachView extends MaterialView{

	_drawShape(ctx) {
		ctx.fillRect(
			 - (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 2 / g_camera_z,
			(rect_size * 2) / g_camera_z,
			rect_size / g_camera_z
		);
		ctx.strokeRect(
			 - (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 2 / g_camera_z,
			(rect_size * 2) / g_camera_z,
			rect_size / g_camera_z
		);
		ctx.strokeRect(
			 (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 4 / g_camera_z,
			rect_size / 2 / g_camera_z,
			rect_size / 2 / g_camera_z
		);
	}
}
