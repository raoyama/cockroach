'use strict';

class BallView extends MaterialView{
	draw() {
		let pos = cal_pos(this._material.x, this._material.y);

		//ƒ}ƒeƒŠƒAƒ‹•`‰æ
		ctx.translate( pos[0], pos[1] ) ;
		ctx.rotate( - this._material._r * Math.PI / 180 );

		this._drawShape(ctx)

		ctx.rotate(this._material.r * Math.PI / 180);
		ctx.translate( - pos[0], - pos[1] );

		//ƒ‰ƒxƒ‹•`‰æ
		pos = cal_pos(this._material.x - 1, this._material.y + 1.5);
		ctx.lineWidth = 2;
		ctx.font = "15px 'Arial'";
		ctx.strokeText(this._material.name, pos[0], pos[1]);
    }
	_drawShape(ctx) {
		ctx.beginPath();
		ctx.arc(0, 0, rect_size / g_camera_z, 0, Math.PI * 2, false);
		ctx.fill();
	}
}
