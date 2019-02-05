"use strict";

/** 当たり判定 */
function colision(cockroach) {
    let r = 3;	//あたり判定円大きさ
    for (let i in cockroaches) {
        if (cockroach == cockroaches[i]) continue;
        let dx = cockroach.x - cockroaches[i].x;
        let dy = cockroach.y - cockroaches[i].y;

        //半径よりおおきければOK
        let d = dx * dx + dy * dy;
        if (d > r * r) continue;

        //当たっている場合、向き判定
        let ar = Math.atan(dy / dx);
        let ad = ar / Math.PI * 180;

        //ベクトル合成
        cockroach.r = (cockroaches[i].r + ad) / 2 % 360;

        return true;
    }
    return false;
}
