'use strict';

class MaterialView {
    constructor(material) {
        this._material = material;
    }

	draw() {
		let pos = cal_pos(this._material.x, this._material.y);

		//マテリアル描画
		ctx.translate( pos[0], pos[1] ) ;
		ctx.rotate( - this._material._r * Math.PI / 180 );

		this._drawShape(ctx)

		ctx.rotate(this._material.r * Math.PI / 180);
		ctx.translate( - pos[0], - pos[1] );

		//検知範囲描画
		draw_dottedLineCircle(pos[0], pos[1], World.detectionRange / g_camera_z);

		//ラベル描画
		pos = cal_pos(this._material.x - 1, this._material.y + 1.5);
		ctx.lineWidth = 2;
		ctx.font = "15px 'Arial'";
		ctx.strokeText(this._material.name, pos[0], pos[1]);
    }

	_drawShape(ctx) {
		ctx.fillRect(
			 - rect_size / 2 / g_camera_z,
			 - rect_size / 2 / g_camera_z,
			(rect_size * 2) / g_camera_z,
			rect_size / g_camera_z
		);

	}
}
