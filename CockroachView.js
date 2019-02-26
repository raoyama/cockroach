'use strict';

class CockroachView extends MaterialView {

	draw() {
		super.draw();
		
		//検知範囲描画
		let pos = cal_pos(this._material.x, this._material.y);
		draw_dottedLineCircle(pos[0], pos[1], World.detectionRange / g_camera_z);
	}
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
